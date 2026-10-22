<script>
  /** @type {{ stageCount: number, active: number }} */
  let { stageCount, active } = $props();
</script>

<div class="absolute right-5 md:right-8 top-1/2 -translate-y-1/2 hidden sm:flex flex-col gap-3 items-center">
  {#each Array(stageCount) as _, i}
    <span
      class="text-[10px] transition-colors duration-300 {active === i
        ? 'text-gold'
        : 'text-note/50'}"
    >
      {String(i).padStart(2, '0')}
    </span>
    {#if i < stageCount - 1}
      <span class="w-px h-6 {active > i ? 'bg-gold' : 'bg-white/15'} transition-colors duration-300"></span>
    {/if}
  {/each}
</div>
