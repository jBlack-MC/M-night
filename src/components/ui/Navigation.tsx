/**
 * Navigation UI
 * 
 * Provides visual controls for switching between portfolio sections.
 * Each button triggers a camera transition to that section's preset.
 */

import { useEffect, useState } from "react";
import styles from "./Navigation.module.css";

const sections = [
  { id: "about", label: "About", start: 0.2 },
  { id: "skills", label: "Skills", start: 0.4 },
  { id: "projects", label: "Projects", start: 0.58 },
  { id: "experience", label: "Experience", start: 0.75 },
  { id: "contact", label: "Contact", start: 0.9 },
] as const;

interface NavigationProps {
  storyProgress: number;
}

export default function Navigation({ storyProgress }: NavigationProps) {
  const currentSection = [...sections].reverse().find((section) => storyProgress >= section.start)?.id ?? "about";
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "ArrowLeft" && event.key !== "ArrowRight") return;
      const offset = event.key === "ArrowRight" ? 1 : -1;
      const index = sections.findIndex((section) => section.id === currentSection);
      const next = sections[(index + offset + sections.length) % sections.length];
      document.getElementById(next.id)?.scrollIntoView({ behavior: "smooth" });
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [currentSection]);

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
            {sections.map((section) => {
              const isActive = currentSection === section.id;

              return (
                <button
                  key={section.id}
                  className={`${styles.navButton} ${
                    isActive ? styles.active : ""
                  }`}
                  onClick={() => document.getElementById(section.id)?.scrollIntoView({ behavior: "smooth" })}
                  title={`Jump to ${section.label}`}
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
          {sections.find((section) => section.id === currentSection)?.label}
        </span>
      </div>
    </>
  );
}
