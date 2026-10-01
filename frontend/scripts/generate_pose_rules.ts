import { ALL_ASANAS_CATALOG } from "../src/features/ai-coach/data/allAsanasCatalog.ts";
import { resolveCanonicalAsanaId } from "../src/features/ai-coach/analysis/AsanaCanonicalIdResolver.ts";
import { getAsanaCoachingProfile } from "../src/features/ai-coach/services/AsanaCoachingProfileService.ts";
import { PoseLandmarkIndex as P } from "../src/features/ai-coach/types/pose-landmarks.ts";
import type { PoseRule, AsanaDefinition } from "../src/features/ai-coach/types/asana-definition.ts";
import * as fs from "fs";

// Comprehensive biomechanical rule generator for all 170 asanas
export function generateRulesForAsana(asana: AsanaDefinition): PoseRule[] {
  const id = asana.id;
  const canonicalId = resolveCanonicalAsanaId(id);
  const name = asana.displayName.toLowerCase();
  const sanskrit = (asana.sanskritName || "").toLowerCase();
  const category = asana.category.toLowerCase();
  const profile = getAsanaCoachingProfile(id);
  const stance = profile.stance;

  const rules: PoseRule[] = [];

  // Helper to add angle rule
  const addAngle = (
    ruleSuffix: string,
    ruleName: string,
    points: [number, number, number],
    target: number,
    tolerance: number,
    weight: number,
    severity: "high" | "medium" | "low",
    feedback: string,
    isSafety: boolean = false
  ) => {
    rules.push({
      id: `${id}.${ruleSuffix}`,
      name: ruleName,
      metric: "angle",
      points,
      comparison: "between",
      min: Math.max(0, target - tolerance),
      max: Math.min(180, target + tolerance),
      target,
      tolerance,
      weight,
      severity,
      feedback,
      isSafety,
    });
  };

  // Helper to add alignment rule
  const addAlignment = (
    ruleSuffix: string,
    ruleName: string,
    type: "horizontal" | "vertical",
    points: [number, number],
    target: number,
    tolerance: number,
    weight: number,
    severity: "high" | "medium" | "low",
    feedback: string,
    isSafety: boolean = false
  ) => {
    rules.push({
      id: `${id}.${ruleSuffix}`,
      name: ruleName,
      metric: type === "horizontal" ? "horizontal_alignment" : "vertical_alignment",
      points,
      comparison: "less_than",
      target,
      tolerance,
      weight,
      severity,
      feedback,
      isSafety,
    });
  };

  // Helper to add distance rule
  const addDistance = (
    ruleSuffix: string,
    ruleName: string,
    points: [number, number],
    target: number,
    tolerance: number,
    weight: number,
    severity: "high" | "medium" | "low",
    feedback: string
  ) => {
    rules.push({
      id: `${id}.${ruleSuffix}`,
      name: ruleName,
      metric: "distance",
      points,
      comparison: "less_than",
      target,
      tolerance,
      weight,
      severity,
      feedback,
    });
  };

  // 1. STANDING WARRIORS & LUNGES
  if (name.includes("warrior") || sanskrit.includes("virabhadrasana") || name.includes("lunge") || sanskrit.includes("anjaneyasana") || name.includes("crescent")) {
    if (name.includes("warrior iii") || name.includes("warrior 3") || sanskrit.includes("virabhadrasana iii")) {
      addAngle("standing_knee.straight", "Standing Leg Straight", [P.LEFT_HIP, P.LEFT_KNEE, P.LEFT_ANKLE], 175, 12, 3, "high", "Keep your standing leg strong with a straight knee.", true);
      addAngle("lifted_hip.extension", "Lifted Leg Parallel", [P.LEFT_SHOULDER, P.LEFT_HIP, P.LEFT_KNEE], 175, 15, 3, "high", "Extend your lifted leg straight back in line with your spine.");
      addAngle("torso.horizontal", "Torso Horizontal", [P.LEFT_SHOULDER, P.LEFT_HIP, P.LEFT_KNEE], 175, 15, 2, "medium", "Keep your torso and lifted leg parallel to the ground.");
      addAlignment("hip.level", "Level Hips", "horizontal", [P.LEFT_HIP, P.RIGHT_HIP], 0.08, 0.06, 2, "medium", "Square your hips toward the floor.");
    } else if (name.includes("warrior i") || name.includes("warrior 1") || sanskrit.includes("virabhadrasana i")) {
      addAngle("front_knee.angle", "Front Knee 90°", [P.LEFT_HIP, P.LEFT_KNEE, P.LEFT_ANKLE], 90, 15, 4, "high", "Bend your front knee directly over your ankle at 90°.", true);
      addAngle("back_knee.straight", "Back Leg Straight", [P.RIGHT_HIP, P.RIGHT_KNEE, P.RIGHT_ANKLE], 175, 12, 3, "high", "Keep your back leg straight with your heel grounded.");
      addAngle("arms.overhead", "Arms Raised Overhead", [P.LEFT_HIP, P.LEFT_SHOULDER, P.LEFT_ELBOW], 170, 15, 2, "medium", "Extend both arms straight overhead.");
      addAlignment("torso.upright", "Upright Spine", "vertical", [P.LEFT_SHOULDER, P.LEFT_HIP], 0.08, 0.06, 2, "medium", "Lift your torso tall out of your hips.");
    } else {
      // Warrior II / Peaceful / Side angle
      addAngle("front_knee.angle", "Front Knee 90°", [P.LEFT_HIP, P.LEFT_KNEE, P.LEFT_ANKLE], 90, 15, 4, "high", "Bend your front knee over your ankle at 90°.", true);
      addAngle("back_knee.straight", "Back Leg Straight", [P.RIGHT_HIP, P.RIGHT_KNEE, P.RIGHT_ANKLE], 175, 12, 3, "high", "Straighten and ground through your back leg.");
      addAngle("arms.parallel", "Arms Parallel to Floor", [P.LEFT_ELBOW, P.LEFT_SHOULDER, P.RIGHT_SHOULDER], 175, 15, 3, "medium", "Extend arms parallel to the ground.");
      addAlignment("torso.vertical", "Torso Centered", "vertical", [P.LEFT_SHOULDER, P.LEFT_HIP], 0.08, 0.06, 2, "medium", "Keep your torso upright without leaning forward.");
    }
  }
  // 2. STANDING BALANCE (Tree, Eagle, Dancer, Extended Hand-to-Big-Toe)
  else if (stance === "standing" && (category === "balancing" || name.includes("tree") || name.includes("eagle") || name.includes("dancer") || name.includes("nataraja") || name.includes("garuda") || name.includes("vrikshasana"))) {
    if (name.includes("tree") || sanskrit.includes("vrikshasana")) {
      addAngle("standing_knee.straight", "Standing Leg Straight", [P.RIGHT_HIP, P.RIGHT_KNEE, P.RIGHT_ANKLE], 175, 12, 4, "high", "Keep standing leg straight and firmly grounded.", true);
      addAngle("bent_knee.abduction", "Bent Knee Open", [P.LEFT_HIP, P.LEFT_KNEE, P.LEFT_ANKLE], 55, 20, 3, "high", "Turn your bent knee outward to open the hip.");
      addDistance("foot_to_thigh", "Foot Grounded on Thigh", [P.LEFT_ANKLE, P.RIGHT_KNEE], 0.16, 0.08, 3, "medium", "Place sole of foot firmly against inner thigh or calf.");
      addAlignment("spine.upright", "Upright Spine", "vertical", [P.LEFT_SHOULDER, P.LEFT_HIP], 0.08, 0.06, 2, "medium", "Lengthen your spine tall through the crown of your head.");
    } else if (name.includes("dancer") || sanskrit.includes("natarajasana")) {
      addAngle("standing_knee.straight", "Standing Leg Stable", [P.RIGHT_HIP, P.RIGHT_KNEE, P.RIGHT_ANKLE], 170, 15, 4, "high", "Root firmly through your straight standing leg.", true);
      addAngle("lifted_knee.arch", "Lifted Leg Arch", [P.LEFT_HIP, P.LEFT_KNEE, P.LEFT_ANKLE], 75, 25, 3, "high", "Kick lifted foot upward and back into your hand.");
      addAngle("torso.counterbalance", "Torso Hinge", [P.LEFT_SHOULDER, P.LEFT_HIP, P.RIGHT_KNEE], 135, 25, 2, "medium", "Hinge forward from the hip as you lift the back leg.");
      addAlignment("hip.square", "Square Hips", "horizontal", [P.LEFT_HIP, P.RIGHT_HIP], 0.10, 0.08, 2, "low", "Keep hips facing forward as you lift.");
    } else if (name.includes("eagle") || sanskrit.includes("garudasana")) {
      addAngle("standing_knee.bend", "Supporting Knee Bend", [P.RIGHT_HIP, P.RIGHT_KNEE, P.RIGHT_ANKLE], 120, 20, 4, "high", "Sink hips low with bent standing knee.", true);
      addAngle("elbows.crossed", "Elbows Bound", [P.LEFT_SHOULDER, P.LEFT_ELBOW, P.LEFT_WRIST], 90, 25, 3, "medium", "Cross and wrap arms with elbows at shoulder height.");
      addAlignment("spine.vertical", "Upright Torso", "vertical", [P.LEFT_SHOULDER, P.LEFT_HIP], 0.08, 0.06, 2, "medium", "Keep spine vertical and shoulders stacked over hips.");
    } else {
      addAngle("standing_knee.straight", "Standing Leg Strong", [P.RIGHT_HIP, P.RIGHT_KNEE, P.RIGHT_ANKLE], 175, 12, 4, "high", "Keep standing leg straight and stable.", true);
      addAngle("lifted_hip.flexion", "Lifted Leg Elevated", [P.LEFT_SHOULDER, P.LEFT_HIP, P.LEFT_KNEE], 110, 30, 3, "high", "Maintain high lifted leg position.");
      addAlignment("spine.balance", "Vertical Alignment", "vertical", [P.LEFT_SHOULDER, P.LEFT_HIP], 0.09, 0.07, 2, "medium", "Keep your torso tall and centered.");
    }
  }
  // 3. TRIANGLE & EXTENDED SIDE ANGLE POSES
  else if (name.includes("triangle") || sanskrit.includes("trikonasana") || name.includes("parsvakonasana") || name.includes("side angle")) {
    if (name.includes("triangle") || sanskrit.includes("trikonasana")) {
      addAngle("front_knee.straight", "Front Leg Straight", [P.LEFT_HIP, P.LEFT_KNEE, P.LEFT_ANKLE], 175, 12, 4, "high", "Keep both legs straight and quad engaged.", true);
      addAngle("back_knee.straight", "Back Leg Straight", [P.RIGHT_HIP, P.RIGHT_KNEE, P.RIGHT_ANKLE], 175, 12, 3, "high", "Anchor firmly through straight back leg.");
      addAngle("arms.vertical_line", "Arms in Straight Line", [P.LEFT_WRIST, P.LEFT_SHOULDER, P.RIGHT_WRIST], 175, 15, 3, "medium", "Extend arms vertically in a single line.");
      addAngle("hip.lateral_hinge", "Side Lateral Hinge", [P.LEFT_SHOULDER, P.LEFT_HIP, P.LEFT_KNEE], 120, 25, 2, "medium", "Hinge directly sideways over your front leg.");
    } else {
      addAngle("front_knee.bend", "Front Knee 90°", [P.LEFT_HIP, P.LEFT_KNEE, P.LEFT_ANKLE], 90, 15, 4, "high", "Bend front knee at 90° over ankle.", true);
      addAngle("back_knee.straight", "Back Leg Straight", [P.RIGHT_HIP, P.RIGHT_KNEE, P.RIGHT_ANKLE], 175, 12, 3, "high", "Keep back leg straight with outer foot grounded.");
      addAngle("side_body.diagonal", "Long Diagonal Line", [P.LEFT_WRIST, P.LEFT_SHOULDER, P.RIGHT_ANKLE], 170, 20, 3, "medium", "Create a straight diagonal line from hand to back foot.");
    }
  }
  // 4. FORWARD FOLDS (Uttanasana, Paschimottanasana, Padangusthasana, Janu Sirsasana)
  else if (category === "forward_bend" || name.includes("forward fold") || name.includes("forward bend") || sanskrit.includes("uttanasana") || sanskrit.includes("paschimottanasana") || sanskrit.includes("padangusthasana") || sanskrit.includes("janu sirsasana")) {
    addAngle("hip.deep_fold", "Deep Hip Flexion", [P.LEFT_SHOULDER, P.LEFT_HIP, P.LEFT_KNEE], 55, 25, 4, "high", "Fold deeply from the hips rather than rounding the back.", true);
    addAngle("knee.straight", "Legs Straight", [P.LEFT_HIP, P.LEFT_KNEE, P.LEFT_ANKLE], 175, 15, 3, "high", "Keep knees straight or with gentle microbend.");
    addAngle("spine.elongation", "Elongated Spine", [P.NOSE, P.LEFT_SHOULDER, P.LEFT_HIP], 160, 25, 2, "medium", "Reach crown of head toward toes with open chest.");
    addAlignment("pelvis.tilt", "Pelvic Anterior Tilt", "horizontal", [P.LEFT_HIP, P.RIGHT_HIP], 0.08, 0.06, 2, "low", "Keep pelvis square and balanced.");
  }
  // 5. BACKBENDS (Cobra, Upward Dog, Bow, Camel, Wheel, Bridge, Locust)
  else if (category === "backbend" || name.includes("cobra") || name.includes("bow") || name.includes("camel") || name.includes("wheel") || name.includes("bridge") || name.includes("locust") || sanskrit.includes("bhujangasana") || sanskrit.includes("dhanurasana") || sanskrit.includes("ustrasana") || sanskrit.includes("chakrasana") || sanskrit.includes("setu bandha") || sanskrit.includes("salabhasana")) {
    if (name.includes("cobra") || sanskrit.includes("bhujangasana")) {
      addAngle("chest.lift", "Chest Elevation", [P.NOSE, P.LEFT_SHOULDER, P.LEFT_HIP], 140, 25, 4, "high", "Lift chest smoothly using back muscles without forcing.", true);
      addAngle("elbows.tuck", "Elbows Bent and Tucked", [P.LEFT_SHOULDER, P.LEFT_ELBOW, P.LEFT_WRIST], 120, 25, 3, "high", "Keep elbows close to your ribs with soft bend.");
      addAngle("legs.grounded", "Legs Extended & Grounded", [P.LEFT_HIP, P.LEFT_KNEE, P.LEFT_ANKLE], 175, 12, 2, "medium", "Press tops of feet and thighs firmly into mat.");
      addAlignment("shoulders.level", "Shoulders Down and Level", "horizontal", [P.LEFT_SHOULDER, P.RIGHT_SHOULDER], 0.08, 0.06, 2, "low", "Roll shoulders back and away from ears.");
    } else if (name.includes("bridge") || sanskrit.includes("setu bandha")) {
      addAngle("hips.lift", "Hips Lifted High", [P.LEFT_SHOULDER, P.LEFT_HIP, P.LEFT_KNEE], 165, 18, 4, "high", "Lift hips high into strong straight bridge line.", true);
      addAngle("knees.parallel", "Knees at 90°", [P.LEFT_HIP, P.LEFT_KNEE, P.LEFT_ANKLE], 90, 20, 3, "high", "Keep knees stacked directly above ankles.");
      addAlignment("pelvis.level", "Level Pelvis", "horizontal", [P.LEFT_HIP, P.RIGHT_HIP], 0.08, 0.06, 2, "medium", "Keep both hip points at equal height.");
    } else if (name.includes("camel") || sanskrit.includes("ustrasana")) {
      addAngle("chest.arch", "Chest Heart Open", [P.NOSE, P.LEFT_SHOULDER, P.LEFT_HIP], 130, 25, 4, "high", "Lift chest upward toward ceiling in smooth arch.", true);
      addAngle("hips.forward", "Hips Over Knees", [P.LEFT_SHOULDER, P.LEFT_HIP, P.LEFT_KNEE], 175, 18, 3, "high", "Push hips forward so thighs stay vertical.");
      addAngle("knees.grounded", "Knees 90° to Floor", [P.LEFT_HIP, P.LEFT_KNEE, P.LEFT_ANKLE], 90, 20, 2, "medium", "Keep knees hip-width apart firmly grounded.");
    } else if (name.includes("bow") || sanskrit.includes("dhanurasana")) {
      addAngle("bow.arc", "Torso & Leg Bow Arc", [P.LEFT_SHOULDER, P.LEFT_HIP, P.LEFT_KNEE], 125, 25, 4, "high", "Kick feet into hands to lift chest and thighs off mat.", true);
      addAngle("knees.bent", "Knees Flexed", [P.LEFT_HIP, P.LEFT_KNEE, P.LEFT_ANKLE], 70, 25, 3, "high", "Hold ankles firmly with knees hip-width apart.");
      addAlignment("chest.centered", "Chest Balanced", "horizontal", [P.LEFT_SHOULDER, P.RIGHT_SHOULDER], 0.09, 0.07, 2, "medium", "Lift evenly through both shoulders.");
    } else {
      addAngle("spine.backbend_arch", "Spine Arch Extension", [P.LEFT_SHOULDER, P.LEFT_HIP, P.LEFT_KNEE], 145, 25, 4, "high", "Arch smoothly through the entire spine.", true);
      addAngle("chest.opening", "Chest Expansion", [P.NOSE, P.LEFT_SHOULDER, P.LEFT_HIP], 135, 25, 3, "high", "Expand chest and broaden collarbones.");
      addAlignment("shoulder.symmetry", "Symmetrical Shoulders", "horizontal", [P.LEFT_SHOULDER, P.RIGHT_SHOULDER], 0.08, 0.06, 2, "medium", "Keep shoulders even and relaxed.");
    }
  }
  // 6. INVERSIONS (Downward Dog, Dolphin, Headstand, Shoulderstand)
  else if (stance === "inverted" || category === "inversion" || name.includes("downward") || name.includes("dog") || name.includes("adho mukha") || name.includes("headstand") || name.includes("sirsasana") || name.includes("shoulderstand") || name.includes("sarvangasana") || name.includes("dolphin")) {
    if (name.includes("dog") || sanskrit.includes("svanasana") || name.includes("dolphin")) {
      addAngle("hip.inverted_v", "Inverted V Apex", [P.LEFT_SHOULDER, P.LEFT_HIP, P.LEFT_ANKLE], 75, 20, 4, "high", "Press hips high and back to form an inverted V shape.", true);
      addAngle("arms.extension", "Arms Fully Extended", [P.LEFT_WRIST, P.LEFT_ELBOW, P.LEFT_SHOULDER], 175, 15, 3, "high", "Press ground away through straight arms.");
      addAngle("legs.straight", "Legs Straight", [P.LEFT_HIP, P.LEFT_KNEE, P.LEFT_ANKLE], 175, 15, 3, "medium", "Lengthen hamstrings and reach heels toward floor.");
      addAlignment("spine.line", "Straight Spine Line", "vertical", [P.LEFT_SHOULDER, P.LEFT_HIP], 0.12, 0.08, 2, "low", "Keep spine in one straight diagonal line.");
    } else {
      addAngle("body.vertical_line", "Inverted Vertical Line", [P.LEFT_SHOULDER, P.LEFT_HIP, P.LEFT_ANKLE], 175, 15, 4, "high", "Align legs, hips, and shoulders in a single vertical line.", true);
      addAngle("core.stability", "Core Engagement", [P.LEFT_SHOULDER, P.LEFT_HIP, P.LEFT_KNEE], 175, 12, 3, "high", "Engage core to maintain stable vertical axis.");
      addAlignment("hip.level", "Level Inverted Hips", "horizontal", [P.LEFT_HIP, P.RIGHT_HIP], 0.08, 0.06, 2, "medium", "Keep pelvis level without tilting.");
    }
  }
  // 7. ARM BALANCES (Crow, Peacock, Scale, Side Plank, Firefly, Astavakrasana)
  else if (stance === "arm_balance" || category === "balancing" || name.includes("crow") || name.includes("crane") || name.includes("bakasana") || name.includes("kakasana") || name.includes("peacock") || name.includes("mayurasana") || name.includes("scale") || name.includes("tolasana")) {
    addAngle("elbow.shelf", "Elbow Support Angle", [P.LEFT_SHOULDER, P.LEFT_ELBOW, P.LEFT_WRIST], 95, 25, 4, "high", "Bend elbows into a strong supportive shelf (90°).", true);
    addAngle("knee.tuck", "Knees Tucked High", [P.LEFT_SHOULDER, P.LEFT_HIP, P.LEFT_KNEE], 60, 25, 4, "high", "Draw knees high onto the backs of your upper arms.", true);
    addAngle("feet.lifted", "Feet Lifted Off Ground", [P.LEFT_HIP, P.LEFT_KNEE, P.LEFT_ANKLE], 65, 25, 3, "medium", "Lift toes and feet off the mat with core strength.");
    addAlignment("shoulders.stable", "Shoulder Stability", "horizontal", [P.LEFT_SHOULDER, P.RIGHT_SHOULDER], 0.08, 0.06, 2, "medium", "Distribute weight evenly across both arms.");
  }
  // 8. PLANK & CORE (Plank, Side Plank, Chaturanga, Boat)
  else if (stance === "plank" || category === "core" || name.includes("plank") || name.includes("chaturanga") || name.includes("boat") || name.includes("navasana") || sanskrit.includes("phalakasana") || sanskrit.includes("kumbhakasana")) {
    if (name.includes("boat") || sanskrit.includes("navasana")) {
      addAngle("v_sit.angle", "V-Sit Body Angle", [P.LEFT_SHOULDER, P.LEFT_HIP, P.LEFT_KNEE], 65, 20, 4, "high", "Balance on sit bones with torso and thighs forming a V.", true);
      addAngle("knees.extension", "Leg Extension", [P.LEFT_HIP, P.LEFT_KNEE, P.LEFT_ANKLE], 170, 20, 3, "high", "Extend legs straight or parallel to the floor.");
      addAngle("arms.parallel", "Arms Reaching Forward", [P.LEFT_ELBOW, P.LEFT_SHOULDER, P.LEFT_HIP], 90, 20, 2, "medium", "Reach arms forward parallel to the mat.");
      addAlignment("chest.lift", "Open Chest", "vertical", [P.LEFT_SHOULDER, P.LEFT_HIP], 0.09, 0.07, 2, "medium", "Keep spine long and chest proud.");
    } else if (name.includes("chaturanga") || name.includes("four-limbed")) {
      addAngle("elbows.90", "Elbows at 90°", [P.LEFT_SHOULDER, P.LEFT_ELBOW, P.LEFT_WRIST], 90, 15, 4, "high", "Lower until elbows are bent at a precise 90° angle.", true);
      addAngle("plank.straight", "Straight Body Line", [P.LEFT_SHOULDER, P.LEFT_HIP, P.LEFT_ANKLE], 175, 12, 4, "high", "Maintain single straight line from crown to heels.", true);
      addAlignment("shoulders.level", "Level Shoulders", "horizontal", [P.LEFT_SHOULDER, P.RIGHT_SHOULDER], 0.08, 0.06, 2, "medium", "Keep shoulders level and collarbones broad.");
    } else {
      // Standard / Side Plank
      addAngle("plank.line", "Straight Plank Line", [P.LEFT_SHOULDER, P.LEFT_HIP, P.LEFT_ANKLE], 175, 12, 4, "high", "Keep body in one straight line without sagging hips.", true);
      addAngle("arms.stacked", "Arms Perpendicular", [P.LEFT_HIP, P.LEFT_SHOULDER, P.LEFT_ELBOW], 90, 15, 3, "high", "Stack shoulders directly over wrists.");
      addAngle("knees.straight", "Legs Extended", [P.LEFT_HIP, P.LEFT_KNEE, P.LEFT_ANKLE], 175, 12, 2, "medium", "Engage quads and press heels back.");
      addAlignment("hips.level", "Level Hips", "horizontal", [P.LEFT_HIP, P.RIGHT_HIP], 0.08, 0.06, 2, "medium", "Prevent hips from twisting or dropping.");
    }
  }
  // 9. SEATED & RESTORATIVE (Lotus, Easy Pose, Staff, Bound Angle, Hero, Pigeon)
  else if (stance === "seated" || category === "seated" || name.includes("lotus") || name.includes("sukhasana") || name.includes("padmasana") || name.includes("dandasana") || name.includes("baddha konasana") || name.includes("pigeon") || name.includes("kapotasana") || name.includes("staff")) {
    if (name.includes("staff") || sanskrit.includes("dandasana")) {
      addAngle("torso_legs.90", "90° L-Sit Angle", [P.LEFT_SHOULDER, P.LEFT_HIP, P.LEFT_ANKLE], 90, 15, 4, "high", "Sit at a precise 90° angle with torso upright and legs straight.", true);
      addAngle("knees.straight", "Legs Fully Grounded", [P.LEFT_HIP, P.LEFT_KNEE, P.LEFT_ANKLE], 175, 10, 3, "high", "Press backs of knees and thighs flat to floor.");
      addAlignment("spine.vertical", "Vertical Spine", "vertical", [P.LEFT_SHOULDER, P.LEFT_HIP], 0.07, 0.05, 3, "medium", "Lengthen spine tall out of pelvis.");
    } else if (name.includes("bound angle") || name.includes("butterfly") || sanskrit.includes("baddha konasana")) {
      addAngle("knees.open", "Knees Open Wide", [P.LEFT_HIP, P.LEFT_KNEE, P.LEFT_ANKLE], 45, 25, 4, "high", "Let knees relax open toward the floor.", true);
      addDistance("feet.together", "Soles of Feet Pressed", [P.LEFT_ANKLE, P.RIGHT_ANKLE], 0.12, 0.06, 3, "high", "Bring soles of feet together near pelvis.");
      addAlignment("spine.tall", "Tall Seated Spine", "vertical", [P.LEFT_SHOULDER, P.LEFT_HIP], 0.08, 0.06, 2, "medium", "Sit upright with lengthened spine.");
    } else {
      addAngle("hip.flexion", "Seated Hip Grounding", [P.LEFT_SHOULDER, P.LEFT_HIP, P.LEFT_KNEE], 85, 20, 4, "high", "Root both sit bones evenly into the mat.", true);
      addAngle("knee.fold", "Knee Fold Comfort", [P.LEFT_HIP, P.LEFT_KNEE, P.LEFT_ANKLE], 55, 30, 3, "medium", "Fold legs comfortably in steady seated base.");
      addAlignment("spine.erect", "Spine Length", "vertical", [P.LEFT_SHOULDER, P.LEFT_HIP], 0.08, 0.06, 3, "high", "Sit tall with a straight, elongated spine.");
      addAlignment("shoulder.relaxation", "Relaxed Shoulders", "horizontal", [P.LEFT_SHOULDER, P.RIGHT_SHOULDER], 0.08, 0.06, 2, "low", "Relax shoulders away from your ears.");
    }
  }
  // 10. SUPINE (Corpse, Reclined Butterfly, Happy Baby, Supine Twist)
  else if (stance === "supine" || category === "restorative" || name.includes("corpse") || name.includes("savasana") || name.includes("happy baby") || name.includes("ananda balasana") || name.includes("supta")) {
    if (name.includes("happy baby") || sanskrit.includes("ananda balasana")) {
      addAngle("knees.90", "Knees 90° to Torso", [P.LEFT_SHOULDER, P.LEFT_HIP, P.LEFT_KNEE], 90, 20, 4, "high", "Draw knees toward armpits with shins perpendicular to floor.", true);
      addAngle("knees.flexion", "Knee Bend 90°", [P.LEFT_HIP, P.LEFT_KNEE, P.LEFT_ANKLE], 90, 20, 3, "high", "Hold soles of feet with ankles stacked above knees.");
      addAlignment("sacrum.grounded", "Sacrum Flat on Floor", "horizontal", [P.LEFT_HIP, P.RIGHT_HIP], 0.08, 0.06, 2, "medium", "Keep your tailbone and head grounded on the mat.");
    } else {
      addAngle("body.supine_line", "Supine Alignment", [P.LEFT_SHOULDER, P.LEFT_HIP, P.LEFT_ANKLE], 175, 15, 3, "medium", "Rest fully flat and symmetrical on the floor.");
      addAlignment("shoulders.grounded", "Shoulders Relaxed & Grounded", "horizontal", [P.LEFT_SHOULDER, P.RIGHT_SHOULDER], 0.07, 0.05, 2, "medium", "Let shoulders melt into the earth.");
      addAlignment("hips.grounded", "Hips Grounded Evenly", "horizontal", [P.LEFT_HIP, P.RIGHT_HIP], 0.07, 0.05, 2, "low", "Release pelvis with balanced symmetry.");
    }
  }
  // 11. KNEELING & ALL FOURS (Child's Pose, Cat, Cow, Table, Gate)
  else if (stance === "kneeling" || stance === "all_fours" || name.includes("child") || name.includes("balasana") || name.includes("cat") || name.includes("cow") || name.includes("table") || name.includes("gate") || sanskrit.includes("parighasana")) {
    if (name.includes("child") || sanskrit.includes("balasana")) {
      addAngle("hips.to_heels", "Hips Folded to Heels", [P.LEFT_SHOULDER, P.LEFT_HIP, P.LEFT_KNEE], 45, 20, 4, "high", "Rest hips back onto heels with soft deep fold.", true);
      addAngle("knees.flexion", "Knees Folded", [P.LEFT_HIP, P.LEFT_KNEE, P.LEFT_ANKLE], 40, 20, 3, "medium", "Knees wide or together as comfortable.");
      addAlignment("spine.rest", "Elongated Resting Spine", "horizontal", [P.LEFT_SHOULDER, P.RIGHT_SHOULDER], 0.08, 0.06, 2, "low", "Surrender torso and forehead toward mat.");
    } else {
      addAngle("hips.table_angle", "Hips Over Knees (90°)", [P.LEFT_SHOULDER, P.LEFT_HIP, P.LEFT_KNEE], 90, 18, 4, "high", "Stack hips directly over knees.", true);
      addAngle("shoulders.table_angle", "Shoulders Over Wrists (90°)", [P.LEFT_HIP, P.LEFT_SHOULDER, P.LEFT_WRIST], 90, 18, 3, "high", "Stack shoulders directly over hands/wrists.");
      addAlignment("spine.neutral", "Neutral Spine", "horizontal", [P.LEFT_SHOULDER, P.LEFT_HIP], 0.09, 0.07, 2, "medium", "Keep back flat and neck aligned with spine.");
    }
  }
  // 12. GENERAL STANDING POSES (Mountain, Chair, Standing Side Bend, etc.)
  else {
    if (name.includes("chair") || sanskrit.includes("utkatasana")) {
      addAngle("knees.bend", "Knees Deep Bend (100°)", [P.LEFT_HIP, P.LEFT_KNEE, P.LEFT_ANKLE], 100, 20, 4, "high", "Sink hips back as if sitting into a deep chair.", true);
      addAngle("torso.incline", "Torso Extended Forward", [P.LEFT_SHOULDER, P.LEFT_HIP, P.LEFT_KNEE], 115, 20, 3, "high", "Keep chest lifted and spine long on diagonal.");
      addAngle("arms.reach", "Arms Raised Overhead", [P.LEFT_HIP, P.LEFT_SHOULDER, P.LEFT_ELBOW], 165, 20, 2, "medium", "Extend arms alongside ears.");
      addAlignment("knees.level", "Knees Symmetrical", "horizontal", [P.LEFT_KNEE, P.RIGHT_KNEE], 0.08, 0.06, 2, "medium", "Keep knees tracking parallel without caving.");
    } else {
      // Default Standing / Tadasana
      addAngle("knee.straight", "Legs Straight and Strong", [P.LEFT_HIP, P.LEFT_KNEE, P.LEFT_ANKLE], 175, 12, 4, "high", "Engage thighs and straighten knees without hyperextending.", true);
      addAngle("hip.alignment", "Hips Over Ankles", [P.LEFT_SHOULDER, P.LEFT_HIP, P.LEFT_KNEE], 175, 12, 3, "high", "Stack hips over ankles and shoulders over hips.");
      addAlignment("spine.erect", "Vertical Spine", "vertical", [P.LEFT_SHOULDER, P.LEFT_HIP], 0.07, 0.05, 3, "medium", "Stand tall with elongated spine and open collarbones.");
      addAlignment("shoulders.level", "Level Shoulders", "horizontal", [P.LEFT_SHOULDER, P.RIGHT_SHOULDER], 0.07, 0.05, 2, "low", "Relax shoulders evenly away from ears.");
    }
  }

  return rules;
}
