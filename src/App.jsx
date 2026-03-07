import { useEffect, useMemo, useState } from 'react';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import ProjectCard from './components/ui/ProjectCard';
import SkillBadge from './components/ui/SkillBadge';
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

  const githubStatsUrl = useMemo(() => {
    const isDark = theme === 'dark';
    const titleColor = isDark ? 'e4ebf2' : '1f2933';
    const textColor = isDark ? '9fb0c2' : '5f6872';
    const iconColor = isDark ? '7ec0bb' : '1f5f5b';

    return `https://github-readme-stats.vercel.app/api?username=${GITHUB_USERNAME}&show_icons=true&hide_border=true&bg_color=00000000&title_color=${titleColor}&text_color=${textColor}&icon_color=${iconColor}`;
  }, [theme]);

  const contributionGraphUrl = useMemo(() => {
    const graphTheme = theme === 'dark' ? 'github-dark' : 'github-light';
    return `https://github-readme-activity-graph.vercel.app/graph?username=${GITHUB_USERNAME}&theme=${graphTheme}&hide_border=true&radius=8`;
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
            practical projects as I progress in software development.
          </p>

          <div className="hero-actions">
            <a className="btn btn-primary" href="#projects">
              View Projects
            </a>
            <a className="btn btn-ghost" href="#contact">
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
            {skills.map((skill) => (
              <SkillBadge key={skill} skill={skill} />
            ))}
          </div>
        </section>

        <section id="github" className="section reveal" style={{ animationDelay: '0.26s' }}>
          <header className="section-header">
            <h2>GitHub Activity</h2>
            <p>Live stats and contribution graph from my GitHub profile.</p>
          </header>

          <div className="github-stats-grid">
            <article className="github-card">
              <h3>GitHub Stats</h3>
              <img
                className="github-image"
                src={githubStatsUrl}
                alt={`${GITHUB_USERNAME} GitHub statistics`}
                loading="lazy"
              />
            </article>

            <article className="github-card wide">
              <h3>Contribution Graph</h3>
              <img
                className="github-image"
                src={contributionGraphUrl}
                alt={`${GITHUB_USERNAME} contribution graph`}
                loading="lazy"
              />
            </article>
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
              <a className="text-link" href="mailto:hello@sagar.dev">
                hello@sagar.dev
              </a>
              <a
                className="text-link"
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