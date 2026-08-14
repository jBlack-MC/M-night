export interface StoryScene {
  id: string;
  label: string;
  description: string;
  start: number;
  end: number;
  modelPath?: string;
  camera: {
    position: [number, number, number];
    target: [number, number, number];
    fov: number;
  };
}

export const storyScenes = [
  {
    id: "beginning",
    label: "THE BEGINNING",
    description: "A lone pawn enters an empty world",
    start: 0,
    end: 0.2,
    modelPath: "/models/pawn_solo.glb",
    camera: { position: [0.16, 0.42, 0.62], target: [0, 0.18, 0], fov: 32 },
  },
  {
    id: "world",
    label: "THE WORLD",
    description: "The board begins to take shape",
    start: 0.2,
    end: 0.45,
    modelPath: "/models/board_empty.glb",
    camera: { position: [1, 0.75, 1.3], target: [0, 0.25, 0], fov: 44 },
  },
  {
    id: "player",
    label: "THE PLAYER",
    description: "The pawn finds its place in the world",
    start: 0.45,
    end: 0.7,
    camera: { position: [1.18, 0.83, 1.42], target: [0, 0.16, 0], fov: 48 },
  },
  {
    id: "first-move",
    label: "THE FIRST MOVE",
    description: "The journey begins one move at a time",
    start: 0.7,
    end: 1,
    camera: { position: [1.35, 0.95, 1.55], target: [0, 0.05, 0], fov: 52 },
  },
] satisfies StoryScene[];

export type StorySceneId = (typeof storyScenes)[number]["id"];

export const getStoryScene = (progress: number): StoryScene => {
  const normalizedProgress = Math.min(Math.max(progress, 0), 1);
  return storyScenes.find((scene) => normalizedProgress < scene.end) ?? storyScenes.at(-1)!;
};

export const getSceneProgress = (progress: number, scene: StoryScene): number =>
  Math.min(Math.max((progress - scene.start) / (scene.end - scene.start), 0), 1);
