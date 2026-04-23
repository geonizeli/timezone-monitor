/**
 * Full list of IANA timezones grouped by region.
 */
export const TIMEZONE_LIST = Intl.supportedValuesOf('timeZone');

/**
 * Group timezones by their region prefix (e.g. "America", "Europe").
 */
export function groupTimezones(tzList) {
  const groups = {};
  for (const tz of tzList) {
    const slash = tz.indexOf('/');
    const region = slash > -1 ? tz.slice(0, slash) : 'Other';
    if (!groups[region]) groups[region] = [];
    groups[region].push(tz);
  }
  return groups;
}

/**
 * Get the current time formatted for a given timezone.
 */
export function getTimeInZone(tz, now = new Date()) {
  return new Intl.DateTimeFormat('en-US', {
    timeZone: tz,
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false,
  }).format(now);
}

/**
 * Get the current date formatted for a given timezone.
 */
export function getDateInZone(tz, now = new Date()) {
  return new Intl.DateTimeFormat('en-US', {
    timeZone: tz,
    weekday: 'short',
    month: 'short',
    day: 'numeric',
  }).format(now);
}

/**
 * Get the hour (0-23) in a given timezone.
 */
export function getHourInZone(tz, now = new Date()) {
  const parts = new Intl.DateTimeFormat('en-US', {
    timeZone: tz,
    hour: 'numeric',
    hour12: false,
  }).formatToParts(now);
  const hourPart = parts.find((p) => p.type === 'hour');
  return parseInt(hourPart.value, 10);
}

/**
 * Get the UTC offset string for a timezone (e.g. "UTC+5:30").
 */
export function getUtcOffset(tz, now = new Date()) {
  const formatter = new Intl.DateTimeFormat('en-US', {
    timeZone: tz,
    timeZoneName: 'shortOffset',
  });
  const parts = formatter.formatToParts(now);
  const offsetPart = parts.find((p) => p.type === 'timeZoneName');
  return offsetPart ? offsetPart.value : '';
}

/**
 * Get a friendly display name from a timezone string.
 * "America/New_York" -> "New York"
 */
export function displayName(tz) {
  const parts = tz.split('/');
  return parts[parts.length - 1].replace(/_/g, ' ');
}
