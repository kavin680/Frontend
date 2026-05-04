'use client';

import { useState, useMemo } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Skeleton } from '@/components/ui/skeleton';
import { ChevronUp, ChevronDown, ChevronsUpDown, Search, ChevronLeft, ChevronRight } from 'lucide-react';
import type { TableColumn, SortState } from '@/types/common';
import { cn } from '@/lib/utils';

interface DataTableProps<T extends Record<string, unknown>> {
  columns: TableColumn<T>[];
  data: T[];
  isLoading?: boolean;
  emptyMessage?: string;
  onRowClick?: (row: T) => void;
  sortable?: boolean;
  searchable?: boolean;
  searchPlaceholder?: string;
  pagination?: boolean;
  pageSize?: number;
  className?: string;
  striped?: boolean;
  hoverable?: boolean;
}

/**
 * Enhanced data table — pass data + columns, get sorting/filtering/pagination/search.
 *
 * @example
 * ```tsx
 * <DataTable
 *   data={users}
 *   columns={[
 *     { key: 'name', header: 'Name', sortable: true },
 *     { key: 'email', header: 'Email', filterable: true },
 *     { key: 'status', header: 'Status', render: (v) => <Badge>{v}</Badge> },
 *   ]}
 *   searchable
 *   pagination
 *   pageSize={10}
 * />
 * ```
 */
export function DataTable<T extends Record<string, unknown>>({
  columns,
  data,
  isLoading,
  emptyMessage = 'No data available',
  onRowClick,
  sortable = true,
  searchable = false,
  searchPlaceholder = 'Search...',
  pagination = false,
  pageSize = 10,
  className,
  striped = false,
  hoverable = true,
}: DataTableProps<T>) {
  const [sort, setSort] = useState<SortState | null>(null);
  const [search, setSearch] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  const filteredData = useMemo(() => {
    if (!search.trim()) return data;
    const lower = search.toLowerCase();
    return data.filter((row) =>
      columns.some((col) => {
        const val = row[String(col.key)];
        return val != null && String(val).toLowerCase().includes(lower);
      })
    );
  }, [data, search, columns]);

  const sortedData = useMemo(() => {
    if (!sort) return filteredData;
    return [...filteredData].sort((a, b) => {
      const aVal = a[sort.column];
      const bVal = b[sort.column];
      if (aVal === bVal) return 0;
      if (aVal == null) return 1;
      if (bVal == null) return -1;
      const result = aVal < bVal ? -1 : 1;
      return sort.direction === 'asc' ? result : -result;
    });
  }, [filteredData, sort]);

  const totalPages = pagination ? Math.max(1, Math.ceil(sortedData.length / pageSize)) : 1;
  const paginatedData = pagination
    ? sortedData.slice((currentPage - 1) * pageSize, currentPage * pageSize)
    : sortedData;

  const toggleSort = (column: string) => {
    setSort((prev) => {
      if (!prev || prev.column !== column) return { column, direction: 'asc' };
      if (prev.direction === 'asc') return { column, direction: 'desc' };
      return null;
    });
  };

  if (isLoading) {
    return (
      <div className={cn('space-y-3 animate-in fade-in-50 duration-300', className)}>
        {searchable && <Skeleton className="h-10 w-64" />}
        {Array.from({ length: pageSize }).map((_, i) => (
          <Skeleton key={i} className="h-12 w-full" />
        ))}
      </div>
    );
  }

  return (
    <div className={cn('space-y-4 animate-in fade-in-50 duration-300', className)}>
      {searchable && (
        <div className="relative max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setCurrentPage(1);
            }}
            placeholder={searchPlaceholder}
            className="pl-10"
          />
        </div>
      )}

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              {columns.map((col) => (
                <TableHead
                  key={String(col.key)}
                  style={{ width: col.width }}
                  className={cn(
                    col.align === 'center' && 'text-center',
                    col.align === 'right' && 'text-right'
                  )}
                >
                  {sortable && col.sortable !== false ? (
                    <Button
                      variant="ghost"
                      size="sm"
                      className="-ml-3 h-8"
                      onClick={() => toggleSort(String(col.key))}
                    >
                      {col.header}
                      {sort?.column === String(col.key) ? (
                        sort.direction === 'asc' ? (
                          <ChevronUp className="ml-1 h-4 w-4" />
                        ) : (
                          <ChevronDown className="ml-1 h-4 w-4" />
                        )
                      ) : (
                        <ChevronsUpDown className="ml-1 h-4 w-4 opacity-50" />
                      )}
                    </Button>
                  ) : (
                    col.header
                  )}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedData.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center text-muted-foreground"
                >
                  {emptyMessage}
                </TableCell>
              </TableRow>
            ) : (
              paginatedData.map((row, idx) => (
                <TableRow
                  key={idx}
                  onClick={() => onRowClick?.(row)}
                  className={cn(
                    onRowClick && 'cursor-pointer',
                    hoverable && 'hover:bg-muted/50 transition-colors',
                    striped && idx % 2 === 1 && 'bg-muted/25',
                    'animate-in fade-in-50 duration-200',
                  )}
                  style={{ animationDelay: `${idx * 30}ms` }}
                >
                  {columns.map((col) => (
                    <TableCell
                      key={String(col.key)}
                      className={cn(
                        col.align === 'center' && 'text-center',
                        col.align === 'right' && 'text-right'
                      )}
                    >
                      {col.render
                        ? col.render(row[String(col.key)], row)
                        : String(row[String(col.key)] ?? '')}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {pagination && totalPages > 1 && (
        <div className="flex items-center justify-between">
          <p className="text-sm text-muted-foreground">
            Showing {(currentPage - 1) * pageSize + 1}–{Math.min(currentPage * pageSize, sortedData.length)} of {sortedData.length}
          </p>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <span className="text-sm">
              {currentPage} / {totalPages}
            </span>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
