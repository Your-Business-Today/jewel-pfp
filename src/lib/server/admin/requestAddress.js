const unknownAddress = 'unknown';

/** @param {() => string} getClientAddress */
export function clientAddress(getClientAddress) {
  try {
    const forwardedFor = getClientAddress() ?? '';
    const [firstHop] = forwardedFor.split(',');
    return firstHop.trim() || unknownAddress;
  } catch {
    return unknownAddress;
  }
}
