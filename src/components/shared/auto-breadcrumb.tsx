'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { ChevronRight, Home } from 'lucide-react';
import { cn } from '@/lib/utils';

interface BreadcrumbOverride {
  pattern: RegExp;
  label: string;
}

interface AutoBreadcrumbProps {
  /** Custom label overrides for path segments */
  overrides?: BreadcrumbOverride[];
  className?: string;
}

const defaultOverrides: BreadcrumbOverride[] = [
  { pattern: /^dashboard$/, label: 'Dashboard' },
  { pattern: /^admin$/, label: 'Admin' },
  { pattern: /^settings$/, label: 'Settings' },
  { pattern: /^analytics$/, label: 'Analytics' },
  { pattern: /^billing$/, label: 'Billing' },
  { pattern: /^plugins$/, label: 'Plugins' },
  { pattern: /^notifications$/, label: 'Notifications' },
  { pattern: /^auth$/, label: 'Authentication' },
];

function formatSegment(segment: string, overrides: BreadcrumbOverride[]): string {
  for (const override of overrides) {
    if (override.pattern.test(segment)) return override.label;
  }
  return segment
    .replace(/-/g, ' ')
    .replace(/\b\w/g, (c) => c.toUpperCase());
}

export function AutoBreadcrumb({ overrides = [], className }: AutoBreadcrumbProps) {
  const pathname = usePathname();
  const segments = pathname.split('/').filter(Boolean);

  if (segments.length <= 1) return null;

  const allOverrides = [...overrides, ...defaultOverrides];

  const breadcrumbs = segments.map((segment, index) => {
    const href = '/' + segments.slice(0, index + 1).join('/');
    const label = formatSegment(segment, allOverrides);
    const isLast = index === segments.length - 1;
    return { href, label, isLast };
  });

  return (
    <nav aria-label="Breadcrumb" className={cn('mb-4', className)}>
      <ol className="flex items-center gap-1 text-sm text-muted-foreground">
        <li>
          <Link
            href="/dashboard"
            className="flex items-center hover:text-foreground transition-colors"
          >
            <Home className="h-3.5 w-3.5" aria-hidden="true" />
            <span className="sr-only">Home</span>
          </Link>
        </li>
        {breadcrumbs.map(({ href, label, isLast }) => (
          <li key={href} className="flex items-center gap-1">
            <ChevronRight className="h-3.5 w-3.5" aria-hidden="true" />
            {isLast ? (
              <span className="font-medium text-foreground" aria-current="page">
                {label}
              </span>
            ) : (
              <Link href={href} className="hover:text-foreground transition-colors">
                {label}
              </Link>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
