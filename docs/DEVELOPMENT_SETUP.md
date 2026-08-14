# CareerLens — Development & Local Setup Guide

Welcome to the CareerLens project! This guide will walk you through the process of setting up the repository for local development. 

The project is structured as a full-stack application with a separated frontend (React/Vite) and backend (Node.js/Express). You will need to run both environments concurrently in separate terminal windows.

## 1. Prerequisites

Before you begin, ensure you have the following installed on your machine:
- **Node.js**: (Version compatible with Vite and Express 5)
- **npm**: Node package manager
- **MongoDB**: Either a local MongoDB instance running on your machine, or a MongoDB Atlas cluster URI.
- **Git**: For version control

## 2. Repository Cloning

Clone the repository to your local machine and navigate into the project root:

```bash
git clone https://github.com/Om-Dwivedi2/HackInMotion-RICR-HIM-1153.git
cd HackInMotion-RICR-HIM-1153
```

## 3. Project Directory Structure

The repository is structured as a decoupled monorepo:

```text
HackInMotion-RICR-HIM-1153/
├── client/          # Frontend application (React + Vite + Tailwind)
├── server/          # Backend REST API (Express + Mongoose)
├── docs/            # Engineering & architecture documentation
└── README.md        # High-level project overview
```

## 4. Backend Setup

The backend manages the API, database connection, AI service interactions, and authentication.

Open a new terminal window and navigate to the backend directory:

```bash
cd server
npm install
```

## 5. Environment Configuration

The backend requires several environment variables to function properly. Since there is no `.env.example` provided by default, you must manually create a `.env` file in the `server/` directory:

```bash
# Ensure you are inside the server directory
touch .env
```

Add the following variables to your `server/.env` file. Do not wrap values in quotes unless necessary.

### Required Variables
These variables must be present for the server to boot successfully:
- `NODE_ENV`: Set to `development` for local testing.
- `PORT`: The port the backend server will listen on (e.g., `5000`).
- `MONGO_URI`: Your MongoDB connection string (e.g., `mongodb://127.0.0.1:27017/careerlens`).
- `CLIENT_URL`: The origin URL of your frontend application (e.g., `http://localhost:5173`) to configure CORS.
- `JWT_SECRET`: A secure string used to sign authentication cookies (e.g., `YOUR_SECRET_KEY_HERE`).

### AI Integration Variables
These variables are required for the AI parsing and mock interview features to work:
- `OPENROUTER_API_KEY`: Your OpenRouter API key to interface with LLMs. *(Note: You may see references to `ANTHROPIC_API_KEY` in older local environments, but the system configuration `env.config.js` looks for `OPENROUTER_API_KEY`)*.

### Optional Variables
- `JWT_EXPIRES_IN`: Duration until the authentication token expires (defaults to `7d` if omitted).
- `OPENROUTER_MODEL`: Specific model ID to use (defaults to `openai/gpt-4o-mini` if omitted).
- `OPENROUTER_SITE_URL`: Optional application URL sent to OpenRouter.
- `OPENROUTER_SITE_NAME`: Optional application display name sent to OpenRouter (defaults to `CareerLens`).

## 6. Frontend Setup

The frontend manages the user interface and client-side logic.

Open a second terminal window (keep your backend terminal available) and navigate to the client directory:

```bash
cd client
npm install
```

*(Note: The frontend does not currently require a local `.env` file for basic development, as the backend API URL is configured directly in the Axios client (`/api`).)*

## 7. Starting the Backend

In your first terminal window (inside the `server/` directory), start the backend development server using nodemon:

```bash
npm run dev
```

Alternatively, you can start the server without auto-reloading:
```bash
npm start
```

## 8. Starting the Frontend

In your second terminal window (inside the `client/` directory), start the Vite development server:

```bash
npm run dev
```

## 9. Verifying the Application is Running

Once both servers are running successfully:
1. **Frontend:** Open your browser and navigate to the Vite local URL, typically `http://localhost:5173`.
2. **Backend Health Check:** You can verify the backend is active by visiting `http://localhost:5000/api/health` in your browser (assuming you set `PORT=5000`).

## 10. Basic Development Workflow

- **Frontend Changes:** Modifying files in `client/src/` will trigger Vite's Fast Refresh, instantly updating the browser.
- **Backend Changes:** Modifying files in `server/src/` will trigger `nodemon` to automatically restart the backend API.
- **Database:** Ensure your MongoDB instance remains running while you develop.

## 11. Common Setup Problems

- **Missing Environment Variables:** If the backend immediately crashes on startup with `[Env Error] Missing required environment variable: ...`, ensure you have correctly created `server/.env` and included all variables listed in the Required section above.
- **CORS Errors:** If the frontend cannot communicate with the backend, verify that `CLIENT_URL` in `server/.env` exactly matches the URL your frontend is running on (e.g., no trailing slash).
- **AI Features Failing:** If resume structuring or mock interviews fail silently or throw API errors, verify your `OPENROUTER_API_KEY` is valid and has sufficient credits.
- **File Upload Issues:** The backend expects an `uploads/` directory to store parsed resumes temporarily. If uploads fail, verify folder write permissions.
