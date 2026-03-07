import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import ProjectCard from './components/ui/ProjectCard';
import SkillBadge from './components/ui/SkillBadge';
import { projects } from './data/projects';

const skills = [
  'React',
  'JavaScript',
  'Vite',
  'Node.js',
  'REST APIs',
  'GitHub',
  'Responsive UI',
  'Performance',
];

function App() {
  return (
    <div className="site-shell">
      <Navbar />

      <main className="main-content">
        <section id="home" className="hero reveal" style={{ animationDelay: '0.05s' }}>
          <p className="eyebrow">Frontend Developer</p>
          <h1>Minimal interfaces, strong UX, clean code.</h1>
          <p className="lead">
            I am Sagar, a React developer building fast and polished web products with a focus on
            clarity, accessibility, and performance.
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

        <section id="contact" className="section reveal" style={{ animationDelay: '0.3s' }}>
          <header className="section-header">
            <h2>Contact</h2>
            <p>Let us collaborate on your next web project.</p>
          </header>

          <div className="contact-card">
            <div className="contact-copy">
              <p>Open to frontend roles, freelance projects, and collaborations.</p>
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