import { useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";
import { storyScenes } from "../../data/storyScenes";

const pawnModelPath = storyScenes.SCENE_01_PAWN.modelPath;

interface PawnProps {
  progress: number;
}

export default function Pawn({ progress }: PawnProps) {
  const { scene } = useGLTF(pawnModelPath);
  const pawnRef = useRef<THREE.Group>(null);

  const pawn = useMemo(() => scene.clone(true), [scene]);

  useFrame(() => {
    if (!pawnRef.current) return;

    const reveal = THREE.MathUtils.clamp(progress, 0, 1);
    const ease = THREE.MathUtils.smoothstep(reveal, 0, 1);

    pawnRef.current.position.set(
      0,
      THREE.MathUtils.lerp(0.46, 0.18, ease),
      THREE.MathUtils.lerp(0.42, 0.02, ease)
    );
    pawnRef.current.rotation.y = THREE.MathUtils.lerp(0.6, 0.12, ease);
    pawnRef.current.scale.setScalar(THREE.MathUtils.lerp(0.08, 0.1, ease));
  });

  return <primitive ref={pawnRef} object={pawn} />;
}

useGLTF.preload(pawnModelPath);
