# 🚀 CareerLens — AI-Powered Career Intelligence & Mock Interview Platform

[![Live Demo](https://img.shields.io/badge/Live%20Demo-Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)](https://hack-in-motion-ricr-him-1153.vercel.app/)
[![Backend API](https://img.shields.io/badge/Backend%20API-Render-46E3B7?style=for-the-badge&logo=render&logoColor=white)](https://hackinmotion-ricr-him-1153.onrender.com/api/health)
[![React](https://img.shields.io/badge/React%2019-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
[![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white)](https://www.mongodb.com/)

**CareerLens** is an all-in-one AI career preparation platform designed to help job seekers evaluate resumes against target roles, identify critical skill gaps, practice dynamic AI-driven mock interviews, and track performance progression with interactive analytics.

---

## 🌐 Live Application & Demo Credentials

| Resource | Link / Credential |
| :--- | :--- |
| **Frontend URL (Vercel)** | [https://hack-in-motion-ricr-him-1153.vercel.app/](https://hack-in-motion-ricr-him-1153.vercel.app/) |
| **Backend API URL (Render)** | [https://hackinmotion-ricr-him-1153.onrender.com/api](https://hackinmotion-ricr-him-1153.onrender.com/api) |
| **Demo User Email** | `dwivediom2005@gmail.com` |
| **Demo User Password** | `1234@Qwer` |

---

## ✨ Key Features

- 📄 **Resume Intelligence & Parsing**: Upload resumes (PDF/DOCX) to extract skills, experience levels, and qualifications.
- 🎯 **Career Target Alignment**: Set custom target roles, seniority expectations, and industries to calibrate matching metrics.
- 📊 **Deep Job Match & Gap Analysis**: Instant percentage compatibility score, breakdown of strengths, missing keywords, and actionable recommendations.
- 🎙️ **AI Mock Interview Simulator**: Dynamic, real-time question generation tailored to candidate skills and target roles with comprehensive evaluation.
- 📈 **Performance Dashboard & Analytics**: Interactive charts powered by Recharts showing score history, skill gap reduction, and interview milestones.
- 📜 **Session History**: Detailed audit trail of past resume uploads, analysis runs, and interview feedback.
- ⚙️ **User Settings & Profile**: Profile customization, preference adjustments, and security management.
- 🔐 **Secure Authentication**: Robust JWT cookie-based session handling, password hashing with Bcrypt, and protected API routes.

---

## 🛠️ Tech Stack

### Frontend
- **Framework**: React 19 (Vite)
- **Styling**: Tailwind CSS (v4)
- **Routing**: React Router DOM (v7)
- **Data Visualization**: Recharts
- **Icons & UI**: React Icons (`react-icons/fi`, `react-icons/fa`), React Dropzone
- **Notifications**: React Hot Toast
- **HTTP Client**: Axios with interceptors & credential handling

### Backend
- **Runtime**: Node.js
- **Server Framework**: Express 5
- **Database**: MongoDB Atlas with Mongoose ODM
- **Security & Auth**: JSON Web Tokens (`jsonwebtoken`), `bcrypt`, `cookie-parser`, `cors`
- **File Handling**: `multer`
- **Logging**: `morgan`
- **AI Integrations**: OpenRouter / Anthropic / OpenAI API

---

## 📁 Repository Structure

```text
HackInMotion-RICR-HIM-1153/
├── client/                     # Frontend Application (React + Vite + Tailwind)
│   ├── public/                 # Static assets
│   ├── src/
│   │   ├── api/                # Axios instance configuration & base API setup
│   │   ├── components/         # Reusable UI components
│   │   │   ├── auth/           # Login / Register forms & modal controls
│   │   │   ├── contact/        # Contact forms
│   │   │   ├── dashboard/      # Overview, Sidebar, Header, StatCards, Charts
│   │   │   └── settings/       # Profile, Preferences, Password modals
│   │   ├── context/            # AuthContext & global state providers
│   │   ├── pages/              # Application views (Dashboard, Resume, Analysis, etc.)
│   │   ├── App.jsx             # Main routing and layout configuration
│   │   ├── main.jsx            # React root mount point
│   │   └── index.css           # Global Tailwind CSS styling
│   ├── .env.example            # Sample client environment file
│   ├── package.json            # Frontend dependencies and scripts
│   └── vite.config.js          # Vite bundler configuration
│
├── server/                     # Backend Application (Node.js + Express + MongoDB)
│   ├── src/                    # Source code (routes, controllers, models, middlewares)
│   │   ├── config/             # Database connection & env variables
│   │   ├── middlewares/        # Auth verification, file upload, error handling
│   │   ├── routes/             # Express API endpoints
│   │   └── app.js              # Express app setup with CORS and middlewares
│   ├── .env.example            # Sample server environment file
│   ├── index.js                # Server entry point & graceful shutdown
│   └── package.json            # Backend dependencies and scripts
│
└── README.md                   # Project documentation
```

---

## ⚡ Local Development Setup

### 1. Prerequisites
- **Node.js** >= 18.x
- **npm** >= 9.x
- **MongoDB Atlas** connection string or local MongoDB instance

---

### 2. Clone the Repository
```bash
git clone https://github.com/Om-Dwivedi2/HackInMotion-RICR-HIM-1153.git
cd HackInMotion-RICR-HIM-1153
```

---

### 3. Backend Setup

```bash
cd server
npm install
```

Create a `.env` file in the `server/` directory:
```env
PORT=5000
NODE_ENV=development
MONGO_URI=your_mongodb_connection_string
CLIENT_URL=http://localhost:5173
JWT_SECRET=your_jwt_secret_key
JWT_EXPIRES_IN=7d
OPENROUTER_API_KEY=your_openrouter_api_key
OPENROUTER_MODEL=openai/gpt-4o-mini
```

Start the backend server:
```bash
npm start # or node index.js
```

---

### 4. Frontend Setup

In a new terminal window:
```bash
cd client
npm install
```

Create a `.env` file in the `client/` directory:
```env
VITE_API_URL=http://localhost:5000/api
```

Start the Vite development server:
```bash
npm run dev
```

Open your browser and navigate to `http://localhost:5173`.

---

## 📡 API Reference Overview

All backend endpoints are prefixed with `/api`:

| Method | Endpoint | Description | Auth Required |
| :--- | :--- | :--- | :---: |
| `GET` | `/api/health` | Service health status & DB connectivity | ❌ |
| `POST` | `/api/auth/register` | Register a new user | ❌ |
| `POST` | `/api/auth/login` | Login user & issue JWT cookie | ❌ |
| `POST` | `/api/auth/logout` | Clear auth session | ❌ |
| `GET` | `/api/auth/me` | Fetch authenticated user details | ✅ |
| `GET` | `/api/users/profile` | Get candidate profile & preferences | ✅ |
| `PUT` | `/api/users/profile` | Update profile information | ✅ |
| `POST` | `/api/resumes/upload` | Upload and parse resume file | ✅ |
| `GET` | `/api/resumes` | Get candidate resume history | ✅ |
| `POST` | `/api/targets` | Set or update career target roles | ✅ |
| `POST` | `/api/analysis` | Trigger AI gap & JD match analysis | ✅ |
| `GET` | `/api/analysis` | Fetch analysis reports | ✅ |
| `POST` | `/api/interviews/generate` | Generate AI mock interview questions | ✅ |
| `POST` | `/api/interviews/submit` | Submit interview answers for AI scoring | ✅ |
| `GET` | `/api/history` | Retrieve full timeline and activity logs | ✅ |
| `POST` | `/api/contact` | Submit user feedback or support inquiries | ❌ |

---

## 🚢 Deployment Architecture

- **Frontend**: Hosted on [Vercel](https://hack-in-motion-ricr-him-1153.vercel.app/) with automated continuous deployment.
- **Backend**: Hosted on [Render](https://hackinmotion-ricr-him-1153.onrender.com) (Node.js Web Service).
- **Database**: [MongoDB Atlas](https://www.mongodb.com/atlas) cloud cluster.

---

## 👨‍💻 Author & Acknowledgements

Developed for **HackInMotion** (RICR-HIM-1153).
- **GitHub**: [@Om-Dwivedi2](https://github.com/Om-Dwivedi2)
