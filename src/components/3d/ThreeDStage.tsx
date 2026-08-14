import { Canvas, type CanvasProps } from "@react-three/fiber";
import type { KeyboardEvent, ReactNode } from "react";
import styles from "./ThreeDStage.module.css";

interface ThreeDStageProps {
  camera: CanvasProps["camera"];
  children: ReactNode;
}

export default function ThreeDStage({ camera, children }: ThreeDStageProps) {
  const resetCamera = () => {
    window.dispatchEvent(new Event("three-d-reset-camera"));
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLElement>) => {
    if (event.key.toLowerCase() === "r") {
      event.preventDefault();
      resetCamera();
    }
  };

  return (
    <section className={styles.stage} tabIndex={0} onKeyDown={handleKeyDown} aria-label="Interactive 3D portfolio stage" aria-describedby="three-d-stage-instructions">
      <div className={styles.stageHeader}>
        <span>3D / VIEW</span>
        <span>WORLD OBJECT 01</span>
      </div>
      <Canvas
        className={styles.canvas}
        camera={camera}
        dpr={[1, 1.5]}
        gl={{ antialias: true, powerPreference: "high-performance" }}
        fallback={<div className={styles.fallback}>3D view unavailable</div>}
        onCreated={({ gl }) => {
          gl.toneMappingExposure = 1.35;
        }}
      >
        {children}
      </Canvas>
      <p id="three-d-stage-instructions" className={styles.visuallyHidden}>
        The 3D board changes composition as you move through the portfolio. Drag to rotate, use Alt and the mouse wheel to zoom, and double-click or use Reset to restore the active section view.
      </p>
      <div className={styles.stageFooter}>
        <span>Drag to rotate</span>
        <span>Scroll to explore</span>
        <button type="button" onClick={resetCamera} aria-label="Reset 3D camera" title="Reset camera">
          ↻
        </button>
      </div>
    </section>
  );
}
