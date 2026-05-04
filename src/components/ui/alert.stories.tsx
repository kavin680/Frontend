import type { Meta, StoryObj } from '@storybook/react-webpack5';
import { Alert } from './alert';
import { Button } from './button';

const meta: Meta<typeof Alert> = {
  title: 'UI/Alert',
  component: Alert,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['success', 'error', 'warning', 'info', 'default'],
    },
    dismissible: { control: 'boolean' },
  },
};

export default meta;
type Story = StoryObj<typeof Alert>;

export const Default: Story = {
  args: { children: 'This is a default alert.' },
};

export const AllVariants: Story = {
  render: () => (
    <div className="space-y-3 w-[500px]">
      <Alert variant="success" title="Success">Operation completed successfully.</Alert>
      <Alert variant="error" title="Error">Something went wrong. Please try again.</Alert>
      <Alert variant="warning" title="Warning">Your session is about to expire.</Alert>
      <Alert variant="info" title="Info">A new update is available.</Alert>
      <Alert variant="default" title="Notice">This is a default alert.</Alert>
    </div>
  ),
};

export const Dismissible: Story = {
  args: {
    variant: 'warning',
    title: 'Heads up!',
    children: 'You can dismiss this alert.',
    dismissible: true,
  },
};

export const WithAction: Story = {
  render: () => (
    <div className="w-[500px]">
      <Alert
        variant="warning"
        title="Session Expiring"
        action={<Button size="sm">Extend Session</Button>}
      >
        Your session will expire in 5 minutes.
      </Alert>
    </div>
  ),
};

export const WithoutTitle: Story = {
  args: {
    variant: 'info',
    children: 'An alert without a title — just content.',
  },
};
