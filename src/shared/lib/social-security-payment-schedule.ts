export type BenefitType =
  | 'social-security'
  | 'ssi'
  | 'both'
  | 'pre-1997';

export type BirthdayRange = '1-10' | '11-20' | '21-31';

export type PaymentInput = {
  benefitType: BenefitType;
  birthdayRange?: BirthdayRange;
  year: number;
  month: number;
};

export type PaymentResult = {
  primaryDate: string;
  secondaryDate?: string;
  label: string;
  rule: string;
  note: string;
  safetyNote: string;
};

const MONTH_NAMES = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

const HOLIDAYS = new Set([
  '2026-01-01',
  '2026-01-19',
  '2026-02-16',
  '2026-05-25',
  '2026-06-19',
  '2026-07-03',
  '2026-09-07',
  '2026-10-12',
  '2026-11-11',
  '2026-11-26',
  '2026-12-25',
  '2027-01-01',
  '2027-01-18',
  '2027-02-15',
  '2027-05-31',
  '2027-06-18',
  '2027-07-05',
  '2027-09-06',
  '2027-10-11',
  '2027-11-11',
  '2027-11-25',
  '2027-12-24',
]);

export function formatPaymentDate(date: Date) {
  return new Intl.DateTimeFormat('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric',
    timeZone: 'UTC',
  }).format(date);
}

export function isoDate(date: Date) {
  return date.toISOString().slice(0, 10);
}

export function monthLabel(year: number, month: number) {
  return `${MONTH_NAMES[month - 1]} ${year}`;
}

export function getSupportedMonths() {
  const months = [];

  for (const year of [2026, 2027]) {
    for (let month = 1; month <= 12; month += 1) {
      months.push({
        value: `${year}-${String(month).padStart(2, '0')}`,
        label: monthLabel(year, month),
      });
    }
  }

  return months;
}

export function getPaymentDate(input: PaymentInput): PaymentResult {
  const { benefitType, birthdayRange, year, month } = input;

  if (!Number.isInteger(year) || year < 2026 || year > 2027) {
    throw new Error('Choose a month in 2026 or 2027.');
  }

  if (!Number.isInteger(month) || month < 1 || month > 12) {
    throw new Error('Choose a valid month.');
  }

  const safetyNote =
    'This is an estimated scheduled payment date based on public SSA payment rules. It is not a guarantee that your payment has been issued or posted by your bank.';

  if (benefitType === 'ssi') {
    const date = adjustedBusinessDate(new Date(Date.UTC(year, month - 1, 1)));

    return {
      primaryDate: isoDate(date),
      label: `SSI payment for ${monthLabel(year, month)}`,
      rule: 'SSI is usually paid on the 1st of the month. If the 1st falls on a weekend or federal holiday, SSA schedules the payment for the previous business day.',
      note: `Estimated scheduled SSI payment date: ${formatPaymentDate(date)}.`,
      safetyNote,
    };
  }

  if (benefitType === 'both') {
    const ssiDate = adjustedBusinessDate(new Date(Date.UTC(year, month - 1, 1)));
    const socialSecurityDate = adjustedBusinessDate(
      new Date(Date.UTC(year, month - 1, 3))
    );

    return {
      primaryDate: isoDate(socialSecurityDate),
      secondaryDate: isoDate(ssiDate),
      label: `Social Security and SSI payments for ${monthLabel(year, month)}`,
      rule: 'If you receive both Social Security and SSI, SSA generally pays SSI on the 1st and Social Security on the 3rd, adjusted earlier when those dates fall on a weekend or federal holiday.',
      note: `Estimated Social Security date: ${formatPaymentDate(socialSecurityDate)}. Estimated SSI date: ${formatPaymentDate(ssiDate)}.`,
      safetyNote,
    };
  }

  if (benefitType === 'pre-1997') {
    const date = adjustedBusinessDate(new Date(Date.UTC(year, month - 1, 3)));

    return {
      primaryDate: isoDate(date),
      label: `Social Security payment for ${monthLabel(year, month)}`,
      rule: 'If you started receiving Social Security before May 1997, SSA generally pays on the 3rd of the month, adjusted earlier for weekends and federal holidays.',
      note: `Estimated scheduled payment date: ${formatPaymentDate(date)}.`,
      safetyNote,
    };
  }

  if (!birthdayRange) {
    throw new Error('Choose a birthday range for Social Security payments.');
  }

  const weekNumber =
    birthdayRange === '1-10' ? 2 : birthdayRange === '11-20' ? 3 : 4;
  const date = adjustedBusinessDate(nthWeekdayOfMonth(year, month, 3, weekNumber));
  const birthdayLabel =
    birthdayRange === '1-10'
      ? 'birthdays from the 1st through the 10th'
      : birthdayRange === '11-20'
        ? 'birthdays from the 11th through the 20th'
        : 'birthdays from the 21st through the 31st';

  return {
    primaryDate: isoDate(date),
    label: `Social Security payment for ${birthdayLabel}`,
    rule: 'Most Social Security retirement, disability, and survivor payments are sent on the second, third, or fourth Wednesday of the month based on birthday range.',
    note: `Estimated scheduled payment date for ${monthLabel(year, month)}: ${formatPaymentDate(date)}.`,
    safetyNote,
  };
}

function nthWeekdayOfMonth(
  year: number,
  month: number,
  weekday: number,
  nth: number
) {
  const date = new Date(Date.UTC(year, month - 1, 1));
  const offset = (weekday - date.getUTCDay() + 7) % 7;
  date.setUTCDate(1 + offset + (nth - 1) * 7);
  return date;
}

function adjustedBusinessDate(date: Date) {
  const adjusted = new Date(date);

  while (isWeekend(adjusted) || HOLIDAYS.has(isoDate(adjusted))) {
    adjusted.setUTCDate(adjusted.getUTCDate() - 1);
  }

  return adjusted;
}

function isWeekend(date: Date) {
  const day = date.getUTCDay();
  return day === 0 || day === 6;
}
