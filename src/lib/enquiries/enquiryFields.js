import { textLimits } from '$lib/content/limits.js';

export const phoneLimit = 50;

export const enquiryFields = {
  name: { label: 'Name', limit: textLimits.line, isRequired: true },
  email: { label: 'Email', limit: textLimits.line, isRequired: true },
  phone: { label: 'Phone', limit: phoneLimit, isRequired: false },
  building: { label: 'Building / site', limit: textLimits.line, isRequired: false },
  service: { label: 'Service', limit: textLimits.line, isRequired: false },
  message: { label: 'Message', limit: textLimits.message, isRequired: true }
};

export const enquiryStatus = {
  unread: 'new',
  read: 'read',
  archived: 'archived'
};
