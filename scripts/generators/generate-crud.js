#!/usr/bin/env node
/* eslint-disable @typescript-eslint/no-require-imports */

const fs = require('fs');
const path = require('path');

const [, , resourceName, section = 'dashboard'] = process.argv;

if (!resourceName) {
  console.error('Usage: node generate-crud.js <ResourceName> [section]');
  console.error('Example: node generate-crud.js Products dashboard');
  console.error('');
  console.error('Generates:');
  console.error('  - List page with DataTable, search, pagination');
  console.error('  - Create/Edit modal with SmartForm + Zod validation');
  console.error('  - RTK Query API endpoints (CRUD)');
  console.error('  - TypeScript types');
  process.exit(1);
}

const singular = resourceName.endsWith('s')
  ? resourceName.slice(0, -1)
  : resourceName;
const plural = resourceName.endsWith('s')
  ? resourceName
  : resourceName + 's';

const kebabPlural = plural.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
const kebabSingular = singular.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
const camelSingular = singular.charAt(0).toLowerCase() + singular.slice(1);
const camelPlural = plural.charAt(0).toLowerCase() + plural.slice(1);
const titleSingular = singular.replace(/([A-Z])/g, ' $1').trim();
const titlePlural = plural.replace(/([A-Z])/g, ' $1').trim();

const pageDir = path.join(process.cwd(), 'src', 'app', section, kebabPlural);
const endpointDir = path.join(process.cwd(), 'src', 'store', 'endpoints');
const typeDir = path.join(process.cwd(), 'src', 'types');

if (fs.existsSync(pageDir)) {
  console.error(`Page directory already exists: ${pageDir}`);
  process.exit(1);
}

fs.mkdirSync(pageDir, { recursive: true });
fs.mkdirSync(endpointDir, { recursive: true });

// 1. Generate types
const typesContent = `export interface ${singular} {
  id: string;
  name: string;
  description?: string;
  status: 'active' | 'inactive' | 'draft';
  createdAt: string;
  updatedAt: string;
  [key: string]: unknown;
}

export interface Create${singular}Input {
  name: string;
  description?: string;
  status?: 'active' | 'inactive' | 'draft';
}

export interface Update${singular}Input extends Partial<Create${singular}Input> {
  id: string;
}
`;

const typesPath = path.join(typeDir, `${kebabSingular}.ts`);
if (!fs.existsSync(typesPath)) {
  fs.writeFileSync(typesPath, typesContent);
  console.log(`Types created: ${typesPath}`);
}

// 2. Generate RTK Query API endpoints
const apiContent = `import { apiSlice } from '../api';
import type { ApiResponse, PaginatedResponse, QueryParams } from '@/types/api';
import type { ${singular}, Create${singular}Input, Update${singular}Input } from '@/types/${kebabSingular}';

// NOTE: Add '${plural}' to tagTypes in src/store/api.ts for cache invalidation:
//   tagTypes: [...existing, '${plural}'],

export const ${camelSingular}Api = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    get${plural}: builder.query<PaginatedResponse<${singular}>, QueryParams | void>({
      query: (params) => ({
        url: '/${kebabPlural}',
        params: params ?? undefined,
      }),
    }),

    get${singular}: builder.query<ApiResponse<${singular}>, string>({
      query: (id) => \`/${kebabPlural}/\${id}\`,
    }),

    create${singular}: builder.mutation<ApiResponse<${singular}>, Create${singular}Input>({
      query: (body) => ({
        url: '/${kebabPlural}',
        method: 'POST',
        body,
      }),
    }),

    update${singular}: builder.mutation<ApiResponse<${singular}>, { id: string; data: Update${singular}Input }>({
      query: ({ id, data }) => ({
        url: \`/${kebabPlural}/\${id}\`,
        method: 'PATCH',
        body: data,
      }),
    }),

    delete${singular}: builder.mutation<ApiResponse<void>, string>({
      query: (id) => ({
        url: \`/${kebabPlural}/\${id}\`,
        method: 'DELETE',
      }),
    }),
  }),
});

export const {
  useGet${plural}Query,
  useGet${singular}Query,
  useCreate${singular}Mutation,
  useUpdate${singular}Mutation,
  useDelete${singular}Mutation,
} = ${camelSingular}Api;
`;

fs.writeFileSync(path.join(endpointDir, `${camelSingular}Api.ts`), apiContent);
console.log(`API endpoints created: ${endpointDir}/${camelSingular}Api.ts`);

// 3. Generate page with DataTable + modal
const pageContent = `'use client';

import { useState, useMemo } from 'react';
import { z } from 'zod';
import { DataTable } from '@/components/tables/data-table';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { SmartForm } from '@/components/forms/smart-form';
import { Alert } from '@/components/ui/alert';
import { modal } from '@/lib/modal';
import { toast } from '@/lib/toast';
import { confirm } from '@/lib/modal';
import { Plus, Pencil, Trash2 } from 'lucide-react';
import type { TableColumn } from '@/types/common';
import type { ${singular} } from '@/types/${kebabSingular}';

const ${camelSingular}Schema = z.object({
  name: z.string().min(1, 'Name is required').max(100),
  description: z.string().optional(),
  status: z.enum(['active', 'inactive', 'draft']).default('active'),
});

type ${singular}FormData = z.infer<typeof ${camelSingular}Schema>;

// Sample data — replace with RTK Query hooks:
// import { useGet${plural}Query, useCreate${singular}Mutation, ... } from '@/store/endpoints/${camelSingular}Api';
const sampleData: ${singular}[] = [
  { id: '1', name: 'Sample ${titleSingular} 1', description: 'Description here', status: 'active', createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
  { id: '2', name: 'Sample ${titleSingular} 2', status: 'draft', createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
  { id: '3', name: 'Sample ${titleSingular} 3', description: 'Another item', status: 'inactive', createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
];

const statusVariant: Record<string, 'default' | 'secondary' | 'destructive' | 'outline'> = {
  active: 'default',
  inactive: 'destructive',
  draft: 'secondary',
};

export default function ${plural}Page() {
  const [data, setData] = useState<${singular}[]>(sampleData);

  // Replace with: const { data = [], isLoading } = useGet${plural}Query({});
  // Replace with: const [create${singular}] = useCreate${singular}Mutation();
  // Replace with: const [update${singular}] = useUpdate${singular}Mutation();
  // Replace with: const [delete${singular}] = useDelete${singular}Mutation();

  const columns = useMemo<TableColumn<${singular}>[]>(() => [
    { key: 'name', header: 'Name', sortable: true },
    { key: 'description', header: 'Description', sortable: false },
    {
      key: 'status',
      header: 'Status',
      sortable: true,
      render: (value) => (
        <Badge variant={statusVariant[value as string] ?? 'outline'}>
          {String(value)}
        </Badge>
      ),
    },
    {
      key: 'createdAt',
      header: 'Created',
      sortable: true,
      render: (value) => new Date(String(value)).toLocaleDateString(),
    },
    {
      key: 'id',
      header: 'Actions',
      sortable: false,
      align: 'right',
      render: (_value, row) => (
        <div className="flex justify-end gap-2">
          <Button
            variant="ghost"
            size="icon-sm"
            onClick={(e) => { e.stopPropagation(); openEditModal(row); }}
          >
            <Pencil className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon-sm"
            onClick={(e) => { e.stopPropagation(); handleDelete(row); }}
          >
            <Trash2 className="h-4 w-4 text-red-500" />
          </Button>
        </div>
      ),
    },
  ], []);

  function openCreateModal() {
    modal.open(
      <SmartForm<${singular}FormData>
        fields={[
          { name: 'name', label: 'Name', type: 'text', required: true, placeholder: 'Enter name', autoFocus: true },
          { name: 'description', label: 'Description', type: 'textarea', placeholder: 'Optional description' },
          { name: 'status', label: 'Status', type: 'select', options: [
            { label: 'Active', value: 'active' },
            { label: 'Inactive', value: 'inactive' },
            { label: 'Draft', value: 'draft' },
          ]},
        ]}
        schema={${camelSingular}Schema}
        defaultValues={{ status: 'active' }}
        onSubmit={(formData) => {
          // Replace with: await create${singular}(formData).unwrap();
          const new${singular}: ${singular} = {
            id: String(Date.now()),
            ...formData,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
          };
          setData((prev) => [...prev, new${singular}]);
          toast.success('${titleSingular} created successfully');
          modal.close('');
        }}
        submitText="Create ${titleSingular}"
      />,
      { title: 'Create ${titleSingular}', size: 'md' }
    );
  }

  function openEditModal(item: ${singular}) {
    modal.open(
      <SmartForm<${singular}FormData>
        fields={[
          { name: 'name', label: 'Name', type: 'text', required: true, autoFocus: true },
          { name: 'description', label: 'Description', type: 'textarea' },
          { name: 'status', label: 'Status', type: 'select', options: [
            { label: 'Active', value: 'active' },
            { label: 'Inactive', value: 'inactive' },
            { label: 'Draft', value: 'draft' },
          ]},
        ]}
        schema={${camelSingular}Schema}
        defaultValues={{
          name: item.name,
          description: item.description ?? '',
          status: item.status,
        }}
        onSubmit={(formData) => {
          // Replace with: await update${singular}({ id: item.id, ...formData }).unwrap();
          setData((prev) =>
            prev.map((d) => d.id === item.id ? { ...d, ...formData, updatedAt: new Date().toISOString() } : d)
          );
          toast.success('${titleSingular} updated successfully');
          modal.close('');
        }}
        submitText="Update ${titleSingular}"
      />,
      { title: 'Edit ${titleSingular}', size: 'md' }
    );
  }

  async function handleDelete(item: ${singular}) {
    const ok = await confirm(
      'Delete ${titleSingular}',
      \`Are you sure you want to delete "\${item.name}"? This action cannot be undone.\`,
      { variant: 'destructive', confirmText: 'Delete' }
    );
    if (ok) {
      // Replace with: await delete${singular}(item.id).unwrap();
      setData((prev) => prev.filter((d) => d.id !== item.id));
      toast.success('${titleSingular} deleted');
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">${titlePlural}</h1>
          <p className="text-muted-foreground">Manage your ${titlePlural.toLowerCase()}.</p>
        </div>
        <Button onClick={openCreateModal}>
          <Plus className="mr-2 h-4 w-4" /> Add ${titleSingular}
        </Button>
      </div>

      {data.length === 0 && (
        <Alert variant="info" title="No ${titlePlural.toLowerCase()} yet">
          Get started by creating your first ${titleSingular.toLowerCase()}.
        </Alert>
      )}

      <DataTable
        data={data}
        columns={columns}
        searchable
        searchPlaceholder="Search ${titlePlural.toLowerCase()}..."
        pagination
        pageSize={10}
      />
    </div>
  );
}
`;

fs.writeFileSync(path.join(pageDir, 'page.tsx'), pageContent);
console.log(`Page created: ${pageDir}/page.tsx`);

console.log('');
console.log(`✓ CRUD scaffold for "${plural}" generated successfully!`);
console.log('');
console.log('Files created:');
console.log(`  ${typesPath}`);
console.log(`  ${endpointDir}/${camelSingular}Api.ts`);
console.log(`  ${pageDir}/page.tsx`);
console.log('');
console.log('Next steps:');
console.log(`  1. Visit /${section}/${kebabPlural} to see the page`);
console.log(`  2. Connect to real API by uncommenting RTK Query hooks in page.tsx`);
console.log(`  3. Update the ${singular} type in src/types/${kebabSingular}.ts to match your API`);
console.log(`  4. Customize the form fields and table columns as needed`);
