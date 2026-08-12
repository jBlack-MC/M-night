import { useFrame, useThree } from "@react-three/fiber";
import { useCallback, useEffect, useRef, useState } from "react";
import * as THREE from "three";
import {
  cameraPresets,
  defaultCamera,
  sectionOrder,
  type SectionName,
} from "../../data/cameraPresets";

const TRANSITION_DURATION = 2;

interface Transition {
  fromPosition: THREE.Vector3;
  fromTarget: THREE.Vector3;
  fromFov: number;
  toPosition: THREE.Vector3;
  toTarget: THREE.Vector3;
  toFov: number;
  elapsed: number;
}

const easeInOutCubic = (value: number) =>
  value < 0.5
    ? 4 * value * value * value
    : 1 - Math.pow(-2 * value + 2, 3) / 2;

export default function CameraController() {
  const { camera } = useThree();
  const cameraRef = useRef(camera as THREE.PerspectiveCamera);
  const [currentSection, setCurrentSection] = useState<SectionName>("hero");
  const targetRef = useRef(new THREE.Vector3(...defaultCamera.camera.target));
  const transitionRef = useRef<Transition | null>(null);

  const goTo = useCallback((section: string) => {
    if (!(section in cameraPresets)) {
      console.warn(`Unknown camera section: "${section}"`);
      return;
    }

    setCurrentSection(section as SectionName);
  }, []);

  useEffect(() => {
    const preset = cameraPresets[currentSection];
    const perspectiveCamera = cameraRef.current;
    transitionRef.current = {
      fromPosition: perspectiveCamera.position.clone(),
      fromTarget: targetRef.current.clone(),
      fromFov: perspectiveCamera.fov,
      toPosition: new THREE.Vector3(...preset.camera.position),
      toTarget: new THREE.Vector3(...preset.camera.target),
      toFov: preset.camera.fov,
      elapsed: 0,
    };

    window.dispatchEvent(
      new CustomEvent("camera-section-change", { detail: currentSection }),
    );
  }, [currentSection]);

  useFrame((_, delta) => {
    const transition = transitionRef.current;
    if (!transition) return;
    const perspectiveCamera = cameraRef.current;

    transition.elapsed = Math.min(transition.elapsed + delta, TRANSITION_DURATION);
    const progress = easeInOutCubic(transition.elapsed / TRANSITION_DURATION);

    perspectiveCamera.position.lerpVectors(
      transition.fromPosition,
      transition.toPosition,
      progress,
    );
    targetRef.current.lerpVectors(
      transition.fromTarget,
      transition.toTarget,
      progress,
    );
    perspectiveCamera.fov = THREE.MathUtils.lerp(
      transition.fromFov,
      transition.toFov,
      progress,
    );
    perspectiveCamera.lookAt(targetRef.current);
    perspectiveCamera.updateProjectionMatrix();

    if (transition.elapsed === TRANSITION_DURATION) transitionRef.current = null;
  });

  useEffect(() => {
    window.__cameraNav = {
      goTo,
      currentSection: () => currentSection,
      availableSections: () => [...sectionOrder],
    };

    return () => {
      delete window.__cameraNav;
    };
  }, [currentSection, goTo]);

  return null;
}
