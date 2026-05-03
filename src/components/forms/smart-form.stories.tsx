import type { Meta, StoryObj } from '@storybook/react-webpack5';
import { SmartForm } from './smart-form';
import { z } from 'zod';

const meta: Meta = {
  title: 'Components/SmartForm',
  component: SmartForm,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj;

const userSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  role: z.string().min(1, 'Please select a role'),
  bio: z.string().optional(),
});

export const BasicForm: Story = {
  render: () => (
    <div className="w-[400px]">
      <SmartForm
        fields={[
          { name: 'name', label: 'Name', type: 'text', required: true, placeholder: 'John Doe' },
          { name: 'email', label: 'Email', type: 'email', required: true, placeholder: 'john@example.com' },
          { name: 'password', label: 'Password', type: 'password', required: true, placeholder: '••••••••' },
        ]}
        onSubmit={(data) => alert(JSON.stringify(data, null, 2))}
        submitText="Create Account"
      />
    </div>
  ),
};

export const WithValidation: Story = {
  render: () => (
    <div className="w-[400px]">
      <SmartForm
        fields={[
          { name: 'name', label: 'Full Name', type: 'text', required: true },
          { name: 'email', label: 'Email', type: 'email', required: true },
          { name: 'role', label: 'Role', type: 'select', required: true, options: [
            { label: 'Admin', value: 'admin' },
            { label: 'Manager', value: 'manager' },
            { label: 'Member', value: 'member' },
          ]},
          { name: 'bio', label: 'Bio', type: 'textarea' },
        ]}
        schema={userSchema}
        onSubmit={(data) => alert(JSON.stringify(data, null, 2))}
        submitText="Save User"
        showReset
      />
    </div>
  ),
};

export const GridLayout: Story = {
  render: () => (
    <div className="w-[600px]">
      <SmartForm
        fields={[
          { name: 'firstName', label: 'First Name', type: 'text', required: true },
          { name: 'lastName', label: 'Last Name', type: 'text', required: true },
          { name: 'email', label: 'Email', type: 'email', required: true },
          { name: 'phone', label: 'Phone', type: 'tel' },
        ]}
        layout="vertical"
        columns={2}
        onSubmit={(data) => alert(JSON.stringify(data, null, 2))}
        submitText="Submit"
      />
    </div>
  ),
};

export const WithSwitchAndCheckbox: Story = {
  render: () => (
    <div className="w-[400px]">
      <SmartForm
        fields={[
          { name: 'name', label: 'Name', type: 'text', required: true },
          { name: 'notifications', label: 'Enable notifications', type: 'switch' },
          { name: 'terms', label: 'I agree to the terms', type: 'checkbox', required: true },
        ]}
        onSubmit={(data) => alert(JSON.stringify(data, null, 2))}
        submitText="Sign Up"
      />
    </div>
  ),
};

export const LoadingState: Story = {
  render: () => (
    <div className="w-[400px]">
      <SmartForm
        fields={[
          { name: 'email', label: 'Email', type: 'email', required: true },
          { name: 'password', label: 'Password', type: 'password', required: true },
        ]}
        onSubmit={() => new Promise((r) => setTimeout(r, 2000))}
        isLoading
        submitText="Logging in..."
      />
    </div>
  ),
};
