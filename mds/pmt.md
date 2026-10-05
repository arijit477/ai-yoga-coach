I tested the Chair Pose after the completion-gate fix.

The accuracy meter goes above 75%, but I see NO logs with:
[COMPLETION AUDIT]

Important:
The previous implementation did NOT actually add the completion audit logs. It only fixed KNOWN_CRITICAL_RULES and updated tests.

Do NOT change any scoring, accuracy, completion thresholds, popup UI, or session behavior.

I want a READ/TRACE diagnostic patch only.

Inspect the CURRENT code and add minimal DEV-only logs at these exact runtime boundaries:

1. In AsanaCompletionGate.ts:
   Log when getAsanaCompletionRequirements/equivalent completion requirement resolution runs.

   Log:
   [COMPLETION AUDIT] REQUIREMENTS
   {
     asanaId,
     canonicalId,
     criticalRuleIds,
     requiresDetectionRefinement
   }

2. In the actual completion eligibility evaluation:
   Log:
   [COMPLETION AUDIT] ELIGIBILITY
   {
     asanaId,
     trackingValid,
     identityValid,
     stanceValid,
     formValid,
     accuracyValid,
     accuracyScore,
     gateEligible,
     requiresDetectionRefinement,
     isCompletionEligible
   }

3. In useCoachSession.ts, immediately before starting the completion hold:
   Log:
   [COMPLETION AUDIT] HOLD START
   {
     asanaId,
     score,
     timestamp
   }

4. When the hold is reset:
   Log:
   [COMPLETION AUDIT] HOLD RESET
   {
     asanaId,
     reason,
     elapsedHold
   }

IMPORTANT:
Do not log HOLD RESET on every video frame.
Only log when the state actually changes from holding -> not holding.

5. Immediately when the 5-second completion hold is satisfied:
   Log:
   [COMPLETION AUDIT] HOLD COMPLETE
   {
     asanaId,
     elapsedHold,
     score
   }

6. Immediately before/after onAsanaComplete:
   Log:
   [COMPLETION AUDIT] onAsanaComplete FIRED
   {
     asanaId,
     score
   }

7. In AICoachPage.tsx, where the session state determines whether PoseReviewModal is rendered:
   Log ONLY when the session state changes into:
   pose_review
   user_choice
   completed

   Use:
   [COMPLETION AUDIT] POPUP STATE
   {
     sessionState,
     asanaId
   }

Use:

if (import.meta.env.DEV) {
  console.debug("[COMPLETION AUDIT]", ...);
}

Do NOT add console logs inside the per-frame pose evaluation loop unless absolutely necessary.

Do NOT modify:
- RuleEvaluator.ts
- PoseEvaluator.ts
- TemporalPoseEvaluator.ts
- AccuracyStabilizer
- PoseFrameState.ts
- PoseReviewModal.tsx
- 75% threshold
- 5-second hold duration
- KNOWN_CRITICAL_RULES
- asana rules
- 12-pose whitelist

The Chair critical-rule fix that is already implemented must remain untouched.

First inspect the current implementation and identify the exact functions where these events occur. Then make only the diagnostic logging changes.

After editing:
1. Run TypeScript/build.
2. Run tests.
3. Show git diff --stat.
4. Show the exact files modified.
5. Do not modify any test expectations unless the diagnostic logging itself requires it.

Most importantly:
DO NOT claim the completion pipeline is broken until these logs prove where the flow stops.

Return:
- exact files changed
- exact functions where logs were added
- build result
- test result
- git diff --stat