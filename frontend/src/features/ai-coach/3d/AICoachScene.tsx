import { Canvas } from "@react-three/fiber";
import { SceneLighting } from "./SceneLighting";
import { SceneBackground } from "./SceneBackground";
import { AsanaStage } from "./AsanaStage";
import { ScoreRing3D } from "./ScoreRing3D";
import { HoldProgress3D } from "./HoldProgress3D";
import { SessionProgress3D } from "./SessionProgress3D";

import { useAICoachStore } from "../store/aiCoachStore";
import { useCoachState } from "../../../hooks/useCoachState";
import { useCoachSession } from "../../../hooks/useCoachSession";

interface AICoachSceneProps {
  evaluation: any; // from useStablePoseEvaluation
  sessionState: ReturnType<typeof useCoachSession>["state"];
  holdTime: number;
  hasPose: boolean;
  coachState?: ReturnType<typeof useCoachState>;
}

export function AICoachScene({ 
  evaluation, 
  sessionState, 
  holdTime,
  hasPose,
  coachState: _coachState,
}: AICoachSceneProps) {
  const {
    currentAsana,
    sessionAsanas,
    currentAsanaIndex
  } = useAICoachStore();

  const isSessionActive =
    sessionState !== "idle" &&
    sessionState !== "completed" &&
    sessionState !== "session_completed";

  return (
    <div className="absolute inset-0 pointer-events-none z-10">
      <Canvas
        camera={{ position: [0, 0, 10], fov: 50 }}
        dpr={[1, 2]} // performance: limit max dpr to 2
        gl={{ alpha: true, antialias: true }}
      >
        <SceneLighting />
        <SceneBackground />
        {/* Center-Top: Asana Stage (Name and transitions) */}
        {isSessionActive && (
          <AsanaStage 
            currentAsana={currentAsana} 
            position={[0, 3.5, 0]} 
          />
        )}

        {/* Center-Bottom: Score Ring */}
        {isSessionActive && hasPose && sessionState !== "countdown" && (
          <ScoreRing3D 
            score={evaluation?.score ?? null} 
            position={[0, -3.5, 0]} 
          />
        )}

        {/* Center: Hold Progress (appears when holding) */}
        <HoldProgress3D 
          isHolding={sessionState === "holding"}
          holdTime={holdTime}
          targetHoldSeconds={currentAsana.targetHoldSeconds}
          position={[0, 0, 2]} // Bring it slightly forward
        />

        {/* Bottom: Session Progress Timeline */}
        <SessionProgress3D 
          asanas={sessionAsanas}
          currentIndex={currentAsanaIndex}
          position={[0, -4.5, 0]}
        />
      </Canvas>
    </div>
  );
}
