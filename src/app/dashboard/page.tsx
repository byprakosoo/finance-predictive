import Link from "next/link";
import {
  Bell,
  Binoculars,
  CircleCheck,
  FileText,
  Gauge,
  Globe2,
  HelpCircle,
  LayoutDashboard,
  LineChart,
  LogOut,
  Network,
  Play,
  Settings,
  Shield,
  ShieldAlert,
  SlidersHorizontal,
  TrendingUp,
  UserRound,
  Users,
  WalletCards,
} from "lucide-react";
import { AppShell, PageTitle } from "@/components/app-shell";

const componentScores = [
  {
    icon: TrendingUp,
    title: "Market Structure",
    subtitle: "Bullish Continuation",
    score: "+2.4",
    scoreClass: "text-success",
  },
  {
    icon: Globe2,
    title: "Macro View",
    subtitle: "Neutral / Stable",
    score: "0.0",
    scoreClass: "text-foreground",
  },
  {
    icon: Gauge,
    title: "Sentiment",
    subtitle: "Overheated Warning",
    score: "-1.2",
    scoreClass: "text-warning",
  },
  {
    icon: Shield,
    title: "Portfolio Risk",
    subtitle: "Capacity Available",
    score: "+1.8",
    scoreClass: "text-success",
  },
];

const desktopScores = [
  {
    label: "Market Score",
    value: 72,
    note: "BTC remains above long-term trend",
    color: "bg-success",
    text: "text-success",
  },
  {
    label: "Macro Score",
    value: 58,
    note: "Macro conditions are neutral",
    color: "bg-accent",
    text: "text-accent",
  },
  {
    label: "Sentiment Score",
    value: 42,
    note: "Greed is rising",
    color: "bg-warning",
    text: "text-warning",
  },
  {
    label: "Portfolio Score",
    value: 35,
    note: "Crypto allocation is overweight",
    color: "bg-danger",
    text: "text-danger",
  },
];

const reasons = [
  { tone: "positive", text: "BTC is above the 200-day moving average" },
  {
    tone: "positive",
    text: "Price momentum is positive but not deeply discounted",
  },
  { tone: "warning", text: "Fear & Greed is elevated" },
  { tone: "danger", text: "Crypto allocation is above target range" },
];

const mobileReasons = [
  "Strong accumulation volume detected in institutional spot markets over the last 48 hours.",
  "Price holding structural support despite negative funding rates.",
  "Retail sentiment is highly euphoric; potential for short-term flush before continuation.",
];

function MonoLabel({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <p
      className={`font-mono text-xs uppercase tracking-[0.28em] text-muted-foreground ${className}`}
    >
      {children}
    </p>
  );
}

function StatusBadge() {
  return (
    <span className="inline-flex items-center gap-2 rounded border border-emerald-400/25 bg-success/10 px-3 py-1 font-mono text-sm font-semibold uppercase tracking-[0.18em] text-success">
      <span className="h-2 w-2 rounded-full bg-success" />
      Live
    </span>
  );
}

function RunSignalButton({ className = "" }: { className?: string }) {
  return (
    <Link
      href="/alpha-hunter"
      className={`inline-flex items-center justify-center gap-3 rounded-md border border-accent/20 bg-primary px-6 py-3 font-mono text-base font-bold text-foreground shadow-[0_0_28px_rgba(6,182,212,0.25)] transition hover:bg-accent ${className}`}
    >
      <Play className="h-4 w-4" />
      Run Signal
    </Link>
  );
}

function ConfidenceRing({
  value,
  compact = false,
}: {
  value: number;
  compact?: boolean;
}) {
  const size = compact ? 124 : 148;
  const stroke = compact ? 10 : 12;
  const radius = (size - stroke) / 2;
  const circumference = 2 * Math.PI * radius;
  const dash = (value / 100) * circumference;

  return (
    <div className="relative inline-flex items-center justify-center drop-shadow-[0_0_22px_rgba(34,211,238,0.28)]">
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="rgba(71,85,105,0.45)"
          strokeWidth={stroke}
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="rgb(34,211,238)"
          strokeLinecap="round"
          strokeWidth={stroke}
          strokeDasharray={`${dash} ${circumference - dash}`}
          transform={`rotate(-90 ${size / 2} ${size / 2})`}
        />
      </svg>
      <div className="absolute text-center">
        <p
          className={`${compact ? "text-3xl" : "text-4xl"} font-semibold text-foreground`}
        >
          {value}
          {compact ? "%" : ""}
        </p>
        <p className="font-mono text-xs tracking-[0.2em] text-muted-foreground">
          {compact ? "Confidence" : ""}
        </p>
      </div>
    </div>
  );
}

function DesktopSidebar() {
  const nav = [
    {
      href: "/dashboard",
      icon: LayoutDashboard,
      label: "Dashboard",
      active: true,
    },
    { href: "/portfolio", icon: WalletCards, label: "Portfolio" },
    { href: "/wallets", icon: Network, label: "Wallets" },
    { href: "/entities", icon: Users, label: "Entities" },
    { href: "/alerts", icon: Bell, label: "Alerts" },
    { href: "/alpha-hunter", icon: Binoculars, label: "Alpha Hunter" },
    { href: "/morning-brief", icon: FileText, label: "Morning Brief" },
    { href: "/settings", icon: Settings, label: "Settings" },
  ];

  return (
    <aside className="hidden min-h-screen w-64 shrink-0 border-r border-slate-700/40 bg-slate-900/80 px-4 py-8 xl:block">
      <div className="mb-16 flex items-center gap-4">
        <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-cyan-300/20 bg-slate-800 text-cyan-300">
          <UserRound className="h-7 w-7" />
        </div>
        <div>
          <p className="font-mono text-sm font-bold leading-5 tracking-[0.12em] text-cyan-300">
            Finance
            <br />
            Predictive
          </p>
          <p className="mt-2 font-mono text-xs tracking-[0.18em] text-slate-300">
            Live Alpha Feed
          </p>
        </div>
      </div>

      <nav className="space-y-4">
        {nav.map(({ href, icon: Icon, label, active }) => (
          <Link
            key={label}
            href={href}
            className={`flex items-center gap-4 rounded-md px-4 py-4 text-lg transition hover:bg-slate-800 hover:text-cyan-300 ${active ? "border-r-4 border-cyan-300 bg-slate-700/70 text-cyan-300" : "text-slate-300"}`}
          >
            <Icon className="h-6 w-6" />
            <span>{label}</span>
          </Link>
        ))}
      </nav>

      <div className="mt-28 space-y-12">
        <RunSignalButton className="w-full py-4 text-sm" />
        <div className="border-t border-slate-700/60 pt-10 text-slate-300">
          <Link
            href="/settings"
            className="mb-10 flex items-center gap-4 text-lg transition hover:text-cyan-300"
          >
            <HelpCircle /> Support
          </Link>
          <Link
            href="/"
            className="flex items-center gap-4 text-lg transition hover:text-cyan-300"
          >
            <LogOut /> Sign Out
          </Link>
        </div>
      </div>
    </aside>
  );
}

function DesktopHeader() {
  const nav = [
    { href: "/dashboard", label: "Signals", active: true },
    { href: "/portfolio", label: "Portfolio" },
    { href: "/alpha-hunter", label: "Analytics" },
    { href: "/morning-brief", label: "History" },
  ];

  return (
    <header className="hidden h-16 items-center justify-between border-b border-slate-700/40 px-8 xl:flex">
      <h1 className="text-2xl font-black tracking-tight text-cyan-300">
        FINANCE-PREDICTIVE
      </h1>
      <nav className="flex h-full items-center gap-12 text-lg text-slate-300">
        {nav.map((item) => (
          <Link
            key={item.label}
            href={item.href}
            className={`flex h-full items-center px-2 transition hover:text-cyan-300 ${item.active ? "border-b-2 border-cyan-300 text-cyan-300" : ""}`}
          >
            {item.label}
          </Link>
        ))}
      </nav>
      <div className="flex items-center gap-6 text-slate-300">
        <Link
          href="/alerts"
          aria-label="Alerts"
          className="transition hover:text-cyan-300"
        >
          <Bell className="h-6 w-6" />
        </Link>
        <Link
          href="/settings"
          aria-label="Settings"
          className="transition hover:text-cyan-300"
        >
          <Settings className="h-7 w-7" />
        </Link>
        <Link
          href="/settings"
          aria-label="Profile"
          className="h-9 w-9 rounded-full border border-cyan-300/20 bg-slate-800 transition hover:border-cyan-300"
        />
      </div>
    </header>
  );
}

function PrimarySignalCard() {
  return (
    <section className="rounded-2xl border border-accent/15 bg-card/70 p-6 shadow-[0_0_45px_rgba(34,211,238,0.06)] md:p-8">
      <div className="hidden items-start justify-between gap-8 md:flex">
        <div>
          <MonoLabel className="text-accent">Primary Recommendation</MonoLabel>
          <h2 className="mt-4 text-4xl font-black uppercase tracking-tight text-accent drop-shadow-[0_0_20px_rgba(34,211,238,0.22)]">
            Accumulate
          </h2>
          <p className="mt-5 max-w-3xl text-lg leading-8 text-muted-foreground">
            BTC trend remains constructive, but portfolio allocation is above
            preferred target range. Aggressive buying is not recommended.
          </p>
        </div>
        <div className="rounded-lg border border-border bg-background/45 p-5 text-center">
          <MonoLabel>Confidence</MonoLabel>
          <ConfidenceRing value={68} />
        </div>
      </div>

      <div className="text-center md:hidden">
        <MonoLabel>Primary Directive</MonoLabel>
        <h2 className="mt-5 text-4xl font-black text-accent drop-shadow-[0_0_20px_rgba(34,211,238,0.32)]">
          Accumulate
        </h2>
        <div className="mt-8">
          <ConfidenceRing value={82} compact />
        </div>
      </div>

      <div className="mt-8 border-t border-border/70 pt-6 md:flex md:items-end md:justify-between">
        <div>
          <MonoLabel>BTC Price</MonoLabel>
          <p className="mt-2 font-mono text-4xl font-bold text-foreground">
            $104,230 <span className="text-base text-success">↑1.2% 24h</span>{" "}
            <span className="text-base text-danger">↓2.1% 7d</span>
          </p>
        </div>
        <div className="mt-6 md:mt-0">
          <MonoLabel>Risk Context</MonoLabel>
          <span className="mt-2 inline-flex items-center gap-2 rounded bg-muted px-4 py-2 font-mono text-sm text-foreground">
            <span className="h-2 w-2 rounded-full bg-muted-foreground" />
            Neutral
          </span>
        </div>
      </div>

      <div className="mt-8 grid grid-cols-2 gap-6 border-t border-border/70 pt-6 md:hidden">
        <div>
          <MonoLabel>Entry Target</MonoLabel>
          <p className="mt-2 font-mono text-3xl text-foreground">$64,250</p>
        </div>
        <div className="text-right">
          <MonoLabel>Stop Loss</MonoLabel>
          <p className="mt-2 font-mono text-3xl text-danger">$61,800</p>
        </div>
      </div>
    </section>
  );
}

function ComponentAnalysis() {
  return (
    <section className="md:hidden">
      <MonoLabel className="mb-5">Component Analysis</MonoLabel>
      <div className="space-y-4">
        {componentScores.map(
          ({ icon: Icon, title, subtitle, score, scoreClass }) => (
            <div
              key={title}
              className="flex items-center gap-4 rounded-lg border border-border bg-secondary p-5"
            >
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg border border-accent/20 bg-secondary text-accent">
                <Icon className="h-7 w-7" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-2xl text-foreground">{title}</p>
                <p className="font-mono text-sm tracking-[0.08em] text-muted-foreground">
                  {subtitle}
                </p>
              </div>
              <p className={`font-mono text-3xl font-bold ${scoreClass}`}>
                {score}
              </p>
            </div>
          ),
        )}
      </div>
    </section>
  );
}

function WhySignal({ mobile = false }: { mobile?: boolean }) {
  const list = mobile ? mobileReasons : reasons.map((r) => r.text);
  return (
    <section className="rounded-xl border border-border bg-background/35 p-6 md:p-7">
      <div className="mb-6 flex items-center gap-3 border-b border-border pb-5">
        <Gauge className="h-6 w-6 text-accent" />
        <MonoLabel className="text-foreground">Why this signal?</MonoLabel>
      </div>
      <div className="space-y-6">
        {list.map((text, index) => {
          const tone = mobile
            ? index < 2
              ? "positive"
              : "warning"
            : reasons[index]?.tone;
          const Icon = tone === "positive" ? CircleCheck : ShieldAlert;
          const color =
            tone === "positive"
              ? "text-success"
              : tone === "warning"
                ? "text-warning"
                : "text-danger";
          return (
            <div
              key={text}
              className="flex items-start gap-4 text-lg leading-7 text-muted-foreground"
            >
              <Icon className={`mt-1 h-6 w-6 shrink-0 ${color}`} />
              <p>{text}</p>
            </div>
          );
        })}
      </div>
    </section>
  );
}

function DesktopScoreGrid() {
  return (
    <div className="grid gap-6 md:grid-cols-2">
      {desktopScores.map((score) => (
        <div
          key={score.label}
          className="rounded-xl border border-border bg-background/35 p-6"
        >
          <div className="mb-6 flex items-center justify-between">
            <MonoLabel>{score.label}</MonoLabel>
            <p className={`text-2xl font-bold ${score.text}`}>{score.value}</p>
          </div>
          <div className="h-2 rounded-full bg-secondary">
            <div
              className={`h-full rounded-full ${score.color}`}
              style={{ width: `${score.value}%` }}
            />
          </div>
          <p className="mt-5 text-base text-muted-foreground">{score.note}</p>
        </div>
      ))}
    </div>
  );
}

function PortfolioGuardrail() {
  return (
    <section className="rounded-xl border border-danger/35 bg-background/35 p-6 shadow-[inset_0_6px_0_rgba(252,165,165,0.9)] md:p-7">
      <div className="mb-8 flex items-center gap-3">
        <ShieldAlert className="h-7 w-7 text-danger" />
        <MonoLabel className="text-foreground">Portfolio Guardrail</MonoLabel>
      </div>
      <div className="space-y-5 text-lg">
        <div className="flex justify-between">
          <span className="text-muted-foreground">Target Allocation</span>
          <span className="font-mono text-2xl text-foreground">20%</span>
        </div>
        <div className="flex justify-between">
          <span className="text-muted-foreground">Current Allocation</span>
          <span className="font-mono text-2xl text-danger">28%</span>
        </div>
        <div className="h-3 rounded-full bg-secondary">
          <div className="h-full w-[28%] rounded-l-full bg-gradient-to-r from-success via-success to-danger" />
        </div>
        <div className="rounded-md border border-danger/20 bg-danger/10 p-4 text-rose-100">
          <p className="font-mono font-bold tracking-[0.12em]">
            △ Portfolio guardrail active
          </p>
          <p className="mt-3 text-muted-foreground">
            Consider reviewing exposure to maintain long-term goal alignment.
          </p>
        </div>
      </div>
    </section>
  );
}

function MobilePortfolioAllocation() {
  return (
    <section className="rounded-xl border border-border bg-secondary/80 p-6 md:hidden">
      <div className="mb-7 flex items-center justify-between">
        <MonoLabel className="text-foreground">Portfolio Allocation</MonoLabel>
        <SlidersHorizontal className="h-5 w-5 text-muted-foreground" />
      </div>
      <div className="mb-5 flex items-center justify-between text-xl text-foreground">
        <span>Current BTC Exposure</span>
        <span className="font-mono text-3xl">12.5%</span>
      </div>
      <div className="h-3 rounded-full bg-card">
        <div className="h-full w-[60%] rounded-full bg-success" />
      </div>
      <div className="mt-4 flex justify-between font-mono text-sm text-muted-foreground">
        <span>Min: 5%</span>
        <span>Target Max: 20%</span>
      </div>
      <div className="mt-6 flex items-center justify-between border-t border-border pt-6 text-xl">
        <span className="text-muted-foreground">Recommended Action</span>
        <span className="bg-accent/10 px-3 py-1 font-mono text-lg text-accent">
          Scale In +2.5%
        </span>
      </div>
    </section>
  );
}

export default function DashboardPage() {
  return (
    <AppShell>
      <PageTitle
        title="Bitcoin Signal"
        description="Macro-aware, portfolio-aware BTC decision support · Updated 2m ago"
        action={
          <div className="flex items-center gap-4">
            <StatusBadge />
            <RunSignalButton className="shrink-0 px-5 py-3 text-sm xl:px-8 xl:py-3 xl:text-base" />
          </div>
        }
      />

      <div className="grid gap-6 xl:grid-cols-[1fr_0.5fr]">
        <div className="space-y-8">
          <PrimarySignalCard />
          <ComponentAnalysis />
          <div className="md:hidden">
            <WhySignal mobile />
          </div>
          <MobilePortfolioAllocation />
          <div className="hidden xl:block">
            <DesktopScoreGrid />
          </div>
        </div>
        <aside className="hidden space-y-8 xl:block">
          <WhySignal />
          <PortfolioGuardrail />
        </aside>
      </div>
    </AppShell>
  );
}
