#!/usr/bin/env node
/* eslint-disable @typescript-eslint/no-require-imports */

const fs = require('fs');
const path = require('path');

const [, , pageName, section = 'dashboard'] = process.argv;

if (!pageName) {
  console.error('Usage: node generate-page.js <PageName> [section]');
  console.error('Example: node generate-page.js UserProfile dashboard');
  process.exit(1);
}

const kebabCase = pageName
  .replace(/([a-z])([A-Z])/g, '$1-$2')
  .toLowerCase();

const pageDir = path.join(
  process.cwd(),
  'src',
  'app',
  section,
  kebabCase
);

if (fs.existsSync(pageDir)) {
  console.error(`Page directory already exists: ${pageDir}`);
  process.exit(1);
}

fs.mkdirSync(pageDir, { recursive: true });

const pageContent = `'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

export default function ${pageName}Page() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">${pageName.replace(/([A-Z])/g, ' $1').trim()}</h1>
        <p className="text-muted-foreground">
          Manage ${pageName.replace(/([A-Z])/g, ' $1').trim().toLowerCase()} settings and data.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>${pageName.replace(/([A-Z])/g, ' $1').trim()}</CardTitle>
          <CardDescription>
            Configure and manage your ${pageName.replace(/([A-Z])/g, ' $1').trim().toLowerCase()}.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">Content goes here.</p>
        </CardContent>
      </Card>
    </div>
  );
}
`;

fs.writeFileSync(path.join(pageDir, 'page.tsx'), pageContent);

console.log(`Page created: ${pageDir}/page.tsx`);
console.log(`Route: /${section}/${kebabCase}`);
