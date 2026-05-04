'use client';

import { useState, useMemo } from 'react';
import {
  Shield,
  Search,
  Filter,
  Download,
  ChevronDown,
  ChevronRight,
  CheckCircle,
  XCircle,
  AlertTriangle,
  Clock,
  User,
  Globe,
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import type { AuditLogEntry } from '@/types/audit';

const sampleAuditLogs: AuditLogEntry[] = [
  {
    id: '1',
    action: 'user.login',
    resource: 'auth',
    userId: 'usr_001',
    userName: 'John Doe',
    userEmail: 'john@example.com',
    ipAddress: '192.168.1.100',
    status: 'success',
    timestamp: '2024-01-15T10:30:00Z',
  },
  {
    id: '2',
    action: 'user.create',
    resource: 'users',
    resourceId: 'usr_042',
    userId: 'usr_001',
    userName: 'John Doe',
    userEmail: 'john@example.com',
    ipAddress: '192.168.1.100',
    metadata: { role: 'member', team: 'Engineering' },
    status: 'success',
    timestamp: '2024-01-15T10:25:00Z',
  },
  {
    id: '3',
    action: 'settings.update',
    resource: 'settings',
    userId: 'usr_002',
    userName: 'Jane Smith',
    userEmail: 'jane@example.com',
    ipAddress: '10.0.0.50',
    metadata: { field: 'mfa_enabled', oldValue: false, newValue: true },
    status: 'success',
    timestamp: '2024-01-15T09:45:00Z',
  },
  {
    id: '4',
    action: 'user.delete',
    resource: 'users',
    resourceId: 'usr_015',
    userId: 'usr_003',
    userName: 'Admin User',
    userEmail: 'admin@example.com',
    ipAddress: '172.16.0.1',
    status: 'failure',
    metadata: { reason: 'Insufficient permissions' },
    timestamp: '2024-01-15T09:30:00Z',
  },
  {
    id: '5',
    action: 'billing.upgrade',
    resource: 'billing',
    userId: 'usr_001',
    userName: 'John Doe',
    userEmail: 'john@example.com',
    ipAddress: '192.168.1.100',
    metadata: { plan: 'professional', previousPlan: 'starter' },
    status: 'success',
    timestamp: '2024-01-15T08:15:00Z',
  },
  {
    id: '6',
    action: 'api_key.create',
    resource: 'api_keys',
    userId: 'usr_002',
    userName: 'Jane Smith',
    userEmail: 'jane@example.com',
    ipAddress: '10.0.0.50',
    metadata: { keyName: 'Production API Key' },
    status: 'success',
    timestamp: '2024-01-14T16:00:00Z',
  },
  {
    id: '7',
    action: 'user.login',
    resource: 'auth',
    userId: 'usr_005',
    userName: 'Unknown',
    userEmail: 'attacker@evil.com',
    ipAddress: '203.0.113.42',
    status: 'failure',
    metadata: { reason: 'Invalid credentials', attempts: 5 },
    timestamp: '2024-01-14T14:30:00Z',
  },
  {
    id: '8',
    action: 'role.update',
    resource: 'roles',
    resourceId: 'usr_010',
    userId: 'usr_001',
    userName: 'John Doe',
    userEmail: 'john@example.com',
    ipAddress: '192.168.1.100',
    metadata: { oldRole: 'viewer', newRole: 'admin' },
    status: 'warning',
    timestamp: '2024-01-14T12:00:00Z',
  },
  {
    id: '9',
    action: 'plugin.install',
    resource: 'plugins',
    resourceId: 'plg_analytics',
    userId: 'usr_002',
    userName: 'Jane Smith',
    userEmail: 'jane@example.com',
    ipAddress: '10.0.0.50',
    metadata: { pluginName: 'Advanced Analytics' },
    status: 'success',
    timestamp: '2024-01-14T11:00:00Z',
  },
  {
    id: '10',
    action: 'data.export',
    resource: 'data',
    userId: 'usr_003',
    userName: 'Admin User',
    userEmail: 'admin@example.com',
    ipAddress: '172.16.0.1',
    metadata: { format: 'csv', records: 15000 },
    status: 'success',
    timestamp: '2024-01-14T10:00:00Z',
  },
];

const statusConfig = {
  success: { icon: CheckCircle, className: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' },
  failure: { icon: XCircle, className: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400' },
  warning: { icon: AlertTriangle, className: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400' },
};

function formatTimestamp(ts: string): string {
  const date = new Date(ts);
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}

function AuditRow({ entry }: { entry: AuditLogEntry }) {
  const [expanded, setExpanded] = useState(false);
  const status = statusConfig[entry.status];
  const StatusIcon = status.icon;

  return (
    <div className="border-b last:border-b-0">
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full flex items-center gap-4 px-4 py-3 hover:bg-muted/50 transition-colors text-left"
        aria-expanded={expanded}
      >
        <div className="shrink-0">
          {expanded ? (
            <ChevronDown className="h-4 w-4 text-muted-foreground" aria-hidden="true" />
          ) : (
            <ChevronRight className="h-4 w-4 text-muted-foreground" aria-hidden="true" />
          )}
        </div>

        <Badge variant="outline" className={status.className}>
          <StatusIcon className="h-3 w-3 mr-1" aria-hidden="true" />
          {entry.status}
        </Badge>

        <span className="font-mono text-sm font-medium min-w-[160px]">
          {entry.action}
        </span>

        <span className="text-sm text-muted-foreground flex items-center gap-1 min-w-[140px]">
          <User className="h-3 w-3" aria-hidden="true" />
          {entry.userName}
        </span>

        <span className="text-sm text-muted-foreground flex-1 hidden md:block">
          {entry.resource}
          {entry.resourceId && <span className="opacity-60">/{entry.resourceId}</span>}
        </span>

        <span className="text-xs text-muted-foreground flex items-center gap-1 whitespace-nowrap">
          <Clock className="h-3 w-3" aria-hidden="true" />
          {formatTimestamp(entry.timestamp)}
        </span>
      </button>

      {expanded && (
        <div className="px-4 pb-4 pl-12 space-y-2 animate-in slide-in-from-top-1 duration-150">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
            <div className="flex items-center gap-2 text-muted-foreground">
              <User className="h-3.5 w-3.5" aria-hidden="true" />
              <span>{entry.userEmail}</span>
            </div>
            {entry.ipAddress && (
              <div className="flex items-center gap-2 text-muted-foreground">
                <Globe className="h-3.5 w-3.5" aria-hidden="true" />
                <span>{entry.ipAddress}</span>
              </div>
            )}
          </div>
          {entry.metadata && Object.keys(entry.metadata).length > 0 && (
            <div className="rounded-md bg-muted/50 p-3 font-mono text-xs">
              <pre className="whitespace-pre-wrap text-muted-foreground">
                {JSON.stringify(entry.metadata, null, 2)}
              </pre>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default function AuditLogPage() {
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [resourceFilter, setResourceFilter] = useState<string>('all');

  const resources = useMemo(
    () => [...new Set(sampleAuditLogs.map((l) => l.resource))],
    []
  );

  const filteredLogs = useMemo(() => {
    return sampleAuditLogs.filter((log) => {
      if (statusFilter !== 'all' && log.status !== statusFilter) return false;
      if (resourceFilter !== 'all' && log.resource !== resourceFilter) return false;
      if (search) {
        const q = search.toLowerCase();
        return (
          log.action.toLowerCase().includes(q) ||
          log.userName.toLowerCase().includes(q) ||
          log.userEmail.toLowerCase().includes(q) ||
          log.resource.toLowerCase().includes(q)
        );
      }
      return true;
    });
  }, [search, statusFilter, resourceFilter]);

  const stats = useMemo(() => ({
    total: sampleAuditLogs.length,
    success: sampleAuditLogs.filter((l) => l.status === 'success').length,
    failure: sampleAuditLogs.filter((l) => l.status === 'failure').length,
    warning: sampleAuditLogs.filter((l) => l.status === 'warning').length,
  }), []);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight flex items-center gap-2">
            <Shield className="h-8 w-8" aria-hidden="true" />
            Audit Log
          </h1>
          <p className="text-muted-foreground">
            Track all actions and changes across your platform.
          </p>
        </div>
        <Button variant="outline" size="sm">
          <Download className="h-4 w-4 mr-1" aria-hidden="true" />
          Export
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Events</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.total}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-green-600">Successful</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{stats.success}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-red-600">Failed</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">{stats.failure}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-yellow-600">Warnings</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">{stats.warning}</div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search by action, user, or resource..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-9"
              />
            </div>
            <div className="flex gap-2">
              <div className="relative">
                <Filter className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="h-9 rounded-md border bg-background pl-8 pr-8 text-sm"
                  aria-label="Filter by status"
                >
                  <option value="all">All Status</option>
                  <option value="success">Success</option>
                  <option value="failure">Failure</option>
                  <option value="warning">Warning</option>
                </select>
              </div>
              <select
                value={resourceFilter}
                onChange={(e) => setResourceFilter(e.target.value)}
                className="h-9 rounded-md border bg-background px-3 text-sm"
                aria-label="Filter by resource"
              >
                <option value="all">All Resources</option>
                {resources.map((r) => (
                  <option key={r} value={r}>
                    {r}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <div className="divide-y">
            {filteredLogs.length > 0 ? (
              filteredLogs.map((entry) => (
                <AuditRow key={entry.id} entry={entry} />
              ))
            ) : (
              <div className="py-12 text-center text-sm text-muted-foreground">
                No audit log entries found matching your filters.
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
