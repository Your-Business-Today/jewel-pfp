import { fail } from '@sveltejs/kit';
import { areCredentialsConfigured, areCredentialsCorrect } from '$lib/server/admin/credentials.js';
import { minutesLockedOut, recordLoginAttempt } from '$lib/server/admin/loginAttempts.js';
import { clientAddress } from '$lib/server/admin/requestAddress.js';
import { createSessionToken, startSession } from '$lib/server/admin/session.js';
import { formText } from '$lib/server/validation/formText.js';

const tooManyRequests = 429;
const unauthorised = 401;
const wrongPasswordPause = 1000;

export function load() {
  return { isConfigured: areCredentialsConfigured() };
}

/** @param {number} milliseconds */
function pause(milliseconds) {
  return new Promise((resolve) => setTimeout(resolve, milliseconds));
}

export const actions = {
  default: async ({ request, cookies, getClientAddress }) => {
    const form = await request.formData();
    const username = formText(form, 'username');
    const password = String(form.get('password') ?? '');
    const ip = clientAddress(getClientAddress);
    const minutesLeft = await minutesLockedOut(ip);
    if (minutesLeft > 0) return fail(tooManyRequests, { problem: `Too many failed attempts. Try again in ${minutesLeft} minutes.` });
    const isCorrect = await areCredentialsCorrect(username, password);
    await recordLoginAttempt(ip, username, isCorrect);
    if (!isCorrect) {
      console.warn(`Admin login failed for ${ip}`);
      await pause(wrongPasswordPause);
      return fail(unauthorised, { problem: 'Incorrect username or password.' });
    }
    startSession(cookies, await createSessionToken());
    return { isSignedIn: true };
  }
};
