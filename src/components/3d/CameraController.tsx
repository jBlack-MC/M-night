/**
 * CAMERA CONTROLLER — Stage 1: The Beginning
 *
 * Manages smooth cinematic camera transitions driven by scroll progress.
 *
 * The scroll-driven story is now treated as a single normalized timeline.
 */

import { useFrame, useThree } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";
import { getSceneProgress, storyScenes } from "../../data/storyScenes";
import { MODEL_TRANSFORMS } from "../../data/sceneConstants";

interface CameraControllerProps {
  progress: number;
}

export default function CameraController({ progress }: CameraControllerProps) {
  const { camera } = useThree();
  const cameraRef = useRef(camera as THREE.PerspectiveCamera);
  const target = useMemo(() => new THREE.Vector3(), []);

  useFrame(() => {
    const storyProgress = Math.min(Math.max(progress, 0), 1);

    const sceneIndex = storyScenes.findIndex((scene) => storyProgress < scene.end);
    const currentIndex = sceneIndex === -1 ? storyScenes.length - 1 : sceneIndex;
    const currentScene = storyScenes[currentIndex];
    const nextScene = storyScenes[Math.min(currentIndex + 1, storyScenes.length - 1)];
    const sceneProgress = getSceneProgress(storyProgress, currentScene);
    const transition = THREE.MathUtils.smoothstep(sceneProgress, 0.35, 1);

    const position = new THREE.Vector3().lerpVectors(
      new THREE.Vector3(...currentScene.camera.position),
      new THREE.Vector3(...nextScene.camera.position),
      transition
    );

    const targetPoint = new THREE.Vector3().lerpVectors(
      new THREE.Vector3(...currentScene.camera.target),
      new THREE.Vector3(...nextScene.camera.target),
      transition
    );
    targetPoint.x += THREE.MathUtils.lerp(
      MODEL_TRANSFORMS.pawn.start[0],
      MODEL_TRANSFORMS.pawn.end[0],
      THREE.MathUtils.smoothstep(getSceneProgress(storyProgress, storyScenes[3]), 0, 1)
    ) * 0.35;

    const fov = THREE.MathUtils.lerp(
      currentScene.camera.fov,
      nextScene.camera.fov,
      transition
    );

    const driftX = Math.sin(storyProgress * Math.PI * 2) * 0.035;
    const driftY = Math.sin(storyProgress * Math.PI * 2 + 0.6) * 0.025;
    const driftZ = Math.cos(storyProgress * Math.PI * 2) * 0.02;

    const perspectiveCamera = cameraRef.current;
    perspectiveCamera.position.set(position.x + driftX, position.y + driftY, position.z + driftZ);
    target.copy(targetPoint);
    perspectiveCamera.fov = fov;
    perspectiveCamera.lookAt(target);
    perspectiveCamera.updateProjectionMatrix();
  });

  return null;
}
