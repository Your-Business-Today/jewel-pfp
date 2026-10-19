import { isDatabaseConfigured } from '$lib/server/database/connection.js';
import { selectRows } from '$lib/server/database/rows.js';
import { deleteRowsWhere, insertRows } from '$lib/server/database/rowWrites.js';

const attemptsTable = 'admin_login_attempts';
const millisecondsPerMinute = 60_000;
const millisecondsPerDay = 86_400_000;
const retentionDays = 30;
const columnLength = 100;

export const maximumFailures = 5;
export const lockoutMinutes = 15;

/** @param {number} millisecondsAgo */
function isoTimeAgo(millisecondsAgo) {
  return encodeURIComponent(new Date(Date.now() - millisecondsAgo).toISOString());
}

/** @param {string} ip */
async function recentFailures(ip) {
  const since = isoTimeAgo(lockoutMinutes * millisecondsPerMinute);
  const query = `select=attempted_at&ip=eq.${encodeURIComponent(ip)}&success=eq.false&attempted_at=gte.${since}&order=attempted_at.asc`;
  return /** @type {{ attempted_at: string }[]} */ (await selectRows(attemptsTable, query));
}

/** @param {string} ip */
export async function minutesLockedOut(ip) {
  if (!isDatabaseConfigured()) return 0;
  try {
    const failures = await recentFailures(ip);
    if (failures.length < maximumFailures) return 0;
    const oldestCounted = failures[failures.length - maximumFailures];
    const unlocksAt = new Date(oldestCounted.attempted_at).getTime() + lockoutMinutes * millisecondsPerMinute;
    return Math.max(1, Math.ceil((unlocksAt - Date.now()) / millisecondsPerMinute));
  } catch (error) {
    console.error('Admin login rate limiting could not read attempts', error);
    return 0;
  }
}

/**
 * @param {string} ip
 * @param {string} username
 * @param {boolean} isSuccess
 */
export async function recordLoginAttempt(ip, username, isSuccess) {
  if (!isDatabaseConfigured()) return;
  try {
    await insertRows(attemptsTable, { ip: ip.slice(0, columnLength), username: username.slice(0, columnLength), success: isSuccess });
    if (isSuccess) await deleteRowsWhere(attemptsTable, `attempted_at=lt.${isoTimeAgo(retentionDays * millisecondsPerDay)}`);
  } catch (error) {
    console.error('Admin login rate limiting could not record an attempt', error);
  }
}
