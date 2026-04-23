<script>
  import { onMount } from 'svelte';
  import TimezoneColumn from './lib/TimezoneColumn.svelte';
  import TimezonePicker from './lib/TimezonePicker.svelte';
  import { loadTimezones, saveTimezones } from './lib/storage.js';

  let selectedZones = $state([]);
  let showPicker = $state(false);
  let now = $state(new Date());

  onMount(() => {
    selectedZones = loadTimezones();

    // Update the clock every second
    const interval = setInterval(() => {
      now = new Date();
    }, 1000);

    return () => clearInterval(interval);
  });

  function addTimezone(tz) {
    if (!selectedZones.includes(tz)) {
      selectedZones = [...selectedZones, tz];
      saveTimezones(selectedZones);
    }
    showPicker = false;
  }

  function removeTimezone(tz) {
    selectedZones = selectedZones.filter((z) => z !== tz);
    saveTimezones(selectedZones);
  }
</script>

<div class="min-h-screen bg-slate-100 dark:bg-slate-950 transition-colors">
  <!-- Header -->
  <header class="py-8 px-6 text-center">
    <h1 class="text-4xl font-bold text-slate-800 dark:text-slate-100 tracking-tight">
      🌍 Timezone Monitor
    </h1>
    <p class="text-slate-500 dark:text-slate-400 mt-2 text-base">
      Track time across the world at a glance
    </p>
  </header>

  <!-- Timezone columns -->
  <main class="px-6 pb-10">
    <div class="flex flex-wrap gap-5 justify-center max-w-7xl mx-auto">
      {#each selectedZones as tz (tz)}
        <div class="w-full sm:w-[calc(50%-0.625rem)] lg:w-[calc(25%-0.9375rem)] min-w-[250px]">
          <TimezoneColumn {tz} {now} onremove={() => removeTimezone(tz)} />
        </div>
      {/each}

      <!-- Add button -->
      <button
        onclick={() => (showPicker = true)}
        class="w-full sm:w-[calc(50%-0.625rem)] lg:w-[calc(25%-0.9375rem)] min-w-[250px] min-h-[350px] rounded-2xl border-2 border-dashed border-slate-300 dark:border-slate-700 flex flex-col items-center justify-center gap-3 text-slate-400 dark:text-slate-600 hover:border-sky-400 hover:text-sky-500 dark:hover:border-sky-500 dark:hover:text-sky-400 transition-colors cursor-pointer bg-transparent"
        aria-label="Add a new timezone"
      >
        <span class="text-5xl">+</span>
        <span class="text-base font-medium">Add Timezone</span>
      </button>
    </div>
  </main>

  <!-- Timezone picker modal -->
  {#if showPicker}
    <TimezonePicker
      selected={selectedZones}
      onadd={addTimezone}
      onclose={() => (showPicker = false)}
    />
  {/if}
</div>
