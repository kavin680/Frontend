'use client';

import { Users, DollarSign, Activity, TrendingUp } from 'lucide-react';
import { StatCard } from '@/components/charts/stat-card';
import { AreaChartWidget } from '@/components/charts/area-chart-widget';
import { BarChartWidget } from '@/components/charts/bar-chart-widget';

const revenueData = [
  { name: 'Jan', value: 4000 },
  { name: 'Feb', value: 3000 },
  { name: 'Mar', value: 5000 },
  { name: 'Apr', value: 4500 },
  { name: 'May', value: 6000 },
  { name: 'Jun', value: 5500 },
  { name: 'Jul', value: 7000 },
];

const usersData = [
  { name: 'Mon', value: 120 },
  { name: 'Tue', value: 150 },
  { name: 'Wed', value: 180 },
  { name: 'Thu', value: 140 },
  { name: 'Fri', value: 200 },
  { name: 'Sat', value: 90 },
  { name: 'Sun', value: 70 },
];

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">
          Overview of your platform metrics and activity.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Total Users"
          value="2,350"
          trend={{ value: 12.5, label: 'from last month' }}
          icon={Users}
        />
        <StatCard
          title="Revenue"
          value="$45,231"
          trend={{ value: 20.1, label: 'from last month' }}
          icon={DollarSign}
        />
        <StatCard
          title="Active Sessions"
          value="1,247"
          trend={{ value: -3.2, label: 'from last hour' }}
          icon={Activity}
        />
        <StatCard
          title="Conversion Rate"
          value="3.2%"
          trend={{ value: 0.8, label: 'from last week' }}
          icon={TrendingUp}
        />
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <AreaChartWidget
          title="Revenue Overview"
          data={revenueData}
          dataKey="value"
        />
        <BarChartWidget
          title="Active Users"
          data={usersData}
          dataKey="value"
        />
      </div>
    </div>
  );
}
