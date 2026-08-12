import { useGLTF } from "@react-three/drei";
import { useMemo } from "react";
import * as THREE from "three";

export default function ChessBoard() {
  const { scene } = useGLTF("/models/chessboard.glb");

  const board = useMemo(() => {
    const model = scene.clone(true);

    console.log("📋 ChessBoard Component - Hierarchy Analysis");
    console.log("─────────────────────────────────────────");
    
    model.children.forEach((child, index) => {
      console.log(`  [${index}] ${child.name}`);
    });

    // Find and remove unwanted objects
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
        console.log(`  🗑️  Removed: "${child.name}"`);
      });
    }

    removeUnwantedNodes(model);

    console.log("─────────────────────────────────────────");
    console.log("After filtering:");
    model.children.forEach((child, index) => {
      console.log(`  [${index}] ${child.name} ✓`);
    });

    console.log("✓ ChessBoard ready (scale 0.1)");
    console.log("");

    return model;
  }, [scene]);

  return (
    <primitive
      object={board}
      scale={0.1}
    />
  );
}

useGLTF.preload("/models/chessboard.glb");