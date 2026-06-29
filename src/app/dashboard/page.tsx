import {
  BarChart3,
  Bell,
  CircleCheck,
  Gauge,
  Globe2,
  HelpCircle,
  LineChart,
  LogOut,
  Play,
  Settings,
  Shield,
  ShieldAlert,
  SlidersHorizontal,
  TrendingUp,
  UserRound,
  WalletCards,
} from "lucide-react";

const componentScores = [
  {
    icon: TrendingUp,
    title: "Market Structure",
    subtitle: "Bullish Continuation",
    score: "+2.4",
    scoreClass: "text-emerald-400",
  },
  {
    icon: Globe2,
    title: "Macro View",
    subtitle: "Neutral / Stable",
    score: "0.0",
    scoreClass: "text-slate-200",
  },
  {
    icon: Gauge,
    title: "Sentiment",
    subtitle: "Overheated Warning",
    score: "-1.2",
    scoreClass: "text-amber-300",
  },
  {
    icon: Shield,
    title: "Portfolio Risk",
    subtitle: "Capacity Available",
    score: "+1.8",
    scoreClass: "text-emerald-400",
  },
];

const desktopScores = [
  { label: "Market Score", value: 72, note: "BTC remains above long-term trend", color: "bg-emerald-400", text: "text-emerald-400" },
  { label: "Macro Score", value: 58, note: "Macro conditions are neutral", color: "bg-cyan-300", text: "text-cyan-300" },
  { label: "Sentiment Score", value: 42, note: "Greed is rising", color: "bg-amber-300", text: "text-amber-300" },
  { label: "Portfolio Score", value: 35, note: "Crypto allocation is overweight", color: "bg-rose-300", text: "text-rose-300" },
];

const reasons = [
  { tone: "positive", text: "BTC is above the 200-day moving average" },
  { tone: "positive", text: "Price momentum is positive but not deeply discounted" },
  { tone: "warning", text: "Fear & Greed is elevated" },
  { tone: "danger", text: "Crypto allocation is above target range" },
];

const mobileReasons = [
  "Strong accumulation volume detected in institutional spot markets over the last 48 hours.",
  "Price holding structural support despite negative funding rates.",
  "Retail sentiment is highly euphoric; potential for short-term flush before continuation.",
];

function MonoLabel({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <p className={`font-mono text-xs uppercase tracking-[0.28em] text-slate-400 ${className}`}>{children}</p>;
}

function StatusBadge() {
  return (
    <span className="inline-flex items-center gap-2 rounded border border-emerald-400/25 bg-emerald-400/10 px-3 py-1 font-mono text-sm font-semibold uppercase tracking-[0.18em] text-emerald-400">
      <span className="h-2 w-2 rounded-full bg-emerald-400" />
      Live
    </span>
  );
}

function RunSignalButton({ className = "" }: { className?: string }) {
  return (
    <button className={`inline-flex items-center justify-center gap-3 rounded-md border border-cyan-200/20 bg-cyan-500 px-6 py-3 font-mono text-base font-bold text-slate-950 shadow-[0_0_28px_rgba(6,182,212,0.25)] transition hover:bg-cyan-300 ${className}`}>
      <Play className="h-4 w-4" />
      Run Signal
    </button>
  );
}

function ConfidenceRing({ value, compact = false }: { value: number; compact?: boolean }) {
  const size = compact ? 124 : 148;
  const stroke = compact ? 10 : 12;
  const radius = (size - stroke) / 2;
  const circumference = 2 * Math.PI * radius;
  const dash = (value / 100) * circumference;

  return (
    <div className="relative inline-flex items-center justify-center drop-shadow-[0_0_22px_rgba(34,211,238,0.28)]">
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        <circle cx={size / 2} cy={size / 2} r={radius} fill="none" stroke="rgba(71,85,105,0.45)" strokeWidth={stroke} />
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
        <p className={`${compact ? "text-3xl" : "text-4xl"} font-semibold text-slate-100`}>{value}{compact ? "%" : ""}</p>
        <p className="font-mono text-xs tracking-[0.2em] text-slate-300">{compact ? "Confidence" : ""}</p>
      </div>
    </div>
  );
}

function DesktopSidebar() {
  const nav = [
    { icon: BarChart3, label: "Dashboard", active: true },
    { icon: LineChart, label: "Market Alpha" },
    { icon: Globe2, label: "Macro View" },
    { icon: Gauge, label: "Sentiment" },
    { icon: Shield, label: "Risk Guard" },
  ];

  return (
    <aside className="hidden min-h-screen w-64 shrink-0 border-r border-slate-700/40 bg-slate-900/80 px-4 py-8 xl:block">
      <div className="mb-16 flex items-center gap-4">
        <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-cyan-300/20 bg-slate-800 text-cyan-300">
          <UserRound className="h-7 w-7" />
        </div>
        <div>
          <p className="font-mono text-sm font-bold leading-5 tracking-[0.12em] text-cyan-300">Institutional<br />Terminal</p>
          <p className="mt-2 font-mono text-xs tracking-[0.18em] text-slate-300">Live Alpha Feed</p>
        </div>
      </div>

      <nav className="space-y-4">
        {nav.map(({ icon: Icon, label, active }) => (
          <div key={label} className={`flex items-center gap-4 rounded-md px-4 py-4 text-lg ${active ? "border-r-4 border-cyan-300 bg-slate-700/70 text-cyan-300" : "text-slate-300"}`}>
            <Icon className="h-6 w-6" />
            <span>{label}</span>
          </div>
        ))}
      </nav>

      <div className="mt-28 space-y-12">
        <RunSignalButton className="w-full py-4 text-sm" />
        <div className="border-t border-slate-700/60 pt-10 text-slate-300">
          <div className="mb-10 flex items-center gap-4 text-lg"><HelpCircle /> Support</div>
          <div className="flex items-center gap-4 text-lg"><LogOut /> Sign Out</div>
        </div>
      </div>
    </aside>
  );
}

function DesktopHeader() {
  return (
    <header className="hidden h-16 items-center justify-between border-b border-slate-700/40 px-8 xl:flex">
      <h1 className="text-2xl font-black tracking-tight text-cyan-300">FINANCE-PREDICTIVE</h1>
      <nav className="flex h-full items-center gap-12 text-lg text-slate-300">
        <span className="flex h-full items-center border-b-2 border-cyan-300 px-2 text-cyan-300">Signals</span>
        <span>Portfolio</span>
        <span>Analytics</span>
        <span>History</span>
      </nav>
      <div className="flex items-center gap-6 text-slate-300">
        <Bell className="h-6 w-6" />
        <Settings className="h-7 w-7" />
        <div className="h-9 w-9 rounded-full border border-cyan-300/20 bg-slate-800" />
      </div>
    </header>
  );
}

function PrimarySignalCard() {
  return (
    <section className="rounded-2xl border border-cyan-200/15 bg-slate-900/70 p-6 shadow-[0_0_45px_rgba(34,211,238,0.06)] md:p-8">
      <div className="hidden items-start justify-between gap-8 md:flex">
        <div>
          <MonoLabel className="text-cyan-300">Primary Recommendation</MonoLabel>
          <h2 className="mt-4 text-5xl font-black uppercase tracking-tight text-cyan-300 drop-shadow-[0_0_20px_rgba(34,211,238,0.22)]">Accumulate</h2>
          <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-300">
            BTC trend remains constructive, but portfolio allocation is above preferred target range. Aggressive buying is not recommended.
          </p>
        </div>
        <div className="rounded-lg border border-slate-700 bg-slate-950/45 p-5 text-center">
          <MonoLabel>Confidence</MonoLabel>
          <ConfidenceRing value={68} />
        </div>
      </div>

      <div className="text-center md:hidden">
        <MonoLabel>Primary Directive</MonoLabel>
        <h2 className="mt-5 text-5xl font-black text-cyan-300 drop-shadow-[0_0_20px_rgba(34,211,238,0.32)]">Accumulate</h2>
        <div className="mt-8"><ConfidenceRing value={82} compact /></div>
      </div>

      <div className="mt-8 border-t border-slate-700/70 pt-6 md:flex md:items-end md:justify-between">
        <div>
          <MonoLabel>BTC Price</MonoLabel>
          <p className="mt-2 font-mono text-4xl font-bold text-slate-100">$104,230 <span className="text-base text-emerald-400">↑1.2% 24h</span> <span className="text-base text-rose-300">↓2.1% 7d</span></p>
        </div>
        <div className="mt-6 md:mt-0">
          <MonoLabel>Risk Context</MonoLabel>
          <span className="mt-2 inline-flex items-center gap-2 rounded bg-slate-700 px-4 py-2 font-mono text-sm text-slate-200"><span className="h-2 w-2 rounded-full bg-slate-400" />Neutral</span>
        </div>
      </div>

      <div className="mt-8 grid grid-cols-2 gap-6 border-t border-slate-700/70 pt-6 md:hidden">
        <div>
          <MonoLabel>Entry Target</MonoLabel>
          <p className="mt-2 font-mono text-3xl text-slate-100">$64,250</p>
        </div>
        <div className="text-right">
          <MonoLabel>Stop Loss</MonoLabel>
          <p className="mt-2 font-mono text-3xl text-rose-300">$61,800</p>
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
        {componentScores.map(({ icon: Icon, title, subtitle, score, scoreClass }) => (
          <div key={title} className="flex items-center gap-4 rounded-lg border border-slate-700 bg-slate-950/40 p-5">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-800 text-cyan-300"><Icon className="h-7 w-7" /></div>
            <div className="min-w-0 flex-1">
              <p className="text-2xl text-slate-100">{title}</p>
              <p className="font-mono text-sm tracking-[0.08em] text-slate-300">{subtitle}</p>
            </div>
            <p className={`font-mono text-3xl font-bold ${scoreClass}`}>{score}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function WhySignal({ mobile = false }: { mobile?: boolean }) {
  const list = mobile ? mobileReasons : reasons.map((r) => r.text);
  return (
    <section className="rounded-xl border border-slate-700 bg-slate-950/35 p-6 md:p-7">
      <div className="mb-6 flex items-center gap-3 border-b border-slate-700 pb-5">
        <Gauge className="h-6 w-6 text-cyan-300" />
        <MonoLabel className="text-slate-200">Why this signal?</MonoLabel>
      </div>
      <div className="space-y-6">
        {list.map((text, index) => {
          const tone = mobile ? (index < 2 ? "positive" : "warning") : reasons[index]?.tone;
          const Icon = tone === "positive" ? CircleCheck : ShieldAlert;
          const color = tone === "positive" ? "text-emerald-400" : tone === "warning" ? "text-amber-300" : "text-rose-300";
          return (
            <div key={text} className="flex items-start gap-4 text-lg leading-7 text-slate-300">
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
        <div key={score.label} className="rounded-xl border border-slate-700 bg-slate-950/35 p-6">
          <div className="mb-6 flex items-center justify-between">
            <MonoLabel>{score.label}</MonoLabel>
            <p className={`text-2xl font-bold ${score.text}`}>{score.value}</p>
          </div>
          <div className="h-2 rounded-full bg-slate-800">
            <div className={`h-full rounded-full ${score.color}`} style={{ width: `${score.value}%` }} />
          </div>
          <p className="mt-5 text-base text-slate-300">{score.note}</p>
        </div>
      ))}
    </div>
  );
}

function PortfolioGuardrail() {
  return (
    <section className="rounded-xl border border-rose-300/35 bg-slate-950/35 p-6 shadow-[inset_0_6px_0_rgba(252,165,165,0.9)] md:p-7">
      <div className="mb-8 flex items-center gap-3">
        <ShieldAlert className="h-7 w-7 text-rose-300" />
        <MonoLabel className="text-slate-200">Portfolio Guardrail</MonoLabel>
      </div>
      <div className="space-y-5 text-lg">
        <div className="flex justify-between"><span className="text-slate-400">Target Allocation</span><span className="font-mono text-2xl text-slate-100">20%</span></div>
        <div className="flex justify-between"><span className="text-slate-400">Current Allocation</span><span className="font-mono text-2xl text-rose-300">28%</span></div>
        <div className="h-3 rounded-full bg-slate-800"><div className="h-full w-[28%] rounded-l-full bg-gradient-to-r from-emerald-400 via-emerald-400 to-rose-300" /></div>
        <div className="rounded-md border border-rose-300/20 bg-rose-300/10 p-4 text-rose-100">
          <p className="font-mono font-bold tracking-[0.12em]">△ Portfolio guardrail active</p>
          <p className="mt-3 text-slate-300">Consider reviewing exposure to maintain long-term goal alignment.</p>
        </div>
      </div>
    </section>
  );
}

function MobilePortfolioAllocation() {
  return (
    <section className="rounded-xl border border-slate-600 bg-slate-800/80 p-6 md:hidden">
      <div className="mb-7 flex items-center justify-between">
        <MonoLabel className="text-slate-200">Portfolio Allocation</MonoLabel>
        <SlidersHorizontal className="h-5 w-5 text-slate-300" />
      </div>
      <div className="mb-5 flex items-center justify-between text-xl text-slate-200">
        <span>Current BTC Exposure</span>
        <span className="font-mono text-3xl">12.5%</span>
      </div>
      <div className="h-3 rounded-full bg-slate-900"><div className="h-full w-[60%] rounded-full bg-emerald-400" /></div>
      <div className="mt-4 flex justify-between font-mono text-sm text-slate-300"><span>Min: 5%</span><span>Target Max: 20%</span></div>
      <div className="mt-6 flex items-center justify-between border-t border-slate-700 pt-6 text-xl">
        <span className="text-slate-300">Recommended Action</span>
        <span className="bg-cyan-300/10 px-3 py-1 font-mono text-lg text-cyan-300">Scale In +2.5%</span>
      </div>
    </section>
  );
}

function MobileBottomNav() {
  const nav = [
    { icon: LineChart, label: "Signals", active: true },
    { icon: TrendingUp, label: "Market" },
    { icon: WalletCards, label: "Portfolio" },
    { icon: Shield, label: "Risk" },
  ];
  return (
    <nav className="fixed inset-x-0 bottom-0 z-20 grid grid-cols-4 border-t border-slate-700 bg-slate-800 px-6 py-4 xl:hidden">
      {nav.map(({ icon: Icon, label, active }) => (
        <div key={label} className={`flex flex-col items-center justify-center gap-1 rounded-lg py-2 font-mono text-sm ${active ? "bg-cyan-500 text-slate-950" : "text-slate-300"}`}>
          <Icon className="h-6 w-6" />
          <span>{label}</span>
        </div>
      ))}
    </nav>
  );
}

export default function DashboardPage() {
  return (
    <main className="min-h-screen bg-[#080d16] text-slate-100 antialiased">
      <div className="flex min-h-screen">
        <DesktopSidebar />
        <div className="min-w-0 flex-1">
          <DesktopHeader />
          <div className="mx-auto max-w-[1400px] px-5 pb-32 pt-6 md:px-8 md:pb-12 md:pt-10">
            <div className="mb-8 flex items-start justify-between border-b border-slate-700/50 pb-8 xl:border-0 xl:pb-0">
              <div>
                <div className="flex items-center gap-4 xl:block">
                  <h1 className="text-4xl font-bold tracking-tight text-slate-100 xl:text-6xl">Bitcoin Signal</h1>
                  <div className="mt-3 flex items-center gap-4"><StatusBadge /><span className="font-mono text-sm tracking-[0.18em] text-slate-400">Updated 2m ago</span></div>
                </div>
                <p className="mt-5 hidden text-xl text-slate-300 xl:block">Macro-aware, portfolio-aware BTC decision support</p>
              </div>
              <RunSignalButton className="shrink-0 px-5 py-3 text-sm xl:px-10 xl:py-4 xl:text-lg" />
            </div>

            <div className="grid gap-6 xl:grid-cols-[1fr_0.5fr]">
              <div className="space-y-8">
                <PrimarySignalCard />
                <ComponentAnalysis />
                <div className="md:hidden"><WhySignal mobile /></div>
                <MobilePortfolioAllocation />
                <div className="hidden xl:block"><DesktopScoreGrid /></div>
              </div>
              <aside className="hidden space-y-8 xl:block">
                <WhySignal />
                <PortfolioGuardrail />
              </aside>
            </div>
          </div>
        </div>
      </div>
      <MobileBottomNav />
    </main>
  );
}
