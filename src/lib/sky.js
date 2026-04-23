/**
 * Returns a CSS gradient and emoji representing the sky at a given hour (0-23).
 * Simulates sun/moon position throughout the day.
 */
export function getSkyTheme(hour) {
  // Night: 0-4
  if (hour >= 0 && hour < 5) {
    return {
      gradient: 'from-slate-900 via-indigo-950 to-slate-900',
      icon: '🌙',
      label: 'Night',
      textColor: 'text-slate-300',
    };
  }
  // Dawn: 5-6
  if (hour >= 5 && hour < 7) {
    return {
      gradient: 'from-indigo-900 via-orange-400 to-yellow-200',
      icon: '🌅',
      label: 'Dawn',
      textColor: 'text-slate-100',
    };
  }
  // Morning: 7-11
  if (hour >= 7 && hour < 12) {
    return {
      gradient: 'from-sky-400 via-blue-300 to-cyan-200',
      icon: '☀️',
      label: 'Morning',
      textColor: 'text-slate-800',
    };
  }
  // Afternoon: 12-16
  if (hour >= 12 && hour < 17) {
    return {
      gradient: 'from-blue-500 via-sky-400 to-cyan-300',
      icon: '☀️',
      label: 'Afternoon',
      textColor: 'text-slate-800',
    };
  }
  // Dusk: 17-19
  if (hour >= 17 && hour < 20) {
    return {
      gradient: 'from-orange-500 via-rose-400 to-purple-600',
      icon: '🌇',
      label: 'Dusk',
      textColor: 'text-slate-100',
    };
  }
  // Night: 20-23
  return {
    gradient: 'from-slate-900 via-indigo-950 to-slate-900',
    icon: '🌙',
    label: 'Night',
    textColor: 'text-slate-300',
  };
}
