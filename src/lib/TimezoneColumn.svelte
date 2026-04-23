<script>
  import { getTimeInZone, getDateInZone, getHourInZone, getUtcOffset, displayName } from './timezones.js';
  import { getSkyTheme } from './sky.js';
  import HourTimeline from './HourTimeline.svelte';

  let { tz, now, onremove } = $props();

  let hour = $derived(getHourInZone(tz, now));
  let sky = $derived(getSkyTheme(hour));
  let time = $derived(getTimeInZone(tz, now));
  let date = $derived(getDateInZone(tz, now));
  let offset = $derived(getUtcOffset(tz, now));
  let name = $derived(displayName(tz));
</script>

<div class="relative flex flex-col items-center justify-between rounded-2xl p-6 min-w-[200px] flex-1 overflow-hidden shadow-lg bg-gradient-to-b {sky.gradient} transition-all duration-1000">
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

  <!-- Remove button -->
  <button
    onclick={onremove}
    class="absolute top-2 right-2 w-7 h-7 flex items-center justify-center rounded-full bg-black/20 hover:bg-black/40 text-white/70 hover:text-white transition-colors cursor-pointer text-sm"
    aria-label="Remove {name} timezone"
  >
    ✕
  </button>

  <!-- Sky icon -->
  <div class="text-5xl mb-2 drop-shadow-lg" role="img" aria-label={sky.label}>
    {sky.icon}
  </div>

  <!-- Time -->
  <div class="{sky.textColor} text-center">
    <div class="text-4xl font-mono font-bold tracking-tight drop-shadow-md">
      {time}
    </div>
    <div class="text-sm mt-1 opacity-80">
      {date}
    </div>
  </div>

  <!-- Location info -->
  <div class="{sky.textColor} text-center mt-4">
    <div class="text-lg font-semibold drop-shadow-sm">
      {name}
    </div>
    <div class="text-xs opacity-70 mt-0.5">
      {offset}
    </div>
    <div class="text-xs opacity-50 mt-0.5 font-mono">
      {tz}
    </div>
  </div>

  <!-- 24h timeline -->
  <HourTimeline currentHour={hour} />
</div>
