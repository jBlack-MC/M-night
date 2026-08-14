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
          <h2>Software development student building across web and application development.</h2>
        </div>
        <div className={styles.aboutGrid}>
          <p>Software Development student with experience building web and application projects using Java, PHP, Laravel, JavaScript, C#, and SQL.</p>
          <div className={styles.infoCard}><span>Education</span><strong>Rosebank College<br />Software Development<br />First Year</strong></div>
          <div className={styles.infoCard}><span>Current focus</span><strong>Software architecture, databases, web development, and application development.</strong></div>
        </div>
      </section>

      <section id="skills" className={styles.contentSection}>
        <div className={styles.sectionHeading}>
          <p className={styles.eyebrow}>02 / TECHNOLOGIES</p>
          <h2>Technologies I study and use in projects.</h2>
        </div>
        <div className={styles.tagGrid}>
          {['Java', 'JavaScript', 'PHP', 'Laravel', 'MySQL', 'SQL', 'C#', 'HTML', 'CSS', 'React', 'Three.js'].map((technology) => <span key={technology}>{technology}</span>)}
        </div>
      </section>

      <section id="projects" className={styles.contentSection}>
        <div className={styles.sectionHeading}>
          <p className={styles.eyebrow}>03 / PROJECTS</p>
          <h2>Projects built for practical problems.</h2>
        </div>
        <div className={styles.projectGrid}>
          <article className={styles.projectCard}><p className={styles.cardIndex}>01</p><h3>Pastimes</h3><p>Second-hand clothing marketplace built with Laravel, PHP, MySQL, and Tailwind CSS.</p><span>Laravel / PHP / MySQL / Tailwind CSS</span><a href="https://github.com/jBlack-MC/Pastimes" target="_blank" rel="noreferrer">View repository</a></article>
          <article className={styles.projectCard}><p className={styles.cardIndex}>02</p><h3>Stardust Literacy</h3><p>Mobile reading application connected to an existing literacy platform and database.</p><span>Mobile application / database integration</span><p className={styles.projectNote}>Public project link unavailable.</p></article>
        </div>
      </section>

      <section id="experience" className={styles.contentSection}>
        <div className={styles.sectionHeading}>
          <p className={styles.eyebrow}>04 / EXPERIENCE</p>
          <h2>Building experience through study and application.</h2>
        </div>
        <p className={styles.sectionLead}>Currently developing practical experience across software architecture, databases, web development, and application development through coursework and project work.</p>
      </section>

      <section id="contact" className={`${styles.contentSection} ${styles.contactSection}`}>
        <div className={styles.sectionHeading}>
          <p className={styles.eyebrow}>05 / CONTACT</p>
          <h2>Have a project or idea worth exploring?</h2>
        </div>
        <div className={styles.contactLinks}>
          <p className={styles.contactLink}>Direct contact details to be added.</p>
          <a className={styles.contactLink} href="https://github.com/jBlack-MC" target="_blank" rel="noreferrer">GitHub profile</a>
        </div>
      </section>
    </main>
  );
}
