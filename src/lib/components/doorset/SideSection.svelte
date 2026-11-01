<script>
  import SectionDrawing from './SectionDrawing.svelte';
  import { sideCallouts, sideDrawing, sideShapes } from '$lib/doorset/sideSection.js';
</script>

<SectionDrawing shapes={sideShapes} callouts={sideCallouts} {...sideDrawing} />
