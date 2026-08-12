/**
 * Navigation UI
 * 
 * Provides visual controls for switching between portfolio sections.
 * Each button triggers a camera transition to that section's preset.
 */

import { useState, useEffect } from "react";
import { cameraPresets, sectionOrder } from "../../data/cameraPresets";
import styles from "./Navigation.module.css";

interface NavigationProps {
  onNavigate?: (section: string) => void;
}

export default function Navigation({ onNavigate }: NavigationProps) {
  const [currentSection, setCurrentSection] = useState<string>("hero");
  const [isVisible, setIsVisible] = useState(true);

  // Listen for camera changes from CameraController
  useEffect(() => {
    const checkSection = () => {
      if ((window as any).__cameraNav) {
        const current = (window as any).__cameraNav.currentSection();
        setCurrentSection(current);
      }
    };

    const interval = setInterval(checkSection, 100);
    return () => clearInterval(interval);
  }, []);

  const handleNavClick = (sectionName: string) => {
    if ((window as any).__cameraNav) {
      (window as any).__cameraNav.goTo(sectionName);
      setCurrentSection(sectionName);
      onNavigate?.(sectionName);
    }
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
