const htmlEntities = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' };
const htmlSpecialCharacters = /[&<>"']/g;
const emptyValue = '—';

/** @param {string} value */
function escapeHtml(value) {
  return value.replace(htmlSpecialCharacters, (character) => htmlEntities[/** @type {keyof typeof htmlEntities} */ (character)]);
}

/** @param {Record<string, string>} enquiry */
function enquiryRows(enquiry) {
  return [
    ['Name', enquiry.name],
    ['Email', enquiry.email],
    ['Phone', enquiry.phone || emptyValue],
    ['Building / site', enquiry.building || emptyValue],
    ['Service', enquiry.service || 'Not sure yet']
  ];
}

/** @param {Record<string, string>} enquiry */
export function enquiryLines(enquiry) {
  const rows = enquiryRows(enquiry).map(([label, value]) => `${label}: ${value}`);
  return [...rows, '', 'Message:', enquiry.message];
}

/** @param {Record<string, string>} enquiry */
export function enquiryHtml(enquiry) {
  const rows = enquiryRows(enquiry)
    .map(([label, value]) => `<tr><td style="padding:4px 12px 4px 0;color:#666;">${label}</td><td>${escapeHtml(value)}</td></tr>`)
    .join('');
  return `<h2 style="font-family:Arial,sans-serif;">New website enquiry</h2>
<table style="font-family:Arial,sans-serif;font-size:14px;">${rows}</table>
<p style="font-family:Arial,sans-serif;font-size:14px;white-space:pre-wrap;border-left:3px solid #D7282E;padding-left:12px;">${escapeHtml(enquiry.message)}</p>
<p style="font-family:Arial,sans-serif;font-size:12px;color:#999;">Sent from the jewelpfp.co.uk contact form. Reply to this email to answer ${escapeHtml(enquiry.name)} directly.</p>`;
}
