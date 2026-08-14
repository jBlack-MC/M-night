/**
 * LOADING SCREEN — Stage 1
 * 
 * Displays while models are loading. Makes the loading process feel intentional.
 * Shows pawn icon, loading text, and progress indicator.
 */

import { useEffect } from "react";
import styles from "./LoadingScreen.module.css";

interface LoadingScreenProps {
  isLoading: boolean;
  progress: number;
  onComplete?: () => void;
}

export default function LoadingScreen({ isLoading, progress, onComplete }: LoadingScreenProps) {
  const showMessage = !isLoading;

  useEffect(() => {
    if (!isLoading) {
      // Fade out after a moment
      const timer = setTimeout(() => {
        onComplete?.();
      }, 1500);

      return () => clearTimeout(timer);
    }
  }, [isLoading, onComplete]);

  return (
    <div
      className={styles.loadingScreen}
      role="status"
      aria-live="polite"
      aria-busy={isLoading}
      style={{
        opacity: showMessage ? 0 : 1,
        pointerEvents: showMessage ? "none" : "auto",
      }}
    >
      <div className={styles.content}>
        <div className={styles.pawn}>♟</div>

        <div className={styles.text}>
          <p className={styles.loading}>
            {showMessage ? "READY TO EXPLORE" : "LOADING EXPERIENCE"}
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
