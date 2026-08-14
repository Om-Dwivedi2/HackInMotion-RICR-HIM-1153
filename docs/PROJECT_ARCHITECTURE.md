# CareerLens — Project Architecture

## 1. Overview

CareerLens is a full-stack career-readiness web application designed to help job seekers evaluate and optimize their resumes against targeted job descriptions. Its primary purpose is to provide users with a clear understanding of their resume's strengths and weaknesses through a combination of deterministic scoring and AI-powered feedback. 

Major system responsibilities include:
- Parsing resumes from uploaded PDF and DOCX files.
- Managing user profiles, active resumes, and active career targets.
- Analyzing resumes against job descriptions to produce actionable insights and match scores.
- Generating and grading simulated mock interviews based on the user's profile and targeted role.

The application uses a decoupled architecture where the React-based frontend communicates with a Node.js/Express backend via a REST API. The backend orchestrates interactions with a MongoDB database for persistence and interfaces with an external AI service (via OpenRouter) to extract structured data and generate generative insights.

## 2. Architecture Overview

CareerLens follows a traditional client-server architecture with a distinct separation of concerns between the presentation layer (Frontend), business logic layer (Backend), persistence layer (Database), and external intelligence layer (AI Service).

```mermaid
flowchart TD
    User([User]) --> Frontend
    
    subgraph Client [Frontend (React + Vite)]
        Router[React Router]
        Pages[UI Pages & Components]
        AuthContext[Auth Context]
        Axios[API Client / Axios]
        
        Router --> Pages
        Pages --> AuthContext
        Pages --> Axios
    end
    
    subgraph Server [Backend (Node + Express)]
        App[Express App]
        Middlewares[Auth & Error Middlewares]
        Routes[API Routes]
        Controllers[Controllers]
        Services[Business & AI Services]
        
        App --> Middlewares
        Middlewares --> Routes
        Routes --> Controllers
        Controllers --> Services
    end
    
    subgraph Data [Persistence]
        MongoDB[(MongoDB)]
        LocalFileSystem[Local File System /uploads]
    end
    
    subgraph External [External Services]
        AIService[OpenRouter AI API]
    end
    
    Frontend <--> |REST HTTP/JSON| Server
    Axios --> App
    
    Services <--> |Mongoose ODM| MongoDB
    Services <--> |REST API| AIService
    Controllers --> LocalFileSystem
```

## 3. Frontend Architecture

The frontend is a Single Page Application (SPA) built with **React 19**, bundled by **Vite**, and styled with **Tailwind CSS**.

- **Routing:** Handled by `react-router-dom` (v7). Routes are split between public endpoints (`/login`, `/register`, `/contact`) and protected dashboard endpoints (`/dashboard/*`) wrapped in a `ProtectedRoute` component.
- **State Management:** Core session and user state are managed globally via a React Context (`AuthContext`). Other UI states (loading, forms) are managed locally within components.
- **API Communication:** An `axios` instance (`src/api/axios.js`) is configured with `withCredentials: true` to automatically pass HTTP-only cookies to the backend.
- **Component Hierarchy:**
  - `src/pages/`: Contains the main view components (e.g., `Home`, `Dashboard`, `Resume`, `Analysis`, `MockInterview`).
  - `src/components/`: Contains reusable UI building blocks grouped by feature (e.g., `auth/`, `dashboard/`).
- **Styling:** Vanilla CSS (`index.css`) paired heavily with Tailwind CSS utility classes.

## 4. Backend Architecture

The backend is a RESTful API built on **Node.js** and **Express 5**, using **Mongoose** for data modeling.

- **Entry Point:** The application initializes via `src/app.js` where global middlewares (CORS, Cookie Parser, JSON Parser, Error Handlers) and route modules are mounted.
- **Routing Layer (`src/routes/`):** Endpoint definitions are grouped logically (e.g., `auth`, `resume`, `analysis`, `targets`, `interviews`, `history`).
- **Controller Layer (`src/controllers/`):** Handles incoming HTTP requests, orchestrates business logic by calling services, and formats standard JSON responses.
- **Service Layer (`src/services/`):**
  - **`ai.service.js`:** An AI Gateway that interfaces with the OpenRouter API. It handles structuring parsed resume/job text and generating analysis recommendations and interview questions.
  - **`analysis.service.js`:** Contains deterministic algorithms for keyword matching and score calculation (avoiding non-deterministic AI score hallucination).
  - **`auth.services.js`:** Handles password hashing and user credential verification.
- **Persistence (`src/modules/` or models):** Mongoose schemas define the shape of `User`, `Resume`, `CareerTarget`, `Analysis`, and `Interview` collections.
- **File Storage:** Uploaded resumes (PDF/DOCX) are temporarily saved to a local `uploads/` directory using `multer` before being parsed by `pdf-parse` or `mammoth`.

## 5. Data Flow: Career Analysis

A core feature of the system is the Resume-to-Job analysis workflow.

1. **Upload & Parse:** User uploads a resume. The backend saves the file locally and extracts raw text.
2. **Structure:** The backend sends the raw text to the `ai.service.js` to return a structured JSON representation of the user's experience and skills.
3. **Target Setting:** User inputs a target role and Job Description. The backend extracts required skills/keywords via the AI service.
4. **Analysis:** When triggered, the `analysis.controllers.js`:
   - Calculates a deterministic match score by comparing structured resume data against structured job requirements (`analysis.service.js`).
   - Requests qualitative feedback and recommendations from the AI (`ai.service.js`).
   - Aggregates the score and qualitative feedback into an `Analysis` record and saves it to MongoDB.
5. **Presentation:** The frontend fetches the analysis record and renders the score gauge, skill gaps, and recommendations.

## 6. Authentication and Security

- **Mechanism:** JWT (JSON Web Tokens) paired with HTTP-only cookies.
- **Flow:**
  1. User authenticates via `/api/auth/login`.
  2. The server signs a JWT and attaches it to the response as an HTTP-only cookie (`careerlens_token`).
  3. Subsequent requests from the frontend automatically include this cookie.
  4. The `protect` middleware on the server validates the JWT signature and attaches the verified user to the request object (`req.user`) before allowing access to protected routes.
- **Configuration:** Environment variables (`server/.env`) dictate the `JWT_SECRET`, client origin for CORS, and MongoDB URI.
