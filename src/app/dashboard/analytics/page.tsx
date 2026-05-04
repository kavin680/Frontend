'use client';

import { StatCard } from '@/components/charts/stat-card';
import { AreaChartWidget } from '@/components/charts/area-chart-widget';
import { BarChartWidget } from '@/components/charts/bar-chart-widget';
import { Eye, MousePointer, Clock, ArrowUpRight } from 'lucide-react';

const pageViewsData = [
  { name: 'Week 1', value: 12000 },
  { name: 'Week 2', value: 15000 },
  { name: 'Week 3', value: 13500 },
  { name: 'Week 4', value: 18000 },
];

const topPagesData = [
  { name: '/dashboard', value: 4500 },
  { name: '/analytics', value: 3200 },
  { name: '/settings', value: 2100 },
  { name: '/billing', value: 1800 },
  { name: '/profile', value: 1200 },
];

export default function AnalyticsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Analytics</h1>
        <p className="text-muted-foreground">
          Platform usage analytics and insights.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Page Views"
          value="58,500"
          trend={{ value: 15.3 }}
          icon={Eye}
        />
        <StatCard
          title="Click Rate"
          value="24.3%"
          trend={{ value: 2.1 }}
          icon={MousePointer}
        />
        <StatCard
          title="Avg. Session"
          value="4m 32s"
          trend={{ value: -1.2 }}
          icon={Clock}
        />
        <StatCard
          title="Bounce Rate"
          value="32.1%"
          trend={{ value: -4.5 }}
          icon={ArrowUpRight}
        />
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <AreaChartWidget
          title="Page Views Over Time"
          data={pageViewsData}
          dataKey="value"
        />
        <BarChartWidget
          title="Top Pages"
          data={topPagesData}
          dataKey="value"
        />
      </div>
    </div>
  );
}
