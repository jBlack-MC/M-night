/**
 * SCENE CONSTANTS — Stage 1: The Beginning
 * 
 * Defines all story scenes, camera states, lighting, and scroll progress thresholds.
 * This is the single source of truth for the storytelling experience.
 */

// ============================================================================
// LIGHTING CONFIGURATION
// ============================================================================

export const LIGHTING = {
  /**
   * Background color — very dark
   * #080808 = slightly warmer than pure black
   */
  backgroundColor: "#080808",

  /**
   * Ambient light — provides base illumination
   * Low intensity so spotlight is the hero
   */
  ambient: {
    intensity: 0.22,
    color: "#ffffff",
  },

  /**
   * Main spotlight — focused on the pawn
   * Creates the cinematic hero lighting
   */
  spotlight: {
    position: [1.5, 4, 2] as [number, number, number],
    intensity: 10,
    angle: 0.35,
    penumbra: 0.8,
    color: "#ffffff",
  },

  /**
   * Rim light — subtle directional light
   * Separates the pawn from the dark background
   * Cool-tinted for contrast
   */
  rimLight: {
    position: [-3, 2, -2] as [number, number, number],
    intensity: 0.65,
    color: "#c8d0ff", // Cool blue-white tone
  },

  /**
   * Optional: Additional fill light for balance
   */
  fillLight: {
    position: [2, 0.5, -1] as [number, number, number],
    intensity: 0.3,
    color: "#f0e8d8", // Warm tone
  },
} as const;
// ============================================================================
// MODEL SCALE & POSITIONING
// ============================================================================

export const MODEL_TRANSFORMS = {
  /** Calibrated from the exported GLB bounds into one shared world. */
  pawn: {
    start: [0.011, 0.212, 0.01] as [number, number, number],
    end: [0.19, 0.212, 0.01] as [number, number, number],
    scale: 0.045,
    rotation: [0, 0, 0] as [number, number, number],
  },

  board: {
    position: [0.208, -0.05, 0.203] as [number, number, number],
    scale: 0.1,
    rotation: [0, 0, 0] as [number, number, number],
  },
} as const;

