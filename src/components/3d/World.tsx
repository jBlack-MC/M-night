/**
 * Experience — story-driven 3D world
 *
 * The 3D scene is the primary website experience. Scroll progress defines the story state,
 * and the world responds as the user moves through the opening chapters.
 */

import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";

import CameraController from "./CameraController";
import Pawn from "./Pawn";
import ChessBoard from "./ChessBoard";
import StoryContent from "../sections/StoryContent";
import { LIGHTING, CAMERA_CLOSE } from "../../data/sceneConstants";
import { normalizeStoryProgress, useScrollProgress } from "../../hooks/useScrollProgress";

export default function World() {
  const scrollProgress = useScrollProgress();
  const storyProgress = normalizeStoryProgress(scrollProgress);

  return (
    <>
      <div
        style={{
          position: "sticky",
          top: 0,
          height: "100vh",
          width: "100%",
          zIndex: 0,
          pointerEvents: "none",
          overflow: "hidden",
          background: LIGHTING.backgroundColor,
        }}
      >
        <Canvas
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%", display: "block" }}
          camera={{
            position: CAMERA_CLOSE.position.toArray(),
            fov: CAMERA_CLOSE.fov,
            near: 0.01,
            far: 100,
          }}
        >
          <fog attach="fog" args={[LIGHTING.backgroundColor, 1.5, 6.5]} />
          <color attach="background" args={[LIGHTING.backgroundColor]} />

          <ambientLight intensity={LIGHTING.ambient.intensity * (1 - storyProgress * 0.35)} color={LIGHTING.ambient.color} />
          <spotLight
            position={LIGHTING.spotlight.position}
            intensity={LIGHTING.spotlight.intensity * (1 - storyProgress * 0.2)}
            angle={LIGHTING.spotlight.angle}
            penumbra={LIGHTING.spotlight.penumbra}
            color={LIGHTING.spotlight.color}
          />
          <directionalLight
            position={LIGHTING.rimLight.position}
            intensity={LIGHTING.rimLight.intensity * (1 - storyProgress * 0.15)}
            color={LIGHTING.rimLight.color}
          />
          <directionalLight
            position={LIGHTING.fillLight.position}
            intensity={LIGHTING.fillLight.intensity * (1 - storyProgress * 0.1)}
            color={LIGHTING.fillLight.color}
          />

          <CameraController progress={storyProgress} />

          <mesh rotation-x={-Math.PI / 2} position={[0, -0.52, 0]} receiveShadow>
            <circleGeometry args={[2.8, 64]} />
            <meshStandardMaterial color="#0d0d0d" transparent opacity={0.52 + storyProgress * 0.1} />
          </mesh>

          <Suspense fallback={null}>
            <ChessBoard progress={storyProgress} />
            <Pawn progress={storyProgress} />
          </Suspense>
        </Canvas>
      </div>

      <StoryContent storyProgress={storyProgress} />
    </>
  );
}
