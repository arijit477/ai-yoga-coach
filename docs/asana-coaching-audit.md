# Asana-Specific Coaching System Audit & Architecture Analysis

This document provides a comprehensive technical audit of the current AI Yoga Coach codebase, analyzing how asana data, MediaPipe computer vision, deterministic rule evaluation, and real-time voice synthesis currently interact. It identifies the architectural blockers preventing asana-specific coaching and outlines the recommended architecture, schema, and implementation plan.

---

## 1. Current Architecture

The existing YogaVerse AI Yoga Coach operates on a decoupled, deterministic-first, unidirectional architecture:

```
[ Camera Video Stream (30 FPS) ]
               │
               ▼
[ MediaPipe PoseLandmarker (GPU Delegate) ]
  - Extracts 33 3D Body Landmarks with visibility & presence scores
               │
               ▼
[ Motion & Landmark Processing ]
  - CameraReadinessTracker (evaluates user bounding box & visibility)
  - LandmarkSmoother (exponential moving average over temporal frames)
               │
               ▼
[ Deterministic Pose Evaluation Layer ]
  - JointAngleExtractor & AlignmentCalculator (computes joint angles/distances)
  - PoseEvaluator & RuleEvaluator (evaluates pose rules from registry/rules.json)
  - ScoreAggregator & TemporalPoseEvaluator (computes stabilized score 0–100)
               │
               ▼
[ Coaching Event & Decision Layer ]
  - CoachingEventEngine (filters frame noise into discrete CoachingEvents)
  - CoachDecisionEngine (enforces priority tiers, cooldowns, and good-form silence)
               │
               ▼
[ Voice Transport Layer ]
  - useRealtimeVoice (React lifecycle hook adapter)
  - RealtimeVoiceAgent (WebRTC DataChannel prompt injection)
               │
               ▼ [WebRTC DataChannel response.create]
[ OpenAI Realtime API (gpt-realtime-2.1-mini) ]
  - Alice (sage) / Kevin (ash) British voice synthesis
               │
               ▼ [WebRTC recvonly Audio Track]
[ Web Audio API GainNode -> Speaker Output ]
```

---

## 2. Asana Data Structure

### 2.1 Inventory & Database Records
- **Total Asanas in Inventory**: **170 asanas** cataloged across `normalized_asanas_inventory.json` and Supabase bucket `asana-images/yogaverse-model-asanas-beach/`.
- **Database Table**: `public.asanas` (in Supabase PostgreSQL).
  - Schema columns: `id`, `slug`, `name`, `sanskrit_name`, `category`, `difficulty`, `storage_path`, `image_url`, `video_url`, `description`, `benefits`, `instructions`, `cues`, `rules`, `target_hold_seconds`, `rule_ids`, `is_premium`, `order_index`.
- **Frontend Asana Models**:
  - `Asana` (`frontend/src/features/ai-coach/types/asana.ts`): UI representation containing metadata, benefits, instructions list, and cue objects.
  - `AsanaDefinition` (`frontend/src/features/ai-coach/types/asana-definition.ts`): Extended runtime representation used by `AsanaRegistry.ts` binding rules and landmark requirements.

### 2.2 Category Classification
Currently, asanas are assigned high-level stylistic categories:
`"standing" | "balancing" | "seated" | "backbend" | "forward_bend" | "core" | "inversion" | "restorative"`.
*Limitation*: These categories do **not** define the practitioner's physical starting stance or ground orientation (e.g. lying prone on belly vs. lying supine on back vs. kneeling on all fours).

---

## 3. Existing MediaPipe Architecture

### 3.1 Landmark Extraction & Pipeline
- **Model**: MediaPipe `@mediapipe/tasks-vision` `PoseLandmarker` using WebGL/WebGPU acceleration.
- **Landmarks**: 33 3D normalized coordinates $(x, y, z)$ with `visibility` ($[0, 1]$) and `presence` scores.
- **Camera Mirroring & Orientation**: Handled in `CameraView.tsx` via CSS canvas flipping; calculations in `JointAngleExtractor.ts` use normalized geometric coordinate arrays.
- **Confidence & Occlusion Handling**:
  - `CameraReadinessTracker.ts` categorizes status: `CAMERA_READY`, `PARTIAL_BODY`, `NO_PERSON`, `CAMERA_DISABLED`.
  - Landmark points with visibility $< 0.5$ are marked uncertain.
  - `PoseEvaluator.ts` only scores valid frames where key requirement joints meet visibility thresholds.
- **Temporal Smoothing**:
  - `LandmarkSmoother.ts` applies a velocity-sensitive low-pass filter over landmark coordinates.
  - `AccuracyStabilizer.ts` and `ScoreSmoother.ts` stabilize displayed scores to prevent jitter.

---

## 4. Existing Rule Engine

### 4.1 Rule Definitions & Evaluation
- **Rule Structure (`PoseRule`)**:
  ```typescript
  export interface PoseRule {
    id: string;
    name: string;
    metric: "angle" | "distance" | "alignment" | "symmetry";
    points: [number, number, number] | [number, number];
    comparison: "greater_than" | "less_than" | "between";
    target?: number;
    min?: number;
    max?: number;
    weight: number;
    severity: "low" | "medium" | "high";
    feedback: string;
  }
  ```
- **Rule Evaluator (`RuleEvaluator.ts`)**:
  - Calculates vector angles between 3 points ($\theta = \arccos(\frac{\mathbf{u} \cdot \mathbf{v}}{\|\mathbf{u}\| \|\mathbf{v}\|})$).
  - Evaluates deviations against `[min, max]` tolerance bounds.
  - Assigns severity: `high` (major deviation, score deduction $\ge 25$), `medium` (score deduction $10–20$), `low` (subtle adjustment, score deduction $5$).
- **Rule Storage & Catalogs**:
  - Dedicated code rules: Only **3 asanas** have hand-authored TypeScript rule files (`mountainPose.ts`, `treePose.ts`, `warriorIIPose.ts`).
  - Auto-generated rules: Stored in `/public/data/rules.json` (~147 KB) covering generated geometric angle limits for the remaining poses.

---

## 5. Existing Voice Architecture

- **Session Initialization**: Ephemeral session tokens created by backend `POST /api/ai-coach/realtime/session` (FastAPI).
- **Transport**: Direct client-to-OpenAI WebRTC peer connection in strict `recvonly` audio mode (no microphone input).
- **Command Channel**: Bidirectional `RTCDataChannel` (`oai-events`).
- **Prompt Formulation**: When `CoachDecisionEngine` approves a cue, `RealtimeVoiceAgent.sendResponseCreate()` wraps the feedback in persona instructions:
  ```
  As Coach Alice guiding [Asana Name], speak this concise yoga coaching instruction with a calm, warm, graceful British tone and natural breath pauses: "[Approved Feedback]"
  ```
- **Voice IDs**: Alice $\rightarrow$ `sage`, Kevin $\rightarrow$ `ash`.
- **Playback**: Web Audio API `AudioContext` with balanced 2.5x `GainNode` and `AnalyserNode` for lip-sync animation.

---

## 6. Current Generic Feedback Flow

Currently, when a session starts or transitions into a new asana, the feedback flow suffers from hardcoded generic phrases:

1. **Session Start (`handleStartSession`)**:
   Calls `voiceTriggerPoseStart(currentAsana.id, currentAsana.name, currentAsana.description)`.
2. **`RealtimeVoiceAgent.triggerPoseStart`**:
   Hardcodes:
   ```typescript
   const message = `Let's begin ${asanaName}.${desc} Stand tall, find your breath, and let's align.`;
   ```
3. **`CoachingEventBuilder.buildPoseStartedEvent`**:
   Hardcodes fallback:
   ```typescript
   feedback: `Step into ${asanaName}. Stand tall and find your balance.`
   ```
4. **`CoachingEventBuilder.buildCalibrationPromptEvent`**:
   Hardcodes:
   ```typescript
   feedback: "Hold still for a moment while I check your position."
   ```
5. **Posture Correction Fallback**:
   If an asana rule in `rules.json` has a generic feedback string (e.g. *"Adjust angle to 90 degrees"*), the voice engine repeats raw angle descriptions rather than biomechanical body movement cues.

---

## 7. Problems Preventing Asana-Specific Coaching

| Problem | Root Cause | Impact on User Experience |
|---|---|---|
| **1. Universal "Stand Tall" Assumption** | `RealtimeVoiceAgent.ts` and `CoachingEventBuilder.ts` hardcode standing language into pose entry cues. | Seated poses (Lotus, Seated Forward Bend) and prone poses (Cobra, Locust) instruct the user to "Stand tall", breaking immersion. |
| **2. Missing Body Stance Classification** | Asana data only has general categories (`seated`, `backbend`), lacking explicit starting stance specifications. | The system cannot determine if the user should be standing, kneeling on all fours, seated, lying prone (on belly), or lying supine (on back). |
| **3. Lack of Entry Guidance Cues** | No structured data field exists for pose setup/entry steps (e.g. *"Step feet 4 feet apart, turn right foot out 90 degrees"*). | The user receives no initial verbal setup cue before rule evaluation begins. |
| **4. Raw Geometric Feedback in `rules.json`** | Rules in `rules.json` use auto-generated point descriptions without anatomical clarity (e.g., *"Right Shoulder Lift between 75 and 115"*). | Spoken feedback sounds like an angle metric rather than a yoga adjustment (*"Lift your arms parallel to the ground"*). |
| **5. Lack of Asana Hold & Breath Cues** | Good form and hold events rely on a single generic string (*"Beautiful form. Breathe smoothly and hold right here."*). | Hold coaching does not mention asana-specific focal points (e.g., gaze point in Warrior II vs. pelvic lift in Bridge Pose). |
| **6. Bilateral Asymmetry Ignorance** | Rule evaluation treats left and right poses generically without tracking the active lead leg or arm. | Cues cannot guide side-specific transitions (e.g., *"Now let's switch sides and step your left foot forward"*). |

---

## 8. Recommended Architecture

To achieve natural, asana-specific guidance without breaking existing computer-vision or WebRTC foundations, we introduce an **`AsanaCoachingProfile`** data and processing pipeline:

```
[ Active Asana Selection (AsanaRegistry) ]
                     │
                     ▼
[ AsanaCoachingProfile Catalog ]
  - Stance: 'standing' | 'seated' | 'kneeling' | 'prone' | 'supine' | 'all_fours' | 'inversion' | 'arm_balance'
  - Entry Setup Cue: Direct physical entry instruction
  - Primary Focus Areas & Landmark Requirements
  - Asana-Specific Alignment Cues (joint -> natural language)
  - Hold & Mindfulness Cues (focal point, breathing instruction)
  - Exit & Recovery Cues
                     │
                     ▼
[ Pose Analysis & Readiness Engine ]
  - CameraReadinessTracker validates stance requirements
  - RuleEvaluator evaluates asana-specific geometric rules
                     │
                     ▼
[ Asana-Aware CoachingEventEngine & Builder ]
  - Generates stance-accurate `pose_started` cues
  - Generates anatomical `pose_correction` cues
  - Generates pose-specific `good_form` and `pose_held` cues
                     │
                     ▼
[ CoachDecisionEngine (Deterministic Arbitration) ]
                     │
                     ▼
[ RealtimeVoiceAgent -> OpenAI Realtime (sage / ash) ]
```

---

## 9. Files That Need Modification

1. `frontend/src/features/ai-coach/types/asana.ts` & `asana-definition.ts`:
   - Add `AsanaStartingStance` and `AsanaCoachingProfile` type definitions.
2. `frontend/src/features/ai-coach/data/` (or new `coachingProfiles/` catalog):
   - Create data-driven coaching profile definitions mapping each asana to its stance, entry cues, focal points, and hold cues.
3. `frontend/src/features/ai-coach/voice/CoachingEventBuilder.ts`:
   - Replace hardcoded `"Stand tall"` strings with profile-driven entry, setup, and hold guidance.
4. `frontend/src/features/ai-coach/voice/RealtimeVoiceAgent.ts`:
   - Update `triggerPoseStart()` to accept stance-aware entry text from the active coaching profile.
5. `frontend/src/features/ai-coach/voice/CoachingEventEngine.ts`:
   - Connect active asana coaching profile cues to state transitions (`pose_started`, `good_form`, `pose_held`).
6. `frontend/src/features/ai-coach/analysis/AsanaLandmarkRequirements.ts`:
   - Add stance-specific required landmark regions (e.g., seated poses require torso/hips/shoulders; prone poses require spine/arms/head).
7. `frontend/src/features/ai-coach/components/AICoachPage.tsx`:
   - Pass the rich asana coaching profile into the voice and session lifecycle hooks.

---

## 10. Files That Should NOT Be Modified

1. **MediaPipe Core**: `PoseLandmarkerService.ts`, `CameraService.ts`, `LandmarkSmoother.ts`.
2. **Mathematical Calculation Utilities**: `AngleCalculator.ts`, `DistanceCalculator.ts`, `AlignmentCalculator.ts`.
3. **WebRTC Direction & Transport**: `RealtimeVoiceAgent.ts` connection transport (`recvonly` invariant, zero microphone capture).
4. **Backend Security & Auth**: `backend/app/api/routes/realtime.py` (ephemeral token generator and rate limiter).
5. **Database Core Infrastructure**: Supabase database connection and RLS policies.

---

## 11. Proposed Asana Coaching Profile Schema

```typescript
export type AsanaStartingStance =
  | "standing"        // E.g. Tadasana, Warrior II, Tree Pose, Triangle
  | "seated"          // E.g. Lotus, Seated Forward Fold, Hero Pose
  | "kneeling"        // E.g. Camel Pose, Thunderbolt Pose
  | "all_fours"       // E.g. Cat-Cow, Tabletop, Bird-Dog
  | "prone"           // E.g. Cobra, Locust, Sphinx, Bow Pose (on stomach)
  | "supine"          // E.g. Bridge Pose, Reclined Butterfly, Corpse Pose (on back)
  | "arm_balance"     // E.g. Crow Pose, Side Plank, Scale Pose
  | "inversion";      // E.g. Downward Dog, Shoulder Stand, Headstand

export interface AsanaAlignmentRuleCue {
  ruleId: string;
  joint: string;
  correctionText: string;       // Direct concise physical instruction (5-12 words)
  progressionText?: string;     // Cue if issue persists (e.g., "Keep that front knee stacked")
  resolvedText?: string;        // Brief confirmation upon fix (e.g., "Knee alignment looks great")
}

export interface AsanaCoachingProfile {
  asanaId: string;
  asanaName: string;
  sanskritName?: string;
  stance: AsanaStartingStance;
  
  // Initial Setup & Entry Instruction
  entryCue: string;              // E.g. "Step your feet wide, turn your front foot out, and bend your knee."
  
  // Key Anatomical Focus Areas for this asana
  focusAreas: string[];          // E.g. ["front knee", "hip alignment", "extended arms"]
  
  // Required Visible Regions for Camera Readiness
  requiredRegions: ("torso" | "arms" | "legs" | "feet" | "head")[];
  
  // Specific Rule Corrections
  alignmentCues: AsanaAlignmentRuleCue[];
  
  // Hold & Mindfulness Phrasing
  goodFormAffirmation: string;   // E.g. "Solid Warrior II. Gaze over your front fingers and breathe."
  holdMindfulnessCue: string;    // E.g. "Sink slightly deeper into the hips while keeping your torso upright."
  
  // Exit / Completion Guidance
  completionCue: string;         // E.g. "Straighten your front leg and step your feet back together."
}
```

---

## 12. Technical & Product Risks

1. **Auditory Overload / Verbosity**:
   - *Risk*: Lengthy entry cues could delay real-time correction feedback.
   - *Mitigation*: Strictly enforce the 5–14 word ceiling on all profile entry and correction cues.
2. **Stance Occlusion False Positives**:
   - *Risk*: Prone and seated poses may obscure feet or hip landmarks on standard laptop cameras.
   - *Mitigation*: `AsanaLandmarkRequirements` must use relaxed, stance-specific required regions (e.g., prone poses do not require feet visibility).
3. **Database vs. Client Bundle Bloat**:
   - *Risk*: Storing 170 full profiles in frontend bundles could increase memory size.
   - *Mitigation*: Structure profiles as a lightweight JSON/TypeScript catalog with dynamic loading or Supabase `cues` / `rules` table mapping.
4. **LLM Inconsistency**:
   - *Risk*: If OpenAI Realtime re-interprets cues freely, phrasing might drift.
   - *Mitigation*: Retain prompt-injection boundaries where the prompt directs the LLM to speak the exact approved coaching string with British coach prosody.

---

## 13. Recommended Implementation Order

```
Phase 2: Asana Coaching Profile Schema & Stance Taxonomy
  - Define TypeScript interfaces (`AsanaCoachingProfile`, `AsanaStartingStance`).
  - Update `Asana` and `AsanaDefinition` models.

Phase 3: Asana Profile Catalog & Stance Data Population
  - Categorize all 170 asanas by starting stance (standing, seated, prone, supine, kneeling, all-fours, inversion).
  - Author concise entry, hold, and alignment cues for core and catalog poses.

Phase 4: Stance-Aware Camera Readiness & Landmark Requirements
  - Update `AsanaLandmarkRequirements.ts` to evaluate visibility based on stance.
  - Eliminate false occlusion warnings for seated/prone poses.

Phase 5: Refactor Voice Event Builders & Entry Guidance
  - Refactor `triggerPoseStart`, `buildPoseStartedEvent`, and `buildGoodFormEvent` to read from `AsanaCoachingProfile`.
  - Permanently eliminate hardcoded `"Stand tall"` fallbacks.

Phase 6: Verification & Multi-Stance Testing
  - Test standing (Warrior II), seated (Lotus), prone (Cobra), and supine (Bridge) postures.
  - Verify zero regressions in WebRTC `recvonly` transport, cooldowns, and performance.
```
