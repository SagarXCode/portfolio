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
        </a>
      ) : (
        <span className="project-link muted">Private or in progress</span>
      )}
    </article>
  );
};

export default ProjectCard;