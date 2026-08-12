/**
 * PHASE 3: Hero Section
 * 
 * The gateway to the portfolio. A dramatic 3D intro with overlay text
 * guiding the visitor into the chess world.
 */

import { useEffect, useState } from "react";
import styles from "./HeroSection.module.css";

interface HeroSectionProps {
  onEnter?: () => void;
}

export default function HeroSection({ onEnter }: HeroSectionProps) {
  const [isVisible, setIsVisible] = useState(true);
  const [showTitle, setShowTitle] = useState(false);
  const [showSubtitle, setShowSubtitle] = useState(false);
  const [showDescription, setShowDescription] = useState(false);
  const [showCTA, setShowCTA] = useState(false);

  useEffect(() => {
    // Staggered animations as user enters
    const timers = [
      setTimeout(() => setShowTitle(true), 300),
      setTimeout(() => setShowSubtitle(true), 800),
      setTimeout(() => setShowDescription(true), 1400),
      setTimeout(() => setShowCTA(true), 2000),
    ];

    return () => timers.forEach(timer => clearTimeout(timer));
  }, []);

  const handleEnter = () => {
    setIsVisible(false);
    // Trigger camera transition to hero view
    if (window.__cameraNav) {
      window.__cameraNav.goTo("hero");
    }
    onEnter?.();
  };

  if (!isVisible) return null;

  return (
    <div className={styles.heroOverlay}>
      {/* Gradient background */}
      <div className={styles.gradientBg} />

      {/* Center content */}
      <div className={styles.heroContent}>
        {/* Main title */}
        <div className={`${styles.titleGroup} ${showTitle ? styles.fadeIn : ""}`}>
          <h1 className={styles.title}>M-NIGHT</h1>
        </div>

        {/* Pawn symbol */}
        <div className={`${styles.pawnSymbol} ${showTitle ? styles.fadeIn : ""}`}>
          ♟
        </div>

        {/* Subtitle */}
        <div className={`${styles.subtitleGroup} ${showSubtitle ? styles.fadeIn : ""}`}>
          <p className={styles.subtitle}>SOFTWARE DEVELOPER</p>
        </div>

        {/* Description */}
        <div className={`${styles.descriptionGroup} ${showDescription ? styles.fadeIn : ""}`}>
          <div className={styles.description}>
            <p>Building software.</p>
            <p>Learning.</p>
            <p>Creating.</p>
            <p>Making my next move.</p>
          </div>
        </div>

        {/* Call to action */}
        <div className={`${styles.ctaGroup} ${showCTA ? styles.fadeIn : ""}`}>
          <button className={styles.ctaButton} onClick={handleEnter}>
            <span>↓ START</span>
          </button>
        </div>
      </div>

      {/* Bottom hint text */}
      <div className={`${styles.hint} ${showCTA ? styles.fadeIn : ""}`}>
        <p>Click to enter the chess world</p>
      </div>
    </div>
  );
}
