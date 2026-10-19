import { pendingAnswers } from './pendingAnswers.js';

export const transfers = {
  heading: 'Outside the UK',
  blocks: [
    {
      text: `Microsoft 365, Onetrace, Twilio and Vapi hold our data in the European Union, and the portal runs on Microsoft Azure${pendingAnswers.azureRegion}. Stripe, Vercel and Anthropic may process your information in the United States, and Vapi may use US-based tools to transcribe and summarise calls. For the EU we rely on UK adequacy regulations. For the US we rely on the UK-US data bridge for certified companies or the UK International Data Transfer Agreement or Addendum. You can ask us for details.`
    }
  ]
};
