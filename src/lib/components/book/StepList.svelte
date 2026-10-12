<script>
  /** @type {{ steps: { title: string, body?: string }[], isOnDark?: boolean }} */
  let { steps, isOnDark = false } = $props();
</script>

<ol class="space-y-5">
  {#each steps as step, i}
    <li class="flex gap-4">
      <span
        class="shrink-0 w-7 h-7 flex items-center justify-center font-label text-xs bg-signal text-paper"
      >
        {i + 1}
      </span>
      <div>
        <p class="text-sm font-semibold leading-snug">{step.title}</p>
        {#if step.body}
          <p class="mt-1 text-sm leading-relaxed {isOnDark ? 'text-muted-dark' : 'text-muted-light'}">
            {step.body}
          </p>
        {/if}
      </div>
    </li>
  {/each}
</ol>
