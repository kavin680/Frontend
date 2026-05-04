'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { TrendingUp, TrendingDown, Minus, type LucideIcon } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: string | number;
  description?: string;
  trend?: {
    value: number;
    label?: string;
  };
  icon?: LucideIcon;
  className?: string;
}

export function StatCard({
  title,
  value,
  description,
  trend,
  icon: Icon,
  className,
}: StatCardProps) {
  const TrendIcon =
    trend && trend.value > 0
      ? TrendingUp
      : trend && trend.value < 0
        ? TrendingDown
        : Minus;

  const trendColor =
    trend && trend.value > 0
      ? 'text-green-600 dark:text-green-400'
      : trend && trend.value < 0
        ? 'text-red-600 dark:text-red-400'
        : 'text-muted-foreground';

  return (
    <Card className={cn('', className)}>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">
          {title}
        </CardTitle>
        {Icon && <Icon className="h-4 w-4 text-muted-foreground" />}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        <div className="flex items-center gap-1 mt-1">
          {trend && (
            <>
              <TrendIcon className={cn('h-3 w-3', trendColor)} />
              <span className={cn('text-xs font-medium', trendColor)}>
                {trend.value > 0 ? '+' : ''}
                {trend.value}%
              </span>
            </>
          )}
          {(description ?? trend?.label) && (
            <span className="text-xs text-muted-foreground">
              {description ?? trend?.label}
            </span>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
