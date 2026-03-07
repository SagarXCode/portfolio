import { useEffect, useMemo, useRef, useState } from 'react';
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

const clamp = (value, min, max) => Math.min(max, Math.max(min, value));

const getCalendarSize = (containerWidth) => {
  const width = Math.max(220, containerWidth || 0);
  const compactMode = width < 640;
  const showWeekdayLabels = !compactMode;
  const showMonthLabels = width >= 360;
  const blockMargin = width < 760 ? 1 : 2;

  const horizontalReservedSpace = showWeekdayLabels ? 32 : 8;
  const usableWidth = Math.max(240, width - horizontalReservedSpace);
  const rawBlockSize = Math.floor(usableWidth / 53) - blockMargin;
  const blockSize = clamp(rawBlockSize, 3, 10);

  let fontSize = 12;
  if (width < 420) {
    fontSize = 9;
  } else if (width < 700) {
    fontSize = 10;
  } else if (width < 980) {
    fontSize = 11;
  }

  return { blockSize, blockMargin, fontSize, showWeekdayLabels, showMonthLabels };
};

export default function GitHubContributionCalendar({ username }) {
  const [colorScheme, setColorScheme] = useState(getColorScheme);
  const [containerWidth, setContainerWidth] = useState(0);
  const widgetRef = useRef(null);
  const calendarSize = useMemo(() => getCalendarSize(containerWidth), [containerWidth]);

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
    const element = widgetRef.current;
    if (!element) {
      return undefined;
    }

    const updateWidth = () => {
      const nextWidth = Math.round(element.getBoundingClientRect().width);
      setContainerWidth(nextWidth);
    };

    updateWidth();

    const observer = new ResizeObserver(updateWidth);
    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <div className="contribution-calendar-shell">
      <div ref={widgetRef} className="calendar-widget" role="img" aria-label={`GitHub contribution calendar for ${username}`}>
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
          showMonthLabels={calendarSize.showMonthLabels}
          showWeekdayLabels={calendarSize.showWeekdayLabels}
          errorMessage="Unable to load GitHub contributions right now."
        />
      </div>
    </div>
  );
}
