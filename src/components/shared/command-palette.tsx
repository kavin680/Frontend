'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { Command } from 'cmdk';
import {
  LayoutDashboard,
  Settings,
  Users,
  CreditCard,
  BarChart3,
  Puzzle,
  Bell,
  Search,
  Sun,
  Moon,
  LogOut,
  FileText,
  Home,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useAuth } from '@/hooks/use-auth';
import { useTheme } from 'next-themes';

interface CommandItem {
  id: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  action: () => void;
  group: string;
  keywords?: string[];
}

export function CommandPalette() {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const { logout } = useAuth();
  const { setTheme, theme } = useTheme();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setOpen((prev) => !prev);
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  const runAction = useCallback(
    (action: () => void) => {
      setOpen(false);
      action();
    },
    []
  );

  const commands: CommandItem[] = [
    {
      id: 'home',
      label: 'Go to Home',
      icon: Home,
      action: () => router.push('/'),
      group: 'Navigation',
      keywords: ['landing', 'main'],
    },
    {
      id: 'dashboard',
      label: 'Go to Dashboard',
      icon: LayoutDashboard,
      action: () => router.push('/dashboard'),
      group: 'Navigation',
      keywords: ['overview', 'home'],
    },
    {
      id: 'settings',
      label: 'Go to Settings',
      icon: Settings,
      action: () => router.push('/dashboard/settings'),
      group: 'Navigation',
      keywords: ['preferences', 'config'],
    },
    {
      id: 'admin',
      label: 'Go to Admin',
      icon: Users,
      action: () => router.push('/dashboard/admin'),
      group: 'Navigation',
      keywords: ['users', 'management'],
    },
    {
      id: 'billing',
      label: 'Go to Billing',
      icon: CreditCard,
      action: () => router.push('/dashboard/billing'),
      group: 'Navigation',
      keywords: ['pricing', 'plans', 'subscription'],
    },
    {
      id: 'analytics',
      label: 'Go to Analytics',
      icon: BarChart3,
      action: () => router.push('/dashboard/analytics'),
      group: 'Navigation',
      keywords: ['metrics', 'reports', 'charts'],
    },
    {
      id: 'plugins',
      label: 'Go to Plugins',
      icon: Puzzle,
      action: () => router.push('/dashboard/plugins'),
      group: 'Navigation',
      keywords: ['marketplace', 'extensions'],
    },
    {
      id: 'notifications',
      label: 'Go to Notifications',
      icon: Bell,
      action: () => router.push('/dashboard/notifications'),
      group: 'Navigation',
      keywords: ['alerts', 'messages'],
    },
    {
      id: 'theme-light',
      label: 'Switch to Light Mode',
      icon: Sun,
      action: () => setTheme('light'),
      group: 'Actions',
      keywords: ['theme', 'appearance'],
    },
    {
      id: 'theme-dark',
      label: 'Switch to Dark Mode',
      icon: Moon,
      action: () => setTheme('dark'),
      group: 'Actions',
      keywords: ['theme', 'appearance'],
    },
    {
      id: 'docs',
      label: 'View Documentation',
      icon: FileText,
      action: () => window.open('/docs', '_blank'),
      group: 'Actions',
      keywords: ['help', 'guide'],
    },
    {
      id: 'logout',
      label: 'Log Out',
      icon: LogOut,
      action: () => logout(),
      group: 'Account',
      keywords: ['sign out', 'exit'],
    },
  ];

  // Filter out the current theme option
  const filteredCommands = commands.filter((cmd) => {
    if (cmd.id === 'theme-light' && theme === 'light') return false;
    if (cmd.id === 'theme-dark' && theme === 'dark') return false;
    return true;
  });

  const groups = [...new Set(filteredCommands.map((c) => c.group))];

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-start justify-center pt-[20vh]">
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm animate-in fade-in duration-150"
        onClick={() => setOpen(false)}
        aria-hidden="true"
      />
      <div
        className="relative w-full max-w-lg mx-4 animate-in zoom-in-95 slide-in-from-top-2 duration-200"
        role="dialog"
        aria-modal="true"
        aria-label="Command palette"
      >
        <Command
          className="rounded-xl border bg-popover shadow-2xl overflow-hidden"
          loop
        >
          <div className="flex items-center gap-2 border-b px-3">
            <Search className="h-4 w-4 text-muted-foreground shrink-0" aria-hidden="true" />
            <Command.Input
              placeholder="Type a command or search..."
              className="flex h-12 w-full bg-transparent text-sm outline-none placeholder:text-muted-foreground"
              autoFocus
            />
            <kbd className="hidden sm:inline-flex h-5 items-center gap-1 rounded border bg-muted px-1.5 text-[10px] font-medium text-muted-foreground">
              ESC
            </kbd>
          </div>
          <Command.List className="max-h-80 overflow-y-auto p-2">
            <Command.Empty className="py-6 text-center text-sm text-muted-foreground">
              No results found.
            </Command.Empty>
            {groups.map((group) => (
              <Command.Group key={group} heading={group} className="[&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:py-1.5 [&_[cmdk-group-heading]]:text-xs [&_[cmdk-group-heading]]:font-medium [&_[cmdk-group-heading]]:text-muted-foreground">
                {filteredCommands
                  .filter((c) => c.group === group)
                  .map((cmd) => {
                    const Icon = cmd.icon;
                    return (
                      <Command.Item
                        key={cmd.id}
                        value={`${cmd.label} ${cmd.keywords?.join(' ') ?? ''}`}
                        onSelect={() => runAction(cmd.action)}
                        className={cn(
                          'flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm cursor-pointer',
                          'aria-selected:bg-accent aria-selected:text-accent-foreground',
                          'hover:bg-accent/50 transition-colors'
                        )}
                      >
                        <Icon className="h-4 w-4 text-muted-foreground" aria-hidden="true" />
                        <span>{cmd.label}</span>
                      </Command.Item>
                    );
                  })}
              </Command.Group>
            ))}
          </Command.List>
          <div className="border-t px-3 py-2 text-xs text-muted-foreground flex items-center gap-4">
            <span className="flex items-center gap-1">
              <kbd className="rounded border bg-muted px-1 text-[10px]">↑↓</kbd> Navigate
            </span>
            <span className="flex items-center gap-1">
              <kbd className="rounded border bg-muted px-1 text-[10px]">↵</kbd> Select
            </span>
            <span className="flex items-center gap-1">
              <kbd className="rounded border bg-muted px-1 text-[10px]">Esc</kbd> Close
            </span>
          </div>
        </Command>
      </div>
    </div>
  );
}
