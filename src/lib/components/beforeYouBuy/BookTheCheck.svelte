<script>
  import { survey } from '$lib/booking/survey.js';
</script>

<section class="bg-ink text-paper grid-bg">
  <div class="mx-auto max-w-7xl px-6 py-16 md:py-20 flex flex-col md:flex-row md:items-center justify-between gap-8">
    <div>
      <h2 class="text-3xl md:text-4xl font-extrabold tracking-tight">Book the check.</h2>
      <p class="mt-3 max-w-md text-body leading-relaxed">
        {survey.price}, paid online. Read the full survey details and terms on the booking page.
      </p>
    </div>
    <a
      href="/book"
      class="self-start md:self-auto bg-signal text-paper px-7 py-3.5 text-sm font-semibold hover:bg-signal/90 transition-colors"
    >
      Book a {survey.price} survey →
    </a>
  </div>
</section>
