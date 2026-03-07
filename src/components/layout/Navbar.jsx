export default function Navbar() {
  return (
    <nav className="flex justify-between items-center py-6 px-10 bg-white shadow-sm">
      <h1 className="text-2xl font-bold text-gray-800">Sagar Maurya</h1>
      <ul className="flex gap-8 text-gray-600">
        <li className="hover:text-blue-500 cursor-pointer">Projects</li>
        <li className="hover:text-blue-500 cursor-pointer">Skills</li>
        <li className="hover:text-blue-500 cursor-pointer">Contact</li>
      </ul>
    </nav>
  );
}