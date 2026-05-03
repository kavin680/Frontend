import type { Meta, StoryObj } from '@storybook/react-webpack5';
import { Button } from './button';
import { Loader2, Mail, Plus, Trash2 } from 'lucide-react';

const meta: Meta<typeof Button> = {
  title: 'UI/Button',
  component: Button,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'outline', 'secondary', 'ghost', 'destructive', 'link'],
    },
    size: {
      control: 'select',
      options: ['default', 'xs', 'sm', 'lg', 'icon', 'icon-xs', 'icon-sm', 'icon-lg'],
    },
    disabled: { control: 'boolean' },
  },
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Default: Story = {
  args: { children: 'Button' },
};

export const Variants: Story = {
  render: () => (
    <div className="flex flex-wrap gap-3">
      <Button variant="default">Default</Button>
      <Button variant="outline">Outline</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="ghost">Ghost</Button>
      <Button variant="destructive">Destructive</Button>
      <Button variant="link">Link</Button>
    </div>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div className="flex items-center gap-3">
      <Button size="xs">Extra Small</Button>
      <Button size="sm">Small</Button>
      <Button size="default">Default</Button>
      <Button size="lg">Large</Button>
    </div>
  ),
};

export const WithIcon: Story = {
  render: () => (
    <div className="flex gap-3">
      <Button><Mail className="mr-2 h-4 w-4" /> Send Email</Button>
      <Button variant="outline"><Plus className="mr-2 h-4 w-4" /> Add Item</Button>
      <Button variant="destructive"><Trash2 className="mr-2 h-4 w-4" /> Delete</Button>
    </div>
  ),
};

export const Loading: Story = {
  render: () => (
    <Button disabled>
      <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Please wait
    </Button>
  ),
};

export const Disabled: Story = {
  args: { children: 'Disabled', disabled: true },
};

export const IconButton: Story = {
  render: () => (
    <div className="flex gap-3">
      <Button size="icon-xs"><Plus className="h-3 w-3" /></Button>
      <Button size="icon-sm"><Plus className="h-4 w-4" /></Button>
      <Button size="icon"><Plus className="h-4 w-4" /></Button>
      <Button size="icon-lg"><Plus className="h-5 w-5" /></Button>
    </div>
  ),
};
