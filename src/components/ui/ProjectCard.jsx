const ProjectCard = ({ project }) => {
  return (
    <div className="p-6 bg-white rounded-xl shadow-md border border-gray-100 hover:shadow-lg transition">
      <h3 className="text-xl font-bold text-gray-800">{project.title}</h3>
      <p className="mt-2 text-gray-600">{project.description}</p>
      <div className="mt-4 flex gap-2">
        {project.tech.map((t) => (
          <span key={t} className="px-2 py-1 bg-blue-50 text-blue-600 text-xs rounded">
            {t}
          </span>
        ))}
      </div>
      <a href={project.link} className="block mt-4 text-blue-500 font-semibold hover:underline">
        View on GitHub →
      </a>
    </div>
  );
};

export default ProjectCard;