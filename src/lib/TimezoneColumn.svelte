<script>
  import { getTimeInZone, getDateInZone, getHourInZone, getUtcOffset, displayName } from './timezones.js';
  import { getSkyTheme } from './sky.js';

  let { tz, now, editMode = false, onremove } = $props();

  let hour = $derived(getHourInZone(tz, now));
  let sky = $derived(getSkyTheme(hour));
  let time = $derived(getTimeInZone(tz, now));
  let date = $derived(getDateInZone(tz, now));
  let offset = $derived(getUtcOffset(tz, now));
  let name = $derived(displayName(tz));
</script>

<div 
  class="relative flex flex-col items-center justify-between rounded-2xl p-5 sm:p-8 min-w-0 sm:min-w-[250px] flex-1 overflow-hidden shadow-lg bg-gradient-to-b {sky.gradient} transition-all duration-1000 {editMode ? 'cursor-grab ring-2 ring-white/50' : ''}"
>
  <!-- Stars overlay for night -->
  {#if sky.label === 'Night'}
    <div class="absolute inset-0 overflow-hidden pointer-events-none">
      <div class="absolute w-1 h-1 bg-white rounded-full opacity-60 top-[10%] left-[20%] animate-pulse"></div>
      <div class="absolute w-0.5 h-0.5 bg-white rounded-full opacity-40 top-[25%] left-[60%] animate-pulse" style="animation-delay: 0.5s"></div>
      <div class="absolute w-1 h-1 bg-white rounded-full opacity-50 top-[15%] left-[80%] animate-pulse" style="animation-delay: 1s"></div>
      <div class="absolute w-0.5 h-0.5 bg-white rounded-full opacity-30 top-[40%] left-[40%] animate-pulse" style="animation-delay: 1.5s"></div>
      <div class="absolute w-1 h-1 bg-white rounded-full opacity-40 top-[8%] left-[50%] animate-pulse" style="animation-delay: 0.8s"></div>
    </div>
  {/if}

  <!-- Remove button (only visible in edit mode) -->
  {#if editMode}
    <button
      onclick={onremove}
      class="absolute top-3 right-3 w-8 h-8 flex items-center justify-center rounded-full bg-red-500 hover:bg-red-600 text-white transition-colors cursor-pointer text-base shadow-lg"
      aria-label="Remove {name} timezone"
    >
      ✕
    </button>
    
    <!-- Drag handle indicator -->
    <div class="absolute top-3 left-3 w-8 h-8 flex items-center justify-center rounded-full bg-white/20 text-white/70">
      <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
        <path d="M8 6a2 2 0 1 1-4 0 2 2 0 0 1 4 0ZM8 12a2 2 0 1 1-4 0 2 2 0 0 1 4 0ZM8 18a2 2 0 1 1-4 0 2 2 0 0 1 4 0ZM14 6a2 2 0 1 1-4 0 2 2 0 0 1 4 0ZM14 12a2 2 0 1 1-4 0 2 2 0 0 1 4 0ZM14 18a2 2 0 1 1-4 0 2 2 0 0 1 4 0Z"/>
      </svg>
    </div>
  {/if}

  <!-- Sky icon -->
  <div class="text-4xl sm:text-6xl mb-2 sm:mb-3 drop-shadow-lg" role="img" aria-label={sky.label}>
    {sky.icon}
  </div>

  <!-- Time -->
  <div class="{sky.textColor} text-center">
    <div class="text-3xl sm:text-5xl font-mono font-bold tracking-tight drop-shadow-md">
      {time}
    </div>
    <div class="text-sm sm:text-base mt-1 sm:mt-2 opacity-80">
      {date}
    </div>
  </div>

  <!-- Location info -->
  <div class="{sky.textColor} text-center mt-3 sm:mt-5">
    <div class="text-lg sm:text-xl font-semibold drop-shadow-sm">
      {name}
    </div>
    <div class="text-xs sm:text-sm opacity-70 mt-1">
      {offset}
    </div>
    <div class="text-xs sm:text-sm opacity-50 mt-1 font-mono">
      {tz}
    </div>
  </div>
</div>
