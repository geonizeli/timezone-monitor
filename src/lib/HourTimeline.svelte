<script>
  import { getSkyTheme } from './sky.js';

  let { currentHour } = $props();

  const hours = Array.from({ length: 24 }, (_, i) => i);

  function formatHour(h) {
    return String(h).padStart(2, '0');
  }
</script>

<div class="mt-4 w-full">
  <div class="text-[10px] opacity-50 mb-1 text-center">24h overview</div>
  <div class="flex gap-px rounded-lg overflow-hidden">
    {#each hours as h}
      {@const sky = getSkyTheme(h)}
      {@const isCurrent = h === currentHour}
      <div
        class="flex-1 h-6 bg-gradient-to-b {sky.gradient} flex items-center justify-center relative transition-all duration-500"
        class:ring-2={isCurrent}
        class:ring-white={isCurrent}
        class:scale-y-125={isCurrent}
        class:z-10={isCurrent}
        title="{formatHour(h)}:00"
      >
        {#if h % 6 === 0}
          <span class="text-[8px] font-mono {sky.textColor} opacity-70">{formatHour(h)}</span>
        {/if}
      </div>
    {/each}
  </div>
</div>
