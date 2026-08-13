export const storyScenes = {
  SCENE_01_PAWN: {
    title: "THE_BEGINNING",
    modelPath: "/models/pawn_solo.glb",
  },
  SCENE_02_EMPTY_BOARD: {
    title: "THE_BOARD",
    modelPath: "/models/board_empty.glb",
  },
  SCENE_03_GAME_START: {
    title: "THE_GAME",
    modelPath: "/models/board_setup.glb",
  },
  SCENE_04_BATTLE: {
    title: "THE_BATTLE",
    modelPath: "/models/board_battle.glb",
  },
} as const;

export type StorySceneId = keyof typeof storyScenes;
