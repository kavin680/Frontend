# Enterprise Frontend Foundation Platform

A reusable, scalable, enterprise-grade frontend foundation platform for building SaaS dashboards, admin panels, CRM, ERP, billing systems, analytics dashboards, internal tools, client portals, and more.

## Tech Stack

- **Framework:** Next.js 16 (App Router, Turbopack)
- **UI:** React 19, TypeScript 5, Tailwind CSS v4, ShadCN/UI
- **State:** Zustand (persisted stores)
- **Data Fetching:** TanStack Query (React Query)
- **HTTP Client:** Axios with interceptors
- **Forms:** React Hook Form + Zod validation
- **Charts:** Recharts
- **Icons:** Lucide React
- **Theming:** next-themes (dark/light/system)
- **i18n:** Built-in translation system (8 locales)
- **Testing:** Jest + Playwright
- **DevOps:** Docker, GitHub Actions CI/CD

## Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

## Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── auth/               # Authentication pages (login, register, MFA, etc.)
│   └── dashboard/          # Dashboard pages (analytics, billing, settings, admin, plugins)
├── components/
│   ├── ui/                 # ShadCN/UI base components
│   ├── forms/              # Form components (FormField, SearchInput)
│   ├── tables/             # Data table with sorting
│   ├── charts/             # Chart widgets (StatCard, AreaChart, BarChart)
│   ├── layouts/            # Layout components (DashboardLayout, AuthLayout, Sidebar, Header)
│   ├── auth/               # Auth forms (Login, Register, ForgotPassword, ResetPassword, MFA)
│   └── shared/             # Shared components (ThemeProvider, QueryProvider, PermissionGate, FeatureFlagGate)
├── hooks/                  # Custom hooks (useAuth, usePermissions, useFeatureFlags, useToast)
├── store/                  # Zustand stores (auth, tenant, notification, feature-flag)
├── lib/
│   ├── api/                # API client with Axios interceptors, endpoint definitions
│   ├── sdk/                # SDK wrappers for all API endpoints
│   ├── auth/               # Token management
│   ├── permissions/        # Permission checking utilities
│   ├── feature-flags/      # Feature flag helpers
│   ├── plugins/            # Plugin registry system
│   ├── i18n/               # Internationalization (8 locales)
│   └── utils/              # Formatting, secure storage utilities
├── config/                 # App config (site, navigation, env, design tokens)
├── types/                  # TypeScript type definitions
├── tests/                  # Unit and E2E tests
└── proxy.ts                # Route protection (Next.js 16 proxy)
```

## Core Features

### Authentication System
- Login / Register / Forgot Password / Reset Password
- Multi-Factor Authentication (MFA)
- JWT token lifecycle with automatic refresh
- Session management with timeout
- Protected routes via proxy

### Role-Based Access Control (RBAC)
- 6 role levels: super_admin, admin, manager, member, viewer, guest
- 40+ granular permissions
- Permission-based component rendering (`<PermissionGate>`)
- Role-based navigation filtering

### Multi-Tenant Architecture
- Tenant-aware API requests (X-Tenant-ID header)
- Tenant switching UI
- Tenant branding and theming
- Isolated tenant settings

### Plugin System
- Dynamic module registration via `PluginRegistry`
- Plugin routes, widgets, and menu items
- Plugin configuration and lifecycle management
- Category-based organization (analytics, billing, CRM, AI, etc.)

### Design System
- Dark/light/system theme support
- Design tokens (colors, spacing, typography, shadows, breakpoints)
- White-label branding support
- Responsive layouts

### State Management
- Persisted auth state (Zustand + localStorage)
- Tenant state management
- Notification system with toast UI
- Feature flag store

### API Layer
- Centralized Axios client with interceptors
- Automatic token injection and refresh
- Error normalization
- Comprehensive endpoint definitions
- Full SDK with typed methods

### Internationalization
- 8 supported locales: English, Spanish, French, German, Japanese, Chinese, Portuguese, Arabic
- Typed translation keys
- Easy to extend

## Developer Automation

Generate new pages, components, and modules:

```bash
# Generate a new page
npm run generate:page UserProfile dashboard

# Generate a new component
npm run generate:component UserCard shared

# Generate a new feature module (with types, manifest, and page)
npm run generate:module invoicing
```

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Production build |
| `npm start` | Start production server |
| `npm run lint` | Run ESLint |
| `npm run typecheck` | Run TypeScript type checking |
| `npm test` | Run unit tests |
| `npm run test:coverage` | Run tests with coverage |
| `npm run test:e2e` | Run Playwright E2E tests |
| `npm run generate:page` | Generate a new page |
| `npm run generate:component` | Generate a new component |
| `npm run generate:module` | Generate a new feature module |
| `npm run docker:build` | Build Docker image |
| `npm run docker:up` | Start production Docker container |
| `npm run docker:dev` | Start development Docker container |

## Docker

```bash
# Production build and run
docker compose build
docker compose up -d

# Development with hot reload
docker compose --profile dev up
```

## Environment Variables

Copy `.env.example` to `.env.local` and configure:

```bash
cp .env.example .env.local
```

Key variables:
- `NEXT_PUBLIC_APP_URL` — Application URL (default: http://localhost:3000)
- `NEXT_PUBLIC_API_URL` — Backend API URL (default: http://localhost:4000/api)
- `NEXT_PUBLIC_ENABLE_*` — Feature flags for MFA, plugins, billing, analytics

## CI/CD

GitHub Actions workflow included (`.github/workflows/ci.yml`):
- Lint → Type Check → Build + Test (parallel)
- Runs on push/PR to main and develop branches

## Architecture Decisions

- **Next.js 16 App Router** — Server/client components, proxy-based route protection
- **Zustand over Redux** — Simpler API, built-in persistence, smaller bundle
- **ShadCN/UI v4** — Uses @base-ui/react primitives, fully customizable
- **Axios over fetch** — Request/response interceptors for auth token lifecycle
- **Zod + React Hook Form** — Type-safe form validation

## Future Use Cases

This platform is designed as a foundation for:
- SaaS Dashboards
- Admin Panels
- CRM / ERP Systems
- Billing & Subscription Management
- Analytics Platforms
- Internal Tools
- Client Portals
- AI Governance Plugins
- Plugin Marketplaces
- White-Label Products

## License

Private — Internal company use.
