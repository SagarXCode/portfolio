const links = [
  { href: '#projects', label: 'Projects' },
  { href: '#skills', label: 'Skills' },
  { href: '#contact', label: 'Contact' },
];

export default function Navbar() {
  return (
    <header className="topbar">
      <div className="topbar-inner">
        <a href="#home" className="brand">
          Sagar Maurya
        </a>

        <nav aria-label="Primary">
          <ul className="topnav">
            {links.map((link) => (
              <li key={link.href}>
                <a href={link.href}>{link.label}</a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}