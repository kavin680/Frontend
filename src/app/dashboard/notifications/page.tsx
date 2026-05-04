'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Bell,
  Shield,
  CreditCard,
  Users,
  CheckCheck,
} from 'lucide-react';
import { cn } from '@/lib/utils';

const mockNotifications = [
  {
    id: '1',
    type: 'security',
    title: 'New login detected',
    message: 'A new login was detected from Chrome on macOS.',
    time: '2 minutes ago',
    read: false,
    icon: Shield,
  },
  {
    id: '2',
    type: 'billing',
    title: 'Payment successful',
    message: 'Your monthly subscription payment was processed.',
    time: '1 hour ago',
    read: false,
    icon: CreditCard,
  },
  {
    id: '3',
    type: 'team',
    title: 'New team member',
    message: 'Alice Brown joined the Engineering team.',
    time: '3 hours ago',
    read: true,
    icon: Users,
  },
  {
    id: '4',
    type: 'system',
    title: 'System update',
    message: 'Platform v2.1.0 has been deployed with new features.',
    time: '1 day ago',
    read: true,
    icon: Bell,
  },
];

export default function NotificationsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Notifications</h1>
          <p className="text-muted-foreground">
            Stay updated with your latest activity.
          </p>
        </div>
        <Button variant="outline" size="sm">
          <CheckCheck className="mr-2 h-4 w-4" />
          Mark all as read
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recent Notifications</CardTitle>
        </CardHeader>
        <CardContent className="space-y-1">
          {mockNotifications.map((notification) => (
            <div
              key={notification.id}
              className={cn(
                'flex items-start gap-4 rounded-lg p-4 transition-colors hover:bg-accent',
                !notification.read && 'bg-accent/50'
              )}
            >
              <notification.icon className="h-5 w-5 mt-0.5 text-muted-foreground" />
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <p className="text-sm font-medium">{notification.title}</p>
                  {!notification.read && (
                    <Badge variant="default" className="h-2 w-2 rounded-full p-0" />
                  )}
                </div>
                <p className="text-sm text-muted-foreground">
                  {notification.message}
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  {notification.time}
                </p>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
