<script>
  import { beforeYouBuyPath, hero } from '$lib/beforeYouBuy/content.js';
</script>

<section class="border-b border-hairline bg-ink-2">
  <div class="mx-auto max-w-7xl px-6 py-6 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
    <p class="text-sm text-body">
      <span class="kicker text-gold mr-3">{hero.kicker}</span>
      Buying a flat? Have its fire door checked first.
    </p>
    <a href={beforeYouBuyPath} class="text-sm text-gold hover:underline">The Pre-Purchase Fire Door Check →</a>
  </div>
</section>
