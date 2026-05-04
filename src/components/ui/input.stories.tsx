import type { Meta, StoryObj } from '@storybook/react-webpack5';
import { Input } from './input';
import { Label } from './label';

const meta: Meta<typeof Input> = {
  title: 'UI/Input',
  component: Input,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Input>;

export const Default: Story = {
  args: { placeholder: 'Enter text...' },
};

export const WithLabel: Story = {
  render: () => (
    <div className="space-y-2 w-64">
      <Label htmlFor="email">Email</Label>
      <Input id="email" type="email" placeholder="you@example.com" />
    </div>
  ),
};

export const Types: Story = {
  render: () => (
    <div className="space-y-4 w-64">
      <div className="space-y-2">
        <Label>Text</Label>
        <Input type="text" placeholder="Text input" />
      </div>
      <div className="space-y-2">
        <Label>Email</Label>
        <Input type="email" placeholder="Email input" />
      </div>
      <div className="space-y-2">
        <Label>Password</Label>
        <Input type="password" placeholder="Password input" />
      </div>
      <div className="space-y-2">
        <Label>Number</Label>
        <Input type="number" placeholder="0" />
      </div>
    </div>
  ),
};

export const Disabled: Story = {
  args: { placeholder: 'Disabled', disabled: true },
};

export const WithFile: Story = {
  render: () => (
    <div className="space-y-2 w-64">
      <Label htmlFor="file">Upload</Label>
      <Input id="file" type="file" />
    </div>
  ),
};
