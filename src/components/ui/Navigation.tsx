/**
 * Navigation UI
 * 
 * Provides visual controls for switching between portfolio sections.
 * Each button triggers a camera transition to that section's preset.
 */

import { useEffect, useState } from "react";
import { getStoryScene, storyScenes, type StorySceneId } from "../../data/storyScenes";
import styles from "./Navigation.module.css";

interface NavigationProps {
  storyProgress: number;
  onNavigate?: (section: StorySceneId) => void;
}

export default function Navigation({ storyProgress, onNavigate }: NavigationProps) {
  const currentSection = getStoryScene(storyProgress);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "ArrowLeft" && event.key !== "ArrowRight") return;
      const offset = event.key === "ArrowRight" ? 1 : -1;
      const index = storyScenes.indexOf(currentSection);
      const next = storyScenes[(index + offset + storyScenes.length) % storyScenes.length];
      const distance = document.documentElement.scrollHeight - window.innerHeight;
      window.scrollTo({ top: distance * next.start, behavior: "smooth" });
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [currentSection]);

  const handleNavClick = (section: typeof storyScenes[number]) => {
    const distance = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPosition = distance * section.start;

    window.scrollTo({ top: scrollPosition, behavior: "smooth" });
    onNavigate?.(section.id);
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
            {storyScenes.map((section) => {
              const isActive = currentSection.id === section.id;

              return (
                <button
                  key={section.id}
                  className={`${styles.navButton} ${
                    isActive ? styles.active : ""
                  }`}
                  onClick={() => handleNavClick(section)}
                  title={section.description}
                  aria-current={isActive ? "page" : undefined}
                >
                  {section.label}
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
          {currentSection.description}
        </span>
      </div>
    </>
  );
}
