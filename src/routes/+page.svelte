<script>
  import { pageText } from '$lib/content/pageText.js';
  import { captionsFrom, stepsFrom } from '$lib/content/homeSections.js';
  import ScrollDoorScene from '$lib/components/home/ScrollDoorScene.svelte';
  import StatStrip from '$lib/components/home/StatStrip.svelte';
  import ServicesGrid from '$lib/components/home/ServicesGrid.svelte';
  import ProcessSteps from '$lib/components/home/ProcessSteps.svelte';
  import AccreditationList from '$lib/components/home/AccreditationList.svelte';
  import CallToAction from '$lib/components/home/CallToAction.svelte';

  let { data } = $props();
  const { services, accreditations, contact, text: savedText } = $derived(data.site);
  const text = $derived(pageText(savedText, 'home'));

  const captions = $derived(captionsFrom(text));
  const steps = $derived(stepsFrom(text));
</script>

<svelte:head>
  <title>{text.seoTitle}</title>
  <meta name="description" content={text.seoDescription} />
</svelte:head>

<ScrollDoorScene {text} {captions} />

<StatStrip serviceCount={services.length} />
<ServicesGrid {text} {services} />
<ProcessSteps {text} {steps} />
<AccreditationList {text} {accreditations} />
<CallToAction {text} phone={contact.phone} />
