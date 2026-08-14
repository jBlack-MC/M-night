import { useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";
import { getSceneProgress, storyScenes } from "../../data/storyScenes";
import { MODEL_TRANSFORMS } from "../../data/sceneConstants";

const pawnModelPath = storyScenes[0].modelPath!;

interface PawnProps {
  progress: number;
}

export default function Pawn({ progress }: PawnProps) {
  const { scene } = useGLTF(pawnModelPath);
  const pawnRef = useRef<THREE.Group>(null);

  const pawn = useMemo(() => scene.clone(true), [scene]);

  useFrame(() => {
    if (!pawnRef.current) return;

    const t = THREE.MathUtils.clamp(progress, 0, 1);

    const revealPhase = THREE.MathUtils.smoothstep(t, 0.2, 0.5);
    const moveProgress = getSceneProgress(t, storyScenes[3]);
    const advancePhase = THREE.MathUtils.smoothstep(moveProgress, 0, 1);
    const position = new THREE.Vector3().lerpVectors(
      new THREE.Vector3(...MODEL_TRANSFORMS.pawn.start),
      new THREE.Vector3(...MODEL_TRANSFORMS.pawn.end),
      advancePhase
    );

    pawnRef.current.position.copy(position);
    pawnRef.current.rotation.set(...MODEL_TRANSFORMS.pawn.rotation);
    pawnRef.current.rotation.y += THREE.MathUtils.lerp(0.12, 0, revealPhase);
    pawnRef.current.scale.setScalar(MODEL_TRANSFORMS.pawn.scale);
  });

  return <primitive ref={pawnRef} object={pawn} />;
}

useGLTF.preload(pawnModelPath);
