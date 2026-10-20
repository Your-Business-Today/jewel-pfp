<script>
  import { sealChoices } from '$lib/doorset/seals.js';

  /** @type {{ sealConfiguration: string }} */
  let { sealConfiguration = $bindable() } = $props();
</script>

<fieldset class="space-y-2">
  <legend class="kicker text-gold">Seals in the frame</legend>
  {#each sealChoices as choice (choice.configuration)}
    <label class="flex items-center gap-3 text-sm">
      <input type="radio" name="seals" value={choice.configuration} bind:group={sealConfiguration} class="h-4 w-4 accent-signal" />
      {choice.title}
    </label>
  {/each}
  <p class="text-xs text-muted-dark">Each comes with a surface-mounted smoke seal on the stop.</p>
</fieldset>
