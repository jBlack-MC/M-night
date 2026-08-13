/**
 * LOADING SCREEN — Stage 1
 * 
 * Displays while models are loading. Makes the loading process feel intentional.
 * Shows pawn icon, loading text, and progress indicator.
 */

import { useEffect, useState } from "react";
import styles from "./LoadingScreen.module.css";

interface LoadingScreenProps {
  isLoading: boolean;
  onComplete?: () => void;
}

export default function LoadingScreen({ isLoading, onComplete }: LoadingScreenProps) {
  const [progress, setProgress] = useState(0);
  const showMessage = !isLoading;

  useEffect(() => {
    if (!isLoading) {
      // Fade out after a moment
      const timer = setTimeout(() => {
        onComplete?.();
      }, 1500);

      return () => clearTimeout(timer);
    } else {
      // Simulate loading progress
      let current = 0;
      const interval = setInterval(() => {
        current += Math.random() * 35;
        if (current > 90) current = 90;
        setProgress(Math.min(current, 100));
      }, 500);

      return () => clearInterval(interval);
    }
  }, [isLoading, onComplete]);

  return (
    <div
      className={styles.loadingScreen}
      style={{
        opacity: showMessage ? 0 : 1,
        pointerEvents: showMessage ? "none" : "auto",
      }}
    >
      <div className={styles.content}>
        <div className={styles.pawn}>♟</div>

        <div className={styles.text}>
          <p className={styles.loading}>
            {showMessage ? "YOUR MOVE" : "LOADING THE BOARD"}
          </p>
            {!showMessage && <div className={styles.progress}>{Math.round(progress)}%</div>}
        </div>

        {/* Progress bar */}
        {!showMessage && (
          <div className={styles.progressBar}>
            <div className={styles.progressFill} style={{ width: `${progress}%` }} />
          </div>
        )}
      </div>
    </div>
  );
}
