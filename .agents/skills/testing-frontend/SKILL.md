---
name: testing-frontend
description: Test the Enterprise Frontend Foundation Platform end-to-end. Use when verifying UI rendering, navigation, theme switching, form validation, or dashboard features.
---

# Testing the Frontend Platform

## Prerequisites
- Node.js and npm installed
- Run `npm install --legacy-peer-deps` (peer dependency conflicts exist)

## Starting the Dev Server
```bash
cd /home/ubuntu/repos/Frontend
npm run dev
# Runs on http://localhost:3000 via Turbopack
```

## Route Protection (proxy.ts)
The app uses `proxy.ts` (NOT middleware.ts — Next.js 16 convention) for route protection.
- Unauthenticated users are redirected from `/dashboard/*` to `/auth/login?redirect=...`
- Authenticated users are redirected from `/auth/*` to `/dashboard`
- Auth is checked via `auth-token` cookie

### Bypassing Route Protection for Testing
Set the auth cookie in the browser console:
```js
document.cookie = "auth-token=test-token-for-testing; path=/";
```
To clear it (to test auth pages):
```js
document.cookie = "auth-token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/";
```

## Key Pages and Navigation Paths

### Public Pages (no auth needed)
- `/` — Landing page: "Enterprise Platform" header, 6 feature cards, Sign in / Get Started buttons
- `/auth/login` — Login form with email/password, validation, Remember me, Forgot password link
- `/auth/register` — Registration with first/last name, email, organization, password, confirm password
- `/auth/forgot-password` — Email input with Send reset link button
- `/auth/mfa` — 6-digit code input with Trust this device checkbox

### Dashboard Pages (need auth-token cookie)
- `/dashboard` — Overview with 4 stat cards (Total Users, Revenue, Active Sessions, Conversion Rate) + 2 charts
- `/dashboard/analytics` — Analytics with 4 stat cards + 2 charts
- `/dashboard/billing` — 3 plan cards (Starter $29, Professional $99 with Popular badge, Enterprise Custom)
- `/dashboard/settings` — 4 tabs: General, Security, Notifications, Appearance
- `/dashboard/admin` — Admin stats + sortable user data table
- `/dashboard/notifications` — 4 mock notifications with Mark all as read
- `/dashboard/plugins` — 8 plugin cards with Install/Configure buttons and toggle switches

## Sidebar Behavior
- Only "Dashboard" and "Notifications" show without permissions (RBAC filtering)
- Other items (Analytics, Billing, Plugins, Admin, Settings) require specific permissions
- Sidebar collapse button toggles between full width (w-64) and icon-only rail (w-16)
- All pages are directly navigable via URL regardless of sidebar visibility

## Theme Toggle
- Located in the header (sun/moon/monitor icon)
- Dropdown with Light, Dark, System options
- Uses `next-themes` — theme persists across navigation
- Icon changes: Sun (light), Moon (dark), Monitor (system)

## Form Validation
- Login: Empty submit shows "Please enter a valid email address" and "Password is required"
- Register: Zod schema validates first/last name required, email format, password strength (8+ chars, uppercase, lowercase, number, special char), password match

## Common Issues
- ShadCN v4 uses `@base-ui/react` primitives, NOT Radix — `asChild` prop is NOT supported
- `--legacy-peer-deps` may be needed for npm install due to peer dependency conflicts
- First page load after `npm run dev` takes a few seconds to compile (Turbopack)
- No backend is connected — form submissions will show network errors (expected)

## Build & Lint Commands
```bash
npm run build      # Production build
npm run lint       # ESLint
npm run typecheck  # TypeScript type checking
npm run test       # Jest unit tests
npm run test:e2e   # Playwright E2E tests
```

## Devin Secrets Needed
No secrets required for local testing. The app runs entirely on localhost with mock data.
