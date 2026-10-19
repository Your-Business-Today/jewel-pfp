/**
 * @param {string} address
 * @param {Record<string, string>} values
 */
export function mailtoEnquiry(address, values) {
  const service = values.service || 'Not sure yet';
  const subject = encodeURIComponent(['Enquiry', values.service, values.building].filter(Boolean).join(' — '));
  const lines = [
    `Name: ${values.name}`,
    `Email: ${values.email}`,
    `Phone: ${values.phone}`,
    `Building / site: ${values.building}`,
    `Service: ${service}`,
    '',
    values.message
  ];
  return `mailto:${address}?subject=${subject}&body=${encodeURIComponent(lines.join('\n'))}`;
}
