#!/usr/bin/env node
/* eslint-disable @typescript-eslint/no-require-imports */

const fs = require('fs');
const path = require('path');

const [, , moduleName] = process.argv;

if (!moduleName) {
  console.error('Usage: node generate-module.js <ModuleName>');
  console.error('Example: node generate-module.js invoicing');
  process.exit(1);
}

const kebabCase = moduleName
  .replace(/([a-z])([A-Z])/g, '$1-$2')
  .toLowerCase();

const pascalCase = kebabCase
  .split('-')
  .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
  .join('');

const moduleDir = path.join(process.cwd(), 'src', 'modules', kebabCase);

if (fs.existsSync(moduleDir)) {
  console.error(`Module already exists: ${moduleDir}`);
  process.exit(1);
}

fs.mkdirSync(moduleDir, { recursive: true });

const files = {
  'index.ts': `export { ${pascalCase}Module } from './module';
export type { ${pascalCase}Config } from './types';
`,
  'types.ts': `export interface ${pascalCase}Config {
  enabled: boolean;
  settings: Record<string, unknown>;
}

export interface ${pascalCase}State {
  isLoading: boolean;
  error: string | null;
  data: unknown[];
}
`,
  'module.ts': `import type { PluginManifest } from '@/types/plugin';
import type { ${pascalCase}Config } from './types';

export const ${pascalCase}Module: PluginManifest = {
  id: '${kebabCase}',
  name: '${pascalCase}',
  version: '1.0.0',
  description: '${pascalCase} module for the enterprise platform.',
  author: 'Enterprise Platform',
  category: 'custom',
  permissions: [],
  routes: [],
  widgets: [],
  menuItems: [
    {
      label: '${pascalCase}',
      path: '/dashboard/${kebabCase}',
      position: 'sidebar',
    },
  ],
};

export function create${pascalCase}(config: ${pascalCase}Config) {
  return {
    ...${pascalCase}Module,
    config,
  };
}
`,
};

Object.entries(files).forEach(([fileName, content]) => {
  fs.writeFileSync(path.join(moduleDir, fileName), content);
});

const pageDir = path.join(process.cwd(), 'src', 'app', 'dashboard', kebabCase);
fs.mkdirSync(pageDir, { recursive: true });

const pageContent = `'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function ${pascalCase}Page() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">${pascalCase}</h1>
        <p className="text-muted-foreground">
          ${pascalCase} module dashboard.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>${pascalCase} Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">Module content goes here.</p>
        </CardContent>
      </Card>
    </div>
  );
}
`;

fs.writeFileSync(path.join(pageDir, 'page.tsx'), pageContent);

console.log(`Module created: ${moduleDir}`);
console.log(`Page created: ${pageDir}/page.tsx`);
console.log(`Route: /dashboard/${kebabCase}`);
