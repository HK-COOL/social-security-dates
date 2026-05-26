'use client';

import { ExternalLink, ShieldCheck } from 'lucide-react';

import { Button } from '@/shared/components/ui/button';
import { Section } from '@/shared/types/blocks/landing';
import { cn } from '@/shared/lib/utils';

export function OfficialSources({
  section,
  className,
}: {
  section: Section;
  className?: string;
}) {
  return (
    <section
      id={section.id}
      className={cn('bg-background py-14 md:py-20', section.className, className)}
    >
      <div className="container">
        <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 rounded-full border bg-muted px-3 py-1 text-sm font-medium">
              <ShieldCheck className="size-4" />
              Official source links
            </div>
            <h2 className="text-3xl font-semibold text-balance md:text-4xl">
              {section.title}
            </h2>
            <p className="text-muted-foreground leading-7">
              {section.description}
            </p>
            {section.tip && (
              <p className="rounded-md border bg-muted/60 p-3 text-sm text-muted-foreground">
                {section.tip}
              </p>
            )}
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            {section.items?.map((item, index) => (
              <div
                key={index}
                className="flex min-h-[150px] flex-col justify-between rounded-lg border bg-muted/30 p-4"
              >
                <div>
                  <h3 className="font-medium text-balance">{item.title}</h3>
                  <p className="text-muted-foreground mt-2 text-sm leading-6">
                    {item.description}
                  </p>
                </div>
                <Button asChild variant="outline" size="sm" className="mt-4 w-fit">
                  <a href={item.url || '#'} target="_blank" rel="noreferrer">
                    <ExternalLink className="size-4" />
                    Open source
                  </a>
                </Button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
