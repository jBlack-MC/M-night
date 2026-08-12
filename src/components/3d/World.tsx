/**
 * PHASE 2: Camera & Navigation
 * 
 * World Component - The core 3D environment with controlled camera
 * 
 * Structure:
 * World
 *  ├── Canvas (fullscreen)
 *  ├── CameraController (guided camera navigation)
 *  ├── Lights
 *  ├── Chessboard
 *  └── Pawn
 */

import { Canvas } from "@react-three/fiber";
import { useEffect } from "react";

import CameraController from "./CameraController";
import Pawn from "./Pawn";
import ChessBoard from "./ChessBoard";
import Navigation from "../ui/Navigation";

export default function World() {
  useEffect(() => {
    console.log("🌍 World Component Mounted");
    console.log("PHASE 2: Camera & Navigation initialized");
    console.log("=====================================");
    console.log("Features:");
    console.log("  ✓ Controlled camera system");
    console.log("  ✓ Smooth transitions between sections");
    console.log("  ✓ Guided narrative experience");
    console.log("  ✓ Navigation UI with preset buttons");
    console.log("=====================================");
    console.log("Debug: window.__cameraNav.goTo('section')");
  }, []);

  return (
    <>
      {/* Navigation UI - Overlays on top of 3D scene */}
      <Navigation />

      {/* 3D Scene */}
      <Canvas
        style={{ width: "100%", height: "100%", display: "block" }}
        camera={{
          position: [1.8, 1.0, 2.0],
          fov: 55,
          near: 0.01,
          far: 100,
        }}
      >
        {/* Background */}
        <color attach="background" args={["#111111"]} />

        {/* Lighting */}
        <ambientLight intensity={1.5} />
        <directionalLight position={[5, 10, 5]} intensity={3} />

        {/* Camera Controller - Replaces OrbitControls */}
        <CameraController />

        {/* 3D Assets */}
        <ChessBoard />
        <Pawn />
      </Canvas>
    </>
  );
}
