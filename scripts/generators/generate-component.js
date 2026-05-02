#!/usr/bin/env node
/* eslint-disable @typescript-eslint/no-require-imports */

const fs = require('fs');
const path = require('path');

const [, , componentName, category = 'shared'] = process.argv;

if (!componentName) {
  console.error('Usage: node generate-component.js <ComponentName> [category]');
  console.error('Example: node generate-component.js UserCard shared');
  console.error('Categories: ui, forms, tables, charts, layouts, dashboards, auth, admin, analytics, notifications, billing, shared');
  process.exit(1);
}

const kebabCase = componentName
  .replace(/([a-z])([A-Z])/g, '$1-$2')
  .toLowerCase();

const componentDir = path.join(
  process.cwd(),
  'src',
  'components',
  category
);

if (!fs.existsSync(componentDir)) {
  fs.mkdirSync(componentDir, { recursive: true });
}

const filePath = path.join(componentDir, `${kebabCase}.tsx`);

if (fs.existsSync(filePath)) {
  console.error(`Component already exists: ${filePath}`);
  process.exit(1);
}

const componentContent = `'use client';

import { cn } from '@/lib/utils';

interface ${componentName}Props {
  className?: string;
}

export function ${componentName}({ className }: ${componentName}Props) {
  return (
    <div className={cn('', className)}>
      <p>${componentName} component</p>
    </div>
  );
}
`;

fs.writeFileSync(filePath, componentContent);

console.log(`Component created: ${filePath}`);
console.log(`Import: import { ${componentName} } from '@/components/${category}/${kebabCase}';`);
