/**
 * Navigation UI
 * 
 * Provides visual controls for switching between portfolio sections.
 * Each button triggers a camera transition to that section's preset.
 */

import { useEffect, useState } from "react";
import {
  cameraPresets,
  sectionOrder,
  type SectionName,
} from "../../data/cameraPresets";
import styles from "./Navigation.module.css";

const sectionScrollPositions: Record<SectionName, number> = {
  hero: 0,
  about: 0.48,
  skills: 0.64,
  projects: 0.78,
  contact: 1,
};

const getClosestSection = (progress: number): SectionName => Object.entries(sectionScrollPositions)
  .reduce<SectionName>((closest, [name, position]) => {
    return Math.abs(position - progress) < Math.abs(sectionScrollPositions[closest] - progress)
      ? name as SectionName
      : closest;
  }, "hero");

interface NavigationProps {
  storyProgress: number;
  onNavigate?: (section: SectionName) => void;
}

export default function Navigation({ storyProgress, onNavigate }: NavigationProps) {
  const currentSection = getClosestSection(storyProgress);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "ArrowLeft" && event.key !== "ArrowRight") return;
      const offset = event.key === "ArrowRight" ? 1 : -1;
      const index = sectionOrder.indexOf(currentSection);
      const next = sectionOrder[(index + offset + sectionOrder.length) % sectionOrder.length];
      window.__cameraNav?.goTo(next);
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [currentSection]);

  const handleNavClick = (sectionName: SectionName) => {
    const distance = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPosition = distance * sectionScrollPositions[sectionName];

    window.scrollTo({ top: scrollPosition, behavior: "smooth" });
    window.__cameraNav?.goTo(sectionName);
    onNavigate?.(sectionName);
  };

  const toggleVisibility = () => {
    setIsVisible(!isVisible);
  };

  return (
    <>
      {/* Navigation Bar */}
      <nav className={`${styles.nav} ${!isVisible ? styles.hidden : ""}`}>
        <div className={styles.container}>
          {/* Logo/Title */}
          <div className={styles.logo}>M-Night</div>

          {/* Navigation Buttons */}
          <div className={styles.sections}>
            {sectionOrder.map((sectionKey) => {
              const preset = cameraPresets[sectionKey];
              const isActive = currentSection === sectionKey;

              return (
                <button
                  key={sectionKey}
                  className={`${styles.navButton} ${
                    isActive ? styles.active : ""
                  }`}
                  onClick={() => handleNavClick(sectionKey)}
                  title={preset.description}
                  aria-current={isActive ? "page" : undefined}
                >
                  {preset.label}
                </button>
              );
            })}
          </div>

          {/* Toggle Button */}
          <button
            className={styles.toggleBtn}
            onClick={toggleVisibility}
            title="Toggle navigation"
            aria-label="Toggle navigation"
          >
            ≡
          </button>
        </div>
      </nav>

      {/* Floating Toggle (when nav is hidden) */}
      {!isVisible && (
        <button
          className={styles.floatingToggle}
          onClick={toggleVisibility}
          aria-label="Show navigation"
        >
          ≡
        </button>
      )}

      {/* Section Indicator */}
      <div className={`${styles.indicator} ${!isVisible ? styles.hidden : ""}`}>
        <span className={styles.label}>
          {cameraPresets[currentSection]?.description || ""}
        </span>
      </div>
    </>
  );
}
