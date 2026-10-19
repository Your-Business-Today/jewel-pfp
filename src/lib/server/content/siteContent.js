import { accreditations, services } from '$lib/services.js';
import { accreditationsFromRows, servicesFromRows } from '$lib/content/lists.js';
import { pageText } from '$lib/content/pageText.js';
import { companyFrom, contactFrom } from '$lib/content/siteDetails.js';
import { isDatabaseConfigured } from '$lib/server/database/connection.js';
import { selectRows } from '$lib/server/database/rows.js';
import { readTextOverrides } from './textOverrides.js';

/** @param {string} table */
async function readListOrNothing(table) {
  if (!isDatabaseConfigured()) return [];
  try {
    return await selectRows(table, 'select=*&order=sort_order.asc');
  } catch (error) {
    console.error(`Website content: could not read ${table}`, error);
    return [];
  }
}

/**
 * @template {{ visible: boolean }} Row
 * @param {Row[]} rows
 */
function shownRows(rows) {
  return rows.filter((row) => row.visible);
}

export async function loadSiteContent() {
  const [text, serviceRows, accreditationRows] = await Promise.all([
    readTextOverrides(),
    readListOrNothing('services'),
    readListOrNothing('accreditations')
  ]);
  const details = pageText(text, 'details');
  const hasSavedServices = serviceRows.length > 0;
  const hasSavedAccreditations = accreditationRows.length > 0;
  return {
    text,
    services: hasSavedServices ? servicesFromRows(shownRows(serviceRows)) : services,
    accreditations: hasSavedAccreditations ? accreditationsFromRows(shownRows(accreditationRows)) : accreditations,
    contact: contactFrom(details),
    company: companyFrom(details)
  };
}
