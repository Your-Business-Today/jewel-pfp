import { redirect } from '@sveltejs/kit';
import { endSession } from '$lib/server/admin/session.js';

const seeOther = 303;

/** @type {import('./$types').RequestHandler} */
export function POST({ cookies }) {
  endSession(cookies);
  redirect(seeOther, '/admin/login');
}
