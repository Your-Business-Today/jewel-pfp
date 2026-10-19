const numberWidth = 2;

/** @param {number} position */
export function numbered(position) {
  return String(position + 1).padStart(numberWidth, '0');
}

/**
 * @typedef {{ id: string, slug: string, title: string, summary: string, detail: string, points: string[], cta_label: string, cta_href: string, visible: boolean, sort_order: number }} ServiceRow
 * @typedef {{ id: string, name: string, role: string, href: string, visible: boolean, sort_order: number }} AccreditationRow
 */

/** @param {ServiceRow} row */
function callToAction(row) {
  if (!row.cta_label || !row.cta_href) return undefined;
  return { label: row.cta_label, href: row.cta_href };
}

/** @param {ServiceRow[]} rows */
export function servicesFromRows(rows) {
  return rows.map((row, position) => ({
    slug: row.slug,
    index: numbered(position),
    title: row.title,
    summary: row.summary,
    detail: row.detail,
    points: row.points ?? [],
    cta: callToAction(row)
  }));
}

/** @param {AccreditationRow[]} rows */
export function accreditationsFromRows(rows) {
  return rows.map((row) => ({ name: row.name, role: row.role, href: row.href }));
}
