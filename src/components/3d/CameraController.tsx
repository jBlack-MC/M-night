/**
 * CAMERA CONTROLLER — Stage 1: The Beginning
 *
 * Manages smooth cinematic camera transitions driven by scroll progress.
 *
 * The scroll-driven story is now treated as a single normalized timeline.
 */

import { useFrame, useThree } from "@react-three/fiber";
import { useEffect, useRef } from "react";
import * as THREE from "three";
import { getSceneProgress, portfolioCompositions, storyScenes } from "../../data/storyScenes";
import { MODEL_TRANSFORMS } from "../../data/sceneConstants";

interface CameraControllerProps {
  progress: number;
}

export default function CameraController({ progress }: CameraControllerProps) {
  const { camera, gl } = useThree();
  const cameraRef = useRef(camera as THREE.PerspectiveCamera);
  const target = useRef(new THREE.Vector3());
  const pointer = useRef({ x: 0, y: 0, dragX: 0, dragY: 0, zoom: 0, active: false, lastX: 0, lastY: 0 });
  const reducedMotion = useRef(false);

  useEffect(() => {
    const canvas = gl.domElement;

    const handlePointerMove = (event: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      pointer.current.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      pointer.current.y = ((event.clientY - rect.top) / rect.height) * 2 - 1;
      if (!pointer.current.active) return;
      pointer.current.dragX += (event.clientX - pointer.current.lastX) / rect.width;
      pointer.current.dragY += (event.clientY - pointer.current.lastY) / rect.height;
      pointer.current.lastX = event.clientX;
      pointer.current.lastY = event.clientY;
    };
    const handlePointerDown = (event: PointerEvent) => {
      pointer.current.active = true;
      pointer.current.lastX = event.clientX;
      pointer.current.lastY = event.clientY;
      canvas.setPointerCapture?.(event.pointerId);
    };
    const handlePointerUp = (event: PointerEvent) => {
      pointer.current.active = false;
      canvas.releasePointerCapture?.(event.pointerId);
    };
    const handleReset = () => {
      pointer.current.x = 0;
      pointer.current.y = 0;
      pointer.current.dragX = 0;
      pointer.current.dragY = 0;
      pointer.current.zoom = 0;
    };
    const handleWheel = (event: WheelEvent) => {
      if (!event.altKey) return;
      event.preventDefault();
      pointer.current.zoom = THREE.MathUtils.clamp(pointer.current.zoom + event.deltaY * 0.0008, -0.16, 0.22);
    };
    const handleDoubleClick = () => handleReset();
    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updateMotionPreference = () => { reducedMotion.current = motionQuery.matches; };
    updateMotionPreference();

    canvas.addEventListener("pointermove", handlePointerMove);
    canvas.addEventListener("pointerdown", handlePointerDown);
    canvas.addEventListener("pointerup", handlePointerUp);
    canvas.addEventListener("pointercancel", handlePointerUp);
    canvas.addEventListener("wheel", handleWheel, { passive: false });
    canvas.addEventListener("dblclick", handleDoubleClick);
    window.addEventListener("three-d-reset-camera", handleReset);
    motionQuery.addEventListener("change", updateMotionPreference);
    return () => {
      canvas.removeEventListener("pointermove", handlePointerMove);
      canvas.removeEventListener("pointerdown", handlePointerDown);
      canvas.removeEventListener("pointerup", handlePointerUp);
      canvas.removeEventListener("pointercancel", handlePointerUp);
      canvas.removeEventListener("wheel", handleWheel);
      canvas.removeEventListener("dblclick", handleDoubleClick);
      window.removeEventListener("three-d-reset-camera", handleReset);
      motionQuery.removeEventListener("change", updateMotionPreference);
    };
  }, [gl]);

  useFrame(() => {
    const storyProgress = Math.min(Math.max(progress, 0), 1);

    const compositionMatch = portfolioCompositions.findIndex((composition) => storyProgress < composition.start);
    const compositionIndex = compositionMatch === -1 ? portfolioCompositions.length - 1 : Math.max(0, compositionMatch - 1);
    const currentComposition = portfolioCompositions[compositionIndex];
    const nextComposition = portfolioCompositions[Math.min(compositionIndex + 1, portfolioCompositions.length - 1)];
    const segmentLength = Math.max(nextComposition.start - currentComposition.start, 0.001);
    const segmentProgress = THREE.MathUtils.smoothstep(THREE.MathUtils.clamp((storyProgress - currentComposition.start) / segmentLength, 0, 1), 0, 1);

    const position = new THREE.Vector3().lerpVectors(
      new THREE.Vector3(...currentComposition.camera.position),
      new THREE.Vector3(...nextComposition.camera.position),
      segmentProgress
    );

    const targetPoint = new THREE.Vector3().lerpVectors(
      new THREE.Vector3(...currentComposition.camera.target),
      new THREE.Vector3(...nextComposition.camera.target),
      segmentProgress
    );
    targetPoint.x += THREE.MathUtils.lerp(
      MODEL_TRANSFORMS.pawn.start[0],
      MODEL_TRANSFORMS.pawn.end[0],
      THREE.MathUtils.smoothstep(getSceneProgress(storyProgress, storyScenes[3]), 0, 1)
    ) * 0.35;

    const fov = THREE.MathUtils.lerp(
      currentComposition.camera.fov,
      nextComposition.camera.fov,
      segmentProgress
    );

    const driftX = reducedMotion.current ? 0 : Math.sin(storyProgress * Math.PI * 2) * 0.035;
    const driftY = reducedMotion.current ? 0 : Math.sin(storyProgress * Math.PI * 2 + 0.6) * 0.025;
    const driftZ = reducedMotion.current ? 0 : Math.cos(storyProgress * Math.PI * 2) * 0.02;

    const perspectiveCamera = cameraRef.current;
    const interactiveX = reducedMotion.current ? 0 : pointer.current.dragX * 0.45 + pointer.current.x * 0.045;
    const interactiveY = reducedMotion.current ? 0 : pointer.current.dragY * 0.2 + pointer.current.y * 0.025;
    const zoom = pointer.current.zoom;
    const distanceScale = 1 + zoom;
    perspectiveCamera.position.set(position.x * distanceScale + driftX + interactiveX, position.y * distanceScale + driftY - interactiveY, position.z * distanceScale + driftZ);
    target.current.copy(targetPoint);
    target.current.x += interactiveX * 0.35;
    target.current.y -= interactiveY * 0.2;
    perspectiveCamera.fov = fov;
    perspectiveCamera.lookAt(target.current);
    perspectiveCamera.updateProjectionMatrix();
  });

  return null;
}
