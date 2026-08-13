import { useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";
import { storyScenes } from "../../data/storyScenes";

const boardModelPath = storyScenes.SCENE_02_EMPTY_BOARD.modelPath;

interface ChessBoardProps {
  progress: number;
}

export default function ChessBoard({ progress }: ChessBoardProps) {
  const { scene } = useGLTF(boardModelPath);
  const boardRef = useRef<THREE.Group>(null);

  const board = useMemo(() => {
    const model = scene.clone(true);

    function removeUnwantedNodes(node: THREE.Object3D): void {
      const nodesToRemove: THREE.Object3D[] = [];

      node.children.forEach((child) => {
        if (child.name === "Camera" || child.name === "BetterChessboard") {
          nodesToRemove.push(child);
        } else {
          removeUnwantedNodes(child);
        }
      });

      nodesToRemove.forEach((child) => {
        node.remove(child);
      });
    }

    removeUnwantedNodes(model);
    return model;
  }, [scene]);

  useFrame(() => {
    if (!boardRef.current) return;

    const reveal = THREE.MathUtils.clamp(progress, 0, 1);
    const ease = THREE.MathUtils.smoothstep(reveal, 0, 1);

    boardRef.current.position.set(
      0,
      THREE.MathUtils.lerp(-0.45, 0.02, ease),
      THREE.MathUtils.lerp(-0.9, 0, ease)
    );
    boardRef.current.scale.setScalar(THREE.MathUtils.lerp(0.015, 0.1, ease));
    boardRef.current.rotation.y = THREE.MathUtils.lerp(-0.45, 0, ease);
    boardRef.current.visible = reveal > 0.02;
  });

  return <primitive ref={boardRef} object={board} />;
}

useGLTF.preload(boardModelPath);
