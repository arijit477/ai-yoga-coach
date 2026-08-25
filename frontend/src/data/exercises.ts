import type { Exercise } from '../types/exercise';

export const exercises: Exercise[] = [
  {
    id: 'tree-pose',
    name: 'Tree Pose',
    description: 'A balancing posture that improves focus and strengthens the legs and core.',
    difficulty: 'Beginner',
    duration: 120,
    animationState: 'TREE_POSE',
    instructions: [
      'Stand tall with your feet together.',
      'Shift your weight onto your left foot.',
      'Place the sole of your right foot on your inner left thigh or calf (avoid the knee).',
      'Bring your hands together in front of your chest.',
      'Hold the pose, focusing on a fixed point in front of you.'
    ],
    corrections: {
      losing_balance: "That's okay. Keep your gaze fixed on one point, engage your core, and place your foot slightly lower on your standing leg. Take a slow breath and try again.",
      dont_understand: "Imagine you are a tree. Your standing leg is the trunk rooting into the earth, and your arms are branches reaching up. Place your foot flat on the side of your leg.",
      posture: "Keep your shoulders relaxed and your spine tall. Avoid leaning toward your standing leg."
    }
  },
  {
    id: 'downward-dog',
    name: 'Downward Dog',
    description: 'A classic pose that stretches the entire back of the body and strengthens the arms and shoulders.',
    difficulty: 'Beginner',
    duration: 180,
    animationState: 'DOWNWARD_DOG',
    instructions: [
      'Start on your hands and knees.',
      'Spread your fingers wide and press firmly into the mat.',
      'Tuck your toes and lift your hips up and back.',
      'Keep your arms straight and your head between your upper arms.',
      'Gently press your heels toward the floor.'
    ],
    corrections: {
      losing_balance: "If you feel unsteady, widen your stance slightly and press firmly into all ten fingers to distribute your weight.",
      dont_understand: "Create an inverted 'V' shape with your body. Your hands and feet press into the floor while your hips reach up toward the ceiling.",
      posture: "Make sure your back is straight. If it's rounding, bend your knees a little bit so you can push your hips higher."
    }
  },
  {
    id: 'warrior-two',
    name: 'Warrior II',
    description: 'A powerful standing pose that builds stamina and stretches the hips and chest.',
    difficulty: 'Beginner',
    duration: 180,
    animationState: 'WARRIOR_TWO',
    instructions: [
      'Stand with your feet wide apart.',
      'Turn your right foot out 90 degrees.',
      'Bend your right knee until it is directly over your right ankle.',
      'Extend your arms out to the sides, parallel to the floor.',
      'Gaze over your right fingertips and hold the posture.'
    ],
    corrections: {
      losing_balance: "Keep your weight centered between both legs. Don't lean too far forward over your bent knee.",
      dont_understand: "Stand wide, bend your front knee so it's above your ankle, and stretch your arms out wide like a surfer on a board.",
      posture: "Tuck your tailbone slightly and keep your torso completely upright, directly over your hips."
    }
  }
];
