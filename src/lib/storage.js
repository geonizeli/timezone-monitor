const STORAGE_KEY = 'timezone-monitor-selected';

/**
 * Load selected timezones from localStorage.
 * Returns a default set if nothing is saved.
 */
export function loadTimezones() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length > 0) return parsed;
    }
  } catch {
    // ignore parse errors
  }
  return ['America/New_York', 'Europe/London', 'Asia/Tokyo'];
}

/**
 * Save selected timezones to localStorage.
 */
export function saveTimezones(tzList) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(tzList));
}
