<script>
  import { TIMEZONE_LIST, groupTimezones, displayName } from './timezones.js';

  let { selected = [], onadd, onclose } = $props();

  let search = $state('');
  let grouped = $derived.by(() => {
    const filtered = TIMEZONE_LIST.filter(
      (tz) =>
        !selected.includes(tz) &&
        tz.toLowerCase().includes(search.toLowerCase())
    );
    return groupTimezones(filtered);
  });

  function handleAdd(tz) {
    onadd(tz);
  }

  function handleKeydown(e) {
    if (e.key === 'Escape') onclose();
  }
</script>

<!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
<div
  class="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
  role="dialog"
  aria-modal="true"
  aria-label="Select a timezone"
  tabindex="-1"
  onkeydown={handleKeydown}
>
  <div class="bg-white dark:bg-slate-800 rounded-2xl shadow-2xl w-full max-w-xl max-h-[80vh] flex flex-col overflow-hidden">
    <!-- Header -->
    <div class="flex items-center justify-between p-5 border-b border-slate-200 dark:border-slate-700">
      <h2 class="text-xl font-semibold text-slate-800 dark:text-slate-100">Add Timezone</h2>
      <button
        onclick={onclose}
        class="w-10 h-10 flex items-center justify-center rounded-full hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-500 dark:text-slate-400 transition-colors cursor-pointer text-lg"
        aria-label="Close timezone picker"
      >
        ✕
      </button>
    </div>

    <!-- Search -->
    <div class="p-5 border-b border-slate-200 dark:border-slate-700">
      <input
        type="text"
        placeholder="Search timezones..."
        bind:value={search}
        class="w-full px-5 py-3 rounded-lg border border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-700 text-slate-800 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent text-base"
      />
    </div>

    <!-- Timezone list -->
    <div class="overflow-y-auto flex-1 p-3">
      {#each Object.entries(grouped) as [region, tzList]}
        <div class="mb-3">
          <div class="px-4 py-2 text-sm font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
            {region}
          </div>
          {#each tzList as tz}
            <button
              onclick={() => handleAdd(tz)}
              class="w-full text-left px-4 py-3 rounded-lg hover:bg-sky-50 dark:hover:bg-sky-900/30 text-slate-700 dark:text-slate-200 transition-colors cursor-pointer flex items-center justify-between group"
            >
              <span>
                <span class="font-medium text-base">{displayName(tz)}</span>
                <span class="text-sm text-slate-400 dark:text-slate-500 ml-2">{tz}</span>
              </span>
              <span class="text-sky-500 opacity-0 group-hover:opacity-100 transition-opacity text-base">
                + Add
              </span>
            </button>
          {/each}
        </div>
      {/each}

      {#if Object.keys(grouped).length === 0}
        <div class="text-center py-10 text-slate-400 text-base">
          No timezones found matching "{search}"
        </div>
      {/if}
    </div>
  </div>
</div>
