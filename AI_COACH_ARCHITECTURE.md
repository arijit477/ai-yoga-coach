# AI Yoga Coach - Architecture & Technical Overview

## 1. Project Overview
AI Yoga Coach is an advanced, real-time web application that provides live posture feedback and voice guidance. It uses strictly on-device machine learning (Google MediaPipe) to track user joints via the webcam and evaluate their yoga form without sending private camera data to the cloud.

## 2. Frontend Architecture
The frontend is a modern Single Page Application built with **React (Vite)**, **TypeScript**, and **Tailwind CSS**. 

### Core State & Logic
* **Zustand (`aiCoachStore.ts`)**: Manages the global state of the application, such as the currently selected coach persona and the active asana.
* **Session State Machine (`useCoachSession.ts`)**: Acts as the "brain" of the coaching flow. It transitions the user through different states such as `get_ready`, `coaching` (step-by-step guidance), `camera_check`, and `holding` (evaluating the pose over a set duration).

### Computer Vision Pipeline
* **`usePoseTracking.ts`**: The primary hook that bridges React and the ML models. It establishes a `requestAnimationFrame` (RAF) loop that constantly feeds camera frames to the processor.
* **`MotionFrameProcessor.ts`**: The workhorse of the vision system. It wraps the `PoseLandmarkerService`, skips duplicated frames, applies mathematical smoothing (to prevent jitter), extracts spatial features (joint angles), and returns a clean `PoseTrackingResult`.
* **`CameraReadinessTracker.ts`**: A utility that analyzes the raw landmarks to determine if the user is fully in-frame, partially out of frame, or completely missing, adding debouncing to prevent flickering UI states.

### Key UI Components
* **`AICoachPage.tsx`**: The main view controller. It handles the layout for both the standard view and "Cinema Mode" (Full Screen), conditionally rendering UI overlays like countdowns, guidance banners, and the coach dropdown.
* **`CameraView.tsx`**: Manages the physical `<video>` element and WebRTC `getUserMedia` stream. It handles camera initialization, permissions, and stream cleanup.
* **`PoseSkeleton.tsx`**: Responsible for taking the processed 3D landmarks and drawing a responsive SVG skeleton perfectly scaled over the user's camera feed.

## 3. Backend & External Integrations
* **Supabase**: Serves as the primary database for the application. It stores the extensive catalog of Asana definitions (names, instructions, required landmarks, and storage paths for media assets). `AsanaRegistry.ts` acts as the frontend interface to this database.
* **Python FastAPI**: A lightweight backend server (`backend/main.py`) responsible for handling secure API interactions, such as generating real-time AI voice cues using ElevenLabs.

---

## 4. Recent Technical Fixes & Bug Reports

We recently performed a complete audit and stabilized several core systems of the application.

### A. Streamlined User Experience (UX)
* **Removed Intro Transition Video**: The session state machine was updated to bypass the `guide_video` state. Users now drop directly into the action when moving between asanas.
* **Removed Camera Check Popups**: The orange "Adjust your position or lighting" banners were removed from both Standard and Cinema modes to declutter the UI.
* **Fixed Full Screen Dropdown Limitations**: In Cinema Mode, the `AsanaSelector` was previously hardcoded to only show `sessionAsanas` (a limited subset). It was updated to use the Supabase-integrated `getAllAsanas()` method, granting full access to the database catalog just like the standard view.

### B. Critical Pose Tracking & Freezing Bugs (Resolved)
**Bug Report:** 
Users reported that switching between coaches or toggling Full Screen mode caused the skeleton tracker to either disappear permanently or freeze as a "ghost" over a black screen.

**Root Causes:**
1. **MediaPipe Timestamp Crash**: Google's `PoseLandmarker` requires frame timestamps to be strictly monotonically increasing. The system was using `video.currentTime`. When the camera rebuilt itself (e.g., entering Full Screen), `currentTime` reset to `0`, causing the internal ML engine to crash instantly and permanently.
2. **Stale Component Refs**: The `requestAnimationFrame` loop in `usePoseTracking` was not detecting that the physical `<video>` element had been swapped out by React.

**Technical Solutions:**
1. **Migrated to `performance.now()`**: Inside `MotionFrameProcessor.ts`, the timestamp was decoupled from the video element and mapped to the browser's high-resolution timer. This guarantees that timestamps are always increasing, making the ML engine completely immune to camera lifecycle changes, restarts, or dropped frames.
2. **Dynamic Video Tracking & Cleanup**: Added logic inside the tracking loop to detect when the physical `videoElement` reference changes. If a change is detected (like switching to Cinema Mode), it automatically calls `processor.reset()` and immediately flushes the old skeleton data (`setResult(null)`). This prevents frozen skeletons while the new camera stream is loading.
