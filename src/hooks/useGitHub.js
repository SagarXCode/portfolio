import { useEffect, useMemo, useState } from 'react';

const contributionEndpoints = [
	(username, cacheBuster) =>
		`https://github-contributions-api.jogruber.de/v4/${username}?y=last&${cacheBuster}`,
	(username, cacheBuster) => `https://github-contributions-api.deno.dev/${username}.json?${cacheBuster}`,
];

const dateKeyPattern = /(\d{4}-\d{2}-\d{2})/;

const toUtcDateKey = (date) => date.toISOString().slice(0, 10);

const normalizeDateKey = (input) => {
	if (!input) {
		return null;
	}

	if (typeof input === 'string') {
		const match = input.match(dateKeyPattern);
		if (match) {
			return match[1];
		}
	}

	const normalized = new Date(input);
	if (Number.isNaN(normalized.getTime())) {
		return null;
	}

	return toUtcDateKey(normalized);
};

const readEntriesFromWeeks = (weeks) => {
	if (!Array.isArray(weeks)) {
		return [];
	}

	const entries = [];

	weeks.forEach((week) => {
		if (Array.isArray(week)) {
			entries.push(...week);
			return;
		}

		const days = week?.contributionDays ?? week?.days ?? week?.contributions;
		if (Array.isArray(days)) {
			entries.push(...days);
		}
	});

	return entries;
};

const readContributionEntries = (payload) => {
	if (!payload || typeof payload !== 'object') {
		return [];
	}

	if (Array.isArray(payload.weeks)) {
		return readEntriesFromWeeks(payload.weeks);
	}

	if (Array.isArray(payload.contributions)) {
		if (payload.contributions.some((entry) => Array.isArray(entry))) {
			return readEntriesFromWeeks(payload.contributions);
		}

		if (
			payload.contributions.some(
				(entry) =>
					Array.isArray(entry?.contributionDays) ||
					Array.isArray(entry?.days) ||
					Array.isArray(entry?.contributions),
			)
		) {
			return readEntriesFromWeeks(payload.contributions);
		}

		return payload.contributions;
	}

	if (Array.isArray(payload.data)) {
		return payload.data;
	}

	if (payload.contributions && typeof payload.contributions === 'object') {
		return Object.entries(payload.contributions).map(([date, count]) => ({ date, count }));
	}

	return [];
};

const normalizeContributions = (payload) => {
	const entries = readContributionEntries(payload);
	const normalized = [];

	entries.forEach((entry) => {
		const dateKey = normalizeDateKey(
			entry.date ?? entry.day ?? entry.timestamp ?? entry.contributed_at,
		);
		const rawCount =
			entry.count ??
			entry.value ??
			entry.contributionCount ??
			entry.contributions ??
			entry.total ??
			0;
		const parsedCount = Number.parseInt(rawCount, 10);

		if (!dateKey || Number.isNaN(parsedCount)) {
			return;
		}

		normalized.push({
			date: dateKey,
			count: Math.max(0, parsedCount),
		});
	});

	return normalized;
};

export const useGitHubContributions = (username) => {
	const [contributions, setContributions] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState('');

	useEffect(() => {
		if (!username) {
			setContributions([]);
			setLoading(false);
			setError('');
			return;
		}

		const controller = new AbortController();

		const loadContributions = async () => {
			setLoading(true);
			setError('');

			for (const endpoint of contributionEndpoints) {
				try {
					const cacheBuster = `ts=${Date.now()}`;
					const response = await fetch(endpoint(username, cacheBuster), {
						signal: controller.signal,
						cache: 'no-store',
					});
					if (!response.ok) {
						continue;
					}

					const payload = await response.json();
					const normalizedData = normalizeContributions(payload);

					if (normalizedData.length > 0) {
						setContributions(normalizedData);
						setLoading(false);
						return;
					}
				} catch (requestError) {
					if (requestError.name === 'AbortError') {
						return;
					}
				}
			}

			setContributions([]);
			setError('Live contribution data is temporarily unavailable.');
			setLoading(false);
		};

		loadContributions();

		return () => {
			controller.abort();
		};
	}, [username]);

	const contributionMap = useMemo(() => {
		const map = new Map();

		contributions.forEach((item) => {
			map.set(item.date, item.count);
		});

		return map;
	}, [contributions]);

	const maxCount = useMemo(() => {
		if (contributions.length === 0) {
			return 0;
		}

		return contributions.reduce((max, item) => Math.max(max, item.count), 0);
	}, [contributions]);

	const totalCount = useMemo(() => {
		if (contributions.length === 0) {
			return 0;
		}

		return contributions.reduce((sum, item) => sum + item.count, 0);
	}, [contributions]);

	return {
		contributionMap,
		maxCount,
		totalCount,
		loading,
		error,
	};
};

