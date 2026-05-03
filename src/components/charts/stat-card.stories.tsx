import type { Meta, StoryObj } from '@storybook/react-webpack5';
import { StatCard } from './stat-card';
import { Users, DollarSign, Activity, TrendingUp } from 'lucide-react';

const meta: Meta<typeof StatCard> = {
  title: 'Components/StatCard',
  component: StatCard,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof StatCard>;

export const Default: Story = {
  args: {
    title: 'Total Users',
    value: '12,345',
    trend: { value: 12.5, label: 'from last month' },
    icon: Users,
  },
};

export const Dashboard: Story = {
  render: () => (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 w-[900px]">
      <StatCard title="Total Users" value="12,345" trend={{ value: 12.5, label: 'from last month' }} icon={Users} />
      <StatCard title="Revenue" value="$45,678" trend={{ value: 8.2, label: 'from last month' }} icon={DollarSign} />
      <StatCard title="Active Sessions" value="1,234" trend={{ value: -3.1, label: 'from yesterday' }} icon={Activity} />
      <StatCard title="Conversion Rate" value="3.45%" trend={{ value: 0.5, label: 'from last week' }} icon={TrendingUp} />
    </div>
  ),
};

export const NegativeTrend: Story = {
  args: {
    title: 'Bounce Rate',
    value: '45.2%',
    trend: { value: -5.3, label: 'from last week' },
    icon: Activity,
  },
};

export const NoTrend: Story = {
  args: {
    title: 'Total Revenue',
    value: '$123,456',
    description: 'All time',
    icon: DollarSign,
  },
};
