<script>
  /** @type {{ captions: any[], active: number }} */
  let { captions, active } = $props();
</script>

{#each captions as cap, i}
  {#if cap}
    <div
      class="absolute inset-x-0 bottom-0 md:inset-y-0 md:left-0 md:right-auto md:flex md:items-center pointer-events-none transition-all duration-500
             {active === i ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}"
    >
      <div
        class="pointer-events-auto m-4 md:m-0 md:ml-[6vw] max-w-md border border-white/10 bg-ink/85 backdrop-blur-sm p-7 md:p-9"
      >
        <p class="kicker text-gold mb-4">{cap.label}</p>
        <h2 class="text-2xl md:text-3xl font-extrabold tracking-tight">{cap.title}</h2>
        <p class="mt-4 text-sm md:text-base text-muted-dark leading-relaxed">{cap.body}</p>
        {#if cap.hasCallToAction}
          <div class="mt-6 flex flex-wrap gap-3">
            <a
              href="/contact"
              class="bg-signal text-paper px-6 py-3 text-sm font-semibold hover:bg-signal/90 transition-colors"
            >
              Book a survey
            </a>
            <a
              href="/services"
              class="border border-white/25 px-6 py-3 text-sm font-semibold hover:border-signal hover:text-signal transition-colors"
            >
              Our services
            </a>
          </div>
        {/if}
      </div>
    </div>
  {/if}
{/each}
