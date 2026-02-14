import { createFileRoute, Link } from '@tanstack/react-router';
import { ArrowRightIcon, LayersIcon, LogInIcon, ShieldCheckIcon, ZapIcon } from 'lucide-react';

import { Button } from '@ssalka/ui/components/button';

import { SignOutButton } from '@/components/SignOutButton';
import { fetchCsrfToken } from '@/lib/utils/auth';

export const Route = createFileRoute('/')({
  component: LandingPage,
  async loader() {
    const csrfToken = await fetchCsrfToken();

    return { csrfToken };
  },
});

function LandingPage() {
  const { csrfToken } = Route.useLoaderData();
  const { user } = Route.useRouteContext();

  return (
    <div className="bg-background relative min-h-screen overflow-hidden">
      {/* Decorative gradient orbs */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-32 -left-32 h-96 w-96 animate-pulse rounded-full bg-orange-500/10 blur-3xl" />
        <div
          className="absolute top-1/3 -right-32 h-80 w-80 rounded-full bg-orange-400/8 blur-3xl"
          style={{ animationDelay: '1s', animationDuration: '3s' }}
        />
        <div
          className="absolute bottom-0 left-1/3 h-72 w-72 rounded-full bg-orange-600/6 blur-3xl"
          style={{ animationDelay: '2s', animationDuration: '4s' }}
        />
      </div>

      {/* Navigation */}
      <nav className="relative z-10 flex items-center justify-between px-6 py-6 md:px-12">
        <div className="flex items-center gap-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-orange-500 shadow-lg shadow-orange-500/25">
            <LayersIcon className="h-5 w-5 text-white" />
          </div>
          <span className="text-foreground text-xl font-bold tracking-tight">Project Starter</span>
        </div>

        <div>
          {user ? (
            <div className="flex items-center gap-4">
              <Link to="/dashboard">
                <Button variant="ghost" size="sm">
                  Dashboard
                </Button>
              </Link>
              <SignOutButton csrfToken={csrfToken} variant="outline" size="sm" />
            </div>
          ) : (
            <Link to="/login">
              <Button className="gap-2" size="sm">
                <LogInIcon size={16} />
                Sign in
              </Button>
            </Link>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <main className="relative z-10 mx-auto max-w-5xl px-6 pt-16 pb-24 md:px-12 md:pt-24">
        <div className="flex flex-col items-center text-center">
          {/* Main Headline */}
          <h1
            className="animate-fade-in text-foreground mb-6 max-w-4xl text-4xl font-bold tracking-tight md:text-6xl lg:text-7xl"
            style={{ animationDelay: '100ms', animationFillMode: 'backwards' }}
          >
            Your next project,{' '}
            <span className="bg-linear-to-r from-orange-500 via-orange-400 to-orange-600 bg-clip-text text-transparent">
              ready to go
            </span>
          </h1>

          {/* Subheadline */}
          <p
            className="animate-fade-in text-muted-foreground mb-10 max-w-2xl text-lg leading-relaxed md:text-xl"
            style={{ animationDelay: '200ms', animationFillMode: 'backwards' }}
          >
            An opinionated full-stack monorepo starter with authentication, type-safe APIs, and a
            polished design system &mdash; so you can focus on building features.
          </p>

          {/* CTA Buttons */}
          <div
            className="animate-fade-in flex flex-col gap-4 sm:flex-row"
            style={{ animationDelay: '300ms', animationFillMode: 'backwards' }}
          >
            <Link to={user ? '/dashboard' : '/login'}>
              <Button size="lg" className="gap-2 px-8 shadow-lg shadow-orange-500/25">
                {user ? 'Go to Dashboard' : 'Get Started'}
                <ArrowRightIcon className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>

        {/* Feature Cards */}
        <div className="mt-32 grid gap-6 md:grid-cols-3">
          <FeatureCard
            icon={<ShieldCheckIcon className="h-6 w-6" />}
            title="Authentication"
            description="Auth.js with GitHub OAuth and CASL-based authorization, ready out of the box."
            delay={400}
          />
          <FeatureCard
            icon={<ZapIcon className="h-6 w-6" />}
            title="Type-Safe API"
            description="End-to-end type safety with tRPC. Define procedures on the server, call them on the client."
            delay={500}
          />
          <FeatureCard
            icon={<LayersIcon className="h-6 w-6" />}
            title="Design System"
            description="Tailwind CSS with shadcn/ui components. Dark mode, theming, and 38+ ready-to-use components."
            delay={600}
          />
        </div>
      </main>

      {/* Footer */}
      <footer className="border-border/50 relative z-10 border-t px-6 py-8 md:px-12">
        <div className="mx-auto flex max-w-5xl items-center justify-between">
          <div className="text-muted-foreground text-sm">A forkable full-stack starter.</div>
          <div className="text-muted-foreground flex items-center gap-1 text-sm">
            <span className="text-foreground font-semibold">Project Starter</span>
          </div>
        </div>
      </footer>
    </div>
  );
}

function FeatureCard({
  icon,
  title,
  description,
  delay,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  delay: number;
}) {
  return (
    <div
      className="group animate-fade-in border-border/50 bg-surface relative rounded-2xl border p-6 transition-all duration-300 hover:border-orange-200 hover:shadow-lg hover:shadow-orange-500/5"
      style={{ animationDelay: `${delay}ms`, animationFillMode: 'backwards' }}
    >
      <div className="mb-4 inline-flex rounded-xl bg-orange-100 p-3 text-orange-600 transition-colors group-hover:bg-orange-500 group-hover:text-white">
        {icon}
      </div>
      <h3 className="text-foreground mb-2 text-lg font-semibold">{title}</h3>
      <p className="text-muted-foreground text-sm leading-relaxed">{description}</p>
    </div>
  );
}
