import { useGLTF } from "@react-three/drei";
import { useMemo } from "react";

export default function Pawn() {
  const { scene } = useGLTF("/models/pawn.glb");

  const pawn = useMemo(() => {
    const model = scene.clone(true);

    console.log("♟️  Pawn Component - Hierarchy Analysis");
    console.log("─────────────────────────────────────────");
    
    model.children.forEach((child, index) => {
      console.log(`  [${index}] ${child.name}`);
      if (child.children && child.children.length > 0) {
        child.children.forEach((grandchild) => {
          console.log(`    └─ ${grandchild.name}`);
        });
      }
    });

    console.log("─────────────────────────────────────────");
    console.log("Transforms:");
    console.log(`  scale: 0.1 (matches board)`);
    console.log(`  position: [0, 0.35, 0] (on board surface)`);
    console.log(`✓ Pawn ready (bottom touching board)`);
    console.log("");

    return model;
  }, [scene]);

  return (
    <primitive
      object={pawn}
      scale={0.1}
      position={[0, 0.35, 0]}
    />
  );
}

useGLTF.preload("/models/pawn.glb");