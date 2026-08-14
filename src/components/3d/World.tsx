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
import { LIGHTING } from "../../data/sceneConstants";
import { storyScenes } from "../../data/storyScenes";
import styles from "./World.module.css";

interface WorldProps {
  storyProgress: number;
}

export default function World({ storyProgress }: WorldProps) {
  return (
    <>
      <section className={styles.heroLayout}>
        <div className={styles.heroInfo}>
          <p className={styles.kicker}>M-NIGHT / SOFTWARE DEVELOPMENT</p>
          <h1>Building practical software and interactive experiences.</h1>
          <p className={styles.heroSummary}>
            I am a software developer focused on learning, building useful interfaces,
            and exploring 3D web experiences.
          </p>
          <div className={styles.heroActions}>
            <a href="#projects">View projects</a>
            <a href="#contact">Get in touch</a>
          </div>
        </div>

      <div className={styles.worldViewport} aria-label="Interactive 3D portfolio scene">
        <Canvas
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%", display: "block" }}
          onCreated={({ gl }) => {
            gl.toneMappingExposure = 1.35;
          }}
          camera={{
            position: storyScenes[0].camera.position,
            fov: storyScenes[0].camera.fov,
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
            <meshStandardMaterial color="#30322c" transparent opacity={0.68 + storyProgress * 0.08} />
          </mesh>

          <Suspense fallback={null}>
            <GameBoard progress={storyProgress} />
            <Pawn progress={storyProgress} />
          </Suspense>
        </Canvas>
          <div className={styles.sceneCaption}>Interactive 3D scene / scroll to explore</div>
      </div>
      </section>

      <StoryContent storyProgress={storyProgress} />
    </>
  );
}
