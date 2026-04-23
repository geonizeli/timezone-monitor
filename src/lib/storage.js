const STORAGE_KEY = 'timezone-monitor-selected';

/**
 * Get the user's current timezone.
 */
function getCurrentTimezone() {
  return Intl.DateTimeFormat().resolvedOptions().timeZone;
}

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
  
  // Default timezones: [Current, Lisbon, Hong Kong]
  // If current is Lisbon, replace Lisbon with Sao Paulo
  const current = getCurrentTimezone();
  const second = current === 'Europe/Lisbon' ? 'America/Sao_Paulo' : 'Europe/Lisbon';
  
  return [current, second, 'Asia/Hong_Kong'];
}

/**
 * Save selected timezones to localStorage.
 */
export function saveTimezones(tzList) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(tzList));
}

const HEADER_HIDDEN_KEY = 'timezone-monitor-header-hidden';

/**
 * Load header hidden state from localStorage.
 */
export function loadHeaderHidden() {
  try {
    return localStorage.getItem(HEADER_HIDDEN_KEY) === 'true';
  } catch {
    return false;
  }
}

/**
 * Save header hidden state to localStorage.
 */
export function saveHeaderHidden(hidden) {
  localStorage.setItem(HEADER_HIDDEN_KEY, String(hidden));
}
