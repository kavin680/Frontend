'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  BarChart3,
  CreditCard,
  Bell,
  Puzzle,
  Shield,
  Users,
  Settings,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  KeyRound,
  ScrollText,
  UsersRound,
  type LucideIcon,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { usePermissions } from '@/hooks/use-permissions';
import { navigationConfig } from '@/config/navigation';
import type { MenuItem } from '@/types/dashboard';
import type { Permission } from '@/types/auth';
import { Button } from '@/components/ui/button';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';

const iconMap: Record<string, LucideIcon> = {
  LayoutDashboard,
  BarChart3,
  CreditCard,
  Bell,
  Puzzle,
  Shield,
  Users,
  Settings,
  ChevronDown,
  KeyRound,
  ScrollText,
  UsersRound,
};

interface SidebarProps {
  className?: string;
}

export function Sidebar({ className }: SidebarProps) {
  const [collapsed, setCollapsed] = useState(false);
  const [expandedSections, setExpandedSections] = useState<string[]>([]);
  const pathname = usePathname();
  const { hasAnyPermission } = usePermissions();

  const toggleSection = (id: string) => {
    setExpandedSections((prev) =>
      prev.includes(id)
        ? prev.filter((s) => s !== id)
        : [...prev, id]
    );
  };

  const canAccess = (item: MenuItem): boolean => {
    if (!item.permissions || item.permissions.length === 0) return true;
    return hasAnyPermission(item.permissions as Permission[]);
  };

  const renderMenuItem = (item: MenuItem, depth = 0) => {
    if (!canAccess(item)) return null;

    const Icon = item.icon ? iconMap[item.icon] : null;
    const isActive = pathname === item.path;
    const hasChildren = item.children && item.children.length > 0;
    const isExpanded = expandedSections.includes(item.id);

    if (collapsed && depth === 0) {
      return (
        <Tooltip key={item.id}>
          <TooltipTrigger>
            <Link
              href={item.path}
              className={cn(
                'flex items-center justify-center h-10 w-10 rounded-lg mx-auto transition-colors',
                isActive
                  ? 'bg-primary text-primary-foreground'
                  : 'text-muted-foreground hover:bg-accent hover:text-accent-foreground'
              )}
            >
              {Icon && <Icon className="h-5 w-5" />}
            </Link>
          </TooltipTrigger>
          <TooltipContent side="right">
            <p>{item.label}</p>
          </TooltipContent>
        </Tooltip>
      );
    }

    return (
      <div key={item.id}>
        {hasChildren ? (
          <button
            onClick={() => toggleSection(item.id)}
            className={cn(
              'flex items-center w-full gap-3 rounded-lg px-3 py-2 text-sm transition-colors',
              'text-muted-foreground hover:bg-accent hover:text-accent-foreground',
              depth > 0 && 'pl-9'
            )}
          >
            {Icon && <Icon className="h-4 w-4 shrink-0" />}
            <span className="flex-1 text-left">{item.label}</span>
            <ChevronDown
              className={cn(
                'h-4 w-4 transition-transform',
                isExpanded && 'rotate-180'
              )}
            />
          </button>
        ) : (
          <Link
            href={item.path}
            className={cn(
              'flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors',
              isActive
                ? 'bg-primary text-primary-foreground'
                : 'text-muted-foreground hover:bg-accent hover:text-accent-foreground',
              depth > 0 && 'pl-9'
            )}
          >
            {Icon && <Icon className="h-4 w-4 shrink-0" />}
            <span>{item.label}</span>
            {item.badge !== undefined && (
              <span className="ml-auto rounded-full bg-primary/10 px-2 py-0.5 text-xs font-medium text-primary">
                {item.badge}
              </span>
            )}
          </Link>
        )}
        {hasChildren && isExpanded && (
          <div className="mt-1 space-y-1">
            {item.children!.map((child) => renderMenuItem(child, depth + 1))}
          </div>
        )}
      </div>
    );
  };

  return (
    <aside
      className={cn(
        'flex flex-col border-r bg-card transition-all duration-300',
        collapsed ? 'w-16' : 'w-64',
        className
      )}
    >
      <div className="flex items-center justify-between p-4 border-b">
        {!collapsed && (
          <span className="text-lg font-bold text-foreground">Platform</span>
        )}
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8"
          onClick={() => setCollapsed(!collapsed)}
        >
          {collapsed ? (
            <ChevronRight className="h-4 w-4" />
          ) : (
            <ChevronLeft className="h-4 w-4" />
          )}
        </Button>
      </div>

      <nav className="flex-1 overflow-y-auto p-3 space-y-1">
        {navigationConfig.main
          .filter(canAccess)
          .map((item) => renderMenuItem(item))}

        {navigationConfig.secondary.length > 0 && (
          <>
            <div className="my-3 border-t" />
            {navigationConfig.secondary
              .filter(canAccess)
              .map((item) => renderMenuItem(item))}
          </>
        )}
      </nav>

      <div className="border-t p-3 space-y-1">
        {navigationConfig.footer
          .filter(canAccess)
          .map((item) => renderMenuItem(item))}
      </div>
    </aside>
  );
}
