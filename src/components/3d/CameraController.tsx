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
import {
  CAMERA_CLOSE,
  CAMERA_PULLING_BACK,
  CAMERA_WORLD,
} from "../../data/sceneConstants";

interface CameraControllerProps {
  progress: number;
}

export default function CameraController({ progress }: CameraControllerProps) {
  const { camera } = useThree();
  const cameraRef = useRef(camera as THREE.PerspectiveCamera);
  const target = useMemo(() => new THREE.Vector3(), []);

  useFrame(() => {
    const storyProgress = Math.min(Math.max(progress, 0), 1);

    let amount: number;
    let position: THREE.Vector3;
    let targetPoint: THREE.Vector3;
    let fov: number;

    if (storyProgress < 0.33) {
      amount = storyProgress / 0.33;
      position = new THREE.Vector3().lerpVectors(
        CAMERA_CLOSE.position,
        CAMERA_PULLING_BACK.position,
        THREE.MathUtils.smoothstep(amount, 0, 1)
      );
      targetPoint = new THREE.Vector3().lerpVectors(
        CAMERA_CLOSE.target,
        CAMERA_PULLING_BACK.target,
        THREE.MathUtils.smoothstep(amount, 0, 1)
      );
      fov = THREE.MathUtils.lerp(
        CAMERA_CLOSE.fov,
        CAMERA_PULLING_BACK.fov,
        THREE.MathUtils.smoothstep(amount, 0, 1)
      );
    } else {
      amount = (storyProgress - 0.33) / 0.67;
      position = new THREE.Vector3().lerpVectors(
        CAMERA_PULLING_BACK.position,
        CAMERA_WORLD.position,
        THREE.MathUtils.smoothstep(amount, 0, 1)
      );
      targetPoint = new THREE.Vector3().lerpVectors(
        CAMERA_PULLING_BACK.target,
        CAMERA_WORLD.target,
        THREE.MathUtils.smoothstep(amount, 0, 1)
      );
      fov = THREE.MathUtils.lerp(
        CAMERA_PULLING_BACK.fov,
        CAMERA_WORLD.fov,
        THREE.MathUtils.smoothstep(amount, 0, 1)
      );
    }

    const driftX = Math.sin(storyProgress * Math.PI * 4) * 0.14;
    const driftY = Math.sin(storyProgress * Math.PI * 3 + 0.6) * 0.12;
    const driftZ = Math.cos(storyProgress * Math.PI * 2) * 0.08;

    const perspectiveCamera = cameraRef.current;
    perspectiveCamera.position.set(position.x + driftX, position.y + driftY, position.z + driftZ);
    target.copy(targetPoint);
    perspectiveCamera.fov = fov;
    perspectiveCamera.lookAt(target);
    perspectiveCamera.updateProjectionMatrix();
  });

  return null;
}
