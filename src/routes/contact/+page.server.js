import { fail } from '@sveltejs/kit';
import { enquiryFields } from '$lib/enquiries/enquiryFields.js';
import { submitEnquiry } from '$lib/server/enquiries/submitEnquiry.js';
import { emailProblem, formText, validateFormText } from '$lib/server/validation/formText.js';

const badRequest = 400;
const serviceUnavailable = 503;
const badGateway = 502;
const honeypotField = 'website';

export const actions = {
  default: async ({ request }) => {
    const form = await request.formData();
    const isFromABot = Boolean(formText(form, honeypotField));
    if (isFromABot) return { isSent: true };
    const { values, problem } = validateFormText(form, enquiryFields);
    const fieldProblem = problem || emailProblem(values.email);
    if (fieldProblem) return fail(badRequest, { values, problem: fieldProblem });
    const { isReceivable, wasReceived } = await submitEnquiry(values);
    if (!isReceivable) return fail(serviceUnavailable, { values, isUnconfigured: true });
    if (!wasReceived) return fail(badGateway, { values, problem: 'Your enquiry could not be sent just now. Please email us instead.' });
    return { isSent: true };
  }
};
