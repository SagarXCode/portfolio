const links = [
  { href: '#home', label: 'Home' },
  { href: '#projects', label: 'Projects' },
  { href: '#skills', label: 'Skills' },
  { href: '#github', label: 'GitHub' },
  { href: '#contact', label: 'Contact' },
];

export default function Navbar({ theme, onToggleTheme }) {
  const getScrollBehavior = () => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return 'auto';
    }

    return 'smooth';
  };

  const scrollToSection = (href) => {
    const behavior = getScrollBehavior();

    if (href === '#home') {
      window.scrollTo({ top: 0, behavior });
      window.history.replaceState(null, '', window.location.pathname + window.location.search);
      return;
    }

    const targetSection = document.querySelector(href);
    if (!targetSection) {
      return;
    }

    const topbar = document.querySelector('.topbar');
    const topbarHeight = topbar instanceof HTMLElement ? topbar.offsetHeight : 0;
    const sectionHeader = targetSection.querySelector('.section-header');
    const anchorElement = sectionHeader instanceof HTMLElement ? sectionHeader : targetSection;

    const anchorTop = anchorElement.getBoundingClientRect().top + window.scrollY;
    const viewportHeight = window.innerHeight;
    const availableViewport = Math.max(320, viewportHeight - topbarHeight);
    const visualOffset = Math.round(availableViewport * 0.24);

    const maxScrollableTop = Math.max(0, document.documentElement.scrollHeight - viewportHeight);
    const targetTop = Math.min(
      maxScrollableTop,
      Math.max(0, anchorTop - topbarHeight - visualOffset),
    );

    window.scrollTo({ top: targetTop, behavior });
    window.history.replaceState(null, '', href);
  };

  const handleBrandClick = () => {
    scrollToSection('#home');
  };

  const handleNavLinkClick = (event, href) => {
    event.preventDefault();
    scrollToSection(href);
  };

  const nextTheme = theme === 'light' ? 'dark' : 'light';

  return (
    <header className="topbar">
      <div className="topbar-inner">
        <div className="reveal reveal-button" style={{ animationDelay: '0.04s' }}>
          <button
            type="button"
            className="brand brand-button nav-lift"
            onClick={handleBrandClick}
            aria-label="Sagar Maurya"
          >
            <span className="brand-bracket" aria-hidden="true">&lt;</span>
            <span className="brand-name">Sagar Maurya</span>
            <span className="brand-gap" aria-hidden="true">&nbsp;</span>
            <span className="brand-bracket brand-bracket-close" aria-hidden="true">/&gt;</span>
          </button>
        </div>

        <div className="topbar-right">
          <nav aria-label="Primary">
            <ul className="topnav">
              {links.map((link, index) => (
                <li key={link.href}>
                  <span className="reveal" style={{ animationDelay: `${0.12 + index * 0.08}s` }}>
                    <a
                      href={link.href}
                      className="topnav-link nav-lift"
                      onClick={(event) => handleNavLinkClick(event, link.href)}
                    >
                      {link.label}
                    </a>
                  </span>
                </li>
              ))}
            </ul>
          </nav>

          <div className="reveal reveal-button" style={{ animationDelay: '0.29s' }}>
            <button
              type="button"
              className="theme-toggle nav-lift"
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
      </div>
    </header>
  );
}