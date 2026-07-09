"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  BarChart3,
  Bell,
  Binoculars,
  FileText,
  HelpCircle,
  LayoutDashboard,
  LogOut,
  Network,
  PiggyBank,
  Settings,
  Users,
  WalletCards,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Disclaimer } from "@/components/disclaimer";

const navItems = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/personal-finance", label: "Personal Finance", icon: PiggyBank },
  { href: "/portfolio", label: "Portfolio", icon: WalletCards },
  { href: "/wallets", label: "Wallets", icon: Network },
  { href: "/entities", label: "Entities", icon: Users },
  { href: "/alerts", label: "Alerts", icon: Bell },
  { href: "/alpha-hunter", label: "Alpha Hunter", icon: Binoculars },
  { href: "/morning-brief", label: "Morning Brief", icon: FileText },
  { href: "/settings", label: "Settings", icon: Settings },
];

function activeFor(pathname: string, href: string) {
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="min-h-screen bg-background text-foreground antialiased">
      <aside className="fixed left-0 top-0 hidden h-screen w-64 border-r border-border/40 bg-card/80 px-4 py-8 xl:block">
        <Link href="/dashboard" className="mb-10 flex items-center gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-accent/20 bg-secondary text-accent">
            <BarChart3 className="h-6 w-6" aria-hidden />
          </div>
          <div>
            <p className="font-mono text-sm font-bold leading-5 tracking-[0.12em] text-accent">Finance<br />Predictive</p>
            <p className="mt-2 font-mono text-xs tracking-[0.18em] text-muted-foreground">Live Alpha Terminal</p>
          </div>
        </Link>

        <nav className="space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const active = activeFor(pathname, item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "focus-ring flex items-center gap-3 rounded-md px-4 py-2.5 text-sm transition hover:bg-secondary hover:text-accent",
                  active ? "border-l-4 border-accent bg-muted text-accent" : "text-muted-foreground",
                )}
              >
                <Icon className="h-5 w-5" aria-hidden />
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="mt-10 space-y-3 border-t border-border/60 pt-6 text-muted-foreground">
          <Link href="/settings" className="focus-ring flex items-center gap-3 text-sm transition hover:text-accent"><HelpCircle className="h-5 w-5" aria-hidden /> Support</Link>
          <Link href="/" className="focus-ring flex items-center gap-3 text-sm transition hover:text-accent"><LogOut className="h-5 w-5" aria-hidden /> Sign Out</Link>
        </div>
      </aside>

      <div className="xl:pl-64">
        <header className="sticky top-0 z-10 hidden h-16 items-center justify-between border-b border-border/40 bg-background/95 px-8 backdrop-blur xl:flex">
          <Link href="/dashboard" className="text-xl font-black tracking-tight text-accent">FINANCE-PREDICTIVE</Link>
          <nav className="flex h-full items-center gap-8 text-sm text-muted-foreground">
            {[
              ["/dashboard", "Signals"],
              ["/personal-finance", "Goals"],
              ["/portfolio", "Portfolio"],
              ["/alpha-hunter", "Analytics"],
              ["/morning-brief", "History"],
            ].map(([href, label]) => {
              const active = activeFor(pathname, href);
              return (
                <Link key={href} href={href} aria-current={active ? "page" : undefined} className={cn("flex h-full items-center px-2 transition hover:text-accent", active && "border-b-2 border-accent text-accent")}>
                  {label}
                </Link>
              );
            })}
          </nav>
          <div className="flex items-center gap-5 text-muted-foreground">
            <Link href="/alerts" aria-label="Alerts" className="focus-ring transition hover:text-accent"><Bell className="h-5 w-5" aria-hidden /></Link>
            <Link href="/settings" aria-label="Settings" className="focus-ring transition hover:text-accent"><Settings className="h-5 w-5" aria-hidden /></Link>
            <Link href="/settings" aria-label="Profile" className="focus-ring flex h-9 w-9 items-center justify-center rounded-full border border-accent/20 bg-secondary font-mono text-xs font-bold text-accent transition hover:border-accent">AI</Link>
          </div>
        </header>

        <header className="sticky top-0 z-20 border-b border-border bg-card/95 px-4 py-4 backdrop-blur xl:hidden">
          <div className="mb-4 flex items-center justify-between">
            <Link href="/dashboard" className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-accent/20 bg-secondary text-accent">
                <BarChart3 className="h-5 w-5" aria-hidden />
              </div>
              <div>
                <p className="font-mono text-sm font-bold tracking-[0.12em] text-accent">FINANCE-PREDICTIVE</p>
                <p className="font-mono text-xs tracking-[0.16em] text-muted-foreground">Live Alpha Terminal</p>
              </div>
            </Link>
            <Link href="/settings" aria-label="Settings" className="focus-ring flex h-10 w-10 items-center justify-center rounded-xl border border-accent/20 bg-secondary text-muted-foreground">
              <Settings className="h-5 w-5" aria-hidden />
            </Link>
          </div>
          <nav className="flex gap-2 overflow-x-auto pb-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const active = activeFor(pathname, item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={active ? "page" : undefined}
                  className={cn(
                    "focus-ring flex h-9 shrink-0 items-center gap-2 rounded-lg px-3 font-mono text-xs transition",
                    active ? "bg-primary text-primary-foreground" : "bg-secondary text-muted-foreground hover:text-accent",
                  )}
                >
                  <Icon className="h-4 w-4" aria-hidden />
                  {item.label}
                </Link>
              );
            })}
          </nav>
        </header>

        <main className="mx-auto w-full max-w-[1400px] px-5 pb-12 pt-6 md:px-8 md:pt-10">{children}</main>
        <Disclaimer />
      </div>
    </div>
  );
}

export function PageTitle({
  title,
  description,
  action,
}: {
  title: string;
  description: string;
  action?: React.ReactNode;
}) {
  return (
    <div className="mb-8 flex flex-wrap items-end justify-between gap-4 border-b border-border/50 pb-8">
      <div>
        <p className="font-mono text-xs uppercase tracking-[0.28em] text-accent">Terminal View</p>
        <h1 className="mt-3 text-3xl font-bold tracking-tight text-foreground xl:text-4xl">{title}</h1>
        <p className="mt-4 max-w-3xl text-base leading-7 text-muted-foreground">{description}</p>
      </div>
      {action}
    </div>
  );
}
