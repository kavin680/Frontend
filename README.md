# Frontend Base — Clone, Configure, Build

A plug-and-play frontend foundation. Clone → set API URL → import components → build your app.

## Quick Start (5 minutes)

```bash
# 1. Clone
git clone <repo-url> my-app && cd my-app

# 2. Install
npm install

# 3. Configure API
cp .env.example .env.local
# Edit .env.local → set NEXT_PUBLIC_API_URL=https://your-api.com/api

# 4. Run
npm run dev
```

That's it. Everything works — auth, toasts, modals, forms, tables, themes.

## Tech Stack

- **Next.js 16** (App Router, Turbopack) + **React 19** + **TypeScript 5**
- **Redux Toolkit** + **RTK Query** (state + API — set URL, auto-handles auth/cache/errors)
- **Tailwind CSS v4** + **ShadCN/UI** (components with inbuilt animations)
- **React Hook Form** + **Zod** (schema-driven validation)
- **Recharts** (charts) + **Lucide** (icons) + **next-themes** (dark/light/system)

## How to Use — Just Import and Call

### Toast — `toast.success()` from anywhere

```tsx
import { toast } from '@/lib/toast';

toast.success('User created!');
toast.error('Something failed', 'Please try again');
toast.warning('Unsaved changes');
toast.info('New update available');
```

### Modal — `modal.open()` / `confirm()` from anywhere

```tsx
import { modal, confirm } from '@/lib/modal';

// Open any content as modal
modal.open(<EditUserForm userId={123} />, { title: 'Edit User', size: 'lg' });

// Confirmation dialog — returns Promise<boolean>
const ok = await confirm('Delete user?', 'This cannot be undone.', {
  variant: 'destructive',
  confirmText: 'Yes, delete',
});
if (ok) { /* delete */ }
```

### SmartForm — schema-driven, zero boilerplate

```tsx
import { SmartForm } from '@/components/forms/smart-form';
import { z } from 'zod';

const schema = z.object({
  email: z.string().email(),
  role: z.string(),
});

<SmartForm
  fields={[
    { name: 'email', type: 'email', label: 'Email', required: true },
    { name: 'role', type: 'select', label: 'Role', options: [
      { label: 'Admin', value: 'admin' },
      { label: 'User', value: 'user' },
    ]},
  ]}
  schema={schema}
  onSubmit={(data) => console.log(data)}
  submitText="Create User"
/>
```

### DataTable — pass data + columns, get everything

```tsx
import { DataTable } from '@/components/tables/data-table';

<DataTable
  data={users}
  columns={[
    { key: 'name', header: 'Name', sortable: true },
    { key: 'email', header: 'Email' },
    { key: 'status', header: 'Status', render: (v) => <Badge>{String(v)}</Badge> },
  ]}
  searchable
  pagination
  pageSize={10}
/>
```

### Alert — with animations

```tsx
import { Alert } from '@/components/ui/alert';

<Alert variant="success" title="Saved!">Your changes have been saved.</Alert>
<Alert variant="error" dismissible>Something went wrong.</Alert>
<Alert variant="warning" title="Warning" action={<Button size="sm">Fix</Button>}>
  Your session is about to expire.
</Alert>
```

### Loaders/Skeletons — for every component type

```tsx
import { PageLoader, TableSkeleton, CardSkeleton, FormSkeleton, ChartSkeleton, StatCardSkeleton, Spinner } from '@/components/ui/loaders';

<PageLoader message="Loading dashboard..." />
<TableSkeleton rows={5} cols={4} />
<CardSkeleton count={3} />
<FormSkeleton fields={4} />
<ChartSkeleton />
<StatCardSkeleton count={4} />
<Spinner size="lg" />
```

### Auth — login/logout/register with one hook

```tsx
import { useAuth } from '@/hooks/use-auth';

function LoginPage() {
  const { login, isLoading, error } = useAuth();

  const handleLogin = async () => {
    await login({ email: 'user@example.com', password: 'pass' });
    // Auto-stores tokens, shows toast, redirects
  };
}
```

### Permissions — check anywhere

```tsx
import { usePermissions } from '@/hooks/use-permissions';
import { PermissionGate } from '@/components/shared/permission-gate';

// Hook
const { hasPermission, hasRole } = usePermissions();
if (hasPermission('users:write')) { /* ... */ }

// Component
<PermissionGate permissions={['billing:read']}>
  <BillingDashboard />
</PermissionGate>
```

### Redux State — dispatch/select

```tsx
import { useAppDispatch, useAppSelector, authActions, tenantActions } from '@/store';

// Read state
const user = useAppSelector((state) => state.auth.user);
const tenant = useAppSelector((state) => state.tenant.current);

// Dispatch actions
const dispatch = useAppDispatch();
dispatch(authActions.logout());
dispatch(tenantActions.switchTenant('tenant-id'));
```

### RTK Query — auto API calls with caching

```tsx
import { useGetUsersQuery, useCreateUserMutation } from '@/store/endpoints/usersApi';

function UserList() {
  const { data, isLoading, error } from useGetUsersQuery();
  const [createUser] = useCreateUserMutation();

  // data is auto-cached, auto-refetched, auto-typed
}
```

### Layouts — one line

```tsx
import { DashboardLayout } from '@/components/layouts/dashboard-layout';
import { AuthLayout } from '@/components/layouts/auth-layout';

// Full dashboard with sidebar + header
<DashboardLayout><YourPage /></DashboardLayout>

// Auth pages
<AuthLayout title="Sign In"><LoginForm /></AuthLayout>
```

## Project Structure

```
src/
├── app/                    # Next.js pages
├── components/
│   ├── ui/                 # Base UI (Button, Input, Alert, Skeleton, Loaders, etc.)
│   ├── forms/              # SmartForm, FormField, SearchInput
│   ├── tables/             # DataTable (sorting, filtering, pagination, search)
│   ├── charts/             # StatCard, AreaChart, BarChart
│   ├── layouts/            # DashboardLayout, AuthLayout, Sidebar, Header
│   ├── auth/               # Login, Register, ForgotPassword, ResetPassword, MFA forms
│   └── shared/             # ThemeProvider, ToastContainer, ModalContainer, PermissionGate
├── hooks/                  # useAuth, usePermissions, useFeatureFlags, useToast, useDebounce, useMediaQuery, useLocalStorage
├── store/
│   ├── slices/             # Redux slices (auth, tenant, notification, featureFlag, ui)
│   ├── endpoints/          # RTK Query API endpoints (authApi, usersApi)
│   ├── api.ts              # RTK Query base config (auto-attaches tokens + tenant ID)
│   └── store.ts            # Redux store with persistence
├── lib/
│   ├── api/                # Axios client with interceptors
│   ├── toast.ts            # Global toast API — toast.success() from anywhere
│   ├── modal.ts            # Global modal API — modal.open() / confirm() from anywhere
│   ├── auth/               # Token management
│   ├── permissions/        # Permission utilities
│   ├── plugins/            # Plugin registry
│   └── utils/              # Formatting, secure storage
├── config/                 # App config, navigation, env, design tokens
├── types/                  # TypeScript types
└── proxy.ts                # Route protection
```

## Tree-Shaking

Only what you import gets bundled. Don't use `SmartForm`? It won't be in your build. Each component is a standalone module with no side effects.

```tsx
// Only these 2 components get bundled:
import { toast } from '@/lib/toast';
import { DataTable } from '@/components/tables/data-table';
```

## Built-in Features

| Feature | How to use |
|---------|-----------|
| **Toast notifications** | `toast.success('Done!')` |
| **Modal dialogs** | `modal.open(<Content />)` |
| **Confirm dialogs** | `const ok = await confirm('Sure?', 'Message')` |
| **Schema forms** | `<SmartForm fields={[...]} schema={zod} onSubmit={fn} />` |
| **Data tables** | `<DataTable data={[]} columns={[]} searchable pagination />` |
| **Alerts** | `<Alert variant="success">Text</Alert>` |
| **Skeletons** | `<TableSkeleton />`, `<CardSkeleton />`, `<PageLoader />` |
| **Auth** | `useAuth()` → login, logout, register, forgotPassword, resetPassword, verifyMfa |
| **Permissions** | `usePermissions()` → hasPermission, hasRole |
| **Feature flags** | `useFeatureFlags()` → isEnabled, getVariant |
| **Dark/light theme** | Built-in via ThemeToggle, zero config |
| **RBAC** | `<PermissionGate permissions={['users:write']}>` |
| **Multi-tenant** | Auto X-Tenant-ID headers, tenant switching UI |
| **API calls** | RTK Query endpoints — auto-cached, auto-typed |
| **Route protection** | `proxy.ts` — auto-redirects unauthenticated users |
| **i18n** | 8 locales built-in |

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start dev server |
| `npm run build` | Production build |
| `npm start` | Start production server |
| `npm run lint` | Run ESLint |
| `npm run typecheck` | TypeScript type checking |
| `npm test` | Run unit tests |
| `npm run generate:page` | Generate new page |
| `npm run generate:component` | Generate new component |
| `npm run generate:module` | Generate new module |

## Environment Variables

```env
NEXT_PUBLIC_API_URL=http://localhost:4000/api    # Your backend API URL
NEXT_PUBLIC_APP_URL=http://localhost:3000         # Frontend URL
NEXT_PUBLIC_APP_NAME=My App                      # App name
```

See `.env.example` for all available options.

## Docker

```bash
docker compose up -d          # Run production
docker compose --profile dev up  # Run development
```
