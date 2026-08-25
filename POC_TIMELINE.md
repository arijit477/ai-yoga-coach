# AI Yoga Coach

## Interactive 3D Yoga Instruction & Coaching Engine
*Proof of Concept — Client Presentation*

| Document Type | Proof of Concept (POC v1.0) Summary |
| :--- | :--- |
| **Prepared For** | Client Stakeholder Review |
| **Domain** | Health, Wellness & AI Fitness EdTech |
| **Status** | Live — Deployed & Available for Evaluation |
| **Date** | 25 August 2026 |

---

### 1. Executive Summary

AI Yoga Coach is a proof-of-concept interactive wellness platform built to close a persistent engagement gap in at-home fitness: the disconnect between static workout videos and personalized, real-time coaching. Left unaddressed, this gap leads to user drop-off, incorrect posture habits, and a lack of motivation.

This POC demonstrates a working, deployed application that integrates 3D avatar rendering with large language model (LLM) conversational AI. It gives users a personalized, interactive coaching experience where they can select a coach, follow guided poses, and ask questions in real-time, receiving context-aware advice.

**WHAT THIS POC PROVES**
*   A functioning end-to-end pipeline from the React frontend to FastAPI and OpenAI's GPT-4o-mini.
*   Seamless, high-performance rendering of 3D `.fbx` avatars (Maya and Arjun) in the browser at 60 FPS.
*   A decision-ready conversational AI matrix that strictly adheres to safety constraints and contextualizes advice based on the active yoga pose.
*   An extensible architecture (React 19, FastAPI, Three.js) ready to scale from POC to a production-grade consumer application.

### 2. Business Problem & Objectives

Fitness enthusiasts practicing yoga at home frequently experience a lack of motivation and guidance because traditional apps rely on pre-recorded, one-way video content. Questions about form, breathing, or modifications go unanswered. 

The result is three recurring blind spots that AI Yoga Coach was scoped to solve:
*   **Lack of Personalization** — Users cannot tailor the coaching style (e.g., calm vs. energetic) to their daily mood.
*   **Zero Real-Time Interaction** — Users cannot ask questions about the pose they are currently struggling with.
*   **Static Visuals** — 2D videos do not allow users to rotate the camera or view the pose from multiple angles.

### 3. Solution Overview: Interactive Coaching Engine

The core engine resolves the disconnect between user and app by marrying 3D spatial rendering with contextual LLM prompts. 

**Frontend 3D Rendering Pool**
> Renders Maya/Arjun `.fbx` models via React Three Fiber
> ▼ *State synced via Zustand*

**Backend Contextual AI Engine**
> Injects the current pose (e.g., "Tree Pose") and chosen coach personality into the OpenAI prompt to generate hyper-relevant, safe feedback.

### 4. Live Deployment & Client Access

AI Yoga Coach is fully deployed and available for live, hands-on evaluation — no local installation required.

| Environment | Platform | Address |
| :--- | :--- | :--- |
| **Frontend Web App** | Vercel | aiyogacoach.vercel.app |
| **Backend REST API** | Render | api-aiyogacoach.onrender.com |
| **Swagger API Docs** | Render | api-aiyogacoach.onrender.com/docs |

**Demo Access Credentials**
One-click login buttons for each role are built into the web app header for fast access during review sessions.

| Role | Email | Password | Access Rights |
| :--- | :--- | :--- | :--- |
| **Admin Controller** | admin@aiyogacoach.in | Admin123! | Full system & prompt tuning controls |
| **Standard User** | user@aiyogacoach.in | User123! | Yoga sessions & chat |

### 5. POC Data Scope & Volume

The POC is seeded with a highly curated dataset sized to demonstrate the coaching engine at a meaningful scale:

| Dimension | Count / Scale | Description |
| :--- | :--- | :--- |
| **3D Coach Avatars** | 2 Models | "Maya" (Calm) and "Arjun" (Energetic) |
| **Yoga Poses** | 5 Core Poses | Tree Pose, Downward Dog, Warrior II, etc. |
| **AI Personas** | 2 Personas | Distinct LLM system prompt instructions |
| **Animations** | 10+ Clips | Idle, Talking, and Pose-specific `.fbx` animations |

### 6. Core Modules & Features

**6.1. Coach Selection Dashboard**
*   High-fidelity profile cards with Pixar-style 3D rendered profile pictures.
*   Dynamic background gradients and hover animations for premium UI feel.

**6.2. Interactive 3D Yoga Session**
*   Sub-second loading of optimized 3D avatars via `useFBX`.
*   Interactive `OrbitControls` allowing users to view the coach from any angle.

**6.3. Conversational AI Chat Panel**
*   Context-aware chat that knows which coach is active and what pose is being taught.
*   Strict safety guardrails to prevent the AI from diagnosing medical conditions.

### 7. Technology Architecture

AI Yoga Coach is built on a modern, cleanly separated three-tier stack, chosen for rapid iteration during the POC phase and a direct path to production scale.

**React 19 + Vite 8 + Tailwind v4 + Three.js**
> Frontend — deployed on Vercel
> ▼ *REST / JSON*

**FastAPI + Uvicorn**
> Backend — deployed on Render
> ▼ *REST API*

**OpenAI GPT-4o-mini**
> LLM Inference Engine

### 8. Quality & Performance Verification

| 60 FPS | < 800 ms | 100% |
| :--- | :--- | :--- |
| Consistent 3D render frame rate | API response time for AI Chat | Passes on all safety constraint tests |

Production build completes with zero lint or build errors, confirming the codebase is clean and deployment-ready for the next phase.

### 9. Recommended Next Steps

This POC validates the core interactive 3D AI coaching model. To move from POC to a production rollout, we recommend:
*   **Stakeholder Walkthrough** — A guided session to experience the conversational AI capabilities.
*   **Animation Rigging** — Hooking up the existing 3D skeletons to specific yoga pose animation clips.
*   **Voice Integration (TTS)** — Connecting the OpenAI text responses to a low-latency Text-to-Speech API like ElevenLabs.
*   **Production Hardening** — Implementing a real database (PostgreSQL) for user accounts and session history.

### 10. Proposed 12-Week Project Timeline

The AI Yoga Coach solution can be developed and delivered through a structured 12-week implementation plan (grouped in 2-week sprints), focused on clear business outcomes.

| Phase (Weeks) | Focus Area | Key Activities | Expected Outcome |
| :--- | :--- | :--- | :--- |
| **Weeks 1-2** | Business Understanding & UI Foundation | Confirm user flow requirements. Wireframe UI. Setup Vite, Tailwind v4, and FastAPI repositories. | Finalized design system, data structure, and implementation plan. |
| **Weeks 3-4** | 3D Asset Integration & Rendering | Procure and optimize `.fbx` models. Build the React Three Fiber `<Canvas>` and load avatars safely. | Centralized 3D rendering pipeline ready for animations. |
| **Weeks 5-6** | Core Application UI & State | Build Coach Selection and Yoga Session dashboards. Implement Zustand state management. | High-fidelity frontend UI with actionable navigation. |
| **Weeks 7-8** | AI Integration & Backend API | Connect FastAPI to OpenAI. Write system prompts for Maya and Arjun. Ensure safety constraints. | Working AI Chat panel that responds in character. |
| **Weeks 9-10** | Animations & Voice (TTS) | Rig 3D models with pose animations. Integrate Text-to-Speech so the coaches can talk. | Fully interactive, talking 3D coach experience. |
| **Weeks 11-12** | Testing, Deployment & Client Validation | Conduct end-to-end testing, optimize 3D performance, user acceptance testing, and stakeholder walkthrough. | Fully validated POC ready for client evaluation and transition toward production. |
