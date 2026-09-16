# toeflqc

## project 
toeflqc/
├── .github/
│   └── workflows/
│       ├── ci-pipeline.yml             # [Pillar 7] CI checks
│       └── production-deploy.yml       # [Pillar 7] Firebase deployment
│
├── firebase-config/                    # [Pillar 5 & 8] Security rules
│   ├── firestore.rules
│   ├── firestore.indexes.json
│   ├── storage.rules
│   └── firebase.json
│
├── backend-functions/                  # [Pillar 6] Cloud Compute Engine
│   ├── src/
│   │   ├── middleware/
│   │   │   ├── authGuard.ts
│   │   │   ├── entitlementGuard.ts     # Monthly 4-day trial & paywall validator
│   │   │   └── rateLimiter.ts
│   │   ├── controllers/
│   │   │   ├── submissionController.ts
│   │   │   ├── developerController.ts
│   │   │   └── cloudflareController.ts
│   │   ├── services/
│   │   │   ├── geminiService.ts
│   │   │   ├── recommendationService.ts
│   │   │   └── cloudflareR2Service.ts
│   │   ├── utils/
│   │   │   └── logger.ts
│   │   └── index.ts
│   ├── package.json
│   └── tsconfig.json
│
├── web-client/                         # [Pillar 1] React 18 + Vite SPA
│   ├── public/
│   └── src/
│       ├── assets/
|       |
|       ├── config/
│       │   └── firebase.ts             # Firebase Auth & Firestore client initializers
|       |
|       ├── types/
│       │   ├── user.ts                 # UserProfile & TrialState contracts
│       │   └── test.ts                 # Problem set & Question models
|       |
│       ├── styles/
│       │   ├── globals.css
│       │   └── HeaderProgress.css
│       │
│       ├── components/
|       |   ├── auth/                   # 🔒 AUTHENTICATION COMPONENTS
│       │   │   ├── AuthModal.tsx       # Container modal with Login / Register tabs
│       │   │   ├── LoginForm.tsx       # Email/Pass form + Google OAuth trigger
│       │   │   ├── RegisterForm.tsx    # Email/Pass registration + Google OAuth trigger
│       │   │   └── SocialAuthButtons.tsx # Reusable Google OAuth button
|       |   |
│       │   ├── common/
|       |   |   ├── navigation/

│       │   │   ├── SidebarNav.tsx              # Left navigation sidebar (Dashboard, Mock, Practice, Admin)
|       |   |   ├── TopHeader.tsx               # 🌟 DYNAMIC TOP HEADER (Renders Auth vs Guest state)
|       |   |   ├── CollapsedSidebar.tsx        # Icon-only compact left navigation bar
│       │   │   ├── SearchBar.tsx               # Top search input inside sidebar
│       │   │   ├── UserProfileFooter.tsx       # Bottom user avatar ("Culaccino_ / Trial")
│       │   │   ├── ProtectedRoute.tsx          # Role guard for Developer Admin links
│       │   │   ├── PaywallModal.tsx            # Paywall overlay triggered when clicking locked days
|       │   │   └── ErrorBoundary.tsx
│       │   │
│       │   ├── dashboard/                      # 📊 DASHBOARD SPECIFIC COMPONENTS
│       │   │   │   ├── StudyProgressCard.tsx       # Estimated Score (000) vs Target Score (--) & Test Counts
│       │   │   │   ├── DailyGoalCard.tsx           # Mon–Sun completion tracker (1/3 goal)
│       │   │   │   ├── ScoreCefrBadge.tsx          # 583 / B2 score badge card
│       │   │   │   └── BannerPromosi.tsx           # Top right promotional card banner
│       │   │   │   
│       │   │   └── calendar/                   # 🗓️ CALENDAR GRID SYSTEM
│       │   │       ├── Calendar.tsx             # Parent shell container
│       │   │       ├── Calendar.module.css      # Isolated styles
│       │   │       ├── CalendarHeader.tsx       # Month navigation & title
│       │   │       ├── AgendaPanel.tsx          # Left sidebar (upcoming agenda & progress)
│       │   │       ├── DailyCalendar.tsx        # Main grid section
│       │   │       ├── MonthPickerPopover.tsx   # Date picker popover
│       │   │       ├── DayCell.tsx              # Individual calendar grid day
|       |   |       └── types.ts                 # Type definitions for calendar tasks & user schedule
│       │   │
|       │   ├── progress/                   # 📊 MY PROGRESS ANALYTICS COMPONENTS
|       │   │   ├── OverallProgressCard.tsx      # Top summary bar (Goal, Projection, Days Left)
|       │   │   ├── WhereYouStandCard.tsx        # 🌟 SHARED DIAGNOSTIC CARD (Radar chart + "Where points went" tags)
|       │   │   ├── RecentTestComparison.tsx     # Mock vs Practice score comparison cards
|       │   │   ├── RecommendedStudyPlanCard.tsx # Daily AI study plan tasks with [Start Now] CTA
|       │   │   ├── ScoreTrajectoryCard.tsx      # Score trend chart (Oct 1–Oct 15) & history log
|       │   │   └── SkillAccuracyMatrix.tsx      # Multi-module sub-skill drill down grid
│       │   │
│       │   ├── conversion/
│       │   │   ├── JourneyCompleteModal.tsx
│       │   │   └── LockedRoadmapTeaser.tsx  # Blurred 4-week roadmap 🔒
│       │   │
│       │   ├── testing/                # 🎯 MODULAR TEST TAKING ENGINE
|       |   |   ├── modals/                         # 🎛️ PRE-TEST CONFIGURATION MODALS
|       │   │   |   ├── PracticeConfigModal.tsx     # 🌟 Pre-practice setup modal (Mode & Time limit picker)
|       |   |   |   └── AnswerKeyModal.tsx           # 🔑 Raw answer key modal (No user history)
|       |   |   |
|       |   |   ├── detail/                     # 📄 NEW: DAY 1 MOCK TEST DETAIL COMPONENTS
|       │   │   │   ├── BackToCalendarHeader.tsx    # "‹ Back to calendar" link header
|       |   │   │   ├── MockTestHeroBanner.tsx      # Day 1 Teal hero banner ("Complete Mock Test")
|       |   │   │   ├── MockSectionCard.tsx         # Day 1 Full section cards (Listening, Structure, Reading)
|       |   │   │   ├── AiRecommendedBanner.tsx     # Days 2–4 Blue AI study plan hero banner (62% ➔ 75%)
|       |   │   │   ├── SkillGapAccordion.tsx       # Accordion trigger ("Your listening skills is behind 18%... Why?")
|       |   │   │   ├── PracticeSetCard.tsx         # Days 2–4 20-Q practice set cards + Triggers `PracticeConfigModal`
|       |   │   │   └── ScoreDonutBadge.tsx         # Circular score chart (500/680)
|       |   |   |
│       │   │   ├── header/             # 🧩 HEADER & NAVIGATION SYSTEM
│       │   │   │   ├── UnifiedTestHeader.tsx  # Shared top bar container
│       │   │   │   ├── ExamProgressBar.tsx    # Linear completion bar
│       │   │   │   ├── ReadingHeaderNav.tsx   # Header-embedded question grid
│       │   │   │   └── SlideNavDrawer.tsx     # Slide-out drawer for Listening/Structure/Writing
│       │   │   │
│       │   │   ├── modules/            # 🧩 MODULE CANVASES
│       │   │   │   ├── ListeningCanvas.tsx# Single-pane + R2 Audio Player
│       │   │   │   ├── StructureCanvas.tsx# Single-pane + Grammar options
│       │   │   │   ├── WritingCanvas.tsx  # Single-pane + Essay area
│       │   │   │   ├── ReadingCanvas.tsx  # Split-screen (Passage + Question)
|       |   |   |   |
|       |   |   |   └── feedback/                   # ⚡ INSTANT FEEDBACK COMPONENTS (PRACTICE MODE)
│       |   |   |       ├── InteractiveQuestionCard.tsx # Changes color to green/red on answer click
|       |   │   |       └── PracticeFooterNav.tsx   # [Back] and [Next Question >] action bar
│       │   │   │
│       │   │   ├── TimedTestContainer.tsx  # Master exam harness & timer lockstep
│       │   │   └── PracticeContainer.tsx # Self-paced practice harness
│       │   │
│       │   ├── review/                 # Explanations & Review
|       |   |   ├── SharedExplanationPanel.tsx      # 🌟 MASTER 3-TAB CONTAINER: [Explanation | Video | Materials]
|       |   |   ├── ReviewSidebar.tsx                # Left score summary (500/680) & Question status list (✓/✕)
|       |   |   |
|       |   |   ├── tabs/                            # 📑 3-TAB PANEL COMPONENTS
|       |   │   │   ├── ExplanationTab.tsx          # C.O.R.E Analysis, Clause Diagrams & Distractor Elimination
|       |   │   │   ├── VideoStepByStepTab.tsx      # 🎥 YouTube Video Lesson Embed Player
|       |   │   │   └── MaterialsTab.tsx               # Concept Theory Reference Guide
|       |   |   |
|       |   |   ├── widget/                          # 🤖 GLOBAL FLOATING CHATBOT WIDGET
|       |   |   │   └── AiAssistantWidget.tsx        # Persistent bottom-right floating AI chat drawer & trigger button
|       |   |   |
|       |   |   └── views/ 
|       |   |       ├── CombinedStructureWritingReviewView.tsx # 🏛️ Combined Mock Review
│       │   │       ├── StructurePracticeReviewView.tsx        # ✍️ Dedicated Structure Practice
|       |   |       ├── WritingPracticeReviewView.tsx          # 📝 Dedicated Writing Practice
|       |   |       ├── ListeningExplanationView.tsx
|       |   |       └── ReadingExplanationView.tsx
│       │   │
│       │   └── developer/              # Developer Console (Two-Tab System)
│       │       ├── DeveloperConsoleView.tsx
|       |       ├── DeveloperHeaderNav.tsx  # Action bar ("Panel Developer", "Open User View", etc.)
|       |       |
│       │       ├── mock-tests/         # Tab 1: Mock Packages
|       |       |   ├── MockTestManager.tsx  # CRUD package list, set date picker & search
|       |       |   ├── MockSetEditor.tsx# Sub-page navigation wrapper (Setup | Listening | Structure/Writing | Reading)
|       |       |   |
|       |       |   └── sub-pages/       # 📄 MOCK SECTION SUB-PAGE EDITORS
│       │       │       ├── MockPackageSetupView.tsx       # Page1: Cloudflare R2 Folder setup & validation checks
│       │       │       ├── ListeningMockEditor.tsx        # Page2: Listening50Q {Part 1(30Qs), Part 2(8Qs), Part 3(12Qs)}
│       │       │       ├── StructureWritingMockEditor.tsx # Page3: Structure&Writing 40Q {(15 Qs) & Writing (25 Qs)}
│       │       │       └── ReadingMockEditor.tsx          # Page4: Reading Passages 1-5 & 50 Qs mapping
│       │       │
│       │       ├── practice-tests/   # Tab 2: Practice Library
|       |       |   ├── PracticeTestManager.tsx # Catalog filter (Listening / Structure / Writing / Reading)
│       │       |   ├── PracticeSetEditor.tsx      # Navigation wrapper & mode switch for practice sets
|       |       |   |
|       |       |   └── sub-pages/
|       |       |       ├── ListeningPracticeEditor.tsx # 🎧 Section 1 only (20 Questions, no level split) + R2 Audio Input
│       │       |       ├── StructurePracticeEditor.tsx # ✍️ Level toggle (Beginner 20 Qs vs Advanced 20 Qs) + Figma Map
│       │       |       ├── WritingPracticeEditor.tsx   # 📝 Level toggle (Beginner 20 Qs vs Advanced 20 Qs) + Essay Input
│       │       |       └── ReadingPracticeEditor.tsx   # 📖 2 Parts (Part 1 = 10 Qs, Part 2 = 10 Qs, Total 20 Qs, no level split)
|       |       ├── material-library/   # TAB 3: THEORY & MATERIAL LIBRARY
│       │       |   ├── MaterialManager.tsx     # List & filter 7 modules / 28 sub-topics
│       │       |   ├── MarkdownEditor.tsx      # Markdown input box for developer
│       │       |   └── MaterialPreview.tsx     # Live UI preview of MaterialTab.tsx
│       │       |
|       |       └── shared-inputs/      # 🧩 REUSABLE DEVELOPER FORM INPUTS
│       │           ├── CloudflareAudioSetupCard.tsx # "Setup Audio Utama" card component with status boxes
│       │           ├── SmartPasteInputBox.tsx       # Smart Paste question parser textarea
│       │           ├── AnswerKeyBuilder.tsx         # Quick A/B/C/D option key selector
│       │           └── YoutubeVideoInput.tsx        # YouTube video URL extractor
|       |
│       ├── context/
│       │   ├── AuthContext.tsx
│       │   └── SecurityContext.tsx
│       │
│       ├── views/                      # Router Views
│       │   ├── DashboardView.tsx       # Assembles SidebarNav + Dashboard Top Bar + CalendarGrid
│       │   ├── MockTestDetailView.tsx    # Route: /mock-test/:date (Renders Day 1 full simulation view)
│       │   ├── PracticeDetailView.tsx    # Route: /practice-day/:date (Renders Days 2–4 AI recommendation view)
│       │   ├── ExplanationView.tsx       # `/review/:submissionId` (Review results view)
│       │   ├── StudyPlanView.tsx
│       │   ├── StudyProgressView.tsx     # `/progress` (My Progress analytics view)
│       │   ├── JourneyCompleteView.tsx   # `/journey-complete` (Trial completion screen)
│       │   └── DeveloperConsoleView.tsx  x# `/developer` (Developer Admin Portal)
│       │
│       ├── App.tsx
│       └── main.tsx
│
└── README.md

## firebase
{
  "rules": {
    ".read": false,
    ".write": false,
    "toefl_itp": {
      "cloudflare_audio_folders": {
        ".read": "auth != null",
        ".write": "auth != null && auth.token.role === 'developer'"
      },
      "sets_v2": {
        ".read": "auth != null",
        "$setId": {
          ".read": "auth != null",
          ".write": "auth != null && auth.token.role === 'developer'"
        }
      },
      "drafts_v2": {
        ".read": "auth != null && auth.token.role === 'developer'",
        ".write": "auth != null && auth.token.role === 'developer'"
      },
      "audio_urls": {
        ".read": "auth != null",
        "$setId": {
          ".read": "auth != null",
          ".write": "auth != null && auth.token.role === 'developer'"
        }
      }
    }
  }
}

## User Trial Lifecycle State
# - Adaptive Progression Flow

[ DAY 1 (e.g., Oct 1) ]    [ DAYS 2, 3, & 4 (e.g., Oct 2–4) ]     [ DAY 5+ (e.g., Oct 5+) ]
Full 3-Section Mock Test       3 Days of AI Targeted Practice         Monthly Subscription Gate
          │                                  │                                   │
          ▼                                  ▼                                   ▼
• Establish monthly baseline • Day 2: Primary weakness focus          • Blocks test execution
• Gemini calculates gaps      • Day 3: Secondary weakness focus        • Shows "Journey Complete"
• Generates 3-day schedule    • Day 4: Final practice & review          & Locked 4-Week AI Roadmap

# - End-to-End System Integration Flow
[ DAY 1 MOCK TEST ] ──> [ submissionController.ts ] ──> [ geminiService.ts ]
                                                              │
                                                   (Analyzes Weakness)
                                                              │
                                                              ▼
[ DAY 2 DASHBOARD ] <──(Fetches aiSchedule.day2)─── [ Firestore /users/{uid} ]
        │
        ├──> [ Task 1: Listening Pkg 03 ] ──> Audio from Cloudflare R2
        └──> [ Task 2: Listening Pkg 07 ] ──> Instant Gemini Explanation
                                                              │
                                                   (Progress Saved)
                                                              │
                                                              ▼
[ DAY 3 DASHBOARD ] <──(Fetches aiSchedule.day3)─── [ Firestore /users/{uid} ]
        │
        ├──> [ Task 1: Structure Pkg 02 ] ──> Figma Grammar Diagram
        └──> [ Task 2: Reading Pkg 05 ]   ──> Passage Text Highlights
                                                              │
                                                   (Trial Complete)
                                                              │
                                                              ▼
[ DAY 4 PAYWALL ]   <──(Block Access)────────────── [ entitlementGuard.ts ]

# - Progression Architecture Map
              [ DAY 1 MOCK TEST COMPLETED ]
                             │
                             ▼
              [ geminiService.ts Analysis ]
                             │
       (Generates AI Schedule & Diagnostic Pathway)
                             │
                             ▼
                [ Firestore: /users/{uid} ]
                ├── aiSchedule (Tasks for Day 2 & 3)
                └── aiPathwayDiagnosis (Deep skill analysis & projected score)
                             │
          ┌──────────────────┴──────────────────┐
          ▼                                     ▼
[ CalendarGrid.tsx ]                   [ StudyProgressView.tsx ]
- Monthly/Daily Calendar view          - Detailed AI Pathway Breakdown
- Daily boxes show 3-section           - Skill Gap Radar & Weakness Flags
  status icons:                        - Score Projection Trajectory Graph
  🎧 Listening | ✍️ Structure | 📖 Reading - "Why AI Assigned These Tasks" Card
- Icons change color based on          - Full Historical Activity Stream
  `pending` vs `completed`

# Feature Module: Developer Console (2-Tab Management System)
1. Architectural Flow
Developers access /developer through ProtectedRoute.tsx. The interface splits into Tab 1 (Mock Test Packages) and Tab 2 (Practice Test Library).

                                [ Developer Console View ]
                                            │
                     ┌──────────────────────┴──────────────────────┐
                     ▼                                             ▼
       [ Tab 1: Mock Package Editor ]               [ Tab 2: Practice Library Editor ]
       - Binds Listening + Structure                - Unscheduled skill-tagged sets
         + Reading into 1 monthly bundle            - Direct Cloudflare R2 Uploads
       - Strict section timing locks                - YouTube Video Link Integrations
                     │                                             │
                     └──────────────────────┬──────────────────────┘
                                            │
                                            ▼
                     [ Presigned URL Request (Cloud Function) ]
                                            │
                                            ▼
                     [ Direct PUT Upload to Cloudflare R2 ]
                                            │
                                            ▼
                    [ Write Document to Firestore: /problemSets ]

# Feature Module: Active Test Taking Engine (Mock vs. Practice)
1. Architectural Flow
The test engine is encapsulated in TimedTestContainer.tsx. In Mock Mode, it enforces lockstep section transitions (Listening → Structure → Reading) and locks screen progression. In Practice Mode, it provides a self-paced canvas for individual category items.
                                [ TimedTestContainer.tsx ]
                                            │
                     ┌──────────────────────┴──────────────────────┐
                     ▼                                             ▼
          [ Mock Exam Lockstep ]                        [ Practice Mode ]
          - Sequential Section Enforcer                 - Single Category Target
          - Auto-Submit on Timer Expiry                 - Immediate Response Tracking
                     │                                             │
                     └──────────────────────┬──────────────────────┘
                                            │
                                            ▼
                    [ Stream Audio directly from Cloudflare R2 ]
                                            │
                                            ▼
                 [ POST /api/submissions/submit (Cloud Function) ]
                                            │
                                            ▼
                 [ Store Immutable Record in Firestore: /userSubmissions ]

## Feature: AI Explanation, Figma Diagrams & YouTube Video Player
1. Architectural Flow
Upon viewing /review/:submissionId, ExplanationView.tsx renders the appropriate section reviewer. For Structure and Writing items, it renders a multi-tab card containing the Figma Sentence Diagram, the Interactive Gemini "Ask AIQC" Drawer, and the Embedded YouTube Video Player.
[ ExplanationView.tsx ]
                                      │
               ┌──────────────────────┼──────────────────────┐
               ▼                      ▼                      ▼
  [ StructureExplanationView ] [ ReadingExplanationView ] [ ListeningExplanationView ]
  - Figma Grammar Diagrams    - Passage Highlights       - Transcript + Timestamps
  - YouTube Video Embeds      - "Why Option B?" AI Cards - "Ask AIQC" Drawer
               │                      │                      │
               └──────────────────────┼──────────────────────┘
                                      │
                                      ▼
                        [ Gemini AI Cloud Function ]
                        - Evaluated via rateLimiter.ts
                        - Strips intro boilerplate noise
                        - Returns JSON explanation

## OTP SMS Authentication Flow
[ User Enters Phone Number (+62...) ]
                  │
                  ▼
[ Firebase Auth (`signInWithPhoneNumber`) ] ──> Sends SMS via Firebase / Twilio
                  │
                  ▼
[ User Inputs 6-Digit OTP Code ]
                  │
                  ▼
[ `confirmationResult.confirm(otpCode)` ]
                  │
                  ▼
[ Obtains Firebase ID Token ]
                  │
                  ▼
[ POST /api/auth/register-phone ] ──> [ backend-functions/authController.ts ]
                                                   │
                                                   ▼
                                                   [ Saves User Profile in Firestore ]

## Implemented SaaS foundation

The draft is now split into two independently buildable applications:

```text
toeflqc/
├── web-client/                 # React 18 + Vite SPA
│   └── src/
│       ├── App.tsx             # Dashboard shell and client interaction state
│       ├── App.css             # Responsive Quick Check visual system
│       ├── main.tsx            # React root entry point
│       └── components/         # Feature modules to migrate from the sample
├── backend-functions/          # TypeScript API boundary
│   └── src/index.ts            # Express API, auth seam, health endpoint
├── firebase-config/            # Firebase rules and deployment configuration
└── README.md                   # Product and architecture contract
```

### API contract

The backend currently exposes `GET /health`, `GET /api/v1/dashboard`, `GET /api/v1/practice`, and `POST /api/v1/submissions`. Development requests may omit a bearer token; production requests must use `Authorization: Bearer <firebase-id-token>`. Firebase Admin verification, Firestore repositories, Gemini analysis, and R2 uploads should be added behind the existing service/controller folders rather than inside React components.

### Local checks

```bash
cd web-client && npm run build
cd ../backend-functions && npm run build
```