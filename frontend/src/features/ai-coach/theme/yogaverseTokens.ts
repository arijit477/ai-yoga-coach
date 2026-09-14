/**
 * Yogaverse AI Coach Design Tokens
 * Replicating the clean, light, premium wellness aesthetic of https://www.yogaverse.co.nz/AIYogaCoach
 */

export const YOGAVERSE_TOKENS = {
  colors: {
    // Grounded dark green/charcoal typography
    ink900: "#1e4d32",
    ink800: "#265e3c",
    ink700: "#357a50",
    textPrimary: "#1c3a28",
    textSecondary: "#507060",
    textMuted: "#7ba686",

    // Surfaces (light, pure, fresh)
    pageBg: "#f9fdfb", // barely-green fresh white
    paper: "#ffffff",
    sand: "#edf7f1", // soft mint tint
    cream: "#f4fbf7",
    cardBorder: "#e2eee7",
    cardBorderHover: "#cde3d6",

    // Accents
    sage: "#4eb87a",
    sageDark: "#2f8055",
    mint: "#7dd4ae",
    gold: "#d4a017",
    coral: "#e07b5f",
    violet: "#3aab74",

    // Status colors (gentle & wellness-focused, never harsh neon)
    statusGood: "#2f8055", // calming forest sage
    statusGoodBg: "#edf7f1",
    statusWarning: "#d4a017", // warm honey
    statusWarningBg: "#fef9ec",
    statusError: "#e07b5f", // warm terracotta / coral
    statusErrorBg: "#fdf2ee",
  },
  typography: {
    headingFont: "'Fraunces', Georgia, 'Times New Roman', serif",
    bodyFont: "'Manrope', system-ui, -apple-system, sans-serif",
  },
  shadows: {
    soft: "0 8px 30px -10px rgba(30, 77, 50, 0.08)",
    card: "0 4px 20px -6px rgba(30, 77, 50, 0.06)",
    elevated: "0 18px 50px -15px rgba(30, 77, 50, 0.12)",
  },
  radius: {
    card: "20px",
    badge: "999px",
    sm: "12px",
  },
} as const;
