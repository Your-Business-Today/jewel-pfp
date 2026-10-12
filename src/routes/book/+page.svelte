<script>
  import BookHero from '$lib/components/book/BookHero.svelte';
  import SurveyServices from '$lib/components/book/SurveyServices.svelte';
  import Approvals from '$lib/components/book/Approvals.svelte';
  import HowItWorks from '$lib/components/book/HowItWorks.svelte';
  import ReplacementFactors from '$lib/components/book/ReplacementFactors.svelte';
  import FaqSection from '$lib/components/book/FaqSection.svelte';
  import BookingPanel from '$lib/components/book/BookingPanel.svelte';
</script>

<svelte:head>
  <title>Book a Fire Door Survey | Jewel Passive Fire Protection</title>
  <meta
    name="description"
    content="Apartment door remedial works: a £99 + VAT site survey that validates your existing fire door report and gives you a bespoke written quotation, with the £99 deducted if you proceed."
  />
</svelte:head>

<BookHero />
<SurveyServices />
<Approvals />
<HowItWorks />
<ReplacementFactors />
<FaqSection />
<BookingPanel />
