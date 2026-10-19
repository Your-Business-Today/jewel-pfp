import { services } from '$lib/services.js';
import { serviceFields } from '$lib/content/listFields.js';
import { textLimits } from '$lib/content/limits.js';
import { rowFromForm } from '$lib/server/validation/listRows.js';

const notLettersOrDigits = /[^a-z0-9]+/g;
const edgeHyphens = /^-+|-+$/g;

/** @param {string} title */
export function slugFor(title) {
  return title.toLowerCase().replace(notLettersOrDigits, '-').replace(edgeHyphens, '');
}

/** @param {string} pointsText */
function pointsFrom(pointsText) {
  return pointsText.split('\n').map((point) => point.trim()).filter(Boolean);
}

/** @param {FormData} form */
export function serviceFromForm(form) {
  const { row, problem } = rowFromForm(form, serviceFields);
  const points = pointsFrom(row.points);
  const isPointTooLong = points.some((point) => point.length > textLimits.line);
  const pointProblem = isPointTooLong ? `Each point must be ${textLimits.line} characters or fewer.` : '';
  return { row: { ...row, points }, problem: problem || pointProblem };
}

export function builtInServiceRows() {
  return services.map((service) => ({
    slug: service.slug,
    title: service.title,
    summary: service.summary,
    detail: service.detail,
    points: service.points,
    cta_label: service.cta?.label ?? '',
    cta_href: service.cta?.href ?? ''
  }));
}

/**
 * @param {string} title
 * @param {string[]} takenSlugs
 */
export function uniqueSlugFor(title, takenSlugs) {
  const base = slugFor(title) || 'service';
  let slug = base;
  for (let copy = 2; takenSlugs.includes(slug); copy++) slug = `${base}-${copy}`;
  return slug;
}
