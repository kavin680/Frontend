import type { Meta, StoryObj } from '@storybook/react-webpack5';
import { DataTable } from './data-table';
import type { TableColumn } from '@/types/common';

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  status: string;
  [key: string]: unknown;
}

const sampleData: User[] = [
  { id: 1, name: 'Alice Johnson', email: 'alice@example.com', role: 'Admin', status: 'Active' },
  { id: 2, name: 'Bob Smith', email: 'bob@example.com', role: 'Member', status: 'Active' },
  { id: 3, name: 'Carol White', email: 'carol@example.com', role: 'Manager', status: 'Inactive' },
  { id: 4, name: 'David Brown', email: 'david@example.com', role: 'Viewer', status: 'Active' },
  { id: 5, name: 'Eve Davis', email: 'eve@example.com', role: 'Admin', status: 'Active' },
  { id: 6, name: 'Frank Miller', email: 'frank@example.com', role: 'Member', status: 'Pending' },
  { id: 7, name: 'Grace Lee', email: 'grace@example.com', role: 'Manager', status: 'Active' },
  { id: 8, name: 'Henry Wilson', email: 'henry@example.com', role: 'Member', status: 'Inactive' },
  { id: 9, name: 'Ivy Moore', email: 'ivy@example.com', role: 'Viewer', status: 'Active' },
  { id: 10, name: 'Jack Taylor', email: 'jack@example.com', role: 'Member', status: 'Active' },
  { id: 11, name: 'Kate Anderson', email: 'kate@example.com', role: 'Admin', status: 'Active' },
  { id: 12, name: 'Leo Thomas', email: 'leo@example.com', role: 'Member', status: 'Pending' },
];

const columns: TableColumn<User>[] = [
  { key: 'name', header: 'Name', sortable: true },
  { key: 'email', header: 'Email', sortable: true },
  { key: 'role', header: 'Role', sortable: true },
  { key: 'status', header: 'Status', sortable: true },
];

const meta: Meta<typeof DataTable<User>> = {
  title: 'Components/DataTable',
  component: DataTable,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof DataTable<User>>;

export const Default: Story = {
  args: { data: sampleData, columns },
};

export const WithSearch: Story = {
  args: { data: sampleData, columns, searchable: true, searchPlaceholder: 'Search users...' },
};

export const WithPagination: Story = {
  args: { data: sampleData, columns, pagination: true, pageSize: 5 },
};

export const FullFeatured: Story = {
  args: {
    data: sampleData,
    columns,
    searchable: true,
    pagination: true,
    pageSize: 5,
    striped: true,
    hoverable: true,
  },
};

export const Loading: Story = {
  args: { data: [], columns, isLoading: true },
};

export const Empty: Story = {
  args: { data: [], columns, emptyMessage: 'No users found.' },
};
