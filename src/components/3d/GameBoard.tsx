import { useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { storyScenes } from "../../data/storyScenes";
import ChessBoard from "./ChessBoard";

const setupModelPath = storyScenes.SCENE_03_GAME_START.modelPath;
const SETUP_START = 0.72;

interface GameBoardProps {
  progress: number;
}

function SetupBoard({ progress }: GameBoardProps) {
  const { scene } = useGLTF(setupModelPath);
  const boardRef = useRef<THREE.Group>(null);

  useFrame(() => {
    if (!boardRef.current) return;

    const transition = THREE.MathUtils.smoothstep(progress, SETUP_START, 0.9);
    boardRef.current.visible = transition > 0.01;
    boardRef.current.position.set(0, 0.02, 0);
    boardRef.current.scale.setScalar(0.1 * transition);
    boardRef.current.rotation.y = THREE.MathUtils.lerp(-0.02, 0, transition);
  });

  return <primitive ref={boardRef} object={scene} />;
}

export default function GameBoard({ progress }: GameBoardProps) {
  const [hasSetupModel, setHasSetupModel] = useState(false);

  useEffect(() => {
    let cancelled = false;

    fetch(setupModelPath, { method: "HEAD" })
      .then((response) => {
        if (!cancelled) setHasSetupModel(response.ok);
      })
      .catch(() => {
        if (!cancelled) setHasSetupModel(false);
      });

    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <>
      <ChessBoard progress={progress} />
      {hasSetupModel && progress >= SETUP_START && <SetupBoard progress={progress} />}
    </>
  );
}