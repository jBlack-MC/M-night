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

    const t = THREE.MathUtils.clamp(progress, 0, 1);

    const beginPhase = THREE.MathUtils.smoothstep(t, 0, 0.22);
    const revealPhase = THREE.MathUtils.smoothstep(t, 0.2, 0.5);
    const advancePhase = THREE.MathUtils.smoothstep(t, 0.38, 0.82);

    const x = THREE.MathUtils.lerp(0, 0.18, advancePhase);
    const y = THREE.MathUtils.lerp(0.46, 0.2, revealPhase);
    const z = THREE.MathUtils.lerp(0.42, 0.02, revealPhase);

    pawnRef.current.position.set(x, y, z);
    pawnRef.current.rotation.y = THREE.MathUtils.lerp(0.6, 0.12, revealPhase);
    pawnRef.current.rotation.x = THREE.MathUtils.lerp(0.06, -0.12, beginPhase);
    pawnRef.current.scale.setScalar(THREE.MathUtils.lerp(0.08, 0.1, revealPhase));
  });

  return <primitive ref={pawnRef} object={pawn} />;
}

useGLTF.preload(pawnModelPath);
