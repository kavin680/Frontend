export interface AuditLogEntry {
  id: string;
  action: string;
  resource: string;
  resourceId?: string;
  userId: string;
  userName: string;
  userEmail: string;
  ipAddress?: string;
  userAgent?: string;
  metadata?: Record<string, unknown>;
  status: 'success' | 'failure' | 'warning';
  timestamp: string;
}

export interface AuditLogFilters {
  action?: string;
  resource?: string;
  userId?: string;
  status?: string;
  startDate?: string;
  endDate?: string;
}
