import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  LayoutDashboard,
  Shield,
  Puzzle,
  BarChart3,
  Palette,
  Globe,
} from "lucide-react";

const features = [
  {
    icon: LayoutDashboard,
    title: "Dashboard System",
    description:
      "Pre-built dashboard layouts with customizable widgets, charts, and data visualization.",
  },
  {
    icon: Shield,
    title: "Enterprise Auth",
    description:
      "Full authentication flow with MFA, role-based access, session management, and permission guards.",
  },
  {
    icon: Puzzle,
    title: "Plugin Architecture",
    description:
      "Extensible plugin system with dynamic module registration, lazy loading, and SDK readiness.",
  },
  {
    icon: BarChart3,
    title: "Analytics & Reporting",
    description:
      "Built-in analytics dashboards, charts, data tables, and export capabilities.",
  },
  {
    icon: Palette,
    title: "White-Label Ready",
    description:
      "Full theming engine with dark/light mode, tenant branding, design tokens, and CSS variables.",
  },
  {
    icon: Globe,
    title: "Multi-Tenant",
    description:
      "Tenant-aware routing, branding, settings, and data isolation for SaaS applications.",
  },
];

export default function HomePage() {
  return (
    <div className="min-h-screen">
      <header className="border-b">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <span className="text-xl font-bold">Enterprise Platform</span>
          <nav className="flex items-center gap-4">
            <Link href="/auth/login">
              <Button variant="ghost">Sign in</Button>
            </Link>
            <Link href="/auth/register">
              <Button>Get Started</Button>
            </Link>
          </nav>
        </div>
      </header>

      <main>
        <section className="container mx-auto px-4 py-24 text-center">
          <h1 className="text-4xl font-bold tracking-tight sm:text-6xl">
            Enterprise Frontend
            <br />
            <span className="text-primary">Foundation Platform</span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground">
            A reusable, scalable, enterprise-grade frontend foundation for
            building SaaS dashboards, admin panels, CRM, ERP, billing systems,
            and more.
          </p>
          <div className="mt-10 flex items-center justify-center gap-4">
            <Link href="/auth/register">
              <Button size="lg">Start Building</Button>
            </Link>
            <Link href="/dashboard">
              <Button size="lg" variant="outline">
                View Dashboard
              </Button>
            </Link>
          </div>
        </section>

        <section className="container mx-auto px-4 py-16">
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {features.map((feature) => (
              <div
                key={feature.title}
                className="rounded-xl border bg-card p-6 transition-shadow hover:shadow-lg"
              >
                <feature.icon className="h-10 w-10 text-primary mb-4" />
                <h3 className="text-lg font-semibold">{feature.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </section>
      </main>

      <footer className="border-t py-8">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          Enterprise Frontend Foundation Platform. Built with Next.js, React,
          TypeScript, Tailwind CSS, and ShadCN/UI.
        </div>
      </footer>
    </div>
  );
}
