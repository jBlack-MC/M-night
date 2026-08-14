/**
 * Experience — story-driven 3D world
 *
 * The 3D scene is the primary website experience. Scroll progress defines the story state,
 * and the world responds as the user moves through the opening chapters.
 */

import { Suspense } from "react";

import CameraController from "./CameraController";
import Pawn from "./Pawn";
import GameBoard from "./GameBoard";
import ThreeDStage from "./ThreeDStage";
import StoryContent from "../sections/StoryContent";
import { LIGHTING } from "../../data/sceneConstants";
import { storyScenes } from "../../data/storyScenes";
import styles from "./World.module.css";

interface WorldProps {
  storyProgress: number;
}

function ModelLoadingFallback() {
  return (
    <mesh position={[0.208, -0.02, 0.203]}>
      <cylinderGeometry args={[0.12, 0.12, 0.025, 32]} />
      <meshStandardMaterial color="#d0b978" emissive="#4a3b16" emissiveIntensity={0.4} />
    </mesh>
  );
}

export default function World({ storyProgress }: WorldProps) {
  return (
    <div className={styles.experienceLayout}>
        <div className={styles.heroInfo} style={{ gridArea: "hero" }}>
          <p className={styles.kicker}>CLARITY MASUKU</p>
          <h1>Software Development Student</h1>
          <p className={styles.heroSummary}>
            Johannesburg, South Africa. Building software across web and application development.
          </p>
          <div className={styles.heroActions}>
            <a href="#projects">View projects</a>
            <a href="#contact">Get in touch</a>
            <a href="https://github.com/jBlack-MC" target="_blank" rel="noreferrer">GitHub</a>
          </div>
        </div>

      <div className={styles.worldViewport} style={{ gridArea: "world" }}>
        <ThreeDStage camera={{
            position: storyScenes[0].camera.position,
            fov: storyScenes[0].camera.fov,
            near: 0.01,
            far: 100,
          }}>
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

          <Suspense fallback={<ModelLoadingFallback />}>
              <GameBoard />
            <Pawn progress={storyProgress} />
          </Suspense>
        </ThreeDStage>
      </div>

      <StoryContent storyProgress={storyProgress} />
    </div>
  );
}
