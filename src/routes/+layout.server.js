import { loadSiteContent } from '$lib/server/content/siteContent.js';

export async function load() {
  return { site: await loadSiteContent() };
}
