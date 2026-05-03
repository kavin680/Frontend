import type { Meta, StoryObj } from '@storybook/react-webpack5';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from './card';
import { Button } from './button';
import { Input } from './input';
import { Label } from './label';

const meta: Meta<typeof Card> = {
  title: 'UI/Card',
  component: Card,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Card>;

export const Default: Story = {
  render: () => (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>Card Title</CardTitle>
        <CardDescription>Card description goes here.</CardDescription>
      </CardHeader>
      <CardContent>
        <p>Card content with any React components.</p>
      </CardContent>
    </Card>
  ),
};

export const WithForm: Story = {
  render: () => (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>Create Account</CardTitle>
        <CardDescription>Enter your details below.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Name</Label>
            <Input id="name" placeholder="John Doe" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" placeholder="john@example.com" />
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button className="w-full">Create</Button>
      </CardFooter>
    </Card>
  ),
};

export const SmallSize: Story = {
  render: () => (
    <Card size="sm" className="w-[300px]">
      <CardHeader>
        <CardTitle>Compact Card</CardTitle>
        <CardDescription>Smaller padding variant.</CardDescription>
      </CardHeader>
      <CardContent>
        <p>Content with tighter spacing.</p>
      </CardContent>
    </Card>
  ),
};
