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
    <div className="min-h-screen bg-[#080d16] text-slate-100 antialiased">
      <aside className="fixed left-0 top-0 hidden h-screen w-64 border-r border-slate-700/40 bg-slate-900/80 px-4 py-8 xl:block">
        <Link href="/dashboard" className="mb-16 flex items-center gap-4">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-cyan-300/20 bg-slate-800 text-cyan-300">
            <BarChart3 className="h-7 w-7" aria-hidden />
          </div>
          <div>
            <p className="font-mono text-sm font-bold leading-5 tracking-[0.12em] text-cyan-300">Finance<br />Predictive</p>
            <p className="mt-2 font-mono text-xs tracking-[0.18em] text-slate-400">Live Alpha Feed</p>
          </div>
        </Link>

        <nav className="space-y-4">
          {navItems.map((item) => {
            const Icon = item.icon;
            const active = activeFor(pathname, item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-4 rounded-md px-4 py-4 text-lg transition hover:bg-slate-800 hover:text-cyan-300",
                  active ? "border-r-4 border-cyan-300 bg-slate-700/70 text-cyan-300" : "text-slate-300",
                )}
              >
                <Icon className="h-6 w-6" aria-hidden />
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="mt-24 space-y-10 border-t border-slate-700/60 pt-10 text-slate-300">
          <Link href="/settings" className="flex items-center gap-4 text-lg transition hover:text-cyan-300"><HelpCircle /> Support</Link>
          <Link href="/" className="flex items-center gap-4 text-lg transition hover:text-cyan-300"><LogOut /> Sign Out</Link>
        </div>
      </aside>

      <div className="xl:pl-64">
        <header className="sticky top-0 z-10 hidden h-16 items-center justify-between border-b border-slate-700/40 bg-[#080d16]/95 px-8 backdrop-blur xl:flex">
          <Link href="/dashboard" className="text-2xl font-black tracking-tight text-cyan-300">FINANCE-PREDICTIVE</Link>
          <nav className="flex h-full items-center gap-10 text-lg text-slate-300">
            {[
              ["/dashboard", "Signals"],
              ["/personal-finance", "Goals"],
              ["/portfolio", "Portfolio"],
              ["/alpha-hunter", "Analytics"],
              ["/morning-brief", "History"],
            ].map(([href, label]) => {
              const active = activeFor(pathname, href);
              return (
                <Link key={href} href={href} className={cn("flex h-full items-center px-2 transition hover:text-cyan-300", active && "border-b-2 border-cyan-300 text-cyan-300")}>
                  {label}
                </Link>
              );
            })}
          </nav>
          <div className="flex items-center gap-6 text-slate-300">
            <Link href="/alerts" aria-label="Alerts" className="transition hover:text-cyan-300"><Bell className="h-6 w-6" /></Link>
            <Link href="/settings" aria-label="Settings" className="transition hover:text-cyan-300"><Settings className="h-7 w-7" /></Link>
            <Link href="/settings" aria-label="Profile" className="h-9 w-9 rounded-full border border-cyan-300/20 bg-slate-800 transition hover:border-cyan-300" />
          </div>
        </header>

        <header className="sticky top-0 z-20 border-b border-slate-700 bg-slate-900/95 px-4 py-4 backdrop-blur xl:hidden">
          <div className="mb-4 flex items-center justify-between">
            <Link href="/dashboard" className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-cyan-300/20 bg-slate-800 text-cyan-300">
                <BarChart3 className="h-5 w-5" aria-hidden />
              </div>
              <div>
                <p className="font-mono text-sm font-bold tracking-[0.12em] text-cyan-300">FINANCE-PREDICTIVE</p>
                <p className="font-mono text-xs tracking-[0.16em] text-slate-400">Mobile Terminal</p>
              </div>
            </Link>
            <Link href="/settings" className="flex h-10 w-10 items-center justify-center rounded-xl border border-cyan-300/20 bg-slate-800 text-slate-300">
              <Settings className="h-5 w-5" />
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
                  className={cn(
                    "flex h-10 shrink-0 items-center gap-2 rounded-lg px-3 font-mono text-xs transition",
                    active ? "bg-cyan-500 text-slate-100" : "bg-slate-800 text-slate-300 hover:text-cyan-300",
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
    <div className="mb-8 flex flex-wrap items-end justify-between gap-4 border-b border-slate-700/50 pb-8">
      <div>
        <p className="font-mono text-xs uppercase tracking-[0.28em] text-cyan-300">Terminal View</p>
        <h1 className="mt-3 text-4xl font-bold tracking-tight text-slate-100 xl:text-5xl">{title}</h1>
        <p className="mt-4 max-w-3xl text-base leading-7 text-slate-300">{description}</p>
      </div>
      {action}
    </div>
  );
}
