'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { DataTable } from '@/components/tables/data-table';
import { Badge } from '@/components/ui/badge';
import type { TableColumn } from '@/types/common';

interface UserRow {
  name: string;
  email: string;
  role: string;
  status: string;
  lastLogin: string;
  [key: string]: unknown;
}

const columns: TableColumn<UserRow>[] = [
  { key: 'name', header: 'Name' },
  { key: 'email', header: 'Email' },
  {
    key: 'role',
    header: 'Role',
    render: (value) => (
      <Badge variant="secondary">{String(value)}</Badge>
    ),
  },
  {
    key: 'status',
    header: 'Status',
    render: (value) => (
      <Badge variant={value === 'Active' ? 'default' : 'outline'}>
        {String(value)}
      </Badge>
    ),
  },
  { key: 'lastLogin', header: 'Last Login' },
];

const mockUsers: UserRow[] = [
  {
    name: 'John Doe',
    email: 'john@company.com',
    role: 'Admin',
    status: 'Active',
    lastLogin: '2 hours ago',
  },
  {
    name: 'Jane Smith',
    email: 'jane@company.com',
    role: 'Manager',
    status: 'Active',
    lastLogin: '5 hours ago',
  },
  {
    name: 'Bob Wilson',
    email: 'bob@company.com',
    role: 'Member',
    status: 'Inactive',
    lastLogin: '3 days ago',
  },
  {
    name: 'Alice Brown',
    email: 'alice@company.com',
    role: 'Viewer',
    status: 'Active',
    lastLogin: '1 hour ago',
  },
];

export default function AdminPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Admin</h1>
        <p className="text-muted-foreground">
          Manage users, teams, roles, and system settings.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Total Users</CardDescription>
            <CardTitle className="text-3xl">248</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-xs text-muted-foreground">+12 this week</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Active Teams</CardDescription>
            <CardTitle className="text-3xl">18</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-xs text-muted-foreground">+2 this month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Roles Defined</CardDescription>
            <CardTitle className="text-3xl">6</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-xs text-muted-foreground">4 custom roles</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Users</CardTitle>
          <CardDescription>
            Manage user accounts and permissions.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <DataTable columns={columns} data={mockUsers} />
        </CardContent>
      </Card>
    </div>
  );
}
