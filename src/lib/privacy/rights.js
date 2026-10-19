import { pendingAnswers } from './pendingAnswers.js';

export const rights = {
  heading: 'Your rights',
  blocks: [
    {
      text: 'You can ask for a copy of your information, ask us to correct it, delete it or limit how we use it, object to how we use it (including marketing, which we will always stop), ask us to send it to you or another organisation in a common format, and withdraw consent at any time. Email info@jewelpfp.co.uk. We may ask you to confirm your identity. We reply within one month. Some records must be kept by law, and we will tell you if that applies.'
    }
  ]
};

export const complaints = {
  heading: 'Complaints',
  blocks: [
    {
      text: 'Please contact us first at info@jewelpfp.co.uk. We acknowledge data protection complaints within 30 days. You can also complain to the Information Commissioner’s Office at ico.org.uk or on 0303 123 1113.'
    }
  ]
};

export const cookies = {
  heading: 'Cookies',
  blocks: [
    {
      text: `Our website and our booking page only use cookies needed for them to work, such as keeping your booking secure${pendingAnswers.cookieList}. Card payments happen on Stripe’s own secure page, which has its own cookies. We do not use advertising or tracking cookies.`
    }
  ]
};

export const changes = {
  heading: 'Changes',
  blocks: [
    { text: 'We update this notice when how we use information changes. The date at the top shows the latest version.' }
  ]
};
