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
import { Check } from 'lucide-react';

const plans = [
  {
    name: 'Starter',
    price: 29,
    description: 'Perfect for small teams getting started.',
    features: [
      '5 team members',
      '10 GB storage',
      'Basic analytics',
      'Email support',
      '1,000 API calls/month',
    ],
  },
  {
    name: 'Professional',
    price: 99,
    description: 'For growing teams that need more power.',
    features: [
      '25 team members',
      '100 GB storage',
      'Advanced analytics',
      'Priority support',
      '50,000 API calls/month',
      'Custom branding',
      'Plugin marketplace',
    ],
    popular: true,
  },
  {
    name: 'Enterprise',
    price: null,
    description: 'For large organizations with custom needs.',
    features: [
      'Unlimited team members',
      'Unlimited storage',
      'Custom analytics',
      'Dedicated support',
      'Unlimited API calls',
      'White-label',
      'SLA guarantee',
      'On-premise option',
    ],
  },
];

export default function BillingPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Billing</h1>
        <p className="text-muted-foreground">
          Manage your subscription and billing settings.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {plans.map((plan) => (
          <Card
            key={plan.name}
            className={plan.popular ? 'border-primary shadow-lg' : ''}
          >
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>{plan.name}</CardTitle>
                {plan.popular && <Badge>Popular</Badge>}
              </div>
              <CardDescription>{plan.description}</CardDescription>
              <div className="mt-4">
                {plan.price ? (
                  <span className="text-4xl font-bold">
                    ${plan.price}
                    <span className="text-sm font-normal text-muted-foreground">
                      /month
                    </span>
                  </span>
                ) : (
                  <span className="text-4xl font-bold">Custom</span>
                )}
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <ul className="space-y-2">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-2 text-sm">
                    <Check className="h-4 w-4 text-green-500" />
                    {feature}
                  </li>
                ))}
              </ul>
              <Button
                className="w-full"
                variant={plan.popular ? 'default' : 'outline'}
              >
                {plan.price ? 'Get Started' : 'Contact Sales'}
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
