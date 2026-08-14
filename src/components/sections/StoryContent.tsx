/**
 * STORY CONTENT — the opening chapter of the experience
 *
 * The opening narrative follows the four-scene story timeline.
 */

import { getSceneProgress, getStoryScene, storyScenes } from "../../data/storyScenes";
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
  const sceneOpacity = (sceneIndex: number): number => {
    const scene = storyScenes[sceneIndex];
    if (storyProgress < scene.start) return 0;

    const localProgress = getSceneProgress(storyProgress, scene);
    return 1 - calculateFade(localProgress, 0.82, 1);
  };
  const currentScene = getStoryScene(storyProgress);

  return (
    <main className={styles.story}>
      <header className={styles.topBar}>
        <div className={styles.brand}>M-NIGHT</div>
        <div className={styles.menu}>{currentScene.label}</div>
      </header>

      <section className={`${styles.chapter} ${styles.intro}`}>
          <div className={styles.heroCopy} style={{ opacity: sceneOpacity(0) }}>
          <p className={styles.eyebrow}>SCENE 01 — {storyScenes[0].label}</p>
          <h1>EVERY JOURNEY STARTS FROM A SINGLE POSITION.</h1>
          <p className={styles.role}>SCENE 01 — THE BEGINNING</p>
          <p className={styles.scrollHint}>SCROLL TO BEGIN <span>↓</span></p>
        </div>
      </section>

      <section className={`${styles.chapter} ${styles.reveal}`}>
        <div className={styles.revealCopy} style={{ opacity: sceneOpacity(1) }}>
          <p className={styles.eyebrow}>SCENE 02 — {storyScenes[1].label}</p>
          <h2>THE BOARD IS BIGGER THAN THE FIRST MOVE.</h2>
        </div>
      </section>

      <section id="player" className={`${styles.chapter} ${styles.contentChapter}`}>
        <article className={styles.panel} style={{ opacity: sceneOpacity(2) }}>
          <p className={styles.eyebrow}>SCENE 03 — {storyScenes[2].label}</p>
          <h2>I BUILD, LEARN, EXPERIMENT AND KEEP MOVING.</h2>
        </article>
      </section>

      <section id="first-move" className={`${styles.chapter} ${styles.contentChapter}`}>
        <article className={styles.panel} style={{ opacity: sceneOpacity(3) }}>
          <p className={styles.eyebrow}>SCENE 04 — {storyScenes[3].label}</p>
          <h2>THE FIRST MOVE IS ONLY THE BEGINNING.</h2>
        </article>
      </section>

      <section className={`${styles.chapter} ${styles.contentChapter}`}>
        <article className={styles.panel}>
          <p className={styles.eyebrow}>THE STORY CONTINUES</p>
          <h2>EXPLORE THE NEXT POSITION.</h2>
          <ul>
            <li>SKILLS</li>
            <li>PROJECTS</li>
            <li>EXPERIENCE</li>
            <li>CONTACT</li>
          </ul>
        </article>
      </section>
    </main>
  );
}
