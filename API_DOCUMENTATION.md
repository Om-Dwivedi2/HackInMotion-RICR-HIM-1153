# CareerLens API Documentation

This document provides a comprehensive audit of all implemented backend APIs in the CareerLens application. It is based strictly on the existing `server/src/app.js` and corresponding route files as the source of truth.

## Overview
- **Base URL:** `/api`
- **Authentication:** Most routes are protected using the `protect` middleware, which verifies an HTTP-only JWT cookie (`careerlens_token`).
- **Global Constraints:** JSON request bodies are limited to `1mb`.

---

## 1. Health Module
*Controller: `health.controllers.js`*

### `GET /api/health/`
- **Description:** Checks the health status of the backend API.
- **Middleware:** None (Public)
- **Service/Model:** N/A

---

## 2. Auth Module
*Controller: `auth.controllers.js` | Service: `auth.services.js`*

### `POST /api/auth/register`
- **Description:** Registers a new user.
- **Middleware:** None (Public)
- **Request Body:** `{ name, email, password }`
- **Behavior:** Validates inputs (password must have >=8 chars, uppercase, lowercase, number). Sets `careerlens_token` cookie.

### `POST /api/auth/login`
- **Description:** Authenticates a user.
- **Middleware:** None (Public)
- **Request Body:** `{ email, password }`
- **Behavior:** Sets `careerlens_token` cookie.

### `POST /api/auth/logout`
- **Description:** Logs out a user.
- **Middleware:** None (Public)
- **Behavior:** Clears the `careerlens_token` cookie.

### `GET /api/auth/me`
- **Description:** Fetches the authenticated user's details.
- **Middleware:** `protect`
- **Behavior:** Returns safe user data (without password).

### `POST /api/auth/change-password`
- **Description:** Changes the authenticated user's password.
- **Middleware:** `protect`
- **Request Body:** `{ currentPassword, newPassword }`

---

## 3. User Module
*Controller: `user.controllers.js`*

### `PATCH /api/users/profile`
- **Description:** Updates the user's profile information.
- **Middleware:** `protect`
- **Request Body:** `{ name, phone }`
- **Behavior:** Updates user document in the database and returns the safe user object.

---

## 4. Resume Module
*Controller: `resume.controllers.js` | Service: `ai.service.js` (for structuring)*

### `POST /api/resumes/`
- **Description:** Uploads and parses a new resume.
- **Middleware:** `protect`, `upload.single('file')`
- **Behavior:** Deactivates previous active resumes for the user. Parses PDF/DOCX using `pdf-parse` or `mammoth`. Sets `isActive: true`.

### `POST /api/resumes/structure`
- **Description:** Uses AI to structure the raw text of the active resume.
- **Middleware:** `protect`
- **Behavior:** Fetches the active resume's `extractedText`, calls `parseResumeText` (AI service), and saves it to `parsedData`.

### `GET /api/resumes/`
- **Description:** Fetches all uploaded resumes for the user.
- **Middleware:** `protect`
- **Behavior:** Sorted by `createdAt: -1`.

### `GET /api/resumes/active`
- **Description:** Fetches the currently active resume.
- **Middleware:** `protect`

### `DELETE /api/resumes/:id`
- **Description:** Deletes a specific resume by ID.
- **Middleware:** `protect`
- **Behavior:** Also unlinks (deletes) the file from the local `uploads` directory.

---

## 5. Career Target Module
*Controller: `careerTarget.controllers.js` | Service: `ai.service.js` (for structuring)*

### `PUT /api/targets/`
- **Description:** Updates career target preferences.
- **Middleware:** `protect`
- **Request Body:** `{ role, company, jobDescriptionText }`
- **Behavior:** Deactivates previous active targets. Creates a new active target.

### `GET /api/targets/active`
- **Description:** Fetches the currently active career target.
- **Middleware:** `protect`

### `POST /api/targets/structure`
- **Description:** Uses AI to structure the raw job description.
- **Middleware:** `protect`
- **Behavior:** Fetches active target's `rawText`, calls `parseJobDescriptionText` (AI service), and saves to `extractedRequirements`.

---

## 6. Analysis Module
*Controller: `analysis.controllers.js` | Service: `analysis.service.js`, `ai.service.js`*

### `POST /api/analysis/analyze`
- **Description:** Analyzes the active resume against the active career target.
- **Middleware:** `protect`
- **Behavior:** 
  1. Ensures active resume has `parsedData`.
  2. Ensures active target has `extractedRequirements`.
  3. Calculates deterministic score via `calculateDeterministicScore`.
  4. Calls AI for recommendations via `generateAnalysisExplanation`.
  5. Saves the analysis to the database (`status: "completed"`).

### `GET /api/analysis/latest`
- **Description:** Fetches the user's most recent analysis.
- **Middleware:** `protect`
- **Behavior:** Populates `resumeId` and `careerTargetId`.

---

## 7. Interview Module
*Controller: `interview.controllers.js` | Service: `ai.service.js`*

### `POST /api/interviews/generate`
- **Description:** Generates mock interview questions based on the active resume and target.
- **Middleware:** `protect`
- **Behavior:** Calls `generateInterviewQuestions` (AI service) using resume's `parsedData` and target's `role`/`company`. Saves a new Interview document (`status: "active"`).

### `POST /api/interviews/submit`
- **Description:** Submits interview answers for grading.
- **Middleware:** `protect`
- **Request Body:** `{ interviewId, answers }` (answers is an array)
- **Behavior:** Formats questions and answers, calls `gradeInterview` (AI service) for feedback, updates interview to `status: "completed"`, and saves to database.

---

## 8. History Module
*Controller: `history.controllers.js`*

### `GET /api/history/`
- **Description:** Fetches the user's activity history (analyses and interviews).
- **Middleware:** `protect`
- **Query Params:** `type` ('all', 'resume-analysis', 'mock-interview'), `limit` (default: 50), `page` (default: 1)
- **Behavior:** Aggregates and paginates completed `Analysis` and `Interview` documents, sorting by descending timestamp. Returns a unified `activities` array.

---

## Identified Issues & Inconsistencies (No Code Modifications Made)
- **File System Cleanup:** Deleting a resume unlinks the file from `process.cwd()/uploads`, but upload uses `../uploads` in `app.js` and `uploads/resumes` in multer. This could potentially cause missing file errors or leave orphaned files.
- **AI Service Fallbacks:** In `/api/analysis/analyze`, if `generateAnalysisExplanation` fails, it catches the error and proceeds with deterministic results, logging a warning. However, if AI structuring fails in `/api/resumes/structure` or `/api/targets/structure`, it throws an error (handled by `next(error)`).
- **Error Handling of Dependencies:** The `pdf-parse` or `mammoth` parsing catches errors and returns a 400 immediately, bypassing `next(error)` global error handler.
- **Unimplemented Planned APIs:** No APIs exist for modifying or deleting individual analyses/interviews, only fetching them. No webhook endpoints exist for external services.
