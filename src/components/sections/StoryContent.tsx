/**
 * STORY CONTENT — the opening chapter of the experience
 *
 * The content is no longer generic portfolio sections. It follows the chess-world story:
 * the beginning, the world, the player, and the journey.
 */

import { ANIMATION_TIMING, UI_TEXT } from "../../data/sceneConstants";
import styles from "./StoryContent.module.css";

const calculateFade = (progress: number, start: number, end: number): number => {
  if (progress < start) return 0;
  if (progress > end) return 1;
  return (progress - start) / (end - start);
};

interface StoryContentProps {
  storyProgress: number;
}

export default function StoryContent({ storyProgress }: StoryContentProps) {
  const heroOpacity = 1 - calculateFade(storyProgress, ANIMATION_TIMING.heroText.fadeOutStart, ANIMATION_TIMING.heroText.fadeOutEnd);
  const worldOpacity = calculateFade(storyProgress, 0.18, 0.38) * (1 - calculateFade(storyProgress, 0.4, 0.52));
  const playerOpacity = calculateFade(storyProgress, 0.38, 0.62);
  const skillsOpacity = calculateFade(storyProgress, 0.5, 0.7);
  const projectsOpacity = calculateFade(storyProgress, 0.64, 0.84);
  const journeyOpacity = calculateFade(storyProgress, 0.78, 0.98);

  return (
    <main className={styles.story}>
      <header className={styles.topBar}>
        <div className={styles.brand}>{UI_TEXT.hero.eyebrow}</div>
        <div className={styles.menu}>THE BEGINNING</div>
      </header>

      <section className={`${styles.chapter} ${styles.intro}`}>
        <div className={styles.heroCopy} style={{ opacity: heroOpacity }}>
          <p className={styles.eyebrow}>SCENE 01</p>
          <h1>EVERY GAME STARTS WITH ONE MOVE.</h1>
          <p className={styles.role}>SOFTWARE DEVELOPER • PROBLEM SOLVER • BUILDER</p>
          <p className={styles.scrollHint}>SCROLL TO BEGIN <span>↓</span></p>
        </div>
      </section>

      <section className={`${styles.chapter} ${styles.reveal}`}>
        <p className={styles.revealCopy} style={{ opacity: worldOpacity }}>THE WORLD TAKES SHAPE.</p>
      </section>

      <section id="player" className={`${styles.chapter} ${styles.contentChapter}`}>
        <article className={styles.panel} style={{ opacity: playerOpacity }}>
          <p className={styles.eyebrow}>SCENE 04 — THE PLAYER</p>
          <h2>I'M CLARITY.</h2>
          <p>
            I build software with a practical mindset: solving problems, learning quickly,
            and making thoughtful moves with every project.
          </p>
        </article>
      </section>

      <section id="skills" className={`${styles.chapter} ${styles.contentChapter}`}>
        <article className={styles.panel} style={{ opacity: skillsOpacity }}>
          <p className={styles.eyebrow}>SCENE 05 — THE SKILLSET</p>
          <h2>TOOLS FOR THE NEXT MOVE.</h2>
          <ul>
            <li>TypeScript and React interfaces</li>
            <li>Three.js and interactive 3D systems</li>
            <li>Accessible, responsive product experiences</li>
            <li>Clear systems thinking from idea to release</li>
          </ul>
        </article>
      </section>

      <section id="projects" className={`${styles.chapter} ${styles.contentChapter}`}>
        <article className={styles.panel} style={{ opacity: projectsOpacity }}>
          <p className={styles.eyebrow}>SCENE 06 — THE WORK</p>
          <h2>BUILT ONE MOVE AT A TIME.</h2>
          <p>
            Selected projects will live here: focused experiments, useful systems, and products
            shaped through iteration.
          </p>
        </article>
      </section>

      <section id="journey" className={`${styles.chapter} ${styles.contentChapter}`}>
        <article className={styles.panel} style={{ opacity: journeyOpacity }}>
          <p className={styles.eyebrow}>SCENE 07 — THE JOURNEY</p>
          <h2>THE NEXT MOVE.</h2>
          <ul>
            <li>Move 1 — Education and fundamentals</li>
            <li>Move 2 — Tools, systems, and craft</li>
            <li>Move 3 — Real projects and product thinking</li>
            <li>Move 4 — Growth, iteration, and future work</li>
          </ul>
        </article>
      </section>
    </main>
  );
}
