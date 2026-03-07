const links = [
  { href: '#projects', label: 'Projects' },
  { href: '#skills', label: 'Skills' },
  { href: '#github', label: 'GitHub' },
  { href: '#contact', label: 'Contact' },
];

export default function Navbar({ theme, onToggleTheme }) {
  const handleBrandClick = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const nextTheme = theme === 'light' ? 'dark' : 'light';

  return (
    <header className="topbar">
      <div className="topbar-inner">
        <button
          type="button"
          className="brand brand-button reveal reveal-button"
          style={{ animationDelay: '0.04s' }}
          onClick={handleBrandClick}
        >
          Sagar Maurya
        </button>

        <div className="topbar-right">
          <nav aria-label="Primary">
            <ul className="topnav">
              {links.map((link, index) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="reveal nav-link-reveal"
                    style={{ animationDelay: `${0.08 + index * 0.05}s` }}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <button
            type="button"
            className="theme-toggle reveal reveal-button"
            style={{ animationDelay: '0.29s' }}
            onClick={onToggleTheme}
            aria-label={`Switch to ${nextTheme} mode`}
            title={`Switch to ${nextTheme} mode`}
          >
            {theme === 'light' ? (
              <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.8" />
                <path
                  d="M12 2v2.2M12 19.8V22M4.93 4.93l1.55 1.55M17.52 17.52l1.55 1.55M2 12h2.2M19.8 12H22M4.93 19.07l1.55-1.55M17.52 6.48l1.55-1.55"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.8"
                />
              </svg>
            ) : (
              <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path
                  d="M21 12.79A9 9 0 1 1 11.21 3a7 7 0 0 0 9.79 9.79z"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.8"
                />
              </svg>
            )}
          </button>
        </div>
      </div>
    </header>
  );
}