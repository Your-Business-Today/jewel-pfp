<script>
  import { anatomy } from '$lib/doorset/anatomy.js';
  import { numbered } from '$lib/content/lists.js';
</script>

<section class="bg-ink text-paper border-t border-hairline" aria-labelledby="anatomy-heading">
  <div class="mx-auto max-w-4xl px-6 py-16">
    <p class="kicker text-gold">In plain English</p>
    <h2 id="anatomy-heading" class="mt-3 text-3xl md:text-4xl font-extrabold tracking-tight">{anatomy.title}</h2>
    <p class="mt-6 text-lg leading-relaxed text-body">{anatomy.introduction}</p>
    <p class="mt-4 text-sm text-note">{anatomy.guidance}</p>
    <ol class="mt-12 space-y-10">
      {#each anatomy.sections as section, position (section.title)}
        <li>
          <h3 class="text-xl font-extrabold tracking-tight"><span class="text-gold">{numbered(position)}</span> {section.title}</h3>
          <p class="mt-3 leading-relaxed text-body">{section.body}</p>
        </li>
      {/each}
    </ol>
    <p class="mt-14 text-lg leading-relaxed text-body">{anatomy.closing}</p>
    <div class="mt-8 flex flex-wrap gap-4">
      <a href="/contact" class="bg-signal text-paper px-7 py-3.5 text-sm font-semibold hover:bg-signal/90 transition-colors">Get in touch</a>
      <a href="/book" class="border border-white/25 px-7 py-3.5 text-sm font-semibold hover:border-gold hover:text-gold transition-colors">Book a flat door survey</a>
    </div>
  </div>
</section>
