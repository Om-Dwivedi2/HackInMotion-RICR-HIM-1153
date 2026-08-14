# CareerLens Project Architecture

## 1. Project Overview

CareerLens is a full-stack career-readiness web platform that helps candidates evaluate and optimize their resumes for targeted job roles. The system enables users to upload resumes in multiple document formats, define target career positions and job descriptions, generate deterministic and AI-powered match analysis with actionable recommendations, and practice simulated mock interviews with automated grading.

## 2. Repository Structure

The project is organized as a decoupled client-server repository:

```text
HackInMotion-RICR-HIM-1153/
├── client/          # Frontend React SPA with Vite & Tailwind CSS
├── server/          # Backend REST API with Express & Mongoose
├── docs/            # Engineering & architecture documentation
└── README.md        # Project setup and overview guide
```

- **`client/`**: Handles user interface, client-side routing, presentation state, and interactive workflows.
- **`server/`**: Manages business logic, document parsing, deterministic scoring, AI orchestration, database persistence, and session security.
- **`docs/`**: Central repository for system design, workflows, and architectural guides.

## 3. Frontend Architecture

The frontend is built with **React 19** and bundled using **Vite**.

- **Routing (`src/App.jsx`)**: Uses `react-router-dom` (v7) to define public landing and authentication routes (`Home.jsx`, `Login.jsx`, `Register.jsx`, `Contact.jsx`) and authenticated dashboard subroutes protected by `ProtectedRoute.jsx`.
- **Views (`src/pages/`)**: Domain views including `Dashboard.jsx`, `Resume.jsx`, `Analysis.jsx`, `MockInterview.jsx`, `History.jsx`, and `Settings.jsx`.
- **Component System (`src/components/`)**:
  - `auth/`: Login/register inputs and route protectors.
  - `dashboard/`: Feature-grouped UI for overview metrics, resume upload/preview, career target forms, analysis visualizers, mock interviews, and history timelines.
  - `home/` & layout: Navbar, footer, hero, and value sections.
- **Global Context (`src/context/AuthContext.jsx`)**: Manages session state (`user`, `login`, `register`, `logout`, `checkAuth`) and provides the `useAuth()` hook.
- **API Client (`src/api/axios.js`)**: Configured Axios instance with `withCredentials: true` and base URL targeting `/api`.

## 4. Backend Architecture

The backend is built with **Node.js** and **Express 5**, connecting to **MongoDB** via **Mongoose**.

- **Entry Point (`src/index.js` & `src/app.js`)**: Boots Express, registers CORS with credentials, cookie parser, JSON body parser, request logging (`morgan`), static file serving (`/uploads`), and routes.
- **Routes (`src/routes/`)**: Modular endpoints for `auth.routes.js`, `user.routes.js`, `resume.routes.js`, `careerTarget.routes.js`, `analysis.routes.js`, `interview.routes.js`, `history.routes.js`, and `health.routes.js`.
- **Controllers (`src/controllers/`)**: Business orchestration handlers extracting request parameters, invoking services, and sending standardized JSON responses.
- **Middleware (`src/middlewares/`)**:
  - `auth.middlewares.js`: `protect` middleware verifying the HTTP-only JWT cookie (`careerlens_token`).
  - `error.middlewares.js`: `notFoundHandler` for 404s and `globalErrorHandler` for formatting error responses.
- **Services (`src/services/`)**:
  - `ai.service.js`: OpenRouter client executing structured prompts for resume parsing, JD requirement extraction, analysis explanations, and interview simulation/grading.
  - `analysis.service.js`: Deterministic keyword, skill, and score calculation engine.
  - `auth.services.js`: User authentication and credential validation logic.
- **Models (`src/modules/`)**: Mongoose schemas for `User`, `Resume`, `CareerTarget`, `Analysis`, and `Interview`.

## 5. Authentication Flow

Authentication uses JSON Web Tokens (JWT) stored in HTTP-only cookies:

```text
User (Login/Register)
       ↓
AuthContext (Axios POST /api/auth/login or /api/auth/register)
       ↓
auth.controllers.js (Validates credentials with bcrypt & signs JWT)
       ↓
HTTP-only Cookie (`careerlens_token`) set in response
       ↓
Protected Request (Cookie automatically sent via withCredentials)
       ↓
auth.middlewares.js (`protect` validates JWT & attaches req.user)
       ↓
Target Controller executes
```

## 6. Resume Workflow

Resume processing combines local document parsing and LLM data extraction:

```text
User uploads PDF/DOCX in ResumeUploadCard.jsx
       ↓
POST /api/resumes (Multer stores file in /uploads & creates Resume record)
       ↓
pdf-parse / mammoth extracts raw text into Resume.extractedText
       ↓
POST /api/resumes/structure (Invokes parseResumeText in ai.service.js)
       ↓
AI structures raw text into typed JSON (skills, experience, education, projects)
       ↓
Structured data saved in Resume.parsedData for analysis
```

## 7. Career Analysis Workflow

Analysis pairs deterministic computation with AI explanation:

```text
User submits target role & JD in CareerTargetForm.jsx
       ↓
POST /api/targets (Saves CareerTarget) & POST /api/targets/structure (Extracts requirements)
       ↓
User triggers POST /api/analysis/analyze
       ↓
calculateDeterministicScore (Matches candidate skills/keywords against JD requirements)
       ↓
generateAnalysisExplanation (AI generates contextual recommendations without altering score)
       ↓
Analysis record created with match score, skill breakdown, strengths, gaps, and advice
       ↓
Analysis.jsx renders summary cards, score gauges, breakdowns, and recommendations
```

## 8. Data Flow

```text
React Client (Pages / Components)
       ↓ (HTTP REST / JSON / FormData via Axios)
Express Routes & Auth Middleware
       ↓
Controllers
       ├──→ Deterministic Logic (analysis.service.js)
       ├──→ AI Gateway (ai.service.js → OpenRouter API)
       └──→ Database Layer (Mongoose Models → MongoDB)
       ↓
Standardized Response ({ success, data, message })
       ↓
React State Update & Visual Feedback (Toast / Recharts)
```

## 9. Environment Configuration

The backend relies on the following environment variables (configured in `server/.env`):

- `NODE_ENV`: Runtime mode (`development` or `production`).
- `PORT`: HTTP port for the Express server (default `5000`).
- `MONGO_URI`: MongoDB connection string.
- `CLIENT_URL`: Client origin for CORS authorization (default `http://localhost:5173`).
- `JWT_SECRET`: Secret key used for signing and verifying authentication tokens.
- `JWT_EXPIRES_IN`: Expiration duration for tokens (default `7d`).
- `OPENROUTER_API_KEY`: API authentication key for OpenRouter LLM requests.
- `OPENROUTER_MODEL`: Target model identifier for AI operations.
- `OPENROUTER_SITE_URL`: Optional application URL sent in OpenRouter request headers.
- `OPENROUTER_SITE_NAME`: Application display name for OpenRouter rankings.

*Note: Frontend environment variables use the `VITE_` prefix (e.g., `VITE_API_URL`).*

## 10. Error Handling

- **Backend**:
  - Operational errors are instantiated using `AppError` with explicit HTTP status codes.
  - Asynchronous controller errors are passed to Express `next(error)`.
  - Global `error.middlewares.js` catches uncaught errors and standardizes the response format `{ success: false, message, data: null }`.
- **Frontend**:
  - API calls utilize `try...catch` blocks.
  - User feedback is displayed via `react-hot-toast` notifications and contextual error state banners.

## 11. Current Architecture Notes

- **Hybrid Scoring**: Match scoring uses deterministic algorithms rather than non-deterministic LLM score guessing, ensuring reproducible scores while leveraging AI for explanations.
- **Session Security**: Authentication tokens are stored in secure HTTP-only cookies, eliminating local storage token theft risks.
- **Scoped Single Active Records**: Users maintain one active resume and career target at a time (`isActive: true`), simplifying comparative analysis.

## 12. Future Extension Points

- **Multi-Resume Management**: Supporting side-by-side comparison across multiple customized resumes per role.
- **Real-Time Voice Mock Interviews**: Integrating speech-to-text and audio streaming APIs for interactive verbal interview practice.
- **Cloud File Storage**: Migrating local file uploads (`/uploads`) to cloud object storage (e.g., AWS S3, Cloudinary).
- **Background Job Queues**: Offloading heavy AI analysis and parsing to worker queues (e.g., BullMQ with Redis) for enhanced concurrency.
