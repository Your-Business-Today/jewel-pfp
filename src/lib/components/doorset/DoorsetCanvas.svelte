<script>
  import { onMount } from 'svelte';
  import GapLabels from './GapLabels.svelte';

  /** @type {{ chosen: string, explode: number, isShowingGaps: boolean, onchoose: (key: string) => void }} */
  let { chosen, explode, isShowingGaps, onchoose } = $props();

  /** @type {HTMLCanvasElement | undefined} */
  let canvas = $state();
  /** @type {any} */
  let doorset = $state();
  let hasFailed = $state(false);
  /** @type {{ key: string, label: string, x: number, y: number }[]} */
  let labels = $state([]);
  const clickTravel = 4;
  let pointer = { x: 0, y: 0, travel: 0, isDown: false };

  onMount(() => {
    let isGone = false;
    import('$lib/doorset/scene.js')
      .then(({ createDoorsetScene }) => {
        if (isGone || !canvas) return;
        doorset = createDoorsetScene(canvas, { onLabels: (/** @type {typeof labels} */ shown) => (labels = shown) });
      })
      .catch((error) => {
        console.error('The door set scene could not start', error);
        hasFailed = true;
      });
    const resize = () => doorset?.resize();
    window.addEventListener('resize', resize);
    return () => {
      isGone = true;
      window.removeEventListener('resize', resize);
      doorset?.destroy();
    };
  });

  $effect(() => doorset?.choose(chosen));
  $effect(() => doorset?.setExplode(explode));
  $effect(() => doorset?.setGapsShown(isShowingGaps));

  /** @param {PointerEvent} event */
  function press(event) {
    pointer = { x: event.clientX, y: event.clientY, travel: 0, isDown: true };
  }

  /** @param {PointerEvent} event */
  function move(event) {
    if (!pointer.isDown) return;
    const across = event.clientX - pointer.x;
    const down = event.clientY - pointer.y;
    pointer = { ...pointer, x: event.clientX, y: event.clientY, travel: pointer.travel + Math.abs(across) + Math.abs(down) };
    doorset?.drag(across, down);
  }

  /** @param {PointerEvent} event */
  function release(event) {
    const isClick = pointer.travel < clickTravel;
    pointer = { ...pointer, isDown: false };
    if (!isClick || !doorset) return;
    const partKey = doorset.partAt(event.clientX, event.clientY);
    onchoose(partKey);
  }
</script>

<div class="relative h-full w-full overflow-hidden">
  {#if hasFailed}
    <p class="p-8 text-sm text-muted-dark">This browser cannot show the 3D door set. The parts and what to look for are listed alongside.</p>
  {:else}
    <canvas
      bind:this={canvas}
      class="h-full w-full touch-none cursor-grab"
      aria-label="3D door set. Drag to turn it, select a part to read about it."
      onpointerdown={press}
      onpointermove={move}
      onpointerup={release}
      onpointerleave={() => (pointer = { ...pointer, isDown: false })}
    ></canvas>
    {#if isShowingGaps}
      <GapLabels {labels} />
    {/if}
  {/if}
</div>
