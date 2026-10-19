import { env } from '$env/dynamic/private';
import { enquiryLines, enquiryHtml } from './enquiryEmailBody.js';

const resendAddress = 'https://api.resend.com/emails';
const errorExcerptLength = 300;

/** @param {string | undefined} value */
function trimmed(value) {
  return (value ?? '').trim();
}

export function isEmailConfigured() {
  return Boolean(trimmed(env.RESEND_API_KEY) && trimmed(env.CONTACT_FROM_EMAIL) && trimmed(env.CONTACT_TO_EMAIL));
}

/** @param {Record<string, string>} enquiry */
export async function sendEnquiryEmail(enquiry) {
  const response = await fetch(resendAddress, {
    method: 'POST',
    headers: { Authorization: `Bearer ${trimmed(env.RESEND_API_KEY)}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      from: `Jewel PFP Website <${trimmed(env.CONTACT_FROM_EMAIL)}>`,
      to: [trimmed(env.CONTACT_TO_EMAIL)],
      reply_to: enquiry.email,
      subject: `New enquiry from ${enquiry.name}`,
      text: enquiryLines(enquiry).join('\n'),
      html: enquiryHtml(enquiry)
    })
  });
  if (response.ok) return;
  const body = await response.text().catch(() => '');
  throw new Error(`Resend refused the enquiry email (${response.status}): ${body.slice(0, errorExcerptLength)}`);
}
