/**
 * STORY CONTENT — the opening chapter of the experience
 *
 * The opening narrative follows the four-scene story timeline.
 */

import styles from "./StoryContent.module.css";

interface StoryContentProps {
  storyProgress: number;
}

export default function StoryContent({ storyProgress }: StoryContentProps) {
  return (
    <main className={styles.siteContent} data-story-progress={storyProgress}>
      <section id="about" className={styles.contentSection}>
        <div className={styles.sectionHeading}>
          <p className={styles.eyebrow}>01 / ABOUT</p>
          <h2>A developer who likes to understand how things work.</h2>
        </div>
        <div className={styles.aboutGrid}>
          <p>I build software with a practical mindset: solve the problem, learn quickly, and make the interface useful for the person using it.</p>
          <div className={styles.infoCard}><span>Current focus</span><strong>React, TypeScript, Three.js, and interactive web systems</strong></div>
          <div className={styles.infoCard}><span>Approach</span><strong>Clear structure, thoughtful interaction, continuous learning</strong></div>
        </div>
      </section>

      <section id="skills" className={styles.contentSection}>
        <div className={styles.sectionHeading}>
          <p className={styles.eyebrow}>02 / TECHNOLOGIES</p>
          <h2>Tools I use to turn ideas into working software.</h2>
        </div>
        <div className={styles.tagGrid}>
          {['TypeScript', 'React', 'Three.js', 'JavaScript', 'HTML', 'CSS', 'Vite', 'Git'].map((technology) => <span key={technology}>{technology}</span>)}
        </div>
      </section>

      <section id="projects" className={styles.contentSection}>
        <div className={styles.sectionHeading}>
          <p className={styles.eyebrow}>03 / PROJECTS</p>
          <h2>Selected work and experiments.</h2>
        </div>
        <div className={styles.projectGrid}>
          <article className={styles.projectCard}><p className={styles.cardIndex}>01</p><h3>M-Night</h3><p>An interactive React and Three.js portfolio exploring spatial interfaces.</p><span>React / Three.js / TypeScript</span></article>
          <article className={styles.projectCard}><p className={styles.cardIndex}>02</p><h3>Next project</h3><p>A space for the next useful system, experiment, or product built through iteration.</p><span>In progress</span></article>
        </div>
      </section>

      <section id="experience" className={styles.contentSection}>
        <div className={styles.sectionHeading}>
          <p className={styles.eyebrow}>04 / EXPERIENCE</p>
          <h2>Learning through projects, systems, and practice.</h2>
        </div>
        <p className={styles.sectionLead}>This portfolio is an evolving record of the technologies I am studying, the interfaces I am building, and the problems I am learning to solve.</p>
      </section>

      <section id="contact" className={`${styles.contentSection} ${styles.contactSection}`}>
        <div className={styles.sectionHeading}>
          <p className={styles.eyebrow}>05 / CONTACT</p>
          <h2>Have a project or idea worth exploring?</h2>
        </div>
        <p className={styles.contactLink}>Contact details to be added.</p>
      </section>
    </main>
  );
}
