<script>
  import SectionDrawing from './SectionDrawing.svelte';
  import { sectionShapes, sealDrawing } from '$lib/doorset/sealSection.js';

  /** @type {{ sealConfiguration: string }} */
  let { sealConfiguration } = $props();
  const shapes = $derived(sectionShapes(sealConfiguration));
</script>

<SectionDrawing {shapes} callouts={shapes} {...sealDrawing} />
