/**
 * CameraController
 * 
 * Manages smooth camera transitions between preset positions.
 * This replaces free OrbitControls with a guided narrative experience.
 */

import { useThree } from "@react-three/fiber";
import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { cameraPresets, defaultCamera } from "../../data/cameraPresets";

const TRANSITION_DURATION = 2; // seconds

interface CameraState {
  fromPosition: THREE.Vector3;
  toPosition: THREE.Vector3;
  fromTarget: THREE.Vector3;
  toTarget: THREE.Vector3;
  fromFov: number;
  toFov: number;
  startTime: number;
  isTransitioning: boolean;
}

export default function CameraController() {
  const { camera } = useThree();
  const [currentPreset, setCurrentPreset] = useState<string>("hero");
  const stateRef = useRef<CameraState | null>(null);

  // Cast to PerspectiveCamera (Three.js Fiber uses this for Canvas cameras)
  const perspCamera = camera as THREE.PerspectiveCamera;

  // Initialize camera to hero position
  useEffect(() => {
    const hero = defaultCamera;
    perspCamera.position.set(...hero.camera.position);
    perspCamera.fov = hero.camera.fov;
    perspCamera.updateProjectionMatrix();

    console.log("📷 CameraController initialized");
    console.log(`   Current preset: "${hero.name}"`);
    console.log(`   Position: [${hero.camera.position.join(", ")}]`);
  }, [perspCamera]);

  // Handle camera transitions
  useEffect(() => {
    const preset = cameraPresets[currentPreset];
    if (!preset) return;

    const fromPos = perspCamera.position.clone();
    const toPos = new THREE.Vector3(...preset.camera.position);
    const fromTarget = new THREE.Vector3(0, 0, 0); // Default target
    const toTarget = new THREE.Vector3(...preset.camera.target);
    const fromFov = perspCamera.fov;
    const toFov = preset.camera.fov;

    stateRef.current = {
      fromPosition: fromPos,
      toPosition: toPos,
      fromTarget: fromTarget,
      toTarget: toTarget,
      fromFov: fromFov,
      toFov: toFov,
      startTime: Date.now(),
      isTransitioning: true,
    };

    console.log(`📷 Camera transitioning to "${preset.name}"`);
    console.log(`   → ${preset.description}`);
  }, [currentPreset, perspCamera]);

  // Animation loop for smooth transitions
  useEffect(() => {
    let animationFrameId: number;

    const animate = () => {
      if (!stateRef.current || !stateRef.current.isTransitioning) {
        animationFrameId = requestAnimationFrame(animate);
        return;
      }

      const state = stateRef.current;
      const elapsed = (Date.now() - state.startTime) / 1000;
      const progress = Math.min(elapsed / TRANSITION_DURATION, 1);

      // Easing function (easeInOutCubic)
      const easeProgress =
        progress < 0.5
          ? 4 * progress * progress * progress
          : 1 - Math.pow(-2 * progress + 2, 3) / 2;

      // Interpolate camera position
      perspCamera.position.lerpVectors(
        state.fromPosition,
        state.toPosition,
        easeProgress
      );

      // Interpolate FOV
      perspCamera.fov =
        state.fromFov + (state.toFov - state.fromFov) * easeProgress;
      perspCamera.updateProjectionMatrix();

      if (progress >= 1) {
        state.isTransitioning = false;
        console.log("✓ Camera transition complete");
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    animationFrameId = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(animationFrameId);
  }, [perspCamera]);

  // Expose navigation methods globally for debugging
  useEffect(() => {
    const navMethods = {
      goTo: (sectionName: string) => {
        if (cameraPresets[sectionName]) {
          setCurrentPreset(sectionName);
        } else {
          console.warn(`❌ Unknown section: "${sectionName}"`);
          console.log("Available sections:", Object.keys(cameraPresets));
        }
      },
      currentSection: () => currentPreset,
      availableSections: () => Object.keys(cameraPresets),
    };

    (window as any).__cameraNav = navMethods;

    console.log("📷 Camera navigation exposed to window.__cameraNav");
    console.log("   Usage: window.__cameraNav.goTo('about')");

    return () => {
      delete (window as any).__cameraNav;
    };
  }, [currentPreset]);

  return null; // This component doesn't render anything visually
}
