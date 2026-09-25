import { ALL_ASANAS_CATALOG } from "../src/features/ai-coach/data/allAsanasCatalog.ts";
import { normalizeAsanaId, AsanaRegistry } from "../src/features/ai-coach/data/AsanaRegistry.ts";

interface ValidationIssue {
  type: "error" | "warning";
  code: string;
  asanaId: string;
  message: string;
}

export function validateAsanas() {
  const issues: ValidationIssue[] = [];
  const seenAsanaIds = new Set<string>();
  const seenRuleIds = new Set<string>();

  const VALID_METRICS = new Set(["angle", "distance", "horizontal_alignment", "vertical_alignment"]);

  let productionCount = 0;
  let validatedCount = 0;
  let draftCount = 0;

  for (const asana of ALL_ASANAS_CATALOG) {
    // 1. Check ID & Duplication
    if (!asana.id) {
      issues.push({
        type: "error",
        code: "MISSING_ID",
        asanaId: "unknown",
        message: "Asana definition is missing an ID",
      });
    } else {
      const normId = normalizeAsanaId(asana.id);
      if (seenAsanaIds.has(normId)) {
        issues.push({
          type: "error",
          code: "DUPLICATE_ID",
          asanaId: asana.id,
          message: `Duplicate asana ID detected: '${normId}'`,
        });
      }
      seenAsanaIds.add(normId);
    }

    // 2. Display Name
    if (!asana.displayName || asana.displayName.trim() === "") {
      issues.push({
        type: "error",
        code: "MISSING_DISPLAY_NAME",
        asanaId: asana.id,
        message: "Missing display name",
      });
    }

    // 3. Asset Image URL / Path
    if (!asana.asset?.imageUrl || !asana.asset?.storagePath) {
      issues.push({
        type: "error",
        code: "MISSING_IMAGE_ASSET",
        asanaId: asana.id,
        message: "Missing asset imageUrl or storagePath",
      });
    }

    // 4. Filename format
    if (!asana.asset?.storagePath?.endsWith(".webp") && !asana.asset?.storagePath?.endsWith(".png")) {
      issues.push({
        type: "warning",
        code: "UNCONVENTIONAL_ASSET_EXT",
        asanaId: asana.id,
        message: `Asset storagePath does not end in standard extension: ${asana.asset?.storagePath}`,
      });
    }

    // 5. Rules & Landmarks
    if (!asana.rules || asana.rules.length === 0) {
      issues.push({
        type: "error",
        code: "NO_RULES",
        asanaId: asana.id,
        message: "Asana has no pose evaluation rules configured",
      });
    } else {
      for (const rule of asana.rules) {
        // Check Rule ID
        if (!rule.id) {
          issues.push({
            type: "error",
            code: "MISSING_RULE_ID",
            asanaId: asana.id,
            message: "A rule is missing an ID",
          });
        } else {
          if (seenRuleIds.has(rule.id)) {
            issues.push({
              type: "error",
              code: "DUPLICATE_RULE_ID",
              asanaId: asana.id,
              message: `Duplicate rule ID detected: '${rule.id}'`,
            });
          }
          seenRuleIds.add(rule.id);
        }

        // Check Rule Metric
        if (!VALID_METRICS.has(rule.metric)) {
          issues.push({
            type: "error",
            code: "INVALID_RULE_METRIC",
            asanaId: asana.id,
            message: `Rule '${rule.id}' references invalid metric: '${rule.metric}'`,
          });
        }

        // Check Points
        if (!rule.points || rule.points.length === 0) {
          issues.push({
            type: "error",
            code: "EMPTY_RULE_POINTS",
            asanaId: asana.id,
            message: `Rule '${rule.id}' has empty points array`,
          });
        } else {
          for (const pt of rule.points) {
            if (typeof pt !== "number" || pt < 0 || pt > 32) {
              issues.push({
                type: "error",
                code: "INVALID_LANDMARK_POINT",
                asanaId: asana.id,
                message: `Rule '${rule.id}' references out-of-range MediaPipe landmark: ${pt}`,
              });
            }
          }
        }
      }
    }

    // 6. Required Landmarks
    if (!asana.requiredLandmarks || asana.requiredLandmarks.length === 0) {
      issues.push({
        type: "error",
        code: "MISSING_REQUIRED_LANDMARKS",
        asanaId: asana.id,
        message: "Missing derived required landmarks",
      });
    }

    // 7. Validation status
    const status = asana.validation?.status || "draft";
    if (status === "production") {
      productionCount++;
    } else if (status === "validated") {
      validatedCount++;
    } else {
      draftCount++;
    }
  }

  // Generate Report
  const errors = issues.filter((i) => i.type === "error");
  const warnings = issues.filter((i) => i.type === "warning");

  console.log("==================================================");
  console.log("             ASANA VALIDATION REPORT             ");
  console.log("==================================================");
  console.log(`Total Assets Registered:   ${ALL_ASANAS_CATALOG.length}`);
  console.log(`Unique Primary IDs:        ${seenAsanaIds.size}`);
  console.log(`Unique Rule IDs:           ${seenRuleIds.size}`);
  console.log(`Validation Errors:         ${errors.length}`);
  console.log(`Validation Warnings:       ${warnings.length}`);
  console.log("--------------------------------------------------");
  console.log(`Production-ready:          ${productionCount}`);
  console.log(`Expert Validated:          ${validatedCount}`);
  console.log(`Draft Rules:               ${draftCount}`);
  console.log("--------------------------------------------------");

  if (errors.length > 0) {
    console.log("\nERRORS:");
    for (const err of errors) {
      console.log(`  [${err.code}] (${err.asanaId}): ${err.message}`);
    }
  } else {
    console.log("\n[PASS] All 170 asanas passed structure & landmark validation with 0 errors!");
  }

  if (warnings.length > 0) {
    console.log("\nWARNINGS:");
    for (const w of warnings) {
      console.log(`  [${w.code}] (${w.asanaId}): ${w.message}`);
    }
  }

  console.log("==================================================\n");

  return {
    total: ALL_ASANAS_CATALOG.length,
    errors: errors.length,
    warnings: warnings.length,
    productionCount,
    validatedCount,
    draftCount,
  };
}

const result = validateAsanas();
if (result.errors > 0) {
  process.exit(1);
}
