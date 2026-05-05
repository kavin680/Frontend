'use client';

/**
 * Skip to main content link for keyboard navigation.
 * Place at the top of your layout — invisible until focused via Tab.
 *
 * @example
 * ```tsx
 * <SkipToContent />
 * <nav>...</nav>
 * <main id="main-content">...</main>
 * ```
 */
export function SkipToContent({ targetId = 'main-content' }: { targetId?: string }) {
  return (
    <a
      href={`#${targetId}`}
      className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[99999] focus:rounded-lg focus:bg-primary focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:text-primary-foreground focus:shadow-lg focus:outline-none"
    >
      Skip to main content
    </a>
  );
}
