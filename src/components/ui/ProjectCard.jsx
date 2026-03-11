import SkillBadge from './SkillBadge';

const ProjectCard = ({ project }) => {
  const hasLink = Boolean(project.link && project.link !== '#');

  return (
    <article className="project-card">
      <h3 className="project-title">{project.title}</h3>
      <p className="project-description">{project.description}</p>

      <div className="project-tech" aria-label="Project technologies">
        {project.tech.map((tech) => (
          <SkillBadge key={tech} skill={tech} />
        ))}
      </div>

      {hasLink ? (
        <a href={project.link} className="project-link" target="_blank" rel="noreferrer">
          View project
          <svg className="project-link-arrow" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M3 8h10" />
            <path d="M9 4l4 4-4 4" />
          </svg>
        </a>
      ) : (
        <span className="project-link muted">Private or in progress</span>
      )}
    </article>
  );
};

export default ProjectCard;