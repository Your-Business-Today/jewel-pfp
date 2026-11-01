<script>
  import { page } from '$app/state';
  import { errorText } from '$lib/errors/errorText.js';
  import PageHero from '$lib/components/page/PageHero.svelte';

  const text = $derived(errorText(page.status));
  const { site } = $derived(page.data);
  const { contact } = $derived(site);
</script>

<svelte:head>
  <title>{text.title} | Jewel Passive Fire Protection</title>
  <meta name="robots" content="noindex" />
</svelte:head>

<PageHero kicker={text.kicker} heading={text.heading} intro={text.intro} />

<section class="mx-auto max-w-7xl px-6 py-16 md:py-20">
  <div class="flex flex-wrap gap-4">
    <a href="/" class="bg-signal text-paper px-7 py-3.5 text-sm font-semibold hover:bg-signal/90 transition-colors">
      Go to the home page
    </a>
    <a href="/services" class="border border-hairline px-7 py-3.5 text-sm hover:border-gold hover:text-gold transition-colors">
      Our services
    </a>
    <a href="/contact" class="border border-hairline px-7 py-3.5 text-sm hover:border-gold hover:text-gold transition-colors">
      Contact the team
    </a>
  </div>
  <p class="mt-10 text-sm text-body leading-relaxed">
    Or call <a href="tel:{contact.phone.replaceAll(' ', '')}" class="text-gold hover:underline">{contact.phone}</a>
    or email <a href="mailto:{contact.email}" class="text-gold hover:underline">{contact.email}</a>.
  </p>
</section>
