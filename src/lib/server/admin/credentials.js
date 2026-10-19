import { env } from '$env/dynamic/private';
import { isSameInConstantTime, sign } from './signature.js';

/** @param {string | undefined} value */
function trimmed(value) {
  return (value ?? '').trim();
}

export function sessionSecret() {
  return trimmed(env.ADMIN_SESSION_SECRET) || trimmed(env.ADMIN_PASSWORD);
}

export function areCredentialsConfigured() {
  return Boolean(trimmed(env.ADMIN_USERNAME) && trimmed(env.ADMIN_PASSWORD));
}

/**
 * @param {string} username
 * @param {string} password
 */
export async function areCredentialsCorrect(username, password) {
  if (!areCredentialsConfigured()) return false;
  const secret = sessionSecret();
  const [givenUsername, expectedUsername, givenPassword, expectedPassword] = await Promise.all([
    sign(username.trim(), secret),
    sign(trimmed(env.ADMIN_USERNAME), secret),
    sign(password, secret),
    sign(trimmed(env.ADMIN_PASSWORD), secret)
  ]);
  const isUsernameCorrect = isSameInConstantTime(givenUsername, expectedUsername);
  const isPasswordCorrect = isSameInConstantTime(givenPassword, expectedPassword);
  return isUsernameCorrect && isPasswordCorrect;
}
