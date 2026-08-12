/**
 * Camera Presets for M-Night Portfolio
 * 
 * Defines the different "camera stations" that guide the user
 * through the portfolio experience
 */

export interface CameraPreset {
  name: string;
  label: string;
  description: string;
  camera: {
    position: [number, number, number];
    target: [number, number, number];
    fov: number;
  };
}

export const cameraPresets: Record<string, CameraPreset> = {
  // Hero/Title Camera - Wide shot of the board and pawn
  hero: {
    name: "hero",
    label: "Hero",
    description: "The beginning of your story",
    camera: {
      position: [1.8, 1.0, 2.0],
      target: [0, 0.2, 0],
      fov: 55,
    },
  },

  // About Camera - Closer look at the pawn (you)
  about: {
    name: "about",
    label: "About",
    description: "Who you are",
    camera: {
      position: [0.8, 0.8, 1.0],
      target: [0, 0.35, 0],
      fov: 50,
    },
  },

  // Skills Camera - Focus on the board structure
  skills: {
    name: "skills",
    label: "Skills",
    description: "What you can do",
    camera: {
      position: [1.2, 0.6, 1.2],
      target: [0, 0, 0],
      fov: 48,
    },
  },

  // Projects Camera - Board from above
  projects: {
    name: "projects",
    label: "Projects",
    description: "What you've built",
    camera: {
      position: [0.5, 1.5, 0.5],
      target: [0, 0.2, 0],
      fov: 52,
    },
  },

  // Contact Camera - Dynamic angle
  contact: {
    name: "contact",
    label: "Contact",
    description: "Get in touch",
    camera: {
      position: [1.5, 0.9, 1.5],
      target: [0, 0.2, 0],
      fov: 54,
    },
  },
};

// Default camera (entry point)
export const defaultCamera = cameraPresets.hero;

// Get all section names in order
export const sectionOrder: Array<keyof typeof cameraPresets> = [
  "hero",
  "about",
  "skills",
  "projects",
  "contact",
];
