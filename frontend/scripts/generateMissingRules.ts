import fs from "fs";
import path from "path";
import dotenv from "dotenv";

// Import your catalog
import { ALL_ASANAS_CATALOG } from "../src/features/ai-coach/data/allAsanasCatalog";

// Read from backend .env
dotenv.config({ path: path.resolve(process.cwd(), "../backend/.env") });

const RULES_PATH = path.resolve(process.cwd(), "public/data/rules.json");
const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

if (!OPENAI_API_KEY) {
  console.error("❌ Missing OPENAI_API_KEY in .env");
  process.exit(1);
}

// 1. Read existing rules
let existingRules: Record<string, any[]> = {};
if (fs.existsSync(RULES_PATH)) {
  existingRules = JSON.parse(fs.readFileSync(RULES_PATH, "utf-8"));
}

// 2. Identify missing asanas
const missingAsanas = ALL_ASANAS_CATALOG.filter(
  (a) => !existingRules[a.id] || existingRules[a.id].length === 0
);

console.log(`Found ${missingAsanas.length} asanas missing rules.`);

// We process in small batches to avoid rate limits
const BATCH_SIZE = 5;

const PROMPT_TEMPLATE = `
You are an expert Yoga Instructor and Computer Vision Engineer.
Below is an array of yoga poses. For each pose, you must define the geometric "Pose Rules" for a MediaPipe Pose tracking system.

Output valid JSON ONLY. The JSON must be an object mapping the asana \`id\` to an array of \`PoseRule\` objects.

Example Schema:
{
  "pose-id-here": [
    {
      "id": "pose-rule-unique-id",
      "name": "Front Knee Angle",
      "metric": "angle",
      "points": [24, 26, 28], // MediaPipe landmarks (e.g. RIGHT_HIP, RIGHT_KNEE, RIGHT_ANKLE)
      "comparison": "between",
      "min": 75,
      "max": 115,
      "weight": 2,
      "severity": "high",
      "feedback": "Keep front knee stacked over your ankle."
    }
  ]
}

Available Landmarks:
0: nose, 11: left_shoulder, 12: right_shoulder, 13: left_elbow, 14: right_elbow, 15: left_wrist, 16: right_wrist, 23: left_hip, 24: right_hip, 25: left_knee, 26: right_knee, 27: left_ankle, 28: right_ankle.

Metrics available: 
- "angle" (requires 3 points)
- "horizontal_alignment" (requires 2 points, e.g. [11, 12] for shoulders, target is max vertical distance)
- "vertical_alignment" (requires 2 points, target is max horizontal distance)

Generate rules for the following poses:
`;

async function generateBatch(batch: typeof ALL_ASANAS_CATALOG) {
  const payload = batch.map((a) => ({
    id: a.id,
    name: a.name,
    sanskritName: a.sanskritName,
    cues: a.cues,
  }));

  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${OPENAI_API_KEY}`,
    },
    body: JSON.stringify({
      model: "gpt-4o",
      response_format: { type: "json_object" },
      messages: [
        {
          role: "system",
          content: PROMPT_TEMPLATE,
        },
        {
          role: "user",
          content: JSON.stringify(payload, null, 2),
        },
      ],
    }),
  });

  const data = await response.json();
  if (data.error) {
    throw new Error(data.error.message);
  }
  return JSON.parse(data.choices[0].message.content);
}

async function run() {
  for (let i = 0; i < missingAsanas.length; i += BATCH_SIZE) {
    const batch = missingAsanas.slice(i, i + BATCH_SIZE);
    console.log(`Processing batch ${i / BATCH_SIZE + 1}...`);
    
    try {
      const generated = await generateBatch(batch);
      
      // Merge results
      for (const key in generated) {
        existingRules[key] = generated[key];
        console.log(`✅ Generated rules for ${key}`);
      }
      
      // Save progressively
      fs.writeFileSync(RULES_PATH, JSON.stringify(existingRules, null, 2));
    } catch (e) {
      console.error("Failed on batch:", e);
      break;
    }
    
    // Brief pause to avoid rate limiting
    await new Promise((r) => setTimeout(r, 1000));
  }
  console.log("Finished generating rules.");
}

run();
