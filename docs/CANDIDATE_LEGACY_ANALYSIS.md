# Candidate Legacy Analysis Audit

This document provides a detailed evaluation of candidate legacy analysis files in `frontend/src/features/ai-coach/analysis/` and `frontend/src/hooks/`.

In accordance with Phase 4 guidelines, **these files are retained during this phase** and documented here for subsequent consolidation.

---

## Analysis Matrix

| File | Is Imported? | Who Imports It? | Contains Unique Logic? | Production Replacement | Tests Depending on It | Helps Accuracy? | Classification |
|---|---|---|---|---|---|---|---|
| `AsanaPoseEvaluator.ts` | Yes (Legacy/Tests) | `useAsanaEvaluation.ts`, `phase8-full-validation.test.ts`, `asana-realtime-voice.test.ts`, `asana-pose-evaluator.test.ts` | No (Early monolithic evaluator) | `TemporalPoseEvaluator.ts` + `PoseEvaluator.ts` + `RuleEvaluator.ts` | 3 tests | No | **SAFE TO DELETE (After Test Refactor)** |
| `AccuracyCalculator.ts` | Yes (Legacy/Tests) | `ScoreCalculator.ts`, `AccuracyPipeline.test.ts` | No (Basic raw formula) | `AccuracyStabilizer.ts` + `TemporalPoseEvaluator.ts` | `AccuracyPipeline.test.ts` | No | **SAFE TO DELETE (After Test Refactor)** |
| `PostureAnalyzer.ts` | No | None (0 imports) | No | `PostureCheckAdapter.ts` + `AlignmentCalculator.ts` | None | No | **SAFE TO DELETE** |
| `JointAngleExtractor.ts`| No | None (0 imports) | No | `PoseFeatureEngine.ts` + `AngleCalculator.ts` | None | No | **SAFE TO DELETE** |
| `PoseStabilityDetector.ts` | No | None (0 imports) | No | `AccuracyStabilizer.ts` | None | No | **SAFE TO DELETE** |
| `ScoreSmoother.ts` | Yes (Dead Hook) | `useStableScore.ts` | No (Simple EMA smoother) | `AccuracyStabilizer.ts` | None | No | **SAFE TO DELETE** |
| `useAsanaEvaluation.ts` | No | None (0 imports) | No (Hook for `AsanaPoseEvaluator`) | `usePoseEvaluation.ts` | None | No | **SAFE TO DELETE** |
| `useStableAccuracy.ts` | No | None (0 imports) | No (Standalone hook) | `usePoseEvaluation.ts` | None | No | **SAFE TO DELETE** |
| `useStablePoseEvaluation.ts` | No | None (0 imports) | No (Experimental hook) | `usePoseEvaluation.ts` | None | No | **SAFE TO DELETE** |
| `useStableScore.ts` | No | None (0 imports) | No (Hook for `ScoreSmoother`) | `usePoseEvaluation.ts` | None | No | **SAFE TO DELETE** |

---

## Detailed File Reviews

### 1. `AsanaPoseEvaluator.ts`
- **Location:** `frontend/src/features/ai-coach/analysis/AsanaPoseEvaluator.ts`
- **Current Role:** Early monolithic evaluation module that combined score calculation, rule checking, and issue detection before modular separation.
- **Production Replacement:** `PoseEvaluator.ts` handles stateless rule evaluation; `TemporalPoseEvaluator.ts` handles temporal smoothing, issue persistence, and score trend analysis.
- **Test Impact:** Referenced in legacy tests (`asana-pose-evaluator.test.ts`, `phase8-full-validation.test.ts`, `asana-realtime-voice.test.ts`).
- **Recommendation:** Retain until tests are updated to target `TemporalPoseEvaluator` and `PoseEvaluator`, then delete.

### 2. `AccuracyCalculator.ts`
- **Location:** `frontend/src/features/ai-coach/analysis/AccuracyCalculator.ts`
- **Current Role:** Legacy static accuracy calculation function.
- **Production Replacement:** `AccuracyStabilizer.ts` provides superior exponential moving average (EMA) smoothing with fast-climb and slow-decay dynamics to prevent jitter.
- **Test Impact:** `AccuracyPipeline.test.ts`.
- **Recommendation:** Safe to delete once `AccuracyPipeline.test.ts` is updated to target `AccuracyStabilizer.ts`.

### 3. `PostureAnalyzer.ts`
- **Location:** `frontend/src/features/ai-coach/analysis/PostureAnalyzer.ts`
- **Current Role:** Standalone posture evaluation helper.
- **Production Replacement:** `PostureCheckAdapter.ts` provides active posture debouncing and alignment checks for `AICoachPage.tsx`.
- **Recommendation:** Safe to delete immediately in duplicate consolidation phase.

### 4. `JointAngleExtractor.ts`
- **Location:** `frontend/src/features/ai-coach/analysis/JointAngleExtractor.ts`
- **Current Role:** Extracted joint angles from raw landmark coordinates.
- **Production Replacement:** `PoseFeatureEngine.ts` extracts all 3D kinematic joint angles, segment ratios, and bounding boxes in a single frame pass.
- **Recommendation:** Safe to delete immediately in duplicate consolidation phase.

### 5. `PoseStabilityDetector.ts`
- **Location:** `frontend/src/features/ai-coach/analysis/PoseStabilityDetector.ts`
- **Current Role:** Rolling variance detector for landmark stability.
- **Production Replacement:** `AccuracyStabilizer.ts` continuously calculates frame-to-frame standard deviation and stability streak metrics.
- **Recommendation:** Safe to delete immediately in duplicate consolidation phase.

### 6. `ScoreSmoother.ts`
- **Location:** `frontend/src/features/ai-coach/analysis/ScoreSmoother.ts`
- **Current Role:** Basic EMA score smoother.
- **Production Replacement:** `AccuracyStabilizer.ts`.
- **Recommendation:** Safe to delete along with `useStableScore.ts`.

### 7. `useAsanaEvaluation.ts`
- **Location:** `frontend/src/hooks/useAsanaEvaluation.ts`
- **Current Role:** React hook wrapping legacy `AsanaPoseEvaluator`.
- **Production Replacement:** `usePoseEvaluation.ts`.
- **Recommendation:** Safe to delete immediately.

### 8. `useStableAccuracy.ts`
- **Location:** `frontend/src/hooks/useStableAccuracy.ts`
- **Current Role:** Standalone hook wrapping `AccuracyStabilizer`.
- **Production Replacement:** `usePoseEvaluation.ts` internally manages `AccuracyStabilizer`.
- **Recommendation:** Safe to delete immediately.

### 9. `useStablePoseEvaluation.ts`
- **Location:** `frontend/src/hooks/useStablePoseEvaluation.ts`
- **Current Role:** Experimental pose evaluation hook with issue prioritizers.
- **Production Replacement:** `usePoseEvaluation.ts` + `TemporalPoseEvaluator.ts`.
- **Recommendation:** Safe to delete immediately.

### 10. `useStableScore.ts`
- **Location:** `frontend/src/hooks/useStableScore.ts`
- **Current Role:** React hook wrapping `ScoreSmoother`.
- **Production Replacement:** `usePoseEvaluation.ts`.
- **Recommendation:** Safe to delete immediately.
