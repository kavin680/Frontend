'use client';

import { useState, useCallback, type ReactNode } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { GripVertical, X, Plus, Settings } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface WidgetDefinition {
  id: string;
  title: string;
  description?: string;
  component: ReactNode;
  /** Grid column span: 1 (quarter), 2 (half), 3 (three-quarter), 4 (full) */
  colSpan?: 1 | 2 | 3 | 4;
  /** Minimum height class */
  minHeight?: string;
  /** Whether the widget can be removed */
  removable?: boolean;
}

interface WidgetConfig {
  id: string;
  visible: boolean;
  order: number;
}

interface WidgetSystemProps {
  widgets: WidgetDefinition[];
  /** localStorage key for persisting layout */
  storageKey?: string;
  /** Number of grid columns */
  columns?: 2 | 3 | 4;
  /** Allow editing layout */
  editable?: boolean;
  className?: string;
}

function getInitialConfig(widgets: WidgetDefinition[], storageKey: string): WidgetConfig[] {
  if (typeof window !== 'undefined') {
    try {
      const stored = localStorage.getItem(storageKey);
      if (stored) {
        const parsed = JSON.parse(stored) as WidgetConfig[];
        const existingIds = new Set(widgets.map((w) => w.id));
        const validConfigs = parsed.filter((c) => existingIds.has(c.id));
        const missingWidgets = widgets
          .filter((w) => !validConfigs.some((c) => c.id === w.id))
          .map((w, i) => ({ id: w.id, visible: true, order: validConfigs.length + i }));
        return [...validConfigs, ...missingWidgets];
      }
    } catch {
      // ignore parse errors
    }
  }
  return widgets.map((w, i) => ({ id: w.id, visible: true, order: i }));
}

export function WidgetSystem({
  widgets,
  storageKey = 'dashboard-widget-layout',
  columns = 4,
  editable = true,
  className,
}: WidgetSystemProps) {
  const [config, setConfig] = useState<WidgetConfig[]>(() =>
    getInitialConfig(widgets, storageKey)
  );
  const [editing, setEditing] = useState(false);
  const [draggedId, setDraggedId] = useState<string | null>(null);

  const saveConfig = useCallback(
    (newConfig: WidgetConfig[]) => {
      setConfig(newConfig);
      if (typeof window !== 'undefined') {
        localStorage.setItem(storageKey, JSON.stringify(newConfig));
      }
    },
    [storageKey]
  );

  const toggleWidget = useCallback(
    (id: string) => {
      const newConfig = config.map((c) =>
        c.id === id ? { ...c, visible: !c.visible } : c
      );
      saveConfig(newConfig);
    },
    [config, saveConfig]
  );

  const moveWidget = useCallback(
    (fromId: string, toId: string) => {
      const sorted = [...config].sort((a, b) => a.order - b.order);
      const fromIdx = sorted.findIndex((c) => c.id === fromId);
      const toIdx = sorted.findIndex((c) => c.id === toId);
      if (fromIdx === -1 || toIdx === -1) return;

      const [moved] = sorted.splice(fromIdx, 1);
      sorted.splice(toIdx, 0, moved);
      const reordered = sorted.map((c, i) => ({ ...c, order: i }));
      saveConfig(reordered);
    },
    [config, saveConfig]
  );

  const resetLayout = useCallback(() => {
    const defaultConfig = widgets.map((w, i) => ({
      id: w.id,
      visible: true,
      order: i,
    }));
    saveConfig(defaultConfig);
  }, [widgets, saveConfig]);

  const visibleWidgets = config
    .filter((c) => c.visible)
    .sort((a, b) => a.order - b.order)
    .map((c) => widgets.find((w) => w.id === c.id))
    .filter(Boolean) as WidgetDefinition[];

  const hiddenWidgets = config
    .filter((c) => !c.visible)
    .map((c) => widgets.find((w) => w.id === c.id))
    .filter(Boolean) as WidgetDefinition[];

  const colClass = {
    2: 'lg:grid-cols-2',
    3: 'lg:grid-cols-3',
    4: 'lg:grid-cols-4',
  }[columns];

  return (
    <div className={className}>
      {editable && (
        <div className="flex items-center justify-end gap-2 mb-4">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setEditing(!editing)}
          >
            <Settings className="h-4 w-4 mr-1" aria-hidden="true" />
            {editing ? 'Done' : 'Customize'}
          </Button>
          {editing && (
            <Button variant="ghost" size="sm" onClick={resetLayout}>
              Reset Layout
            </Button>
          )}
        </div>
      )}

      {editing && hiddenWidgets.length > 0 && (
        <div className="mb-4 p-3 rounded-lg border border-dashed border-muted-foreground/30 bg-muted/30">
          <p className="text-xs font-medium text-muted-foreground mb-2">
            Hidden widgets — click to add:
          </p>
          <div className="flex flex-wrap gap-2">
            {hiddenWidgets.map((w) => (
              <Button
                key={w.id}
                variant="outline"
                size="sm"
                onClick={() => toggleWidget(w.id)}
              >
                <Plus className="h-3 w-3 mr-1" aria-hidden="true" />
                {w.title}
              </Button>
            ))}
          </div>
        </div>
      )}

      <div className={cn('grid gap-4', colClass)}>
        {visibleWidgets.map((widget) => {
          const spanClass = {
            1: 'col-span-1',
            2: 'lg:col-span-2',
            3: 'lg:col-span-3',
            4: 'lg:col-span-4',
          }[widget.colSpan ?? 1];

          return (
            <div
              key={widget.id}
              className={cn(spanClass, widget.minHeight)}
              draggable={editing}
              onDragStart={() => setDraggedId(widget.id)}
              onDragOver={(e) => e.preventDefault()}
              onDrop={() => {
                if (draggedId && draggedId !== widget.id) {
                  moveWidget(draggedId, widget.id);
                }
                setDraggedId(null);
              }}
              onDragEnd={() => setDraggedId(null)}
            >
              <Card
                className={cn(
                  'h-full transition-all',
                  editing && 'ring-2 ring-dashed ring-muted-foreground/20',
                  draggedId === widget.id && 'opacity-50'
                )}
              >
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium flex items-center gap-2">
                    {editing && (
                      <GripVertical
                        className="h-4 w-4 cursor-grab text-muted-foreground"
                        aria-hidden="true"
                      />
                    )}
                    {widget.title}
                  </CardTitle>
                  {editing && widget.removable !== false && (
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-6 w-6 p-0"
                      onClick={() => toggleWidget(widget.id)}
                      aria-label={`Remove ${widget.title} widget`}
                    >
                      <X className="h-3 w-3" aria-hidden="true" />
                    </Button>
                  )}
                </CardHeader>
                <CardContent>{widget.component}</CardContent>
              </Card>
            </div>
          );
        })}
      </div>
    </div>
  );
}
