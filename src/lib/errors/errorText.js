const notFoundStatus = 404;

const notFound = {
  title: 'Page Not Found',
  kicker: 'Page not found',
  heading: 'This page isn’t here.',
  intro: 'The address may be mistyped, or the page may have moved when we left our old website. Try one of the pages below instead.'
};

const otherError = {
  title: 'Something Went Wrong',
  kicker: 'Something went wrong',
  heading: 'Sorry, this page didn’t load.',
  intro: 'Please try again in a moment. If it keeps happening, call or email us and we’ll help.'
};

/** @param {number} status */
export function errorText(status) {
  if (status === notFoundStatus) return notFound;
  return otherError;
}
