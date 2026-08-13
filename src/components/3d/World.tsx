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
import GameBoard from "./GameBoard";
import StoryContent from "../sections/StoryContent";
import { LIGHTING, CAMERA_CLOSE } from "../../data/sceneConstants";
import styles from "./World.module.css";

interface WorldProps {
  storyProgress: number;
}

export default function World({ storyProgress }: WorldProps) {

  return (
    <>
      <div className={styles.worldViewport} aria-label="Interactive 3D story scene">
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
            <GameBoard progress={storyProgress} />
            <Pawn progress={storyProgress} />
          </Suspense>
        </Canvas>
      </div>

      <StoryContent storyProgress={storyProgress} />
    </>
  );
}
