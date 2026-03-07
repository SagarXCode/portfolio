import { useMemo } from 'react';
import { useGitHubContributions } from '../../hooks/useGitHub';

const weekdayLabels = ['', 'Mon', '', 'Wed', '', 'Fri', ''];

const toDateKey = (date) => date.toISOString().slice(0, 10);

const getContributionLevel = (count, maxCount) => {
  if (count <= 0 || maxCount <= 0) {
    return 0;
  }

  const step = Math.max(1, Math.ceil(maxCount / 4));
  if (count <= step) {
    return 1;
  }

  if (count <= step * 2) {
    return 2;
  }

  if (count <= step * 3) {
    return 3;
  }

  return 4;
};

const buildCalendarData = (contributionMap, maxCount) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const start = new Date(today);
  start.setDate(start.getDate() - 364);

  const alignedStart = new Date(start);
  alignedStart.setDate(alignedStart.getDate() - alignedStart.getDay());

  const allDays = [];
  const cursor = new Date(alignedStart);

  while (cursor <= today) {
    const dateKey = toDateKey(cursor);
    const count = contributionMap.get(dateKey) ?? 0;

    allDays.push({
      date: new Date(cursor),
      dateKey,
      count,
      level: getContributionLevel(count, maxCount),
      isFuture: false,
    });

    cursor.setDate(cursor.getDate() + 1);
  }

  while (allDays.length % 7 !== 0) {
    const dateKey = toDateKey(cursor);

    allDays.push({
      date: new Date(cursor),
      dateKey,
      count: 0,
      level: 0,
      isFuture: true,
    });

    cursor.setDate(cursor.getDate() + 1);
  }

  const weeks = [];
  for (let index = 0; index < allDays.length; index += 7) {
    weeks.push(allDays.slice(index, index + 7));
  }

  const monthLabels = weeks.map((week, index) => {
    const currentMonth = week[0].date.getMonth();
    const previousMonth = index === 0 ? null : weeks[index - 1][0].date.getMonth();

    if (index === 0 || currentMonth !== previousMonth) {
      return week[0].date.toLocaleString('en-US', { month: 'short' });
    }

    return '';
  });

  return {
    weeks,
    monthLabels,
  };
};

export default function GitHubContributionCalendar({ username }) {
  const { contributionMap, maxCount, totalCount, loading, error } = useGitHubContributions(username);

  const { weeks, monthLabels } = useMemo(() => {
    return buildCalendarData(contributionMap, maxCount);
  }, [contributionMap, maxCount]);

  const summaryText = loading
    ? 'Loading contribution data...'
    : `${totalCount} commits in the last 12 months`;

  return (
    <div className="contribution-calendar-shell">
      <p className="calendar-summary">{summaryText}</p>

      <div className="calendar-scroll">
        <div className="calendar-inner">
          <div className="calendar-months">
            <span className="calendar-month-spacer" aria-hidden="true" />
            <div className="calendar-month-track" aria-hidden="true">
              {monthLabels.map((label, index) => (
                <span key={`${label}-${index}`} className="calendar-month-label">
                  {label}
                </span>
              ))}
            </div>
          </div>

          <div className="calendar-body" role="img" aria-label={`${summaryText} for ${username}`}>
            <div className="calendar-weekday-labels" aria-hidden="true">
              {weekdayLabels.map((label, index) => (
                <span key={`${label}-${index}`}>{label}</span>
              ))}
            </div>

            <div className="calendar-grid">
              {weeks.map((week, weekIndex) => (
                <div key={`week-${weekIndex}`} className="calendar-week">
                  {week.map((day) => (
                    <span
                      key={day.dateKey}
                      className={`calendar-cell level-${day.level}${day.isFuture ? ' is-future' : ''}`}
                    />
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="calendar-legend" aria-hidden="true">
        <span>Less</span>
        <div className="legend-scale">
          <span className="calendar-cell level-0" />
          <span className="calendar-cell level-1" />
          <span className="calendar-cell level-2" />
          <span className="calendar-cell level-3" />
          <span className="calendar-cell level-4" />
        </div>
        <span>More</span>
      </div>

      {error ? <p className="calendar-error">{error}</p> : null}
    </div>
  );
}
