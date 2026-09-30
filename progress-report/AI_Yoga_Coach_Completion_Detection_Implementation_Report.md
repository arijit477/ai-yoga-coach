# AI Yoga Coach — Completion & Detection Implementation Report(Date: 30 sep 2026 - 1st oct 2026)

## 1. Current Objective

The AI Yoga Coach should behave like a real yoga instructor.

The user selects an asana, receives guidance from the AI Coach, performs the pose, receives real-time posture feedback, and only receives completion after maintaining the correct posture continuously.

The target completion flow is:

```text
User selects Asana
        ↓
AI Coach guides user
        ↓
User performs selected Asana
        ↓
Selected pose is actually detected/validated
        ↓
Accuracy reaches ≥ 75%
        ↓
Start 5-second hold
        ↓
Maintain valid pose + ≥75% accuracy continuously
        ↓
5 seconds completed
        ↓
Completion voice
        ↓
"ASANA COMPLETED" popup
        ↓
Next Pose / Practice Again / End Session
        ↓
Next asana starts with clean state
```

---

# 2. Current System Status

The project already contains most of the required components:

- MediaPipe pose detection
- Landmark detection
- Pose rule evaluation
- Accuracy calculation
- Asana completion gate
- 5-second hold logic
- AI Coach voice guidance
- Completion voice
- `PoseReviewModal`
- Next Pose functionality
- Practice Again
- End Session
- 170 asana profiles
- Asana-specific rules
- Session state management

Therefore, **we do not need to rebuild the AI Yoga Coach from scratch.**

The remaining work is primarily to make these components work together reliably.

---

# 3. Major Problem Identified

The audit revealed that the completion system was allowing generic posture rules to produce high accuracy without sufficiently proving that the user was actually performing the selected asana.

This explains cases such as:

```text
Selected: Cobra

User: Sitting / incorrect posture

System:
Accuracy = 100%
Perfect Hold
Completion
```

The same type of issue was observed across multiple asanas, so this is **not a Cobra-specific bug**.

---

# 4. Root Cause Identified From Audit

The completion system contains hand-authored critical rules, but the runtime asana IDs do not consistently match the IDs used by the critical-rule configuration.

Example:

```text
Catalog:
cobra-bhujangasana

Critical rules:
cobra
bhujangasana
```

Similarly:

```text
warrior-ii-virabhadrasana-ii
        ↓
warrior-ii
```

```text
mountain-tadasana
        ↓
tadasana
```

Because of this mismatch, many intended critical rules were not being used at runtime.

The system therefore relied heavily on fallback rules.

---

# 5. Fallback Problem

The current architecture can effectively become:

```text
No strong pose-specific rules
        ↓
Generic posture rules
        ↓
Accuracy ≥ 75%
        ↓
Eligible for completion
```

This is unsafe for an AI Yoga Coach.

A generic alignment score should not be enough to prove:

> "The user is performing this specific asana."

For example, several standing asanas can produce similar generic alignment measurements.

---

# 6. Required Architecture

The completion system should use the following hierarchy:

```text
MediaPipe Landmarks
        ↓
Landmark Confidence
        ↓
Selected Asana Validation
        ↓
Pose-Specific Critical Rules
        ↓
Accuracy Calculation
        ↓
75% Threshold
        ↓
5-Second Continuous Hold
        ↓
Completion
```

The important principle is:

> **Accuracy is not the same thing as pose identity.**

---

# 7. Correct Meaning of 75% Accuracy

75% accuracy should mean:

> "The user has reached the minimum required posture quality and can begin the confirmation hold."

It should NOT mean:

> "The asana is completed."

Therefore:

```text
Accuracy < 75%
        ↓
No hold
```

```text
Accuracy ≥ 75%
+
Pose Valid
        ↓
Start 5-second hold
```

---

# 8. Five-Second Hold Requirement

Once the pose becomes valid and reaches at least 75% accuracy:

```text
Hold starts
```

The user must maintain the required conditions continuously.

Example:

```text
0 sec → 75%
1 sec → 79%
2 sec → 82%
3 sec → 80%
4 sec → 77%
5 sec → 78%
```

Result:

```text
COMPLETED
```

---

# 9. Hold Reset Requirement

If the user loses pose validity or drops below the required accuracy:

```text
75%
 ↓
81%
 ↓
78%
 ↓
72%
```

The system must immediately:

```text
Hold = 0
Completion = false
Popup = false
```

The user must achieve the required state again and hold for a **fresh 5 seconds**.

---

# 10. Completion Popup Must Remain

The existing completion popup is:

```text
PoseReviewModal.tsx
```

It contains:

- `ASANA COMPLETED`
- Celebration animation
- Final accuracy
- Auto-advance countdown
- Next Pose
- Practice Again
- End Session

This component **must not be removed**.

The desired flow is:

```text
5-second hold complete
        ↓
Completion event
        ↓
Completion voice
        ↓
PoseReviewModal
        ↓
ASANA COMPLETED
```

---

# 11. Next Asana Flow

After completion, the user should be able to select:

### Next Pose

The previous asana's temporary state must be reset.

Reset:

- Previous hold timer
- Previous completion flag
- Previous pose validity
- Previous completion trigger
- Previous pose-specific temporary state

Then:

```text
Next Asana
     ↓
Fresh tracking
     ↓
Fresh validation
     ↓
Fresh 5-second hold
```

The overall session should remain active.

---

# 12. Existing Completion UI Architecture

The current UI architecture is:

```text
AICoachPage.tsx
        ↓
Session State
        ↓
completed / user_choice / pose_review
        ↓
PoseReviewModal.tsx
        ↓
ASANA COMPLETED
```

There is also:

```text
SessionReportModal.tsx
```

which is used for the full routine/session summary.

These components should remain intact.

---

# 13. Current `usePoseTracking.ts` Issue

There is also a separate console issue:

```text
Maximum update depth exceeded
```

with a stack involving:

```text
usePoseTracking.ts
requestAnimationFrame
setState
```

This should be treated as a **separate React lifecycle problem**.

It should not be mixed into the pose-completion redesign.

The completion behavior must remain the priority.

---

# 14. Important Rule

Do not solve the false-positive problem by simply changing:

```text
75% → 80%
75% → 85%
75% → 90%
```

That would only hide the underlying problem.

The actual requirement is:

```text
Correct selected asana
+
Pose-specific rules
+
Sufficient confidence
+
≥75% accuracy
+
5 seconds continuous
```

---

# 15. Implementation Order

## Phase 1 — Fix Asana ID Resolution

Ensure catalog IDs correctly resolve to their intended pose profiles.

Examples:

```text
cobra-bhujangasana
        ↓
cobra critical profile
```

```text
warrior-ii-virabhadrasana-ii
        ↓
warrior-ii critical profile
```

```text
mountain-tadasana
        ↓
tadasana critical profile
```

---

## Phase 2 — Make Completion Fail Closed

If an asana does not have enough pose-specific evidence:

```text
NOT ELIGIBLE
```

It should not become eligible simply because generic accuracy is high.

Therefore:

```text
No reliable pose-specific validation
        ↓
No completion
```

---

## Phase 3 — Verify Existing Critical Rules

After fixing ID resolution, verify that the intended rules are actually evaluated.

For example:

```text
Cobra
→ Cobra-specific rules evaluated

Warrior II
→ Warrior-II-specific rules evaluated

Lotus
→ Lotus-specific rules evaluated
```

---

## Phase 4 — Validate the 5-Second Hold

Confirm:

```text
Valid + ≥75%
        ↓
Start timer
```

and:

```text
Invalid / <75%
        ↓
Reset timer
```

---

## Phase 5 — Completion

At exactly 5 continuous seconds:

```text
Complete once
 ↓
Voice
 ↓
PoseReviewModal
```

No duplicate completion.

---

## Phase 6 — Next Asana

After Next Pose:

```text
Reset previous state
 ↓
Load next asana
 ↓
Start fresh tracking
```

---

# 16. Testing Requirements

For every representative asana, test:

### Test 1 — Random Movement

```text
Random movement
→ No completion
```

### Test 2 — Wrong Pose

```text
Selected Cobra
User performs sitting
→ No completion
```

### Test 3 — Partial Pose

```text
Some rules correct
Some critical rules incorrect
→ No completion
```

### Test 4 — Accuracy Below Threshold

```text
Accuracy = 70%
→ No hold
```

### Test 5 — Reaches Threshold

```text
Accuracy = 75%
→ Hold begins
```

### Test 6 — Breaks During Hold

```text
75%
→ 80%
→ 82%
→ 70%

Result:
Hold = 0
```

### Test 7 — Correct 5 Seconds

```text
75%+
+
valid pose
+
5 continuous seconds

→ Completion
```

### Test 8 — After Completion

```text
Completion
→ popup
→ no duplicate completion
```

### Test 9 — Next Pose

```text
Next Pose
→ old state reset
→ new asana starts
```

---

# 17. Files To Work On

The implementation should primarily involve:

```text
AsanaCompletionGate.ts
```

```text
5-second hold/completion logic
```

```text
AICoachPage.tsx
```

```text
PoseReviewModal.tsx
```

```text
Asana catalog / profiles
```

```text
RuleEvaluator.ts
```

```text
AccuracyCalculator.ts
```

The `usePoseTracking.ts` / `CameraReadinessTracker.ts` issue should be handled separately unless it directly interferes with the completion flow.

---

# 18. Final Target Behavior

The finished AI Yoga Coach should behave like this:

```text
┌──────────────────────────────┐
│       SELECT ASANA           │
└──────────────┬───────────────┘
               ↓
        AI COACH GUIDANCE
               ↓
       BODY LANDMARKS
               ↓
      POSE-SPECIFIC VALIDATION
               ↓
       ACCURACY ≥ 75% ?
          ↙           ↘
        NO             YES
        ↓               ↓
    Keep guiding    Start 5 sec
                        ↓
                 Maintain pose
                        ↓
              ┌─────────┴─────────┐
              ↓                   ↓
           Break pose          Still valid
              ↓                   ↓
           Reset 0            Continue
                                  ↓
                             5 seconds
                                  ↓
                             COMPLETED
                                  ↓
                           Voice feedback
                                  ↓
                       ASANA COMPLETED
                            POPUP
                                  ↓
                   Next / Practice / End
                                  ↓
                         Next Asana
```

---

# 19. Current Recommendation

**Do not make any more broad changes right now.**

The next practical step is to work directly on the existing files and establish one reliable completion pipeline:

> **Pose validity → ≥75% → 5-second continuous hold → completion → existing popup → next asana.**

And importantly, **do not remove the existing `PoseReviewModal` or completion UI.**

This report can be treated as the **implementation specification for the next stage of the AI Yoga Coach.**
