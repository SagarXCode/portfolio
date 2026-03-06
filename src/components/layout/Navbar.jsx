const Navbar = () => (
  <nav className="bg-white shadow-sm p-4">
    <div className="max-w-6xl mx-auto flex justify-between items-center">
      <h1 className="font-bold text-xl">My Portfolio</h1>
      <div className="flex gap-4">
        <a href="#projects" className="hover:text-blue-600">Projects</a>
        <a href="https://github.com/SagarXCode" target="_blank" className="hover:text-blue-600">GitHub</a>
      </div>
    </div>
  </nav>
);

export default Navbar;