---
name: testing-frontend
description: Test the Enterprise Frontend Platform end-to-end. Use when verifying Redux state, inbuilt components (toast, modal, confirm, SmartForm, Alert, Loaders), dashboard pages, theme toggle, or auth flows.
---

# Testing the Enterprise Frontend Platform

## Prerequisites

- Node.js and npm installed
- Repository cloned and dependencies installed (`npm install`)

## Dev Server Setup

1. Clear stale `.next` cache if files were deleted or renamed:
   ```bash
   rm -rf .next
   ```
2. Start dev server:
   ```bash
   npm run dev
   ```
3. Server runs on `http://localhost:3000` (Next.js 16 + Turbopack)

## Auth Bypass for Dashboard Testing

The `proxy.ts` route guard checks for an `auth-token` cookie. To access `/dashboard/*` routes without a backend:

```javascript
// Run in browser console
document.cookie = "auth-token=test-token-for-testing; path=/; max-age=3600";
window.location.href = "/dashboard";
```

To clear the cookie and return to login:
```javascript
document.cookie = "auth-token=; path=/; max-age=0";
```

## Key Pages to Test

| Page | URL | What to verify |
|---|---|---|
| Landing | `/` | Header, hero, 6 feature cards, footer |
| Login | `/auth/login` | Form fields, Zod validation on empty submit |
| Register | `/auth/register` | Form fields, validation |
| Dashboard | `/dashboard` | Sidebar, header, 4 stat cards, 2 charts |
| Admin | `/dashboard/admin` | DataTable with sortable columns |
| Settings | `/dashboard/settings` | 4 tabs: General, Security, Notifications, Appearance |
| Billing | `/dashboard/billing` | 3 pricing tier cards |
| Plugins | `/dashboard/plugins` | Plugin marketplace cards |
| Notifications | `/dashboard/notifications` | Notification list |

## Testing Inbuilt Components

Some inbuilt components (toast, modal, confirm, SmartForm, Alert, Loaders) might not be used by existing pages. Create a temporary test page at `/dashboard/test-components/page.tsx` to exercise them:

- **Toast**: Call `toast.success()`, `toast.error()`, `toast.warning()`, `toast.info()` from `@/lib/toast`
- **Modal**: Call `modal.open(<content>, { title })` from `@/lib/modal`
- **Confirm**: Call `await confirm('title', 'message', { variant: 'destructive' })` from `@/lib/modal`
- **SmartForm**: Render `<SmartForm>` with fields array + Zod schema from `@/components/forms/smart-form`
- **Alert**: Render `<Alert variant="success|error|warning|info">` from `@/components/ui/alert`
- **Loaders**: Render `<Spinner>`, `<PageLoader>`, `<TableSkeleton>`, etc. from `@/components/ui/loaders`

**Important:** Delete the temporary test page after testing — do not commit it to the PR.

## Common Gotchas

- **Stale .next cache**: After deleting or renaming files (e.g., migrating from Zustand to Redux), the `.next` cache may retain stale module references. Always run `rm -rf .next` before starting the dev server if you see "Module not found" errors for files that no longer exist.
- **No backend needed**: API calls will fail, which is useful for testing error toast paths (e.g., login form submit triggers `toast.error()`).
- **Next.js 16 breaking changes**: This project uses Next.js 16 with `proxy.ts` instead of `middleware.ts`. Check `AGENTS.md` and `node_modules/next/dist/docs/` for API differences.
- **Theme toggle**: Uses `next-themes` with Light/Dark/System options via dropdown, not a simple toggle button.

## Devin Secrets Needed

No secrets are required for local frontend testing. The app runs entirely client-side against mock/static data.
