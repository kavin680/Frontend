'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import {
  BarChart3,
  CreditCard,
  Users,
  Bell,
  ShieldCheck,
  Brain,
  Store,
  Wrench,
} from 'lucide-react';

const plugins = [
  {
    id: 'analytics',
    name: 'Advanced Analytics',
    description: 'Deep insights with custom dashboards and reporting.',
    icon: BarChart3,
    category: 'Analytics',
    installed: true,
    enabled: true,
  },
  {
    id: 'billing',
    name: 'Billing & Invoicing',
    description: 'Subscription management, invoicing, and payment processing.',
    icon: CreditCard,
    category: 'Billing',
    installed: true,
    enabled: true,
  },
  {
    id: 'crm',
    name: 'CRM Module',
    description: 'Customer relationship management with pipeline tracking.',
    icon: Users,
    category: 'CRM',
    installed: false,
    enabled: false,
  },
  {
    id: 'notifications',
    name: 'Push Notifications',
    description: 'Real-time push notifications across all channels.',
    icon: Bell,
    category: 'Notifications',
    installed: true,
    enabled: false,
  },
  {
    id: 'compliance',
    name: 'Compliance Suite',
    description: 'GDPR, SOC2, and HIPAA compliance tooling.',
    icon: ShieldCheck,
    category: 'Compliance',
    installed: false,
    enabled: false,
  },
  {
    id: 'ai-governance',
    name: 'AI Governance',
    description: 'AI model monitoring, bias detection, and governance.',
    icon: Brain,
    category: 'AI',
    installed: false,
    enabled: false,
  },
  {
    id: 'marketplace',
    name: 'Marketplace',
    description: 'Browse and install third-party plugins and integrations.',
    icon: Store,
    category: 'Marketplace',
    installed: false,
    enabled: false,
  },
  {
    id: 'internal-tools',
    name: 'Internal Tools Builder',
    description: 'Build custom internal tools without code.',
    icon: Wrench,
    category: 'Internal',
    installed: false,
    enabled: false,
  },
];

export default function PluginsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Plugins</h1>
        <p className="text-muted-foreground">
          Extend your platform with modular plugins.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {plugins.map((plugin) => (
          <Card key={plugin.id}>
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="rounded-lg bg-primary/10 p-2">
                    <plugin.icon className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <CardTitle className="text-base">{plugin.name}</CardTitle>
                    <Badge variant="outline" className="mt-1">
                      {plugin.category}
                    </Badge>
                  </div>
                </div>
                {plugin.installed && (
                  <Switch checked={plugin.enabled} />
                )}
              </div>
              <CardDescription className="mt-2">
                {plugin.description}
              </CardDescription>
            </CardHeader>
            <CardContent>
              {plugin.installed ? (
                <Button variant="outline" size="sm" className="w-full">
                  Configure
                </Button>
              ) : (
                <Button size="sm" className="w-full">
                  Install
                </Button>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
