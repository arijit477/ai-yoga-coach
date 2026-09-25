STEP 1 — STABILIZE THE MEDIAPIPE REAL-TIME TRACKING LOOP

Work only on the existing MediaPipe/pose tracking implementation.

Before changing anything:
1. Inspect the current frontend MediaPipe implementation.
2. Find:
   - usePoseTracking
   - MediaPipe initialization
   - requestAnimationFrame loops
   - video/camera handling
   - landmark state updates
   - pose result state/store updates
   - any effects depending on landmarks/pose results
3. Trace exactly how one camera frame flows through the application.

GOAL:

Create exactly ONE stable real-time MediaPipe processing loop.

Requirements:

1. There must be only one active requestAnimationFrame loop for the camera/MediaPipe processing.

2. The RAF loop must:
   - start when camera/video is ready
   - process the current video frame
   - update the latest pose result
   - schedule the next frame
   - stop cleanly when the component/session is unmounted or camera is stopped

3. Store mutable animation state in refs where appropriate:
   - animationFrameId
   - MediaPipe instance
   - latest callback references
   - processing state

4. Do NOT put high-frequency pose/landmark state into effect dependencies if doing so causes the RAF loop to restart.

5. Avoid patterns such as:
   useEffect(..., [landmarks])
   useEffect(..., [poseResult])
   useEffect(..., [angles])
   when they cause the camera processing loop to restart.

6. Prevent duplicate MediaPipe initialization.

7. Prevent duplicate requestAnimationFrame loops.

8. Properly call cancelAnimationFrame during cleanup.

9. Properly release/clean up MediaPipe resources when required by the current implementation.

10. Camera start/stop must remain reliable.

11. If no person is detected:
    - return/update an appropriate "no pose" state
    - do not throw
    - do not restart MediaPipe
    - do not restart the camera
    - do not restart the AI Coach

12. If landmarks are temporarily missing:
    - do not fabricate landmarks
    - preserve the latest valid result only where the existing architecture already expects temporal continuity
    - otherwise expose an explicit invalid/no-pose state

13. Do not implement smoothing yet.
14. Do not modify the Rule Engine yet.
15. Do not modify scoring yet.
16. Do not modify Posture Check yet.
17. Do not modify OpenAI/Realt​ime yet.
18. Do not modify Alice/Kevin/avatar components unless a direct MediaPipe lifecycle bug requires it.

PERFORMANCE:

Do not cause the entire AI Coach UI to re-render at MediaPipe frame rate unnecessarily.

Keep the high-frequency tracking loop isolated from unrelated UI components.

IMPORTANT:

Do not rewrite the architecture.

Preserve the existing public interfaces/types wherever possible.

If an interface must change, explain why before making the change.

TEST:

After implementation:

1. Run the frontend TypeScript/build checks.
2. Start the application.
3. Start camera.
4. Confirm MediaPipe initializes once.
5. Confirm only one RAF loop runs.
6. Move in and out of the camera frame.
7. Stop and restart the camera.
8. Navigate away from the AI Coach page and return.
9. Confirm there are no:
   - Maximum update depth errors
   - duplicated RAF loops
   - repeated MediaPipe initialization
   - camera restart loops
   - console errors caused by pose tracking

Add temporary development-only logging if necessary to prove:
- MediaPipe initialized once
- tracking loop started once
- tracking loop stopped once

Remove excessive debug logging after validation.

DO NOT proceed to smoothing or Rule Engine changes.

At the end provide:
- files changed
- exact cause of any existing tracking-loop problem
- what was changed
- build/test result
- any remaining tracking issues