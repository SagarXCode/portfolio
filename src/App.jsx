import Navbar from './components/layout/Navbar';
import { projects } from './data/projects';
import ProjectCard from './components/ProjectCard';

function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main className="p-10">
        <h1 className="text-3xl font-bold mb-6">My Projects</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {projects.map((p) => <ProjectCard key={p.id} project={p} />)}
        </div>
      </main>
    </div>
  );
}
export default App;