/**
 * AsanaCanonicalIdResolver — Single canonical resolver for asana ID normalization.
 *
 * Problem: ALL_ASANAS_CATALOG uses compound IDs like "cobra-bhujangasana" while
 * KNOWN_CRITICAL_RULES (in AsanaCompletionGate) uses short-form IDs like "bhujangasana".
 * normalizeAsanaId() only strips file extensions — it does NOT collapse compound names.
 * This means KNOWN_CRITICAL_RULES was effectively DEAD at runtime for all 170 catalog asanas.
 *
 * Solution: This file provides ONE canonical resolver used by AsanaCompletionGate.
 * Do NOT add aliases elsewhere. All compound→canonical mappings live here.
 */

import { normalizeAsanaId } from "../data/AsanaRegistry";

/**
 * Maps ALL_ASANAS_CATALOG compound IDs → their canonical KNOWN_CRITICAL_RULES short-form key.
 * Only asanas that have hand-authored critical rules need entries here.
 * All other asanas pass through as-is (to the automatic fallback path).
 */
const CATALOG_ID_TO_CANONICAL: Record<string, string> = {
  // Cobra / Bhujangasana
  "cobra-bhujangasana": "bhujangasana",
  "sphinx-salamba-bhujangasana": "bhujangasana", // Sphinx shares the prone chest-lift gate

  // Bridge / Setu Bandhasana
  "bridge-setu-bandha-sarvangasana": "setu-bandhasana",

  // Lotus / Padmasana
  "lotus-padmasana": "padmasana",

  // Warrior II
  "warrior-ii-virabhadrasana-ii": "warrior-ii",

  // Mountain Pose / Tadasana
  "mountain-tadasana": "tadasana",

  // Tree Pose / Vrksasana
  "tree-vrksasana": "vrksasana",

  // Downward-Facing Dog
  "downward-dog-adho-mukha-svanasana": "adho-mukha-svanasana",

  // Child's Pose / Balasana
  "childs-pose-balasana": "balasana",

  // Chaturanga / Low Push-Up
  "low-push-up-chaturanga-dandasana": "chaturanga-dandasana",

  // Cow Pose / Bitilasana
  "cow-bitilasana": "bitilasana",
  "bitilasana": "bitilasana",
  "cow-pose": "bitilasana",
  "marjaryasana-bitilasana": "bitilasana",

  // Cat Pose / Marjaryasana
  "cat-marjaryasana": "marjaryasana",
  "cat-marjariasana": "marjaryasana",
  "marjaryasana": "marjaryasana",
  "cat-pose": "marjaryasana",

  // Corpse Pose / Savasana
  "corpse-savasana": "savasana",
  "savasana": "savasana",

  // Plank / Phalakasana
  "plank-phalakasana": "plank",
  "plank": "plank",

  // Triangle / Trikonasana
  "triangle-trikonasana": "trikonasana",
  "extended-triangle-utthita-trikonasana": "trikonasana",
  "trikonasana": "trikonasana",

  // Warrior I / Virabhadrasana I
  "warrior-i-virabhadrasana-i": "warrior-i",
  "warrior-i": "warrior-i",

  // Seated Forward Bend / Paschimottanasana
  "seated-forward-bend-paschimottanasana": "paschimottanasana",
  "paschimottanasana": "paschimottanasana",

  // Boat Pose / Navasana
  "boat-navasana": "navasana",
  "navasana": "navasana",

  // Camel Pose / Ustrasana
  "camel-ustrasana": "ustrasana",
  "ustrasana": "ustrasana",

  // Locust Pose / Salabhasana
  "locust-salabhasana": "salabhasana",
  "salabhasana": "salabhasana",

  // Bow Pose / Dhanurasana
  "bow-dhanurasana": "dhanurasana",
  "dhanurasana": "dhanurasana",
};

/**
 * Resolves a catalog asana ID (potentially compound) to the canonical short-form key
 * used by KNOWN_CRITICAL_RULES in AsanaCompletionGate.
 *
 * If no mapping exists, the normalized ID is returned unchanged — the gate falls
 * through to the automatic high-severity rule extraction path.
 *
 * @param asanaId - any raw asana ID (catalog compound ID, filename, URL segment, short form)
 * @returns canonical short-form key if a mapping exists; normalized ID otherwise
 */
export function resolveCanonicalAsanaId(asanaId: string): string {
  if (!asanaId) return "";
  const normalized = normalizeAsanaId(asanaId);
  return CATALOG_ID_TO_CANONICAL[normalized] ?? normalized;
}

/**
 * Returns all known catalog-ID → canonical-key mappings.
 * Used by audit tooling and tests to verify coverage.
 */
export function getCanonicalIdMappings(): Readonly<Record<string, string>> {
  return CATALOG_ID_TO_CANONICAL;
}

/**
 * Returns the count of catalog IDs that have explicit canonical mappings.
 */
export function getCanonicalMappingCount(): number {
  return Object.keys(CATALOG_ID_TO_CANONICAL).length;
}
