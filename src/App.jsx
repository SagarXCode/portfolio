import { useEffect, useState } from 'react';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import ProjectCard from './components/ui/ProjectCard';
import SkillBadge from './components/ui/SkillBadge';
import GitHubContributionCalendar from './components/ui/GitHubContributionCalendar';
import { GITHUB_USERNAME, skills } from './utils/constants';
import { projects } from './utils/projects';

const getInitialTheme = () => {
  if (typeof window === 'undefined') {
    return 'light';
  }

  const savedTheme = window.localStorage.getItem('theme');
  if (savedTheme === 'light' || savedTheme === 'dark') {
    return savedTheme;
  }

  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
};

function App() {
  const [theme, setTheme] = useState(getInitialTheme);
  const resumeUrl = `${import.meta.env.BASE_URL}assets/resume/resume.pdf`;

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    window.localStorage.setItem('theme', theme);
  }, [theme]);

  useEffect(() => {
    const cardSelector = '.project-card, .activity-card, .contact-card';
    let activeCard = null;

    const getCardElement = (eventTarget) => {
      if (!(eventTarget instanceof Element)) {
        return null;
      }

      return eventTarget.closest(cardSelector);
    };

    const activateCard = (eventTarget) => {
      const nextCard = getCardElement(eventTarget);
      if (!nextCard) {
        return;
      }

      if (activeCard && activeCard !== nextCard) {
        activeCard.classList.remove('touch-active');
      }

      activeCard = nextCard;
      activeCard.classList.add('touch-active');
    };

    const clearActiveCard = () => {
      if (!activeCard) {
        return;
      }

      activeCard.classList.remove('touch-active');
      activeCard = null;
    };

    const handleTouchStart = (event) => {
      activateCard(event.target);
    };

    const handleTouchMove = (event) => {
      activateCard(event.target);
    };

    document.addEventListener('touchstart', handleTouchStart, { passive: true });
    document.addEventListener('touchmove', handleTouchMove, { passive: true });
    document.addEventListener('touchend', clearActiveCard, { passive: true });
    document.addEventListener('touchcancel', clearActiveCard, { passive: true });

    return () => {
      document.removeEventListener('touchstart', handleTouchStart);
      document.removeEventListener('touchmove', handleTouchMove);
      document.removeEventListener('touchend', clearActiveCard);
      document.removeEventListener('touchcancel', clearActiveCard);
      clearActiveCard();
    };
  }, []);

  const handleThemeToggle = () => {
    setTheme((currentTheme) => (currentTheme === 'light' ? 'dark' : 'light'));
  };

  return (
    <div className="site-shell">
      <Navbar theme={theme} onToggleTheme={handleThemeToggle} />

      <main className="main-content">
        <section id="home" className="hero reveal" style={{ animationDelay: '0.05s' }}>
          <p className="eyebrow">Aspiring Software Developer | Java | Data Structures & Algorithms</p>
          <h1>Building software with clarity, consistency, and curiosity.</h1>
          <p className="lead">
            I'm a Computer Science student focused on strengthening problem-solving skills, writing
            clean and maintainable code, and building practical projects. I'm also interested in
            open-source development and exploring how technology works at the system level.
          </p>

          <div className="hero-actions">
            <a
              className="btn btn-resume reveal reveal-button"
              style={{ animationDelay: '0.12s' }}
              href={resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              <svg className="btn-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M12 15V3m0 12-4-4m4 4 4-4" />
                <path d="M2 17l.621 2.485A2 2 0 0 0 4.561 21h14.878a2 2 0 0 0 1.94-1.515L22 17" />
              </svg>
              Resume
            </a>
            <a
              className="btn btn-primary reveal reveal-button"
              style={{ animationDelay: '0.18s' }}
              href="#projects"
            >
              View Projects
            </a>
            <a
              className="btn btn-ghost reveal reveal-button"
              style={{ animationDelay: '0.24s' }}
              href="#contact"
            >
              Contact
            </a>
          </div>
        </section>

        <section id="projects" className="section reveal" style={{ animationDelay: '0.14s' }}>
          <header className="section-header">
            <h2>Projects</h2>
            <p>Selected work that reflects my current skills and interests.</p>
          </header>

          <div className="projects-grid">
            {projects.map((project, index) => (
              <div
                key={project.id}
                className="reveal"
                style={{ animationDelay: `${0.2 + index * 0.08}s` }}
              >
                <ProjectCard project={project} />
              </div>
            ))}
          </div>
        </section>

        <section id="skills" className="section reveal" style={{ animationDelay: '0.22s' }}>
          <header className="section-header">
            <h2>Skills</h2>
            <p>Tools and technologies I use to ship production-ready features.</p>
          </header>

          <div className="skills-wrap">
            {skills.map((skill, index) => (
              <div
                key={skill}
                className="reveal"
                style={{ animationDelay: `${0.28 + index * 0.08}s` }}
              >
                <SkillBadge skill={skill} />
              </div>
            ))}
          </div>
        </section>

        <section id="github" className="section reveal" style={{ animationDelay: '0.26s' }}>
          <header className="section-header">
            <h2>GitHub Activity</h2>
            <p>Live contribution calendar from my GitHub profile.</p>
          </header>

          <div className="github-stats-grid">
            <div className="activity-card-wrap reveal" style={{ animationDelay: '0.35s' }}>
              <article className="github-card calendar-card activity-card">
                <h3>GitHub Contributions</h3>
                <GitHubContributionCalendar username={GITHUB_USERNAME} />
              </article>
            </div>
          </div>
        </section>

        <section id="education" className="section reveal" style={{ animationDelay: '0.28s' }}>
          <header className="section-header">
            <h2>Education</h2>
          </header>

          <article className="education-card activity-card reveal" style={{ animationDelay: '0.37s' }}>
            <p className="education-degree">Bachelor of Technology in Computer Science Engineering</p>
            <p className="education-school">Institute of Technology and Management, GIDA, Gorakhpur</p>
            <p className="education-years">2023 - 2027</p>
          </article>
        </section>

        <section id="contact" className="section reveal" style={{ animationDelay: '0.32s' }}>
          <header className="section-header">
            <h2>Contact</h2>
            <p>Let us collaborate on your next web project.</p>
          </header>

          <div className="contact-card">
            <div className="contact-copy">
              <p>Open to software developer opportunities, internships, and collaborations.</p>
            </div>
            <div className="contact-links">
              <div className="reveal reveal-button" style={{ animationDelay: '0.06s' }}>
                <a
                  className="text-link contact-link nav-lift"
                  href="https://github.com/SagarXCode"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="GitHub profile"
                >
                  <span className="contact-link-icon-wrap" aria-hidden="true">
                    <svg className="contact-link-icon" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 .5C5.65.5.5 5.66.5 12.03c0 5.1 3.3 9.42 7.87 10.95.58.1.79-.25.79-.56v-1.95c-3.2.7-3.88-1.55-3.88-1.55-.52-1.34-1.28-1.69-1.28-1.69-1.05-.72.08-.7.08-.7 1.16.08 1.77 1.2 1.77 1.2 1.03 1.77 2.7 1.26 3.36.96.1-.75.4-1.26.73-1.55-2.55-.29-5.23-1.28-5.23-5.7 0-1.26.45-2.28 1.19-3.08-.12-.3-.52-1.5.11-3.12 0 0 .98-.32 3.21 1.18a11.1 11.1 0 0 1 5.84 0c2.22-1.5 3.2-1.18 3.2-1.18.64 1.62.24 2.82.12 3.12.74.8 1.19 1.82 1.19 3.08 0 4.43-2.68 5.4-5.24 5.69.41.36.78 1.08.78 2.17v3.22c0 .31.21.67.8.56A11.55 11.55 0 0 0 23.5 12.03C23.5 5.66 18.35.5 12 .5Z" />
                    </svg>
                  </span>
                  <span>GitHub</span>
                </a>
              </div>

              <div className="reveal reveal-button" style={{ animationDelay: '0.12s' }}>
                <a
                  className="text-link contact-link nav-lift"
                  href="https://www.linkedin.com/in/sagar-maurya-dev/"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="LinkedIn profile"
                >
                  <span className="contact-link-icon-wrap" aria-hidden="true">
                    <svg className="contact-link-icon" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M4.98 3.5A2.49 2.49 0 0 0 2.5 6a2.49 2.49 0 0 0 2.48 2.5h.02A2.5 2.5 0 0 0 7.5 6 2.49 2.49 0 0 0 5 3.5h-.02ZM2.87 9.75h4.25V21H2.87V9.75Zm6.63 0h4.07v1.54h.06c.57-1.07 1.96-2.2 4.03-2.2 4.31 0 5.11 2.84 5.11 6.53V21h-4.24v-4.79c0-1.14-.02-2.61-1.59-2.61-1.6 0-1.84 1.25-1.84 2.53V21H9.5V9.75Z" />
                    </svg>
                  </span>
                  <span>LinkedIn</span>
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

export default App;