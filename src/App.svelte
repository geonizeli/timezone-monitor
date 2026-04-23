<script>
  import { onMount } from 'svelte';
  import TimezoneColumn from './lib/TimezoneColumn.svelte';
  import TimezonePicker from './lib/TimezonePicker.svelte';
  import { loadTimezones, saveTimezones, loadHeaderHidden, saveHeaderHidden } from './lib/storage.js';

  let selectedZones = $state([]);
  let showPicker = $state(false);
  let editMode = $state(false);
  let headerHidden = $state(false);
  let now = $state(new Date());
  let draggedIndex = $state(null);
  let dragOverIndex = $state(null);

  onMount(() => {
    selectedZones = loadTimezones();
    headerHidden = loadHeaderHidden();

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

  function handleDragStart(index) {
    draggedIndex = index;
  }

  function handleDragOver(e, index) {
    e.preventDefault();
    dragOverIndex = index;
  }

  function handleDrop(index) {
    if (draggedIndex !== null && draggedIndex !== index) {
      const newZones = [...selectedZones];
      const [removed] = newZones.splice(draggedIndex, 1);
      newZones.splice(index, 0, removed);
      selectedZones = newZones;
      saveTimezones(selectedZones);
    }
    draggedIndex = null;
    dragOverIndex = null;
  }

  function handleDragEnd() {
    draggedIndex = null;
    dragOverIndex = null;
  }
</script>

<div class="min-h-screen bg-slate-100 dark:bg-slate-950 transition-colors flex flex-col">
  <!-- Header -->
  <header class="px-4 md:px-6 text-center relative transition-all duration-300 overflow-hidden {headerHidden ? 'py-0 max-h-0' : 'py-4 md:py-8 max-h-60'}">
    <h1 class="text-2xl md:text-4xl font-bold text-slate-800 dark:text-slate-100 tracking-tight text-left lg:text-center">
      🌍 Timezone Monitor
    </h1>
    <p class="text-slate-500 dark:text-slate-400 mt-1 md:mt-2 text-sm md:text-base text-left lg:text-center">
      Track time across the world at a glance
    </p>
    
    <!-- Edit and Add buttons -->
    <div class="mt-3 md:mt-0 md:absolute md:right-6 md:top-1/2 md:-translate-y-1/2 flex gap-2 justify-center">
      {#if selectedZones.length > 0}
        <button
          onclick={() => (editMode = !editMode)}
          class="px-3 md:px-4 py-2 rounded-lg font-medium text-sm md:text-base transition-colors {editMode ? 'bg-sky-500 text-white' : 'bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-300 dark:hover:bg-slate-700'}"
        >
          {editMode ? 'Done' : 'Edit'}
        </button>
      {/if}
      <button
        onclick={() => (showPicker = true)}
        class="px-3 md:px-4 py-2 rounded-lg font-medium text-sm md:text-base bg-sky-500 hover:bg-sky-600 text-white transition-colors"
        aria-label="Add a new timezone"
      >
        + Add
      </button>
      <button
        onclick={() => { headerHidden = true; saveHeaderHidden(true); }}
        class="px-2 md:px-3 py-2 rounded-lg font-medium bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-300 dark:hover:bg-slate-700 transition-colors"
        aria-label="Hide header"
      >
        ▲
      </button>
    </div>
  </header>

  <!-- Show header button (visible when header is hidden) -->
  {#if headerHidden}
    <div class="flex justify-center py-2">
      <button
        onclick={() => { headerHidden = false; saveHeaderHidden(false); }}
        class="px-4 py-1 rounded-full bg-slate-200 dark:bg-slate-800 text-slate-500 dark:text-slate-400 hover:bg-slate-300 dark:hover:bg-slate-700 transition-colors text-sm"
        aria-label="Show header"
      >
        ▼ Show header
      </button>
    </div>
  {/if}

  <!-- Timezone columns -->
  <main class="px-3 sm:px-6 pb-6 sm:pb-10 flex-1 flex items-center justify-center">
    <div class="flex flex-wrap gap-3 sm:gap-5 justify-center max-w-7xl w-full">
      {#each selectedZones as tz, index (tz)}
        <div
          class="w-full sm:w-[calc(50%-0.625rem)] lg:w-[calc(25%-0.9375rem)] min-w-0 sm:min-w-[250px] transition-all duration-200"
          class:opacity-50={draggedIndex === index}
          class:scale-105={dragOverIndex === index && draggedIndex !== index}
          role={editMode ? "listitem" : undefined}
          draggable={editMode}
          ondragstart={() => handleDragStart(index)}
          ondragover={(e) => handleDragOver(e, index)}
          ondrop={() => handleDrop(index)}
          ondragend={handleDragEnd}
        >
          <TimezoneColumn {tz} {now} {editMode} onremove={() => removeTimezone(tz)} />
        </div>
      {/each}
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
