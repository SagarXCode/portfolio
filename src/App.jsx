import Navbar from './components/layout/Navbar';
import ProjectCard from './components/ui/ProjectCard';
import { projects } from './data/projects';

function App() {
  return (
    <div className="bg-gray-50 min-h-screen">
      <Navbar />
      <main className="max-w-6xl mx-auto p-6">
        <h2 className="text-2xl font-bold mb-6">Featured Projects</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((p) => (
            <ProjectCard key={p.id} project={p} />
          ))}
        </div>
      </main>
    </div>
  );
}

export default App;