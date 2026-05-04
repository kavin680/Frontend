export interface DashboardWidget {
  id: string;
  type: WidgetType;
  title: string;
  description?: string;
  config: WidgetConfig;
  position: WidgetPosition;
  permissions?: string[];
}

export type WidgetType =
  | 'stat-card'
  | 'line-chart'
  | 'bar-chart'
  | 'pie-chart'
  | 'area-chart'
  | 'table'
  | 'activity-feed'
  | 'progress'
  | 'custom';

export interface WidgetConfig {
  dataSource?: string;
  refreshInterval?: number;
  chartOptions?: Record<string, unknown>;
  filters?: Record<string, unknown>;
}

export interface WidgetPosition {
  x: number;
  y: number;
  width: number;
  height: number;
}

export interface DashboardLayout {
  id: string;
  name: string;
  widgets: DashboardWidget[];
  isDefault: boolean;
  createdBy: string;
  createdAt: string;
  updatedAt: string;
}

export interface MenuItem {
  id: string;
  label: string;
  icon?: string;
  path: string;
  children?: MenuItem[];
  permissions?: string[];
  badge?: string | number;
  isExternal?: boolean;
  section?: string;
}

export interface NavigationConfig {
  main: MenuItem[];
  secondary: MenuItem[];
  footer: MenuItem[];
}
