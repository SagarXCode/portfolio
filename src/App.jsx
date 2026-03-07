import { useEffect, useState } from 'react';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import ProjectCard from './components/ui/ProjectCard';
import SkillBadge from './components/ui/SkillBadge';
import GitHubContributionCalendar from './components/ui/GitHubContributionCalendar';
import { projects } from './data/projects';

const skills = [
  'Java',
  'Data Structures',
  'Algorithms',
  'Problem Solving',
  'Spring Boot',
  'Git',
  'GitHub',
  'SQL',
];

const GITHUB_USERNAME = 'SagarXCode';

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

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    window.localStorage.setItem('theme', theme);
  }, [theme]);

  const handleThemeToggle = () => {
    setTheme((currentTheme) => (currentTheme === 'light' ? 'dark' : 'light'));
  };

  return (
    <div className="site-shell">
      <Navbar theme={theme} onToggleTheme={handleThemeToggle} />

      <main className="main-content">
        <section id="home" className="hero reveal" style={{ animationDelay: '0.05s' }}>
          <p className="eyebrow">Aspiring Software Developer | Java | Learning Data Structures & Algorithms.</p>
          <h1>Building software with clarity, consistency, and curiosity.</h1>
          <p className="lead">
            I focus on improving problem-solving skills, writing cleaner code, and growing through
            practical projects as I progress in software development. I am passionate about
            software development, open source, and exploring how technology works at the system
            level.
          </p>

          <div className="hero-actions">
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

        <section id="contact" className="section reveal" style={{ animationDelay: '0.3s' }}>
          <header className="section-header">
            <h2>Contact</h2>
            <p>Let us collaborate on your next web project.</p>
          </header>

          <div className="contact-card">
            <div className="contact-copy">
              <p>Open to software developer opportunities, internships, and collaborations.</p>
            </div>
            <div className="contact-links">
              <a
                className="text-link reveal reveal-button"
                style={{ animationDelay: '0.06s' }}
                href="https://github.com/SagarXCode"
                target="_blank"
                rel="noreferrer"
              >
                GitHub
              </a>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

export default App;