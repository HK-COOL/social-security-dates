import assert from 'node:assert/strict';

import {
  getPaymentDate,
  getSupportedMonths,
} from '../src/shared/lib/social-security-payment-schedule';

assert.equal(getSupportedMonths().length, 24);

assert.equal(
  getPaymentDate({
    benefitType: 'social-security',
    birthdayRange: '1-10',
    year: 2026,
    month: 5,
  }).primaryDate,
  '2026-05-13'
);

assert.equal(
  getPaymentDate({
    benefitType: 'social-security',
    birthdayRange: '21-31',
    year: 2026,
    month: 5,
  }).primaryDate,
  '2026-05-27'
);

assert.equal(
  getPaymentDate({ benefitType: 'ssi', year: 2026, month: 8 }).primaryDate,
  '2026-07-31'
);

assert.equal(
  getPaymentDate({ benefitType: 'pre-1997', year: 2026, month: 7 }).primaryDate,
  '2026-07-02'
);

const both = getPaymentDate({ benefitType: 'both', year: 2026, month: 5 });
assert.equal(both.primaryDate, '2026-05-01');
assert.equal(both.secondaryDate, '2026-05-01');

assert.throws(() =>
  getPaymentDate({
    benefitType: 'social-security',
    year: 2026,
    month: 5,
  })
);

console.log('Payment schedule verifier passed.');
