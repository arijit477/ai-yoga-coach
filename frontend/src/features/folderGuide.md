What each folder will contain

We'll use these folders for specific responsibilities.

components

UI only.

components/
├── AICoachPage.tsx
├── CameraView.tsx
├── PoseSkeleton.tsx
├── PoseScore.tsx
├── CorrectionCard.tsx
└── AsanaSelector.tsx
motion

Computer vision.

motion/
├── PoseLandmarkerService.ts
├── LandmarkSmoother.ts
├── MotionFrameProcessor.ts
└── CameraService.ts
analysis

Actual yoga intelligence.

analysis/
├── AngleCalculator.ts
├── DistanceCalculator.ts
├── AlignmentCalculator.ts
├── PoseEvaluator.ts
├── RuleEngine.ts
└── ScoreCalculator.ts
services

Communication with backend.

services/
└── aiCoachApi.ts
types

TypeScript models.

types/
├── landmarks.ts
├── pose-rules.ts
├── asana.ts
└── coach-session.ts
store

AI Coach state.

store/
└── aiCoachStore.ts