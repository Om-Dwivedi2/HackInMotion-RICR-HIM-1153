# Implementation Plan - CareerLens Homepage

This plan details the implementation of the CareerLens homepage based on the existing React codebase, your design variables, the provided visual guidance, and the content specification.

## User Review Required

> [!IMPORTANT]
> - We will integrate the design system variables directly in `client/src/index.css` under Tailwind CSS v4 `@theme` and `:root`. This allows using custom Tailwind styles (e.g. `bg-primary`, `text-text-primary`, `rounded-sm`, etc.) while ensuring CSS custom properties remain available.
> - We will add a Google Fonts stylesheet link to `client/index.html` for "Inter" to satisfy `--font-main`.
> - All homepage components will be cleanly separated into modular components under `client/src/components/home/`.
> - Routing will be configured in `client/src/App.jsx` using `react-router-dom` to support:
>   - `/` -> `Home`
>   - `/login` -> `Login`
>   - `/register` -> `Register`
>   - `/dashboard` -> `Dashboard`

## Proposed Changes

---

### Global Configurations

#### [MODIFY] [index.css](file:///c:/HackInMotion-RICR-HIM-1153-main/client/src/index.css)
- Insert the requested `:root` variables.
- Extend/override the Tailwind v4 `@theme` block referencing these variables.
- Add baseline HTML/body configurations:
  - Font family set to `--font-main`.
  - Body background set to `--color-background-main` (`#fbfcfd`).
  - Text color set to `--color-text-primary` (`#0f172a`).

#### [MODIFY] [index.html](file:///c:/HackInMotion-RICR-HIM-1153-main/client/index.html)
- Add `<link>` elements to load the Google Font `Inter`.
- Update the application title to "CareerLens - AI-Powered Career Readiness".

---

### Components & Routing Setup

#### [MODIFY] [App.jsx](file:///c:/HackInMotion-RICR-HIM-1153-main/client/src/App.jsx)
- Import `BrowserRouter`, `Routes`, and `Route` from `react-router-dom`.
- Set up standard routes mapping to:
  - `/` -> `Home` (renders `Navbar`, `Home`, `Footer`)
  - `/login` -> `Login`
  - `/register` -> `Register`
  - `/dashboard` -> `Dashboard`

#### [MODIFY] [Navbar.jsx](file:///c:/HackInMotion-RICR-HIM-1153-main/client/src/components/Navbar.jsx)
- Implement navigation header matching the reference image layout:
  - CareerLens Logo with a magnifying glass search icon.
  - Links: `Home`, `How It Works`, `Features`, `About`.
  - Action buttons: `Sign In` (primary outline/text button linking to `/login`), `Get Started` (blue button linking to `/register`).
  - Fully responsive mobile drawer.

#### [MODIFY] [Footer.jsx](file:///c:/HackInMotion-RICR-HIM-1153-main/client/src/components/Footer.jsx)
- Implement matching footer layout containing:
  - Logo and description: "AI-powered career preparation for your next opportunity."
  - Product links: Resume Analyzer, Skill Gap Analysis, Mock Interview, Progress Tracking.
  - Company links: About, Contact.
  - Newsletter subscription form ("Stay Updated").
  - Copyright and social icons (LinkedIn, Twitter, GitHub).

---

### Homepage Component Architecture

All components will be created under `client/src/components/home/`:

#### [NEW] [Hero.jsx](file:///c:/HackInMotion-RICR-HIM-1153-main/client/src/components/home/Hero.jsx)
- Left Column: Eyebrow (`AI-Powered Career Readiness`), title, description, buttons (`Analyze My Resume` linking to `/dashboard` or `/login`, `Try Mock Interview` linking to `/dashboard` or `/login`), and sub-flow checklist ("Upload your resume • Add a job description • Get personalized insights").
- Right Column: Interactive HTML/React dashboard preview showing:
  - Career Readiness, Match Rate (82%), Match breakdown list with custom icons and badges (Strong, Needs Improvement, Missing).
  - Recommended Next Step banner with a start interview action button.

#### [NEW] [ValueStrip.jsx](file:///c:/HackInMotion-RICR-HIM-1153-main/client/src/components/home/ValueStrip.jsx)
- Render the 4 key values (Resume Analysis, Skill Gap Insights, AI Mock Interviews, Progress Tracking) as compact cards side-by-side (flex/grid) with icons and text description.

#### [NEW] [CareerJourney.jsx](file:///c:/HackInMotion-RICR-HIM-1153-main/client/src/components/home/CareerJourney.jsx)
- Section header "From Resume to Interview-Ready" and subtitle.
- Horizontal step flow on desktop with dotted line connectors, wrapping into vertical lists on mobile/tablet (01 Upload, 02 Analyze, 03 Improve, 04 Practice, 05 Get Ready) using custom illustrations/icons for each.

#### [NEW] [ResumeAnalyzer.jsx](file:///c:/HackInMotion-RICR-HIM-1153-main/client/src/components/home/ResumeAnalyzer.jsx)
- Two column layout:
  - Left column: Section details + 4 feature cards (Match Score, Skill & Keyword Gaps, Actionable Feedback, Resume Strengths) with rounded borders, light shadows.
  - Right column: HTML/React dashboard preview demonstrating "Frontend Developer - 82% Match" with breakdowns (Skills, Keywords, Experience, Education) and list of Top Strengths/Top Gaps.

#### [NEW] [SkillGap.jsx](file:///c:/HackInMotion-RICR-HIM-1153-main/client/src/components/home/SkillGap.jsx)
- Header: "Know What's Holding You Back" and subtitle.
- Centered HTML dashboard layout showing:
  - TARGET ROLE: Full Stack Developer (Skill Match 82%).
  - Three distinct cards side-by-side: "Strong Skills" (Green), "Needs Improvement" (Orange), and "Missing" (Red).
- Footer text: "CareerLens doesn't just tell you that you're missing something..."

#### [NEW] [MockInterview.jsx](file:///c:/HackInMotion-RICR-HIM-1153-main/client/src/components/home/MockInterview.jsx)
- Header: "Practice Before the Real Interview" and subtitle.
- Three column chat interface preview:
  - Column 1: AI Interviewer block with sound wave illustration and sample question.
  - Column 2: User's typed response with a character counter / stop answering button.
  - Column 3: AI Feedback scorecard with visual meter bars (Relevance, Clarity, Completeness) and bullet critiques.
- Button: "Practice an Interview →".

#### [NEW] [ProgressSection.jsx](file:///c:/HackInMotion-RICR-HIM-1153-main/client/src/components/home/ProgressSection.jsx)
- Header: "See Yourself Getting Better" and subtitle.
- Left Panel: Metrics cards showing Resume Match change (72% -> 82%), Interview Score change (68% -> 81%), Skills Improved (4), and Sessions Completed (6).
- Right Panel: A mockup trend chart showing Career Readiness Over Time (64%, 71%, 79%, 88%). (We will use recharts if possible, or construct a beautiful SVG line chart matching the reference image layout).

#### [NEW] [WhyCareerLens.jsx](file:///c:/HackInMotion-RICR-HIM-1153-main/client/src/components/home/WhyCareerLens.jsx)
- Comparison section:
  - Traditional Approach (Red card with lists).
  - CareerLens (Green card with lists).
  - Side text content block + CTA button "Start Your Journey →".

#### [NEW] [FinalCTA.jsx](file:///c:/HackInMotion-RICR-HIM-1153-main/client/src/components/home/FinalCTA.jsx)
- Background gradient block with title, description, and primary CTA buttons ("Start Your Career Analysis" and "Explore CareerLens").

#### [MODIFY] [Home.jsx](file:///c:/HackInMotion-RICR-HIM-1153-main/client/src/pages/Home.jsx)
- Update to import all the custom sub-components above and assemble them in sequence.

---

## Verification Plan

### Automated Verification
- Run `npm run build` in `client` directory to check compilation.
- Ensure ESLint checks pass.

### Manual Verification
- Launch the application (`npm run dev`) and test styling, responsiveness, and page routing.
