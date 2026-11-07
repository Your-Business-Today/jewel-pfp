<script>
  import { pageText } from '$lib/content/pageText.js';
  import { stepsFrom } from '$lib/content/homeSections.js';
  import HomeDoorset from '$lib/components/home/HomeDoorset.svelte';
  import StatStrip from '$lib/components/home/StatStrip.svelte';
  import ServicesGrid from '$lib/components/home/ServicesGrid.svelte';
  import ProcessSteps from '$lib/components/home/ProcessSteps.svelte';
  import AccreditationList from '$lib/components/home/AccreditationList.svelte';
  import CallToAction from '$lib/components/home/CallToAction.svelte';

  let { data } = $props();
  const { services, accreditations, contact, text: savedText } = $derived(data.site);
  const text = $derived(pageText(savedText, 'home'));

  const steps = $derived(stepsFrom(text));
</script>

<svelte:head>
  <title>{text.seoTitle}</title>
  <meta name="description" content={text.seoDescription} />
</svelte:head>

<HomeDoorset {text} />

<StatStrip serviceCount={services.length} />
<ServicesGrid {text} {services} />
<ProcessSteps {text} {steps} />
<AccreditationList {text} {accreditations} />
<CallToAction {text} phone={contact.phone} />
