const fullyAssembled = 0;
const fullyApart = 1;

/** How far the reader has scrolled through a tall section, from 0 at its top to 1 at its end. @param {HTMLElement} section */
export function scrollProgressThrough(section) {
  const bounds = section.getBoundingClientRect();
  const scrollableHeight = bounds.height - window.innerHeight;
  if (scrollableHeight <= 0) return fullyAssembled;
  const scrolled = -bounds.top / scrollableHeight;
  return Math.min(fullyApart, Math.max(fullyAssembled, scrolled));
}
