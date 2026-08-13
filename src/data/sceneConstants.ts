/**
 * SCENE CONSTANTS — Stage 1: The Beginning
 * 
 * Defines all story scenes, camera states, lighting, and scroll progress thresholds.
 * This is the single source of truth for the storytelling experience.
 */

import * as THREE from "three";

// ============================================================================
// STORY SCENES
// ============================================================================

export const STORY_SCENES = {
  THE_BEGINNING: "THE_BEGINNING",
  THE_BOARD: "THE_BOARD",
  THE_GAME: "THE_GAME",
  THE_BATTLE: "THE_BATTLE",
} as const;

export type StoryScene = (typeof STORY_SCENES)[keyof typeof STORY_SCENES];

// ============================================================================
// SCENE DEFINITIONS with Model Paths
// ============================================================================

export interface SceneDefinition {
  id: StoryScene;
  title: string;
  description: string;
  modelPath: string;
  active: boolean; // Stage 1 only uses first two
}

export const SCENES: Record<StoryScene, SceneDefinition> = {
  [STORY_SCENES.THE_BEGINNING]: {
    id: STORY_SCENES.THE_BEGINNING,
    title: "SCENE_01_PAWN",
    description: "A lone pawn enters an empty world",
    modelPath: "/models/pawn_solo.glb",
    active: true,
  },
  [STORY_SCENES.THE_BOARD]: {
    id: STORY_SCENES.THE_BOARD,
    title: "SCENE_02_EMPTY_BOARD",
    description: "The world before the journey begins",
    modelPath: "/models/board_empty.glb",
    active: true,
  },
  [STORY_SCENES.THE_GAME]: {
    id: STORY_SCENES.THE_GAME,
    title: "SCENE_03_GAME_START",
    description: "Full chessboard with pieces ready to play",
    modelPath: "/models/board_setup.glb",
    active: false,
  },
  [STORY_SCENES.THE_BATTLE]: {
    id: STORY_SCENES.THE_BATTLE,
    title: "SCENE_04_BATTLE",
    description: "Your played/in-progress chess position",
    modelPath: "/models/board_battle.glb",
    active: false,
  },
};

// ============================================================================
// CAMERA STATES — Three major positions
// ============================================================================

export interface CameraState {
  position: THREE.Vector3;
  target: THREE.Vector3;
  fov: number;
}

/**
 * Camera State A: CLOSE
 * The pawn dominates the screen. User sees a mysterious chess piece.
 */
export const CAMERA_CLOSE: CameraState = {
  position: new THREE.Vector3(0.2, 0.48, 0.86),
  target: new THREE.Vector3(0, 0.34, 0),
  fov: 36,
};

/**
 * Camera State B: PULLING BACK
 * Camera moves away, board begins entering frame.
 */
export const CAMERA_PULLING_BACK: CameraState = {
  position: new THREE.Vector3(1.0, 0.75, 1.3),
  target: new THREE.Vector3(0, 0.25, 0),
  fov: 44,
};

/**
 * Camera State C: WORLD VIEW
 * Full board visible, camera at world distance.
 */
export const CAMERA_WORLD: CameraState = {
  position: new THREE.Vector3(1.8, 1.0, 2.0),
  target: new THREE.Vector3(0, 0.18, 0),
  fov: 55,
};

// ============================================================================
// SCROLL PROGRESS THRESHOLDS
// ============================================================================

export const SCROLL_PROGRESS = {
  /**
   * 0% — PAWN APPEARS
   * Hero text visible, pawn centered, dark atmosphere.
   */
  PAWN_START: 0.0,

  /**
   * 20% — CAMERA BEGINS PULLING AWAY
   * Transition toward pulling back state.
   */
  CAMERA_PULL_START: 0.2,

  /**
   * 40% — BOARD STARTS APPEARING
   * Empty board enters frame, still growing.
   */
  BOARD_APPEAR_START: 0.4,

  /**
   * 60% — CAMERA CONTINUES MOVING
   * Board fills more of the viewport.
   */
  CAMERA_CONTINUE: 0.6,

  /**
   * 80% — BOARD COMPLETELY VISIBLE
   * Full board revealed, world view achieved.
   */
  BOARD_COMPLETE: 0.8,

  /**
   * 100% — FIRST CONTENT SECTION
   * Transition to About section.
   */
  CONTENT_START: 1.0,

  /**
   * THE BEGINNING sequence ends at 38% scroll
   * After this, content sections begin.
   */
  STORY_END: 0.38,
} as const;

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
  /**
   * Both models use the same scale
   * This keeps them positioned correctly relative to each other
   */
  scale: 0.1,

  /**
   * Pawn positioning — sits on the board surface
   */
  pawn: {
    position: [0, 0.35, 0] as [number, number, number],
    scale: 0.1,
    rotation: [0, 0, 0] as [number, number, number],
  },

  /**
   * Board positioning — centered at origin
   */
  board: {
    position: [0, 0, 0] as [number, number, number],
    scale: 0.1,
    rotation: [0, 0, 0] as [number, number, number],
  },
} as const;

// ============================================================================
// ANIMATION TIMING
// ============================================================================

export const ANIMATION_TIMING = {
  /**
   * Smoothness of camera transitions
   * Lower = more responsive, Higher = more cinematic
   */
  cameraEasing: "smoothstep",

  /**
   * Duration of fade animations (milliseconds)
   */
  heroFadeDuration: 100,

  /**
   * Text fade thresholds (scroll progress)
   */
  heroText: {
    fadeInStart: 0.0,
    fadeOutStart: 0.28,
    fadeOutEnd: 0.38,
  },

  revealText: {
    fadeInStart: 0.23,
    fadeInEnd: 0.38,
    fadeOutStart: 0.42,
    fadeOutEnd: 0.52,
  },
} as const;

// ============================================================================
// UI / ACCESSIBILITY
// ============================================================================

export const UI_TEXT = {
  hero: {
    eyebrow: "M-NIGHT",
    main: "MAKE YOUR MOVE",
    role: "SOFTWARE DEVELOPER",
    scrollHint: "SCROLL TO MOVE",
    scrollArrow: "↓",
  },
  reveal: "THE GAME BEGINS.",
  menu: "MENU",
} as const;
