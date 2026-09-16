## Firebase Structure Overview
Firestore Root
├── problemSets/                 <-- All Mock Packages & Practice Library Sets
│   └── {setId}
│       └── questions/           <-- Sub-collection holding Questions & Answer Keys
│           └── {questionId}
│
├── users/                       <-- User Profiles, AI Schedules, & Completed Set History
│   └── {uid}
│       └── completedSets/       <-- Sub-collection tracking every set done by user
│           └── {setId}
│
└── userSubmissions/             <-- Full Test Results & Answers Submitted
    └── {submissionId}
    
## Firestore Question Schema
// /problemSets/{setId}/questions/{questionId}
interface QuestionDoc {
  questionId: string;                   // e.g., "q_struct_102"
  setId: string;
  questionNumber: number;
  section: "listening" | "structure" | "reading" | "writing";
  
  // Prompt & Options
  prompt: string;
  options: { A: string; B: string; C: string; D: string };
  correctAnswer: "A" | "B" | "C" | "D";
  
  // Text Explanation & AI Breakdown
  explanationText: string;             // Text/AI summary
  grammarTag: string | null;            // e.g., "Parallel Structure"
  
  // 🎥 NEW: YouTube Video Explanation Fields
  youtubeVideoId: string | null;        // e.g., "dQw4w9WgXcQ" (Extracted from YouTube URL)
  videoStartSeconds?: number;           // Optional: timestamp offset if 1 video covers multiple Qs
  videoTitle?: string;                  // e.g., "Video Breakdown: Subject-Verb Agreement"
  
  // Figma Diagramming Metadata (Structure)
  sentenceStructureMap?: {
    mainSubject: string;
    mainVerb: string;
  };
}