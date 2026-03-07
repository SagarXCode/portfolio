import { useEffect, useState } from 'react';
import { GitHubCalendar } from 'react-github-calendar';

const calendarTheme = {
  light: ['var(--cal-empty)', 'var(--cal-level-1)', 'var(--cal-level-2)', 'var(--cal-level-3)', 'var(--cal-level-4)'],
  dark: ['var(--cal-empty)', 'var(--cal-level-1)', 'var(--cal-level-2)', 'var(--cal-level-3)', 'var(--cal-level-4)'],
};

const getColorScheme = () => {
  if (typeof document === 'undefined') {
    return 'light';
  }

  return document.documentElement.getAttribute('data-theme') === 'dark' ? 'dark' : 'light';
};

export default function GitHubContributionCalendar({ username }) {
  const [colorScheme, setColorScheme] = useState(getColorScheme);

  useEffect(() => {
    const root = document.documentElement;
    const syncColorScheme = () => {
      setColorScheme(getColorScheme());
    };

    syncColorScheme();

    const observer = new MutationObserver(syncColorScheme);
    observer.observe(root, { attributes: true, attributeFilter: ['data-theme'] });

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <div className="contribution-calendar-shell">
      <div className="calendar-widget" role="img" aria-label={`GitHub contribution calendar for ${username}`}>
        <GitHubCalendar
          username={username}
          colorScheme={colorScheme}
          theme={calendarTheme}
          blockSize={10}
          blockMargin={3}
          fontSize={12}
          labels={{
            totalCount: '{{count}} contributions in the last year',
          }}
          showWeekdayLabels
          errorMessage="Unable to load GitHub contributions right now."
        />
      </div>
    </div>
  );
}
