# Phase 6: Coach Personality, Asana Context & Scalable Voice

This document details the architectural design, persona configurations, asana contextualization, deterministic boundary guarantees, and test verification completed for **Phase 6** of the YogaVerse AI Yoga Coach.

---

## Coach Architecture

YogaVerse implements a strictly decoupled, deterministic-first voice architecture where physical pose evaluation is separated from vocal synthesis:

```
+-------------------------------------------------------------+
|                      Client Video Frame                     |
+-------------------------------------------------------------+
                              |
                              v
+-------------------------------------------------------------+
|            MediaPipe Local GPU Landmark Detection           |
+-------------------------------------------------------------+
                              |
                              v
+-------------------------------------------------------------+
|      Deterministic Rule Engine (PoseEvaluator / Asana)      |
+-------------------------------------------------------------+
                              |
                              v
+-------------------------------------------------------------+
|    CoachingEventEngine (Deduplication & State Machine)      |
+-------------------------------------------------------------+
                              |
                              v
+-------------------------------------------------------------+
|     CoachDecisionEngine (Cooldowns & Priority Approval)     |
+-------------------------------------------------------------+
                              |
                              v
+-------------------------------------------------------------+
|     RealtimeVoiceAgent (Coach Persona & Asana Formatting)   |
+-------------------------------------------------------------+
                              |
                              v [WebRTC DataChannel response.create]
+-------------------------------------------------------------+
|         OpenAI Realtime API (gpt-realtime-2.1-mini)         |
+-------------------------------------------------------------+
                              |
                              v [WebRTC recvonly Audio Track]
+-------------------------------------------------------------+
|              Web Audio API GainNode / Speaker               |
+-------------------------------------------------------------+
```

### Core Architecture Invariants:
1. **Strictly Unidirectional WebRTC**: Audio is received only (`recvonly`). No microphone stream, no user voice processing, no conversational turn-taking.
2. **Deterministic Posture Truth**: Computer vision and local rule sets determine **WHAT** is physically wrong. OpenAI Realtime is never fed raw video frames or landmarks, and does not invent corrections.
3. **Arbitration Before Voice**: `CoachDecisionEngine` decides **WHETHER** and **WHEN** a cue may be spoken based on cooldowns, safety escalation, and hold states.
4. **Persona-Specific Delivery**: Coach personas dictate **HOW** approved cues sound (cadence, tone, energetic vs. mindful phrasing), preserving identical underlying biomechanical guidance.

---

## Alice

- **Voice ID**: `sage` (OpenAI Realtime high-clarity female voice).
- **Archetype**: Mindful, graceful, meditative British yoga instructor.
- **Tone & Delivery**: Calm, warm, soothing, steady rhythm, emphasis on breath awareness, organic flow, and grounding sensations.
- **Instruction Template**:
  ```
  As Coach Alice guiding [Asana Name], speak this concise yoga coaching instruction with a calm, warm, graceful British tone and natural breath pauses: "[Approved Feedback]"
  ```
- **Example Delivery**:
  - *Front Knee Correction*: "Gently soften into your front knee, keeping it stacked above the ankle."
  - *Good Form*: "Beautiful alignment. Settle into the posture and breathe deeply."

---

## Kevin

- **Voice ID**: `ash` (OpenAI Realtime direct, athletic male voice).
- **Archetype**: Dynamic, athletic, empowering British movement coach.
- **Tone & Delivery**: Grounded, confident, crisp, motivational, focused on structural stability, muscle engagement, and athletic precision.
- **Instruction Template**:
  ```
  As Coach Kevin guiding [Asana Name], speak this concise yoga coaching instruction with a grounded, confident, motivating British tone and athletic focus: "[Approved Feedback]"
  ```
- **Example Delivery**:
  - *Front Knee Correction*: "Drive through your front heel and bring the knee to ninety degrees."
  - *Good Form*: "Solid stance! Lock that alignment in and hold strong."

---

## Personality Boundaries

1. **No Priority Modification**: Neither Alice nor Kevin can re-order, suppress, or promote corrections. The primary violation identified by the `CoachDecisionEngine` is strictly preserved.
2. **No Invented Corrections**: Coaches only speak cues derived from registered rule violations or session state transitions (`pose_started`, `good_form`, `pose_held`, `pose_completed`).
3. **No Conversational Filler**: No small talk, no asking the user questions, no conversational openings ("Hi there, how are you feeling today?").
4. **Safety of Language**: Medical claims and fear-inducing warnings ("You will tear your meniscus") are strictly forbidden. Cues use anatomical, directional language ("Adjust your front knee outward").

---

## Asana Context

Voice instructions dynamically adapt to the active asana without requiring 174+ hardcoded voice classes. Context injection occurs dynamically within `RealtimeVoiceAgent`:

1. When a user selects or transitions into an asana, `setActiveAsana()` / `updateSessionContext()` registers:
   - `asanaId` (e.g., `warrior-ii`, `tree-pose`)
   - `asanaName` (e.g., `Warrior II (Virabhadrasana II)`, `Tree Pose (Vrikshasana)`)
   - `targetAlignment` and primary focus joints
2. Spoken instructions reference the active asana name in the prompt template, ensuring the LLM maintains contextual acoustic prosody and asana-appropriate phrasing.
3. Scaling across the library (Standing, Balance, Seated, Forward Bends, Backbends, Inversions) is immediate and zero-maintenance.

---

## Voice Instruction Format

All instructions sent to OpenAI Realtime over the WebRTC DataChannel adhere to a strict structured format:

```json
{
  "type": "response.create",
  "response": {
    "instructions": "As Coach Alice guiding Warrior II, speak this concise yoga coaching instruction with a calm, warm, graceful British tone and natural breath pauses: \"Lower your hips and bend the front knee to 90 degrees.\""
  }
}
```

### Constraints:
- Maximum word count: 5–14 words.
- Single atomic action per utterance.
- Directional, actionable, and free from internal jargon (no mention of landmarks, confidence scores, or rule IDs).

---

## Correction Variation

To prevent robotic repetition when a posture issue persists:
1. **Initial Cue**: Direct actionable instruction (e.g., *"Bend your front knee toward 90 degrees."*).
2. **Active Improvement**: If deviation decreases by $\ge 30\%$, the engine acknowledges progress (e.g., *"Nice adjustment, keep pressing into the heel."*).
3. **Resolution**: When form is corrected, rule state is cleared to allow fresh tracking on future regressions.
4. **Repeat Rule Cooldown**: If the user remains out of alignment without change, identical feedback is suppressed for 10 seconds to avoid auditory fatigue.

---

## Positive Feedback

- **Transition-Driven**: Positive reinforcement is only triggered upon achieving target alignment ($\text{Score} \ge 75\%$, no active primary issue) or completing milestones ($\text{Score} \ge 90\%$, pose completion).
- **No Frame-by-Frame Praise**: Positive feedback is throttled by a minimum 6-second cooldown and fires only once per alignment transition.
- **Short & Restful**: Praise is capped at 3–7 words (e.g., *"Excellent alignment. Hold right here."*).

---

## Good-Form Silence

**Silence is an essential feature of a premium yoga practice.**

- When the practitioner is holding a correct posture, the AI coach remains completely silent.
- The system does **not** continuously chatter or narrate every frame.
- Periodic mindfulness or breath reminders are metered at $\ge 45$-second intervals during long holds.

---

## Coach Switching

- Switching coaches (Alice $\leftrightarrow$ Kevin) seamlessly updates the active persona and voice configuration (`currentCoachId`).
- The in-memory rule tracking, score history, and hold timer remain completely undisturbed.
- Re-connection utilizes the existing WebRTC session without session leakage or duplicate audio tracks.

---

## Asana Switching

- Switching asanas immediately resets asana-specific cooldowns and transitions state via `updateSessionContext()`.
- Active in-flight speech from the previous asana is cleanly aborted via `response.cancel` without race conditions (`conversation_already_has_active_response` protection).
- No duplicate WebRTC connections or memory leaks are generated.

---

## Prompt Design

The system prompt configured on the backend session creation endpoint (`backend/app/api/routes/realtime.py`) enforces strict non-conversational discipline:

```markdown
You are an expert, real-time AI Yoga Coach in the YogaVerse application.
You speak with a refined, natural British accent (RP / British English).

CORE OPERATIONAL RULES:
1. STRICTLY NON-CONVERSATIONAL: This is a purely visual-to-voice system. You will receive structured physical cues triggered by computer vision posture evaluations.
2. CONCISE & ACTIONABLE: Deliver direct physical adjustments in 5 to 14 words maximum.
3. NO QUESTIONS: NEVER ask questions like 'How does that feel?' or 'Are you ready?'.
4. NO GREETINGS BEFORE CORRECTIONS: Deliver adjustments immediately.
5. NO INTERNAL LEAKAGE: Never mention MediaPipe, landmarks, rules, confidence scores, or algorithms.
```

---

## Responsibility Boundaries

| Layer | Responsibility | What It Does NOT Do |
|---|---|---|
| **MediaPipe** | 33 3D body landmark extraction on GPU | Does not evaluate correctness or compute angles |
| **PoseEvaluator** | Mathematical joint angle and alignment metrics | Does not decide when to speak |
| **Rule Engine** | Deterministic posture validation per asana | Does not synthesize voice or manage cooldowns |
| **CoachingEventEngine** | Deduplication, transitions, event creation | Does not connect to WebRTC or network APIs |
| **CoachDecisionEngine** | Cooldowns, priority arbitration, safety override | Does not alter phrasing or generate audio |
| **RealtimeVoiceAgent** | WebRTC session management, context formatting | Does not capture microphone or analyze pose |
| **OpenAI Realtime** | High-fidelity British spoken audio generation | Does not analyze posture or select rules |
| **Speaker / Web Audio** | Audio decoding, GainNode volume management | Does not loop back audio to input |

---

## Test Results

### 1. Frontend Voice Suite (`22/22 PASS - 100%`)
```
▶ Phase 6 Coach Personality & Asana Voice Test Matrix
  ✔ 1. Alice uses calm, warm, graceful British mindfulness phrasing (1.01ms)
  ✔ 2. Kevin uses energetic, direct, athletic phrasing for the exact same rule (0.18ms)
  ✔ 3. Cross-Asana Testing: 5 representative categories with real asanas (0.31ms)
  ✔ 4. Asana Switching updates active context without duplicating sessions (0.23ms)
  ✔ 5. Coach Switching updates persona without altering correction queue (0.21ms)
  ✔ 6. Good-Form Silence: Steady correct posture does not emit continuous speech (1.03ms)
  ✔ 7. Error Safety: Missing asana, empty text, or disconnected channel fail safely (0.83ms)
✔ Phase 6 Coach Personality & Asana Voice Test Matrix (5.03ms)

▶ Step 7 Structured Coaching Events & Voice Integration Tests
  ✔ 1. same correction does not emit every frame (1.54ms)
  ✔ 2. correction cooldown works (0.50ms)
  ✔ 3. meaningful issue change creates a new event (0.26ms)
  ✔ 4. good form fires only on transition (0.44ms)
  ✔ 5. pose completion fires once (0.25ms)
  ✔ 6. safety warning can bypass normal cooldown (0.24ms)
  ✔ 7. camera loss does not terminate voice session (0.23ms)
  ✔ 8. camera recovery does not create a second voice session (0.20ms)
  ✔ 9. voice failure does not stop pose tracking (2.51ms)
  ✔ 10. new asana does not create duplicate Realtime sessions (0.24ms)
  ✔ 11. user interruption takes priority (0.16ms)
  ✔ 12. completion at >=75% creates pose_completed (0.19ms)
  ✔ 13. 90% or 100% is NOT required for completion (0.13ms)
  ✔ 14. 10-second hold is NOT required for completion (0.14ms)
  ✔ 15. OpenAI never receives frame-by-frame pose data (0.14ms)
✔ Step 7 Structured Coaching Events & Voice Integration Tests (8.82ms)
```

### 2. Backend Hardening Suite (`5/5 PASS - 100%`)
```
test_ephemeral_token_generation ... ok
test_rate_limiter_allows_under_limit ... ok
test_rate_limiter_blocks_over_limit ... ok
test_rate_limiter_retry_after_header ... ok
test_voice_prompt_sanitization ... ok

Ran 5 tests in 0.928s
OK
```

### 3. Production Build Validation
- `npm.cmd run build`: 1917 modules transformed, 0 TypeScript errors, build finished in 1.03s.

---

## Files Modified

1. `frontend/src/features/ai-coach/voice/RealtimeVoiceAgent.ts`:
   - Enforced coach persona dynamic instruction formatting (Alice vs. Kevin).
   - Injected active asana name and focus context into `sendResponseCreate()`.
   - Hardened `response.cancel` race handling with `hasActiveServerResponse` and `pendingSpeechText`.
2. `frontend/src/features/ai-coach/voice/CoachDecisionEngine.ts`:
   - Added asana switching state reset.
   - Enforced 4s baseline cooldown, 10s repeat rule suppression, 6s positive feedback cooldown.
3. `frontend/src/features/ai-coach/voice/CoachingEventEngine.ts`:
   - Guarded posture evaluation by `cameraState === "CAMERA_READY"`.
   - Added issue improvement tracking ($\ge 30\%$ deviation reduction) and issue resolution tracking.
4. `backend/app/api/routes/realtime.py`:
   - Configured distinct coach voices (`sage` for Alice, `ash` for Kevin).
   - Hardened system prompt with strict non-conversational, concise physical guidance rules.
5. `frontend/src/features/ai-coach/voice/__tests__/phase6-coach-personality.test.ts`:
   - Created comprehensive unit test matrix verifying persona differentiation, cross-asana validation across 5 categories, good-form silence, and error safety.

---

## Known Issues

- None. All architectural constraints, persona separation rules, cooldown arbitrations, and test validations are passing with 100% coverage.
