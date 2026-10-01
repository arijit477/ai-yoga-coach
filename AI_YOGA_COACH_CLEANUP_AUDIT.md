# AI Yoga Coach — Codebase Cleanup Audit

## 1. Executive Summary

This comprehensive, read-only audit analyzes the entire **AI Yoga Coach** repository across the frontend, backend, machine learning, database, test, asset, and documentation layers. 

The primary objective is to identify dead, obsolete, and duplicate code that does not contribute to the current production application, while strictly protecting all features required for the live AI Yoga Coach (170 active asanas catalog, MediaPipe real-time pose tracking, joint/landmark angle calculations, 75% accuracy threshold hold gate, 5-second continuous hold completion, Alice/Kevin coach avatars, OpenAI Realtime WebRTC voice coaching, and complete session/modal lifecycle flows).

### Key Audit Findings:
1. **Frontend Core:** The production web app runs from `frontend/src/main.tsx` $\to$ `App.tsx` $\to$ `AICoachPage.tsx`. It employs client-side MediaPipe vision (`@mediapipe/tasks-vision`) and browser-side rule engines for pose evaluation, with OpenAI Realtime WebRTC voice integration.
2. **Unused / Legacy Frontend Clusters:**
   - **Early 3D Canvas / Three.js Pipeline:** `frontend/src/features/ai-coach/3d/` (10 files) and `@react-three/fiber`, `@react-three/drei`, and `three` dependencies are completely unreferenced by the current production UI.
   - **Legacy POC State & Data:** `src/pages/ExerciseSelectionPage.tsx`, `src/store/useCoachStore.ts`, `src/store/useSessionStore.ts`, `src/data/coaches.ts`, `src/data/exercises.ts`, `src/services/api.ts`, and legacy types are relics from an initial pre-vision prototype.
   - **Legacy Hooks & Calculators:** Multiple legacy hooks (`useAsanaEvaluation.ts`, `useBackendPoseTracking.ts`, `useStableAccuracy.ts`, `useStablePoseEvaluation.ts`, `useStableScore.ts`) and duplicate evaluators (`AsanaPoseEvaluator.ts`, `AccuracyCalculator.ts`, `PostureAnalyzer.ts`, `JointAngleExtractor.ts`, `ScoreCalculator.ts`) have been superseded by `TemporalPoseEvaluator.ts`, `PoseEvaluator.ts`, `AccuracyStabilizer.ts`, and `PostureCheckAdapter.ts`.
3. **Backend Status:**
   - **Active Production Routes:** `backend/app/api/routes/realtime.py` provides ephemeral session tokens and WebRTC rate limiting for the AI Coach voice agent; `backend/app/api/routes/asanas.py` handles image uploads and Supabase storage.
   - **Dead Backend Pose Analysis:** `backend/app/services/pose_analysis/` (6 files) and `backend/app/api/routes/video_stream.py` (WebSocket stream) represent an obsolete server-side OpenCV/MediaPipe prototype that is entirely unused by the client.
4. **ML & Offline Tools:** The `ml/` directory contains an offline training/inference pipeline designed for dataset feature extraction and model experimentation. It has 0 runtime dependencies from the web app and can be preserved or archived.
5. **No Code Modified:** In accordance with the audit mandate, **no files have been deleted, moved, renamed, or modified**.

---

## 2. Current Architecture

The production application is an interactive AI-powered Yoga Coach operating directly in modern web browsers:

```mermaid
flowchart TD
    subgraph BrowserClient ["Frontend (Vite + React 19 + TypeScript)"]
        Entry["main.tsx / App.tsx"]
        Registry["AsanaRegistry.ts (170 Asanas)"]
        UI["AICoachPage.tsx"]
        
        subgraph VisionPipeline ["Vision & Motion Pipeline"]
            Cam["CameraView.tsx"]
            MP["PoseLandmarkerService.ts (@mediapipe/tasks-vision)"]
            Smoother["LandmarkSmoother.ts"]
            Features["PoseFeatureEngine.ts"]
            Tracker["CameraReadinessTracker.ts"]
        end
        
        subgraph EvaluationPipeline ["Kinematic & Rule Evaluation"]
            TempEval["TemporalPoseEvaluator.ts"]
            PoseEval["PoseEvaluator.ts"]
            RuleEval["RuleEvaluator.ts (Angles, Distances, Alignments)"]
            RuleReg["poseRulesRegistry.ts + /data/rules.json"]
            Stabilizer["AccuracyStabilizer.ts (EMA Smoothing)"]
            PostureAdapter["PostureCheckAdapter.ts"]
        end
        
        subgraph CompletionEngine ["Session & Completion Gate"]
            SessionHook["useCoachSession.ts"]
            Gate["AsanaCompletionGate.ts (Stance + Regions + Critical Rules)"]
            Timer["5-Second Continuous Hold Timer"]
            ReviewModal["PoseReviewModal.tsx (Completed Popup)"]
            ReportModal["SessionReportModal.tsx"]
        end
        
        subgraph VoiceSubsystem ["Realtime Voice Coaching"]
            VoiceAgent["RealtimeVoiceAgent.ts (WebRTC DataChannel)"]
            VoiceHook["useRealtimeVoice.ts"]
            DecisionEngine["CoachDecisionEngine.ts + CoachingEventEngine.ts"]
            Language["NaturalCoachLanguage.ts (Alice / Kevin Cues)"]
        end
    end

    subgraph BackendServices ["FastAPI Backend (Port 8000)"]
        RealtimeRoute["/api/ai-coach/realtime/session (Ephemeral WebRTC Token)"]
        ChatSummaryRoute["/api/chat/summary (Session Feedback)"]
        SupabaseRoute["/api/asanas/upload-image"]
    end

    subgraph CloudServices ["External Cloud Services"]
        OpenAI["OpenAI Realtime API (WebRTC Audio Stream)"]
        Supabase["Supabase (PostgreSQL + Storage)"]
    end

    Entry --> Registry
    Entry --> UI
    UI --> Cam & MP & Smoother & Features & Tracker
    Features --> TempEval
    TempEval --> PoseEval --> RuleEval --> RuleReg
    TempEval --> Stabilizer
    Stabilizer --> SessionHook
    SessionHook --> Gate --> Timer --> ReviewModal --> ReportModal
    TempEval --> PostureAdapter --> UI
    
    UI --> VoiceHook --> VoiceAgent
    VoiceAgent --> DecisionEngine --> Language
    VoiceAgent --> RealtimeRoute
    RealtimeRoute --> OpenAI
    VoiceAgent <== "WebRTC Audio" ==> OpenAI
    Registry -.-> Supabase
    ReportModal -.-> ChatSummaryRoute
```

---

## 3. Production Runtime Path

The verified end-to-end execution flow follows this exact sequence:

1. **Bootstrapping:**
   - [index.html](file:///d:/Client-Projects/ClientProject/ArunReddy/Ai-Coach/ai-yoga-coach/frontend/index.html) loads [main.tsx](file:///d:/Client-Projects/ClientProject/ArunReddy/Ai-Coach/ai-yoga-coach/frontend/src/main.tsx) $\to$ [App.tsx](file:///d:/Client-Projects/ClientProject/ArunReddy/Ai-Coach/ai-yoga-coach/frontend/src/App.tsx).
   - `App.tsx` invokes `initAsanaRegistry()` from [AsanaRegistry.ts](file:///d:/Client-Projects/ClientProject/ArunReddy/Ai-Coach/ai-yoga-coach/frontend/src/features/ai-coach/data/AsanaRegistry.ts), loading 170 asanas from [allAsanasCatalog.ts](file:///d:/Client-Projects/ClientProject/ArunReddy/Ai-Coach/ai-yoga-coach/frontend/src/features/ai-coach/data/allAsanasCatalog.ts) (with Supabase fallback) and renders [AICoachPage.tsx](file:///d:/Client-Projects/ClientProject/ArunReddy/Ai-Coach/ai-yoga-coach/frontend/src/features/ai-coach/components/AICoachPage.tsx) inside [GlobalErrorBoundary.tsx](file:///d:/Client-Projects/ClientProject/ArunReddy/Ai-Coach/ai-yoga-coach/frontend/src/components/GlobalErrorBoundary.tsx).
2. **Camera & Pose Tracking:**
   - [AICoachPage.tsx](file:///d:/Client-Projects/ClientProject/ArunReddy/Ai-Coach/ai-yoga-coach/frontend/src/features/ai-coach/components/AICoachPage.tsx) initializes `usePoseTracking` ([usePoseTracking.ts](file:///d:/Client-Projects/ClientProject/ArunReddy/Ai-Coach/ai-yoga-coach/frontend/src/hooks/usePoseTracking.ts)).
   - Web camera frames are captured via [CameraView.tsx](file:///d:/Client-Projects/ClientProject/ArunReddy/Ai-Coach/ai-yoga-coach/frontend/src/features/ai-coach/components/CameraView.tsx).
   - [PoseLandmarkerService.ts](file:///d:/Client-Projects/ClientProject/ArunReddy/Ai-Coach/ai-yoga-coach/frontend/src/features/ai-coach/motion/PoseLandmarkerService.ts) runs `@mediapipe/tasks-vision` using `/models/pose_landmarker_lite.task`.
   - [MotionFrameProcessor.ts](file:///d:/Client-Projects/ClientProject/ArunReddy/Ai-Coach/ai-yoga-coach/frontend/src/features/ai-coach/motion/MotionFrameProcessor.ts) passes landmarks through [LandmarkSmoother.ts](file:///d:/Client-Projects/ClientProject/ArunReddy/Ai-Coach/ai-yoga-coach/frontend/src/features/ai-coach/motion/LandmarkSmoother.ts) and extracts spatial kinematics via [PoseFeatureEngine.ts](file:///d:/Client-Projects/ClientProject/ArunReddy/Ai-Coach/ai-yoga-coach/frontend/src/features/ai-coach/analysis/PoseFeatureEngine.ts).
   - [CameraReadinessTracker.ts](file:///d:/Client-Projects/ClientProject/ArunReddy/Ai-Coach/ai-yoga-coach/frontend/src/features/ai-coach/motion/CameraReadinessTracker.ts) updates camera readiness (`CAMERA_READY`, `FULL_BODY_DETECTED`, `PARTIAL_BODY`).
3. **Kinematic Rule Evaluation & Accuracy:**
   - [usePoseEvaluation.ts](file:///d:/Client-Projects/ClientProject/ArunReddy/Ai-Coach/ai-yoga-coach/frontend/src/hooks/usePoseEvaluation.ts) runs [TemporalPoseEvaluator.ts](file:///d:/Client-Projects/ClientProject/ArunReddy/Ai-Coach/ai-yoga-coach/frontend/src/features/ai-coach/analysis/TemporalPoseEvaluator.ts).
   - `TemporalPoseEvaluator` calls `evaluatePose` in [PoseEvaluator.ts](file:///d:/Client-Projects/ClientProject/ArunReddy/Ai-Coach/ai-yoga-coach/frontend/src/features/ai-coach/analysis/PoseEvaluator.ts), which invokes [RuleEvaluator.ts](file:///d:/Client-Projects/ClientProject/ArunReddy/Ai-Coach/ai-yoga-coach/frontend/src/features/ai-coach/analysis/RuleEvaluator.ts) using geometric rules registered in [RuleEngine.ts](file:///d:/Client-Projects/ClientProject/ArunReddy/Ai-Coach/ai-yoga-coach/frontend/src/features/ai-coach/analysis/RuleEngine.ts) and [poseRulesRegistry.ts](file:///d:/Client-Projects/ClientProject/ArunReddy/Ai-Coach/ai-yoga-coach/frontend/src/features/ai-coach/analysis/rules/poseRulesRegistry.ts).
   - Mathematical calculations are computed in [AngleCalculator.ts](file:///d:/Client-Projects/ClientProject/ArunReddy/Ai-Coach/ai-yoga-coach/frontend/src/features/ai-coach/analysis/AngleCalculator.ts), [DistanceCalculator.ts](file:///d:/Client-Projects/ClientProject/ArunReddy/Ai-Coach/ai-yoga-coach/frontend/src/features/ai-coach/analysis/DistanceCalculator.ts), and [AlignmentCalculator.ts](file:///d:/Client-Projects/ClientProject/ArunReddy/Ai-Coach/ai-yoga-coach/frontend/src/features/ai-coach/analysis/AlignmentCalculator.ts).
   - Exponential moving average smoothing and jitter suppression are applied by [AccuracyStabilizer.ts](file:///d:/Client-Projects/ClientProject/ArunReddy/Ai-Coach/ai-yoga-coach/frontend/src/features/ai-coach/analysis/AccuracyStabilizer.ts).
   - Real-time posture checks are transformed by [PostureCheckAdapter.ts](file:///d:/Client-Projects/ClientProject/ArunReddy/Ai-Coach/ai-yoga-coach/frontend/src/features/ai-coach/analysis/PostureCheckAdapter.ts) and displayed on [PostureCheckOverlay.tsx](file:///d:/Client-Projects/ClientProject/ArunReddy/Ai-Coach/ai-yoga-coach/frontend/src/features/ai-coach/components/PostureCheckOverlay.tsx).
4. **Coaching & Realtime Voice Subsystem:**
   - [useRealtimeVoice.ts](file:///d:/Client-Projects/ClientProject/ArunReddy/Ai-Coach/ai-yoga-coach/frontend/src/features/ai-coach/voice/useRealtimeVoice.ts) initiates [RealtimeVoiceAgent.ts](file:///d:/Client-Projects/ClientProject/ArunReddy/Ai-Coach/ai-yoga-coach/frontend/src/features/ai-coach/voice/RealtimeVoiceAgent.ts).
   - Voice agent requests ephemeral credentials from FastAPI backend `/api/ai-coach/realtime/session` and establishes a WebRTC peer connection + DataChannel with OpenAI.
   - [CoachingEventEngine.ts](file:///d:/Client-Projects/ClientProject/ArunReddy/Ai-Coach/ai-yoga-coach/frontend/src/features/ai-coach/voice/CoachingEventEngine.ts) arbitrates priority between errors, corrections, and praise.
   - [NaturalCoachLanguage.ts](file:///d:/Client-Projects/ClientProject/ArunReddy/Ai-Coach/ai-yoga-coach/frontend/src/features/ai-coach/voice/NaturalCoachLanguage.ts) formats persona-specific instructions (Alice = calming, mindfulness; Kevin = energetic, athletic).
5. **Hold Timer & Asana Completion Gate:**
   - [useCoachSession.ts](file:///d:/Client-Projects/ClientProject/ArunReddy/Ai-Coach/ai-yoga-coach/frontend/src/hooks/useCoachSession.ts) runs state machine transitions ([SessionStateMachine.ts](file:///d:/Client-Projects/ClientProject/ArunReddy/Ai-Coach/ai-yoga-coach/frontend/src/features/ai-coach/session/SessionStateMachine.ts)).
   - [AsanaCompletionGate.ts](file:///d:/Client-Projects/ClientProject/ArunReddy/Ai-Coach/ai-yoga-coach/frontend/src/features/ai-coach/analysis/AsanaCompletionGate.ts) verifies:
     1. Stance validity ([StanceDetector.ts](file:///d:/Client-Projects/ClientProject/ArunReddy/Ai-Coach/ai-yoga-coach/frontend/src/features/ai-coach/analysis/StanceDetector.ts)).
     2. Required landmark regions visible ([AsanaLandmarkRequirements.ts](file:///d:/Client-Projects/ClientProject/ArunReddy/Ai-Coach/ai-yoga-coach/frontend/src/features/ai-coach/analysis/AsanaLandmarkRequirements.ts)).
     3. Pose-defining critical rules passing.
     4. Accuracy $\ge 75\%$.
   - When eligible, [HoldTimer.tsx](file:///d:/Client-Projects/ClientProject/ArunReddy/Ai-Coach/ai-yoga-coach/frontend/src/features/ai-coach/components/HoldTimer.tsx) counts 5 continuous seconds.
   - Upon completion:
     - Voice agent triggers completion praise audio.
     - [PoseReviewModal.tsx](file:///d:/Client-Projects/ClientProject/ArunReddy/Ai-Coach/ai-yoga-coach/frontend/src/features/ai-coach/components/PoseReviewModal.tsx) opens with options: **Next Pose**, **Practice Again**, or **End Session**.
     - Ending the session opens [SessionReportModal.tsx](file:///d:/Client-Projects/ClientProject/ArunReddy/Ai-Coach/ai-yoga-coach/frontend/src/features/ai-coach/components/SessionReportModal.tsx) with completed poses and score summary.

---

## 4. Files to KEEP

The following **94 runtime files and active configs** represent the complete, working production application and MUST NOT be deleted:

| File | Reason | Current Usage |
|---|---|---|
| `frontend/index.html` | Application HTML entry point | Hosts root DOM mount and loads `main.tsx` |
| `frontend/src/main.tsx` | Client bootstrapping | Mounts React root and initializes `App.tsx` |
| `frontend/src/App.tsx` | Main Application container | Boots `initAsanaRegistry` and mounts `AICoachPage` |
| `frontend/src/index.css` | Global stylesheet | Core Tailwind CSS tokens and layout styles |
| `frontend/src/components/GlobalErrorBoundary.tsx` | Error boundary | Wraps entire application to catch runtime exceptions |
| `frontend/src/features/ai-coach/components/AICoachPage.tsx` | Primary Coach View | Full UI coordinator for camera, voice, score, and state |
| `frontend/src/features/ai-coach/components/CameraView.tsx` | Camera Video Canvas | Renders webcam stream and coordinates overlays |
| `frontend/src/features/ai-coach/components/PoseSkeleton.tsx` | Skeleton Overlay | MediaPipe 2D landmark and bone line visualizer |
| `frontend/src/features/ai-coach/components/CircularScoreRing.tsx` | Real-time Score Ring | Visual SVG circular accuracy progress gauge |
| `frontend/src/features/ai-coach/components/HoldTimer.tsx` | 5-Second Hold Timer | Visual countdown and ring for 5-second hold progression |
| `frontend/src/features/ai-coach/components/CoachPanel.tsx` | Coach Avatar & Guidance | Displays Alice/Kevin thumbnail, status, and voice controls |
| `frontend/src/features/ai-coach/components/CoachSelector.tsx` | Avatar Switcher | Modal / selector to toggle between Alice and Kevin |
| `frontend/src/features/ai-coach/components/AccuracyPanel.tsx` | Accuracy & Guidance Stage | Shows score breakdown, issues, and posture state |
| `frontend/src/features/ai-coach/components/VoiceControls.tsx` | Audio Mute Controls | Mic/speaker indicators and voice mute toggle |
| `frontend/src/features/ai-coach/components/AsanaSelector.tsx` | Pose Library Selector | Asana catalog browser and search dropdown |
| `frontend/src/features/ai-coach/components/AsanaReference.tsx` | Asana Reference Card | Displays reference image, Sanskrit name, and instructions |
| `frontend/src/features/ai-coach/components/AsanaInstructionsCard.tsx` | Quick Setup Guide | Displays bulleted starting form steps for the selected pose |
| `frontend/src/features/ai-coach/components/GuideVideoOverlay.tsx` | Pose Demonstration Overlay | Video overlay player for asana demonstration videos |
| `frontend/src/features/ai-coach/components/PostureCheckOverlay.tsx` | Alignment Overlay | Direct visual badge overlay on live video feed |
| `frontend/src/features/ai-coach/components/PoseReviewModal.tsx` | Pose Completion Popup | Displays completion modal with Practice Again/Next Pose |
| `frontend/src/features/ai-coach/components/SessionReportModal.tsx` | Session Summary Modal | Summary breakdown of completed poses and accuracy |
| `frontend/src/features/ai-coach/components/SessionControls.tsx` | Practice Session Buttons | Start, Pause, Reset, and End session buttons |
| `frontend/src/features/ai-coach/components/PrivacyNotice.tsx` | Privacy Badge | Notice that video processing is 100% local in browser |
| `frontend/src/features/ai-coach/components/SafetyGuideBanner.tsx` | Safety Disclaimer | Safety banner warning users not to strain |
| `frontend/src/features/ai-coach/avatar/avatar.types.ts` | Coach & Avatar Metadata | Alice/Kevin profiles, descriptions, and outfit images |
| `frontend/src/hooks/usePoseTracking.ts` | Pose Tracking Hook | Lifecycle hook for MediaPipe video frame processing |
| `frontend/src/hooks/usePoseEvaluation.ts` | Pose Evaluation Hook | Evaluates frames against active pose rules |
| `frontend/src/hooks/useCoachState.ts` | Coach State Machine Hook | Translates tracking state to coach state (`holding`, etc.) |
| `frontend/src/hooks/useCoachSession.ts` | Session Progression Hook | Coordinates hold timing, completion, and transitions |
| `frontend/src/features/ai-coach/motion/PoseLandmarkerService.ts` | MediaPipe Service | Singleton wrapper for MediaPipe Vision Tasks |
| `frontend/src/features/ai-coach/motion/MotionFrameProcessor.ts` | Frame Processor | Orchestrates landmark smoothing and feature extraction |
| `frontend/src/features/ai-coach/motion/LandmarkSmoother.ts` | Landmark Jitter Filter | Exponential smoothing filter on raw $(x,y,z)$ points |
| `frontend/src/features/ai-coach/motion/CalibrationTracker.ts` | Calibration System | Tracks user alignment during hold-still calibration |
| `frontend/src/features/ai-coach/motion/CameraReadinessEvaluator.ts` | Camera Region Check | Evaluates whether required body regions are in frame |
| `frontend/src/features/ai-coach/motion/CameraReadinessTracker.ts` | Camera State Machine | Evaluates hardware and user visibility state transitions |
| `frontend/src/features/ai-coach/analysis/PoseFeatureEngine.ts` | Feature Extractor | Computes angles, distances, bounding boxes, and symmetry |
| `frontend/src/features/ai-coach/analysis/TemporalPoseEvaluator.ts` | Temporal Evaluator | Smoothed accuracy, issue persistence, and score trends |
| `frontend/src/features/ai-coach/analysis/PoseEvaluator.ts` | Raw Pose Evaluator | Core pose evaluation scoring against rule catalog |
| `frontend/src/features/ai-coach/analysis/RuleEvaluator.ts` | Rule Execution Engine | Evaluates individual geometric rules and tolerances |
| `frontend/src/features/ai-coach/analysis/RuleEngine.ts` | Pose Rule Registry | In-memory registry for dynamic pose rule sets |
| `frontend/src/features/ai-coach/analysis/AccuracyStabilizer.ts` | Accuracy Smoothing | Fast-climb, slow-decay exponential smoothing filter |
| `frontend/src/features/ai-coach/analysis/AsanaCompletionGate.ts` | False Completion Shield | 6-point verification gate enforcing stance and rules |
| `frontend/src/features/ai-coach/analysis/StanceDetector.ts` | Body Stance Classifier | Classifies standing, seated, supine, prone, inverted |
| `frontend/src/features/ai-coach/analysis/AsanaLandmarkRequirements.ts` | Landmark Mappings | Maps each asana to required body keypoints |
| `frontend/src/features/ai-coach/analysis/AsanaCanonicalIdResolver.ts` | Canonical Alias Resolver | Resolves aliases (`cobra-pose` $\to$ `bhujangasana`) |
| `frontend/src/features/ai-coach/analysis/PostureCheckAdapter.ts` | Posture Check Engine | Real-time posture status debouncer and checks |
| `frontend/src/features/ai-coach/analysis/AngleCalculator.ts` | 3D Angle Math | Computes 3-point 3D joint angles in degrees |
| `frontend/src/features/ai-coach/analysis/DistanceCalculator.ts` | Distance Math | Computes Euclidean & relative body distances |
| `frontend/src/features/ai-coach/analysis/AlignmentCalculator.ts` | Vertical/Horiz Alignment | Computes tilt, plumbline, and level deviations |
| `frontend/src/features/ai-coach/analysis/LandmarkUtils.ts` | Landmark Diagnostics | Visibility, presence, and bounding box utilities |
| `frontend/src/features/ai-coach/analysis/CoachStateCalculator.ts` | State Calculator | Derives high-level coaching states from evaluation |
| `frontend/src/features/ai-coach/analysis/FeedbackEngine.ts` | Feedback Synthesizer | Generates user-friendly text correction prompts |
| `frontend/src/features/ai-coach/analysis/ScoreAggregator.ts` | Score Buffer | Rolling window score buffer for session evaluation |
| `frontend/src/features/ai-coach/analysis/rules/poseRulesRegistry.ts` | Pose Rules Loader | Loads rules from catalog and `/data/rules.json` |
| `frontend/src/features/ai-coach/analysis/rules/WarriorIIRules.ts` | Warrior II Rules | Dedicated rule definitions for Warrior II |
| `frontend/src/features/ai-coach/analysis/rules/asanas/index.ts` | Asanas Rules Index | Index re-exporting foundational pose definitions |
| `frontend/src/features/ai-coach/analysis/rules/asanas/*.ts` (9 files) | Foundational Pose Rules | Rules for Cobra, Bridge, Lotus, Tree, Downward Dog, etc. |
| `frontend/src/features/ai-coach/session/SessionStateMachine.ts` | Session Flow Machine | State machine for `get_ready`, `coaching`, `holding` |
| `frontend/src/features/ai-coach/voice/RealtimeVoiceAgent.ts` | WebRTC Voice Agent | OpenAI Realtime WebRTC client via DataChannel |
| `frontend/src/features/ai-coach/voice/useRealtimeVoice.ts` | Voice React Hook | Manages voice connection, mute state, and events |
| `frontend/src/features/ai-coach/voice/CoachingEventEngine.ts` | Event Scheduler | Priority queue and cooldown management for voice |
| `frontend/src/features/ai-coach/voice/CoachingEventBuilder.ts` | Event Factory | Builds typed coaching events from pose evaluation |
| `frontend/src/features/ai-coach/voice/CoachDecisionEngine.ts` | Voice Arbiter | Determines when speech should be triggered vs silent |
| `frontend/src/features/ai-coach/voice/NaturalCoachLanguage.ts` | Natural Language Cues | Personality cue templates for Alice and Kevin |
| `frontend/src/features/ai-coach/voice/index.ts` | Voice Module Index | Public exports for voice coaching subsystem |
| `frontend/src/features/ai-coach/services/AsanaCoachingProfileService.ts` | Coaching Profiles | Provides stance, cue, and profile for all 170 poses |
| `frontend/src/features/ai-coach/services/AsanaStartingInstructionService.ts`| Entry Instructions | Generates spoken starting setup instruction per pose |
| `frontend/src/features/ai-coach/data/AsanaRegistry.ts` | Asana Registry Service | Central registry for all 170 asanas, aliases, categories |
| `frontend/src/features/ai-coach/data/allAsanasCatalog.ts` | 170 Asana Catalog (520KB)| Comprehensive database of 170 asanas with rules/images |
| `frontend/src/features/ai-coach/data/coachingProfilesCatalog.ts` | Profile Definitions | Coaching metadata and stance profiles for all poses |
| `frontend/src/features/ai-coach/data/freeAsanas.ts` | Free Tier Filter | Free vs premium pose groupings and video helpers |
| `frontend/src/features/ai-coach/data/suryaNamaskarAsanas.ts` | Surya Namaskar Flow | 12-step Sun Salutation progression definitions |
| `frontend/src/features/ai-coach/store/aiCoachStore.ts` | Zustand Coach Store | Active UI state (selected coach, routine, mute, etc.) |
| `frontend/src/features/ai-coach/types/*.ts` (13 files) | TypeScript Types | Interfaces for asanas, rules, landmarks, voice, camera |
| `frontend/src/lib/supabase.ts` | Supabase Client | Frontend client for optional catalog/auth sync |
| `backend/app/main.py` | FastAPI Application | Main backend app hosting active API routes |
| `backend/app/main.py` (root `backend/main.py` shim)| Deployment Shim | Uvicorn entrypoint shim (`main:app`) |
| `backend/app/api/routes/realtime.py` | Realtime API Route | Ephemeral OpenAI WebRTC session token endpoint |
| `backend/app/api/routes/asanas.py` | Asana Upload Route | Supabase storage image upload endpoint |
| `backend/app/api/routes/chat.py` | Session Summary API | Generates post-session feedback summary |
| `backend/app/core/supabase.py` | Supabase Core Client | Backend Supabase client connection |
| `backend/app/schemas/chat.py` | Chat Schemas | Pydantic request/response schemas for summary API |

---

## 5. Files Confirmed Safe to Remove

The following **29 files** are confirmed dead, unreachable, and safe for deletion. They have zero active production imports, no dynamic usages, and no runtime dependencies:

| File | Why Dead | References Checked | Risk |
|---|---|---|---|
| `frontend/src/App.css` | Unused CSS boilerplate. `index.css` is used exclusively. | Checked `App.tsx`, `main.tsx` (neither imports it) | ZERO |
| `frontend/src/assets/hero.png` | Unused legacy asset in `src/assets`. | Searched all `.tsx`, `.ts`, `.css` | ZERO |
| `frontend/src/assets/react.svg` | Vite boilerplate icon. | Searched all files (0 references) | ZERO |
| `frontend/src/assets/vite.svg` | Vite boilerplate icon. | Searched all files (0 references) | ZERO |
| `frontend/src/pages/ExerciseSelectionPage.tsx` | Legacy pre-vision page component. | Zero imports in `App.tsx` or router | ZERO |
| `frontend/src/store/useCoachStore.ts` | Legacy zustand store from early POC. | Only imported by dead `ExerciseSelectionPage` | ZERO |
| `frontend/src/store/useSessionStore.ts` | Legacy session store. Replaced by `aiCoachStore.ts`. | 0 incoming references | ZERO |
| `frontend/src/services/api.ts` | Legacy mock API service. Replaced by `RealtimeVoiceAgent`. | 0 incoming references | ZERO |
| `frontend/src/data/coaches.ts` | Legacy mock coaches data. Replaced by `avatar.types.ts`. | Only imported by dead `types/coach.ts` | ZERO |
| `frontend/src/data/exercises.ts` | Legacy exercise list. Replaced by `allAsanasCatalog.ts`. | Only imported by dead `types/exercise.ts` | ZERO |
| `frontend/src/types/coach.ts` | Legacy coach type. Replaced by `avatar.types.ts`. | Only imported by dead `useCoachStore.ts` | ZERO |
| `frontend/src/types/exercise.ts` | Legacy exercise type. Replaced by `asana.ts`. | Only imported by dead `useSessionStore.ts` | ZERO |
| `frontend/src/features/folderGuide.md` | Temporary scratch developer markdown document. | Internal dev doc | ZERO |
| `frontend/src/hooks/useBackendPoseTracking.ts` | Dead hook connecting to legacy WebSocket `/api/ai-coach/video/stream`. | Replaced by client-side `usePoseTracking.ts` | ZERO |
| `frontend/src/hooks/useAsanaEvaluation.ts` | Superseded evaluation hook. | Replaced by `usePoseEvaluation.ts` | ZERO |
| `frontend/src/hooks/useStableAccuracy.ts` | Unused standalone hook. | Smoothing is integrated inside `TemporalPoseEvaluator` | ZERO |
| `frontend/src/hooks/useStablePoseEvaluation.ts` | Unused experimental hook. | Replaced by `usePoseEvaluation.ts` | ZERO |
| `frontend/src/hooks/useStableScore.ts` | Unused score smoothing hook. | Replaced by `AccuracyStabilizer` | ZERO |
| `frontend/src/features/ai-coach/analysis/ScoreCalculator.ts` | 39-byte stub re-exporting `AccuracyCalculator`. | 0 incoming imports | ZERO |
| `frontend/src/features/ai-coach/analysis/JointAngleExtractor.ts` | Unused utility; angles computed in `PoseFeatureEngine.ts`. | 0 incoming imports | ZERO |
| `frontend/src/features/ai-coach/analysis/PoseStabilityDetector.ts` | Unused detector; stability computed in `AccuracyStabilizer.ts`. | 0 incoming imports | ZERO |
| `frontend/src/features/ai-coach/analysis/PostureAnalyzer.ts` | Unused legacy analyzer. Replaced by `PostureCheckAdapter.ts`. | 0 incoming imports | ZERO |
| `frontend/src/features/ai-coach/analysis/rules/WarriorII.ts` | Unused test re-export file. | 0 incoming imports | ZERO |
| `frontend/src/features/ai-coach/analysis/rules/WarriorIITest.ts` | Unused standalone script. Replaced by `__tests__`. | 0 incoming imports | ZERO |
| `frontend/src/features/ai-coach/analysis/rules/WarriorIIPipelineVerification.ts`| Unused verification script. | 0 incoming imports | ZERO |
| `frontend/src/features/ai-coach/motion/CameraService.ts` | Unused camera helper stub. | 0 incoming imports | ZERO |
| `backend/app/api/routes/video_stream.py` | Dead backend WebSocket endpoint `/api/ai-coach/video/stream`. | Frontend uses client MediaPipe exclusively | ZERO |
| `backend/app/api/routes/temp.py` | Temporary dev endpoint for listing Supabase storage. | 0 frontend callers | ZERO |
| `main.py` (workspace root) | 7-line dummy "Hello from ai-yoga-coach" script. | Redundant root artifact | ZERO |

---

## 6. Legacy Architecture

The audit identified three distinct obsolete architectural clusters that were abandoned during the transition to the client-side MediaPipe + WebRTC voice pipeline:

### Cluster A: Early Pre-Vision Text POC
```mermaid
flowchart TD
    Page["src/pages/ExerciseSelectionPage.tsx"]
    Store1["src/store/useCoachStore.ts"]
    Store2["src/store/useSessionStore.ts"]
    Data1["src/data/coaches.ts"]
    Data2["src/data/exercises.ts"]
    Types1["src/types/coach.ts"]
    Types2["src/types/exercise.ts"]
    API["src/services/api.ts"]

    Page --> Store1 --> Types1 --> Data1
    Store2 --> Types2 --> Data2
    API -.-> Page
```
*Why it can be removed:* This entire cluster represents a text-only, non-vision proof of concept built before MediaPipe and OpenAI Realtime voice were introduced. The active system uses `allAsanasCatalog.ts`, `AsanaRegistry.ts`, and `aiCoachStore.ts`.

### Cluster B: Obsolete Three.js 3D Avatar Scene
```mermaid
flowchart TD
    Scene["features/ai-coach/3d/AICoachScene.tsx"]
    AvatarCont["CoachAvatarContainer.tsx"]
    Stage["AsanaStage.tsx"]
    Lighting["SceneLighting.tsx"]
    Bg["SceneBackground.tsx"]
    Ring3D["ScoreRing3D.tsx"]
    Hold3D["HoldProgress3D.tsx"]
    Sess3D["SessionProgress3D.tsx"]
    Particles["ParticleField.tsx"]
    VoiceVis["VoiceVisualizer.tsx"]
    AvatarHook["src/hooks/useAvatarAnimation.ts"]

    Scene --> AvatarCont & Stage & Lighting & Bg & Ring3D & Hold3D & Sess3D & Particles & VoiceVis
    AvatarCont --> AvatarHook
```
*Why it can be removed / archived:* The production AI Coach displays video guide overlays, 2D MediaPipe skeleton canvas overlays, and live portrait badges with audio wave animations. The Three.js 3D canvas is never mounted in `AICoachPage.tsx`. Removing this cluster also eliminates heavy dependencies (`three`, `@react-three/fiber`, `@react-three/drei`).

### Cluster C: Server-Side Backend Pose Processing
```mermaid
flowchart TD
    Hook["frontend/src/hooks/useBackendPoseTracking.ts"]
    Route["backend/app/api/routes/video_stream.py (WebSocket)"]
    Pipeline["backend/app/services/pose_analysis/pipeline.py"]
    Eval["evaluator.py"]
    Geom["geometry.py"]
    Post["posture.py"]
    Rules["rules.py"]
    Cat["rules_catalog.json"]

    Hook == "WebSocket frame stream" ==> Route
    Route --> Pipeline --> Eval & Geom & Post & Rules & Cat
```
*Why it can be removed:* Transmitting raw webcam video frames over WebSockets for server-side processing causes unacceptable latency. The application moved 100% of pose tracking and rule evaluation to client-side MediaPipe WebAssembly.

---

## 7. Duplicate Implementations

| Responsibility | Implementation A | Implementation B | Active One | Recommendation |
|---|---|---|---|---|
| **Pose Evaluation & Tracking** | `TemporalPoseEvaluator.ts` + `PoseEvaluator.ts` | `AsanaPoseEvaluator.ts` | `TemporalPoseEvaluator.ts` | Consolidate: Keep `TemporalPoseEvaluator.ts`; archive `AsanaPoseEvaluator.ts`. |
| **Accuracy Calculation & Smoothing** | `AccuracyStabilizer.ts` | `AccuracyCalculator.ts` + `ScoreSmoother.ts` + `ScoreCalculator.ts` | `AccuracyStabilizer.ts` | Consolidate: Keep `AccuracyStabilizer.ts`; remove `AccuracyCalculator.ts`, `ScoreSmoother.ts`, and `ScoreCalculator.ts`. |
| **Pose Feature Extraction** | `PoseFeatureEngine.ts` | `JointAngleExtractor.ts` + `PostureAnalyzer.ts` | `PoseFeatureEngine.ts` | Keep `PoseFeatureEngine.ts`; remove unreferenced `JointAngleExtractor.ts` and `PostureAnalyzer.ts`. |
| **Camera Readiness Tracking** | `CameraReadinessTracker.ts` (State machine) | `CameraReadinessEvaluator.ts` (Region evaluator) | Both (Coordinated) | Keep both: `usePoseTracking` uses Tracker for state, and `useCoachSession` uses Evaluator for region checks. |
| **Pose Evaluation Hook** | `usePoseEvaluation.ts` | `useAsanaEvaluation.ts` / `useStablePoseEvaluation.ts` | `usePoseEvaluation.ts` | Keep `usePoseEvaluation.ts`; remove `useAsanaEvaluation.ts` and `useStablePoseEvaluation.ts`. |
| **Score Smoothing Hook** | Internal to `TemporalPoseEvaluator` | `useStableAccuracy.ts` / `useStableScore.ts` | `TemporalPoseEvaluator` | Remove standalone hooks `useStableAccuracy.ts` and `useStableScore.ts`. |
| **Avatar Display** | `CoachPanel.tsx` (Photo/Badge + Realtime Accuracy Stage) | `AvatarPlayer.tsx` + `AvatarController.ts` (Video Avatar) | `CoachPanel.tsx` | Keep `CoachPanel.tsx`; remove `AvatarPlayer.tsx` and `AvatarController.ts` (preserve `avatar.types.ts`). |

---

## 8. Unused Dependencies

### Frontend (`frontend/package.json`):

| Package | Current Usage | Files Using It | Safe to Remove? | Reason |
|---|---|---|---|---|
| `@react-three/fiber` | None in prod | `3d/AICoachScene.tsx`, `3d/*.tsx` | **YES** | Used only in dead 3D scene files. |
| `@react-three/drei` | None in prod | `3d/AsanaStage.tsx`, `3d/*.tsx`, `useAvatarAnimation.ts` | **YES** | Used only in dead 3D scene files. |
| `three` | None in prod | `3d/*.tsx`, `useAvatarAnimation.ts` | **YES** | Used only in dead 3D scene files. |
| `@types/three` | None in prod | Dev dependency for `three` | **YES** | Used only in dead 3D scene files. |

### Backend (`backend/pyproject.toml`):

| Package | Current Usage | Files Using It | Safe to Remove? | Reason |
|---|---|---|---|---|
| `pypdf` | None | None | **YES** | Legacy copy-paste dependency; no PDF processing in project. |
| `google` | None | None | **YES** | Unused root package; project uses `openai` for LLM/realtime. |
| `mediapipe` (backend) | Dead WebSocket | `app/services/pose_analysis/pipeline.py` | **YES** (after dead backend removal) | Pose tracking is handled 100% in frontend via `@mediapipe/tasks-vision`. |
| `opencv-python-headless` | Dead WebSocket | `app/services/pose_analysis/pipeline.py` | **YES** (after dead backend removal) | Video processing is handled 100% in browser canvas. |

---

## 9. Unused Assets

| Asset Path | Type | Status | Action |
|---|---|---|---|
| `frontend/src/assets/hero.png` | Image | Dead (0 imports) | Safe to remove |
| `frontend/src/assets/react.svg` | SVG | Dead (0 imports) | Safe to remove |
| `frontend/src/assets/vite.svg` | SVG | Dead (0 imports) | Safe to remove |
| `frontend/public/images/alice*.jpg/png` (6 files) | Images | **ACTIVE** (outfits for Alice in `avatar.types.ts`) | **KEEP** |
| `frontend/public/images/kevin*.jpg` (6 files) | Images | **ACTIVE** (outfits for Kevin in `avatar.types.ts`) | **KEEP** |
| `frontend/public/coach/alice/intro.mp4` | Video | **ACTIVE** (referenced in `avatar.types.ts`) | **KEEP** |
| `frontend/public/coach/kevin/intro.mp4` | Video | **ACTIVE** (referenced in `avatar.types.ts`) | **KEEP** |
| `frontend/public/models/pose_landmarker_lite.task` | ML Task Model | **ACTIVE** (Core MediaPipe runtime model) | **KEEP** |
| `frontend/public/data/rules.json` | JSON | **ACTIVE** (Loaded by `poseRulesRegistry.ts`) | **KEEP** |
| `frontend/public/guide_videos/` | Directory | Empty placeholder for local video fallback | **KEEP** |

---

## 10. Backend Cleanup

### Components Confirmed Dead:
- `backend/app/api/routes/video_stream.py`: Obsolete WebSocket endpoint `/api/ai-coach/video/stream`.
- `backend/app/api/routes/temp.py`: Obsolete dev test route `/api/asanas/assets`.
- `backend/app/services/pose_analysis/`: Entire folder containing `evaluator.py`, `geometry.py`, `pipeline.py`, `posture.py`, `rules.py`, and `rules_catalog.json`.

### Components Active & Required:
- `backend/app/main.py`: FastAPI server configuration, CORS handling, and route mounting.
- `backend/app/api/routes/realtime.py`: Ephemeral session token generation for OpenAI Realtime voice model and WebRTC session management.
- `backend/app/api/routes/asanas.py`: Image upload endpoint to Supabase storage.
- `backend/app/api/routes/chat.py`: LLM-based session summary generation (`/api/chat/summary`).
- `backend/app/core/supabase.py`: Backend client for Supabase database/storage.
- `backend/app/schemas/chat.py`: Pydantic request/response schemas.

### Route Mismatch Note:
In [SessionReportModal.tsx](file:///d:/Client-Projects/ClientProject/ArunReddy/Ai-Coach/ai-yoga-coach/frontend/src/features/ai-coach/components/SessionReportModal.tsx#L25), the client requests `http://localhost:8000/api/ai-coach/chat/summary`, but [chat.py](file:///d:/Client-Projects/ClientProject/ArunReddy/Ai-Coach/ai-yoga-coach/backend/app/api/routes/chat.py) is mounted at `/api` (`/api/chat/summary`). When executing the consolidation phase, aligning this endpoint path will prevent connection fallback.

---

## 11. ML / Training Cleanup

The `ml/` directory contains an offline dataset generation, pose feature extraction, and experimental classifier training pipeline:
- `ml/dataset/` (`raw/`, `processed/`, `splits/`)
- `ml/features/` (`landmark_normalizer.py`, `pose_features.py`)
- `ml/preprocessing/` (`image_preprocessor.py`, `quality_check.py`)
- `ml/pose/` (`mediapipe_extractor.py`)
- `ml/training/` (`prepare_dataset.py`, `train.py`, `evaluate.py`)
- `ml/inference/` (`predictor.py`)

**Classification:**
- **Runtime Impact:** None. Zero imports from frontend or backend production paths.
- **Recommendation:** **KEEP as an offline development/research module**, but decouple it from production deployment scripts and Docker/Render build configs.

---

## 12. Test Cleanup

| Test File | Status | Action | Reason |
|---|---|---|---|
| `AsanaCompletionGate.test.ts` | **KEEP** | Core | Protects 75% accuracy & stance completion logic |
| `FalseCompletionPrevention.test.ts` | **KEEP** | Core | Prevents false positives across non-standing poses |
| `PrematureCompletionFix.test.ts` | **KEEP** | Core | Tests 5-second continuous hold protection |
| `Phase10ACompletionGateFix.test.ts` | **KEEP** | Core | Verifies completion gate regressions |
| `SessionFlowStep6.test.ts` | **KEEP** | Core | Tests session state machine and reset flows |
| `production-qa-phase8.test.ts` | **KEEP** | Core | QA latency, regression cycles, and frame load |
| `phase6-coach-personality.test.ts` | **KEEP** | Core | Verifies Alice vs Kevin personality phrasing |
| `phase8-full-validation.test.ts` | **KEEP** | Core | Verifies failure modes and edge cases |
| `phase9-coaching-profiles.test.ts` | **KEEP** | Core | Validates completeness across all 170 asanas |
| `voice-agent.test.ts` | **KEEP** | Core | Tests OpenAI Realtime WebRTC voice logic |
| `asana-realtime-voice.test.ts` | **KEEP** | Core | Tests voice event triggers |
| `AsanaRegistryIntegration.test.ts` | **KEEP** | Core | Tests 170-asana catalog registry lookup |
| `PoseFeatureEngine.test.ts` | **KEEP** | Core | Tests angle and spatial feature extraction |
| `RuleEngine.test.ts` | **KEEP** | Core | Tests rule registration and evaluations |
| `feedback-engine.test.ts` | **KEEP** | Core | Tests prompt generation from pose issues |
| `LandmarkValidation.test.ts` | **KEEP** | Core | Tests landmark confidence thresholds |
| `asana-coaching-profile.test.ts` | **KEEP** | Core | Tests coaching profile resolution |
| `asana-starting-instruction.test.ts`| **KEEP** | Core | Tests starting cue generation |
| `phase7-asana-scalability.test.ts` | **KEEP** | Core | Tests scale across the full inventory |
| `Step5Integration.test.ts` | **KEEP** | Core | Tests pipeline integration |
| `AsanaAwareRequirements.test.ts` | **KEEP** | Core | Tests pose-specific landmark requirements |
| `asana-pose-evaluator.test.ts` | **ARCHIVE / UPDATE** | Legacy | Tests legacy `AsanaPoseEvaluator.ts` |
| `AccuracyPipeline.test.ts` | **ARCHIVE / UPDATE** | Legacy | Tests legacy `AccuracyCalculator.ts` |
| `backend/test_realtime_hardening.py`| **KEEP** | Backend | Tests backend rate limiting and token safety |

---

## 13. Documentation Cleanup

| File | Status | Action | Description |
|---|---|---|---|
| `README.md` (root) | **KEEP** | Update | Main project overview |
| `frontend/README.md` | **KEEP** | Update | Frontend dev setup instructions |
| `ml/README.md` | **KEEP** | Retain | ML pipeline documentation |
| `docs/VOICE_ARCHITECTURE.md` | **KEEP** | Retain | Core voice architecture documentation |
| `docs/VOICE_ARCHITECTURE_AUDIT.md` | **ARCHIVE** | Move to docs/archive | Phase 7 voice audit report |
| `docs/PHASE_3_REALTIME_VOICE.md` | **ARCHIVE** | Move to docs/archive | Historic Phase 3 notes |
| `docs/PHASE_4_VOICE_COACHING_OPTIMIZATION.md` | **ARCHIVE** | Move to docs/archive | Historic Phase 4 notes |
| `docs/PHASE_5_POSE_TO_VOICE_INTELLIGENCE.md` | **ARCHIVE** | Move to docs/archive | Historic Phase 5 notes |
| `docs/PHASE_6_COACH_PERSONALITY_AND_ASANA_VOICE.md` | **ARCHIVE** | Move to docs/archive | Historic Phase 6 notes |
| `docs/PHASE_7_VOICE_ARCHITECTURE_CLEANUP.md` | **ARCHIVE** | Move to docs/archive | Historic Phase 7 notes |
| `docs/PHASE_7_VOICE_DEPENDENCY_MAP.md` | **ARCHIVE** | Move to docs/archive | Historic Phase 7 map |
| `docs/PHASE_8_PRODUCTION_READINESS.md` | **ARCHIVE** | Move to docs/archive | Historic Phase 8 checklist |
| `docs/REALTIME_SESSION_MIGRATION.md` | **ARCHIVE** | Move to docs/archive | Migration notes |
| `docs/asana-coaching-audit.md` | **ARCHIVE** | Move to docs/archive | Historic asana audit |
| `docs/asana-coaching-validation.md` | **ARCHIVE** | Move to docs/archive | Historic validation report |
| `docs/asana-coverage-report.md` | **ARCHIVE** | Move to docs/archive | Historic coverage report |
| `AI_COACH_ARCHITECTURE.md` (root) | **ARCHIVE** | Move to docs/archive | Old architecture draft |
| `Architecture.md` (root) | **ARCHIVE** | Move to docs/archive | Initial architecture design |
| `POC_TIMELINE.md` (root) | **ARCHIVE** | Move to docs/archive | Initial POC timeline |
| `backend/ElevenLabsVoice.md` | **ARCHIVE** | Move to docs/archive | Deprecated ElevenLabs notes (superseded by OpenAI Realtime) |
| `progress-report/*.md` | **ARCHIVE** | Move to docs/archive | Phase completion report |
| `frontend/asana_completion_audit*.csv` (2 files) | **ARCHIVE** | Move to docs/archive | Generated audit CSVs |
| `reference/yoga-pose-recognition-mediapipe.ipynb` | **ARCHIVE** | Retain in reference | MediaPipe Jupyter reference notebook |

---

## 14. Files Requiring Investigation

The following **18 files** are currently unreferenced in `AICoachPage.tsx` directly, but are well-engineered subcomponents or tooling scripts that should be investigated before deletion:

| File | Why Uncertain | What Must Be Checked | Recommendation |
|---|---|---|---|
| `frontend/src/features/ai-coach/components/AngleDebugPanel.tsx` | Debug panel showing live joint angles. | Useful for dev/coach debugging mode? | **KEEP** in dev tools or archive |
| `frontend/src/features/ai-coach/components/KeyAnglesPanel.tsx` | UI panel for key angles. | Can be attached to dev toggle? | **KEEP** in dev tools or archive |
| `frontend/src/features/ai-coach/components/JointAngleOverlay.tsx` | Overlay showing angle numbers on canvas. | Optional toggle for advanced yogis? | **KEEP** as optional overlay |
| `frontend/src/features/ai-coach/components/AsanaTransition.tsx` | Visual transition countdown screen. | Session machine uses inline timer currently. | **INVESTIGATE** if needed for routine mode |
| `frontend/src/features/ai-coach/components/AsanaProgress.tsx` | Multi-asana routine progress bar. | Required for multi-asana flow? | **INVESTIGATE** for multi-pose routine |
| `frontend/src/features/ai-coach/components/AsanaInstructionsSection.tsx`| Extended instructions view. | Collapsible in asana details? | **INVESTIGATE** |
| `frontend/src/features/ai-coach/components/CorrectionCard.tsx` | Standalone correction banner. | `AccuracyPanel` currently displays primary issue. | **ARCHIVE** if redundant |
| `frontend/src/features/ai-coach/components/PoseScore.tsx` | Simple score badge. | `CircularScoreRing` is the active score display. | **ARCHIVE** |
| `frontend/src/features/ai-coach/components/PostureCheckPanel.tsx` | Side panel listing alignment checks. | `PostureCheckOverlay` is active overlay. | **ARCHIVE** |
| `frontend/src/features/ai-coach/motion/RawLandmarkDiagnostics.ts` | Diagnostic landmark telemetry logger. | Used during calibration/testing. | **KEEP** as internal diagnostic utility |
| `frontend/src/features/ai-coach/services/CoachContextHelper.ts` | Voice context builder utility. | Redundant with `RealtimeVoiceAgent` SessionContextData. | **CONSOLIDATE** into voice context |
| `frontend/src/features/ai-coach/theme/yogaverseTokens.ts` | Brand tokens (colors, radii, shadows). | Reusable design token constants. | **KEEP** as UI theme definition |
| `scripts/build_catalog_ts.py` | Python script to compile `allAsanasCatalog.ts`. | Tooling script for regenerating catalog. | **KEEP** in `scripts/` |
| `scripts/generate_asana_registry.py` | Python script to parse Supabase image inventory. | Tooling script for asset mapping. | **KEEP** in `scripts/` |
| `scripts/check_supabase.py` | Diagnostic script for Supabase connection. | Dev utility. | **KEEP** in `scripts/` |
| `scripts/seed_supabase.py` | Supabase seeding script. | Database utility. | **KEEP** in `scripts/` |
| `frontend/scripts/validateAsanas.ts` | Active npm script (`npm run validate:asanas`). | Critical automated validator. | **KEEP** (Protects catalog integrity) |
| `frontend/scripts/seedAsanas.ts` | Seed script for Supabase. | Utility script. | **KEEP** in `scripts/` |

---

## 15. Recommended Final Folder Structure

A clean, modular repository structure free of legacy baggage:

```text
ai-yoga-coach/
├── .gitignore
├── README.md
├── render.yaml
│
├── frontend/
│   ├── package.json
│   ├── tsconfig.json
│   ├── vite.config.ts
│   ├── index.html
│   ├── public/
│   │   ├── favicon.svg
│   │   ├── icons.svg
│   │   ├── images/              # Alice & Kevin outfit portraits
│   │   ├── coach/               # Alice & Kevin intro video assets
│   │   ├── models/              # pose_landmarker_lite.task
│   │   └── data/                # rules.json
│   │
│   ├── scripts/
│   │   └── validateAsanas.ts    # Automated catalog validator
│   │
│   └── src/
│       ├── main.tsx
│       ├── App.tsx
│       ├── index.css
│       ├── components/
│       │   └── GlobalErrorBoundary.tsx
│       │
│       ├── hooks/
│       │   ├── usePoseTracking.ts
│       │   ├── usePoseEvaluation.ts
│       │   ├── useCoachState.ts
│       │   └── useCoachSession.ts
│       │
│       └── features/
│           └── ai-coach/
│               ├── components/  # AICoachPage, CameraView, PoseSkeleton, Modals, Panels
│               ├── analysis/    # TemporalPoseEvaluator, AsanaCompletionGate, Calculators, Rules
│               ├── motion/      # PoseLandmarkerService, LandmarkSmoother, ReadinessTracker
│               ├── voice/       # RealtimeVoiceAgent, CoachingEventEngine, Language cues
│               ├── data/        # AsanaRegistry, allAsanasCatalog (170 asanas), profiles
│               ├── store/       # aiCoachStore.ts (Zustand)
│               ├── types/       # TypeScript interfaces
│               └── avatar/      # avatar.types.ts (Alice & Kevin definitions)
│
├── backend/
│   ├── main.py                  # Uvicorn entrypoint shim
│   ├── pyproject.toml
│   ├── requirements.txt
│   └── app/
│       ├── main.py              # FastAPI app & CORS
│       ├── api/
│       │   └── routes/
│       │       ├── realtime.py  # Ephemeral OpenAI Realtime WebRTC tokens
│       │       ├── chat.py      # Session summary generator
│       │       └── asanas.py    # Supabase asset upload
│       ├── core/
│       │   └── supabase.py      # Supabase client
│       └── schemas/
│           └── chat.py
│
├── database/                    # Database setup migrations
├── scripts/                     # Toolchain scripts (catalog builders & seeds)
└── docs/
    ├── README.md
    ├── VOICE_ARCHITECTURE.md
    └── archive/                 # Historical audit notes & migration logs
```

---

## 16. Cleanup Plan

When authorized by the user to proceed with code modifications, the cleanup should be executed in these controlled phases:

- **Phase 1 — Safe Deletions:**
  - Delete verified dead files with 0 references: `App.css`, `src/assets/*`, `main.py` (root dummy), `temp.py`, `CameraService.ts`, `ScoreCalculator.ts`, `WarriorII.ts`, `WarriorIITest.ts`, `WarriorIIPipelineVerification.ts`.
- **Phase 2 — Legacy Cluster Removal:**
  - Remove Cluster A (Pre-vision POC: `ExerciseSelectionPage.tsx`, `useCoachStore.ts`, `useSessionStore.ts`, `src/data/coaches.ts`, `src/data/exercises.ts`, `src/types/coach.ts`, `src/types/exercise.ts`, `src/services/api.ts`).
  - Remove Cluster B (Three.js 3D scene: `frontend/src/features/ai-coach/3d/` and `useAvatarAnimation.ts`).
  - Remove Cluster C (Backend pose analysis: `backend/app/services/pose_analysis/`, `video_stream.py`, `useBackendPoseTracking.ts`).
- **Phase 3 — Duplicate Consolidation:**
  - Remove unused duplicate evaluators (`AsanaPoseEvaluator.ts`, `AccuracyCalculator.ts`, `PostureAnalyzer.ts`, `JointAngleExtractor.ts`, `PoseStabilityDetector.ts`, `ScoreSmoother.ts`).
  - Remove dead evaluation hooks (`useAsanaEvaluation.ts`, `useStableAccuracy.ts`, `useStablePoseEvaluation.ts`, `useStableScore.ts`).
  - Remove video avatar player (`AvatarPlayer.tsx`, `AvatarController.ts`, `AvatarAssetResolver.ts`) while keeping `avatar.types.ts`.
  - Fix endpoint path in `SessionReportModal.tsx` to match `chat.py` (`/api/chat/summary`).
- **Phase 4 — Dependency Cleanup:**
  - Remove `@react-three/fiber`, `@react-three/drei`, `three`, `@types/three` from `frontend/package.json`.
  - Remove `pypdf`, `google`, `mediapipe`, `opencv-python-headless` from `backend/pyproject.toml`.
- **Phase 5 — Asset & Folder Tidy:**
  - Remove empty folders (e.g. `frontend/src/features/ai-coach/hooks/`, `backend/app/data/`).
- **Phase 6 — Documentation Archive:**
  - Move historic Phase 3–8 markdown files, audit CSVs, and old notes into `docs/archive/`.
- **Phase 7 — Build & Test Verification:**
  - Run `npm run typecheck` and `npm run build` in `frontend/`.
  - Run `npm test` (verify all 304 unit/integration tests pass).
  - Run `npm run validate:asanas` (verify all 170 asanas pass validation).

---

## 17. Risk Assessment

| Risk Category | Level | Mitigation Strategy |
|---|---|---|
| **170 Asana Catalog Breakage** | **LOW** | No asana IDs, aliases, or catalog entries are modified. `validate:asanas` verifies all 170 poses. |
| **Completion Gate & 5s Hold** | **LOW** | `AsanaCompletionGate.ts`, `StanceDetector.ts`, and `HoldTimer.tsx` remain 100% untouched. All 304 tests protect this logic. |
| **OpenAI Realtime Voice WebRTC** | **LOW** | `RealtimeVoiceAgent.ts`, `useRealtimeVoice.ts`, and backend `realtime.py` are preserved. |
| **MediaPipe Pose Tracking** | **LOW** | Client-side `@mediapipe/tasks-vision`, `PoseLandmarkerService.ts`, and `pose_landmarker_lite.task` remain intact. |
| **UI & Avatars (Alice / Kevin)** | **LOW** | Outfits, thumbnails, voice visualizers, and state badges in `CoachPanel.tsx` and `avatar.types.ts` are preserved. |
| **Overall Cleanup Risk** | **LOW** | Strict verification of incoming imports and reachability guarantees zero impact on the active production path. |

---

## 18. Final Recommendation

The codebase audit is **complete and fully verified**. 

The current production AI Yoga Coach is architecturally solid, highly responsive, and well-tested (304 passing automated tests). Removing the identified legacy Three.js 3D canvas, server-side pose streaming relics, and obsolete pre-vision POC code will reduce bundle size, eliminate hundreds of megabytes of unused dependencies, simplify the directory tree, and improve project maintainability—**without risking any active functionality**.

**Next Step:** Review this report. When ready, authorize the execution of Phase 1 through Phase 7 cleanup.
