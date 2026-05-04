import type { Meta, StoryObj } from '@storybook/react-webpack5';
import { PageLoader, Spinner, TableSkeleton, CardSkeleton, FormSkeleton, ChartSkeleton, StatCardSkeleton } from './loaders';

const meta: Meta = {
  title: 'UI/Loaders',
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj;

export const SpinnerSizes: Story = {
  render: () => (
    <div className="flex items-center gap-6">
      <div className="text-center space-y-2">
        <Spinner size="sm" />
        <p className="text-xs text-muted-foreground">Small</p>
      </div>
      <div className="text-center space-y-2">
        <Spinner size="md" />
        <p className="text-xs text-muted-foreground">Medium</p>
      </div>
      <div className="text-center space-y-2">
        <Spinner size="lg" />
        <p className="text-xs text-muted-foreground">Large</p>
      </div>
    </div>
  ),
};

export const FullPageLoader: Story = {
  render: () => <PageLoader message="Loading dashboard..." />,
};

export const TableSkeletonStory: Story = {
  name: 'Table Skeleton',
  render: () => (
    <div className="w-[600px]">
      <TableSkeleton rows={5} cols={4} />
    </div>
  ),
};

export const CardSkeletonStory: Story = {
  name: 'Card Skeleton',
  render: () => (
    <div className="w-[800px]">
      <CardSkeleton count={3} />
    </div>
  ),
};

export const FormSkeletonStory: Story = {
  name: 'Form Skeleton',
  render: () => (
    <div className="w-[400px]">
      <FormSkeleton fields={4} />
    </div>
  ),
};

export const ChartSkeletonStory: Story = {
  name: 'Chart Skeleton',
  render: () => (
    <div className="w-[600px]">
      <ChartSkeleton />
    </div>
  ),
};

export const StatCardSkeletonStory: Story = {
  name: 'Stat Card Skeleton',
  render: () => (
    <div className="w-[900px]">
      <StatCardSkeleton count={4} />
    </div>
  ),
};
