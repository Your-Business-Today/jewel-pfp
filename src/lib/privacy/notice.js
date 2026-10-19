import { introduction } from './introduction.js';
import { collection } from './collection.js';
import { lawfulBasis } from './lawfulBasis.js';
import { sharing } from './sharing.js';
import { transfers } from './transfers.js';
import { retention } from './retention.js';
import { rights, complaints, cookies, changes } from './rights.js';

export const privacyNotice = {
  path: '/privacy',
  version: '1.0',
  lastUpdated: '19 October 2026',
  introduction,
  sections: [collection, lawfulBasis, sharing, transfers, retention, rights, complaints, cookies, changes]
};
