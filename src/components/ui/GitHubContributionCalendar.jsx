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

const getCalendarSize = () => {
  if (typeof window === 'undefined') {
    return { blockSize: 10, blockMargin: 3, fontSize: 12 };
  }

  const viewportWidth = window.innerWidth;
  if (viewportWidth <= 420) {
    return { blockSize: 5, blockMargin: 1, fontSize: 10 };
  }

  if (viewportWidth <= 700) {
    return { blockSize: 6, blockMargin: 2, fontSize: 11 };
  }

  if (viewportWidth <= 980) {
    return { blockSize: 8, blockMargin: 2, fontSize: 11 };
  }

  return { blockSize: 10, blockMargin: 3, fontSize: 12 };
};

export default function GitHubContributionCalendar({ username }) {
  const [colorScheme, setColorScheme] = useState(getColorScheme);
  const [calendarSize, setCalendarSize] = useState(getCalendarSize);

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

  useEffect(() => {
    const updateCalendarSize = () => {
      setCalendarSize(getCalendarSize());
    };

    updateCalendarSize();
    window.addEventListener('resize', updateCalendarSize);

    return () => {
      window.removeEventListener('resize', updateCalendarSize);
    };
  }, []);

  return (
    <div className="contribution-calendar-shell">
      <div className="calendar-widget" role="img" aria-label={`GitHub contribution calendar for ${username}`}>
        <GitHubCalendar
          username={username}
          colorScheme={colorScheme}
          theme={calendarTheme}
          blockSize={calendarSize.blockSize}
          blockMargin={calendarSize.blockMargin}
          fontSize={calendarSize.fontSize}
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
