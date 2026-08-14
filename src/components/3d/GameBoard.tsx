import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";
import { storyScenes } from "../../data/storyScenes";
import ChessBoard from "./ChessBoard";

interface GameBoardProps {
  progress: number;
}

export default function GameBoard({ progress }: GameBoardProps) {
  const boardRef = useRef<THREE.Group>(null);

  useFrame(() => {
    if (!boardRef.current) return;
    boardRef.current.visible = progress >= storyScenes[1].start;
  });

  return (
    <>
      <group ref={boardRef}>
        <ChessBoard />
      </group>
    </>
  );
}