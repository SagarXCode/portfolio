import { useMemo } from 'react';
import { useGitHubContributions } from '../../hooks/useGitHub';

const weekdayLabels = ['', 'Mon', '', 'Wed', '', 'Fri', ''];

const toDateKey = (date) => date.toISOString().slice(0, 10);

const parseDateKey = (dateKey) => new Date(`${dateKey}T00:00:00Z`);

const addUtcDays = (date, days) => {
  const updated = new Date(date);
  updated.setUTCDate(updated.getUTCDate() + days);
  return updated;
};

const formatHoverDate = (date) => {
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    timeZone: 'UTC',
  });
};

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

const getLatestDateKey = (contributionMap) => {
  if (contributionMap.size === 0) {
    return toDateKey(new Date());
  }

  const sortedDates = [...contributionMap.keys()].sort((left, right) => left.localeCompare(right));
  return sortedDates[sortedDates.length - 1];
};

const buildCalendarData = (contributionMap, contributionColorMap, maxCount) => {
  const latestDateKey = getLatestDateKey(contributionMap);
  const latestDate = parseDateKey(latestDateKey);

  const start = addUtcDays(latestDate, -364);

  const alignedStart = addUtcDays(start, -start.getUTCDay());

  const allDays = [];
  let cursor = new Date(alignedStart);

  while (cursor <= latestDate) {
    const dateKey = toDateKey(cursor);
    const count = contributionMap.get(dateKey) ?? 0;
    const color = contributionColorMap.get(dateKey) ?? null;

    allDays.push({
      date: new Date(cursor),
      dateKey,
      count,
      color,
      level: getContributionLevel(count, maxCount),
      isFuture: false,
    });

    cursor = addUtcDays(cursor, 1);
  }

  while (allDays.length % 7 !== 0) {
    const dateKey = toDateKey(cursor);

    allDays.push({
      date: new Date(cursor),
      dateKey,
      count: 0,
      color: null,
      level: 0,
      isFuture: true,
    });

    cursor = addUtcDays(cursor, 1);
  }

  const weeks = [];
  for (let index = 0; index < allDays.length; index += 7) {
    weeks.push(allDays.slice(index, index + 7));
  }

  const monthLabels = weeks.map((week, index) => {
    const currentMonth = week[0].date.getUTCMonth();
    const previousMonth = index === 0 ? null : weeks[index - 1][0].date.getUTCMonth();

    if (index === 0 || currentMonth !== previousMonth) {
      return week[0].date.toLocaleString('en-US', { month: 'short', timeZone: 'UTC' });
    }

    return '';
  });

  return {
    weeks,
    monthLabels,
  };
};

const getHoverLabel = (day) => {
  const contributionLabel = `${day.count} contribution${day.count === 1 ? '' : 's'}`;

  if (day.isFuture) {
    return `No data for ${formatHoverDate(day.date)}`;
  }

  return `${contributionLabel} on ${formatHoverDate(day.date)}`;
};

export default function GitHubContributionCalendar({ username }) {
  const { contributionMap, contributionColorMap, maxCount, totalCount, loading, error } =
    useGitHubContributions(username);

  const { weeks, monthLabels } = useMemo(() => {
    return buildCalendarData(contributionMap, contributionColorMap, maxCount);
  }, [contributionMap, contributionColorMap, maxCount]);

  const summaryText = loading
    ? 'Loading contribution data...'
    : `${totalCount} contributions in the last 12 months`;

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
                      style={day.color ? { backgroundColor: day.color } : undefined}
                      data-tooltip={getHoverLabel(day)}
                      aria-label={getHoverLabel(day)}
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
