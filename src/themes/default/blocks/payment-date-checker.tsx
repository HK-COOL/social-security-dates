'use client';

import { useMemo, useState } from 'react';
import { CalendarDays, Copy, RotateCcw, ShieldCheck } from 'lucide-react';

import {
  BenefitType,
  BirthdayRange,
  formatPaymentDate,
  getPaymentDate,
  getSupportedMonths,
} from '@/shared/lib/social-security-payment-schedule';
import { Button } from '@/shared/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/shared/components/ui/select';
import { Section } from '@/shared/types/blocks/landing';
import { cn } from '@/shared/lib/utils';

const BENEFIT_TYPES: {
  value: BenefitType;
  label: string;
  hint: string;
}[] = [
  {
    value: 'social-security',
    label: 'Social Security only',
    hint: 'Retirement, disability, or survivor benefits started after May 1997.',
  },
  {
    value: 'ssi',
    label: 'SSI only',
    hint: 'Supplemental Security Income payment date.',
  },
  {
    value: 'both',
    label: 'Social Security + SSI',
    hint: 'Shows both scheduled dates for the selected month.',
  },
  {
    value: 'pre-1997',
    label: 'Social Security before May 1997',
    hint: 'Uses the 3rd-of-the-month rule.',
  },
];

const BIRTHDAY_RANGES: {
  value: BirthdayRange;
  label: string;
}[] = [
  { value: '1-10', label: 'Birthday on the 1st through 10th' },
  { value: '11-20', label: 'Birthday on the 11th through 20th' },
  { value: '21-31', label: 'Birthday on the 21st through 31st' },
];

export function PaymentDateChecker({
  section,
  className,
}: {
  section: Section;
  className?: string;
}) {
  const months = useMemo(() => getSupportedMonths(), []);
  const [benefitType, setBenefitType] =
    useState<BenefitType>('social-security');
  const [birthdayRange, setBirthdayRange] =
    useState<BirthdayRange>('11-20');
  const [monthValue, setMonthValue] = useState('2026-05');
  const [copied, setCopied] = useState(false);

  const selectedBenefit = BENEFIT_TYPES.find((item) => item.value === benefitType);
  const [year, month] = monthValue.split('-').map(Number);
  const result = getPaymentDate({
    benefitType,
    birthdayRange:
      benefitType === 'social-security' ? birthdayRange : undefined,
    year,
    month,
  });
  const primaryDate = new Date(`${result.primaryDate}T00:00:00.000Z`);
  const secondaryDate = result.secondaryDate
    ? new Date(`${result.secondaryDate}T00:00:00.000Z`)
    : null;

  const copyResult = async () => {
    const lines = [
      result.label,
      result.note,
      result.rule,
      result.safetyNote,
      'Independent tool. Not affiliated with, endorsed by, or operated by the Social Security Administration.',
    ];

    await navigator.clipboard.writeText(lines.join('\n'));
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1600);
  };

  return (
    <section
      id={section.id}
      className={cn('bg-muted/45 py-12 md:py-20', section.className, className)}
    >
      <div className="container">
        <div className="grid gap-6 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)]">
          <div className="space-y-5">
            <div className="inline-flex items-center gap-2 rounded-full border bg-background px-3 py-1 text-sm font-medium">
              <ShieldCheck className="size-4" />
              No SSN. No bank info. No login.
            </div>
            <div className="space-y-4">
              <h2 className="max-w-2xl text-3xl font-semibold text-balance md:text-4xl">
                {section.title || 'Check your Social Security payment date'}
              </h2>
              <p className="text-muted-foreground max-w-2xl text-base leading-7">
                {section.description ||
                  'Choose your benefit type, birthday range, and month to estimate the scheduled payment date using public SSA payment rules.'}
              </p>
            </div>
            <div className="grid gap-3 text-sm text-muted-foreground sm:grid-cols-2">
              <div className="rounded-md border bg-background p-4">
                <p className="font-medium text-foreground">Private by design</p>
                <p className="mt-1">
                  This checker never asks for your Social Security number, bank
                  details, full birth date, address, phone, or email.
                </p>
              </div>
              <div className="rounded-md border bg-background p-4">
                <p className="font-medium text-foreground">Independent source</p>
                <p className="mt-1">
                  Dates are estimated from public SSA schedule rules and federal
                  holiday adjustments.
                </p>
              </div>
            </div>
          </div>

          <div className="rounded-lg border bg-background p-4 shadow-sm md:p-6">
            <div className="grid gap-4">
              <div className="grid gap-2">
                <label className="text-sm font-medium" htmlFor="benefit-type">
                  Benefit type
                </label>
                <Select
                  value={benefitType}
                  onValueChange={(value) => setBenefitType(value as BenefitType)}
                >
                  <SelectTrigger id="benefit-type" className="w-full">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {BENEFIT_TYPES.map((item) => (
                      <SelectItem key={item.value} value={item.value}>
                        {item.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <p className="text-sm text-muted-foreground">
                  {selectedBenefit?.hint}
                </p>
              </div>

              {benefitType === 'social-security' && (
                <div className="grid gap-2">
                  <label className="text-sm font-medium" htmlFor="birthday-range">
                    Birthday range
                  </label>
                  <Select
                    value={birthdayRange}
                    onValueChange={(value) =>
                      setBirthdayRange(value as BirthdayRange)
                    }
                  >
                    <SelectTrigger id="birthday-range" className="w-full">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {BIRTHDAY_RANGES.map((item) => (
                        <SelectItem key={item.value} value={item.value}>
                          {item.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              )}

              <div className="grid gap-2">
                <label className="text-sm font-medium" htmlFor="payment-month">
                  Payment month
                </label>
                <Select value={monthValue} onValueChange={setMonthValue}>
                  <SelectTrigger id="payment-month" className="w-full">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {months.map((item) => (
                      <SelectItem key={item.value} value={item.value}>
                        {item.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="mt-6 rounded-lg border bg-muted/50 p-4">
              <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
                <CalendarDays className="size-4" />
                Estimated scheduled date
              </div>
              <p className="mt-3 text-3xl font-semibold text-balance">
                {formatPaymentDate(primaryDate)}
              </p>
              {secondaryDate && (
                <p className="mt-2 text-base">
                  SSI estimate: {formatPaymentDate(secondaryDate)}
                </p>
              )}
              <p className="mt-4 text-sm leading-6 text-muted-foreground">
                {result.rule}
              </p>
              <p className="mt-3 text-sm leading-6 text-muted-foreground">
                {result.safetyNote}
              </p>
            </div>

            <div className="mt-4 flex flex-wrap gap-2">
              <Button type="button" onClick={copyResult}>
                <Copy className="size-4" />
                {copied ? 'Copied' : 'Copy result'}
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={() => {
                  setBenefitType('social-security');
                  setBirthdayRange('11-20');
                  setMonthValue('2026-05');
                }}
              >
                <RotateCcw className="size-4" />
                Reset
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
