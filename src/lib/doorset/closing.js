const easing = (/** @type {number} */ t) => t * t * (3 - 2 * t);
const clampToUnit = (/** @type {number} */ t) => Math.min(1, Math.max(0, t));
const millisecondsPerSecond = 1000;
const notStarted = -1;

export const closing = { openAngle: -Math.PI / 2, openSeconds: 1.2, closeSeconds: 6, limitSeconds: 25 };

/** @param {number} elapsed */
function swingAt(elapsed) {
  const opening = easing(clampToUnit(elapsed / closing.openSeconds));
  const shutting = easing(clampToUnit((elapsed - closing.openSeconds) / closing.closeSeconds));
  return closing.openAngle * (opening - shutting);
}

/** @param {(progress: { seconds: number, isClosed: boolean }) => void} onTick */
export function createClosingAction(onTick = () => {}) {
  let startedAt = notStarted;
  let heldAngle = 0;

  /** @param {number} now */
  function angleNow(now) {
    if (startedAt === notStarted) return heldAngle;
    const elapsed = (now - startedAt) / millisecondsPerSecond;
    const isClosed = elapsed >= closing.openSeconds + closing.closeSeconds;
    onTick({ seconds: clampToUnit((elapsed - closing.openSeconds) / closing.closeSeconds) * closing.closeSeconds, isClosed });
    if (isClosed) startedAt = notStarted;
    return swingAt(elapsed);
  }

  /** @param {number} now */
  function start(now) {
    heldAngle = 0;
    startedAt = now;
  }

  /** @param {boolean} isOpen */
  function hold(isOpen) {
    startedAt = notStarted;
    heldAngle = isOpen ? closing.openAngle : 0;
  }

  return { angleNow, start, hold };
}
