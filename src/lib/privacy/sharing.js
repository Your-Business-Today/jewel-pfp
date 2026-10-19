import { pendingAnswers } from './pendingAnswers.js';

export const sharing = {
  heading: 'Who we share it with',
  blocks: [
    { text: 'Only what is needed, with:' },
    {
      list: [
        { lead: 'If you booked with us directly', text: '(Apartment Door Survey or Before You Buy): your report and details go only to you, unless you ask us to send copies (for example to your conveyancer or managing agent) or the law requires it. For Before You Buy we share what is needed with the seller or flat owner to arrange access.' },
        { lead: 'If a building owner, managing agent or fire risk assessor instructed us,', text: 'and you live in their building: they receive the survey and works records for your door.' },
        { lead: 'Our certification bodies', text: '(BM TRADA and Bluesky Certification) may see records when they audit our work.' },
        {
          lead: 'Service providers who run our systems for us:',
          text: '',
          items: [
            'Stripe (card payments)',
            'Jewel PFP Portal, our booking and job system, hosted on Microsoft Azure',
            'Vercel (website hosting)',
            'Microsoft 365 (email, files and Teams)',
            'Onetrace (survey records and photos)',
            'Xero (invoices and accounts) and Dext (supplier invoices and receipts)',
            'Twilio and Vapi (phone lines and the automated assistant)',
            'Anthropic (Claude AI tools)',
            `Your Business Today (our software developer’s project system, used only while we build our booking and job systems, then archived and deleted within a year)${pendingAnswers.yourBusinessTodayDataLocation}`
          ]
        },
        { lead: 'Authorities where the law requires it,', text: 'such as HMRC, the Building Safety Regulator and building control.' }
      ]
    },
    { text: 'We do not sell your information.' }
  ]
};
