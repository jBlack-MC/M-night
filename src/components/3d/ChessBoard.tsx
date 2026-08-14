import { useGLTF } from "@react-three/drei";
import { useMemo } from "react";
import * as THREE from "three";
import { storyScenes } from "../../data/storyScenes";
import { MODEL_TRANSFORMS } from "../../data/sceneConstants";

const boardModelPath = storyScenes[1].modelPath!;

export default function ChessBoard() {
  const { scene } = useGLTF(boardModelPath);

  const board = useMemo(() => {
    const model = scene.clone(true);

    function removeUnwantedNodes(node: THREE.Object3D): void {
      const nodesToRemove: THREE.Object3D[] = [];

      node.children.forEach((child) => {
        if (child.name === "Camera") {
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

    model.traverse((child) => {
      if (!(child instanceof THREE.Mesh)) return;

      const adjustMaterial = (source: THREE.Material): THREE.Material => {
        const material = source.clone() as THREE.MeshStandardMaterial;
        material.color.set(material.name === "blacksquare" ? "#3a3d36" : "#d7d2c1");
        material.roughness = 0.72;
        return material;
      };

      child.material = Array.isArray(child.material)
        ? child.material.map(adjustMaterial)
        : adjustMaterial(child.material);
    });

    return model;
  }, [scene]);

  return (
    <primitive
      object={board}
      position={MODEL_TRANSFORMS.board.position}
      scale={MODEL_TRANSFORMS.board.scale}
      rotation={MODEL_TRANSFORMS.board.rotation}
    />
  );
}

useGLTF.preload(boardModelPath);
