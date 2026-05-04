export interface SelectOption<T = string> {
  label: string;
  value: T;
  disabled?: boolean;
  description?: string;
  icon?: string;
}

export interface TableColumn<T = Record<string, unknown>> {
  key: keyof T | string;
  header: string;
  sortable?: boolean;
  filterable?: boolean;
  width?: string;
  align?: 'left' | 'center' | 'right';
  render?: (value: unknown, row: T) => React.ReactNode;
}

export interface SortState {
  column: string;
  direction: 'asc' | 'desc';
}

export interface FilterState {
  field: string;
  operator: 'eq' | 'neq' | 'gt' | 'gte' | 'lt' | 'lte' | 'contains' | 'in';
  value: string | string[] | number;
}

export interface DateRange {
  from: Date;
  to: Date;
}

export interface BreadcrumbItem {
  label: string;
  href?: string;
  icon?: string;
}

export interface FeatureFlag {
  key: string;
  enabled: boolean;
  variant?: string;
  metadata?: Record<string, unknown>;
}

export interface AuditEntry {
  id: string;
  action: string;
  resource: string;
  resourceId: string;
  userId: string;
  userName: string;
  details?: Record<string, unknown>;
  ip?: string;
  timestamp: string;
}
