import { AlertTriangle, Car, GraduationCap, Landmark, PiggyBank, ShieldCheck, Target, WalletCards } from "lucide-react";
import type { ComponentType } from "react";
import { AppShell, PageTitle } from "@/components/app-shell";
import { MetricCard } from "@/components/metric-card";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { requireUser } from "@/server/auth";
import { personalDashboardService } from "@/server/services";
import type { GoalPriority, GoalType, RebalancingDeviation } from "@/lib/types";

const assetLabels: Record<string, string> = {
  cash: "Cash",
  rpu: "RDPU",
  bond: "SBN/Bond",
  stock_idx: "IDX Stock",
  stock_us: "US Stock",
  gold: "Gold",
  crypto: "Crypto",
  mutual_fund: "Mutual Fund",
  property: "Property",
  other: "Other",
};

const goalLabels: Record<GoalType, { label: string; icon: ComponentType<{ className?: string }>; tone: string }> = {
  hajj: { label: "Haji", icon: Landmark, tone: "text-emerald-300 bg-emerald-400/10 border-emerald-400/20" },
  education: { label: "Education", icon: GraduationCap, tone: "text-blue-300 bg-blue-400/10 border-blue-400/20" },
  ev: { label: "EV", icon: Car, tone: "text-amber-300 bg-amber-400/10 border-amber-400/20" },
  emergency: { label: "Emergency", icon: ShieldCheck, tone: "text-cyan-300 bg-cyan-400/10 border-cyan-400/20" },
  retirement: { label: "Retirement", icon: PiggyBank, tone: "text-purple-300 bg-purple-400/10 border-purple-400/20" },
  home: { label: "Home", icon: WalletCards, tone: "text-slate-300 bg-slate-400/10 border-slate-400/20" },
  wedding: { label: "Wedding", icon: Target, tone: "text-pink-300 bg-pink-400/10 border-pink-400/20" },
  travel: { label: "Travel", icon: Target, tone: "text-teal-300 bg-teal-400/10 border-teal-400/20" },
  other: { label: "Other", icon: Target, tone: "text-slate-300 bg-slate-400/10 border-slate-400/20" },
};

const priorityVariant: Record<GoalPriority, "default" | "warning" | "danger" | "positive"> = {
  low: "default",
  medium: "warning",
  high: "danger",
  critical: "danger",
};

function formatIdr(value: number | null | undefined, compact = false) {
  if (value == null || Number.isNaN(value)) return "—";
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
    notation: compact ? "compact" : "standard",
    compactDisplay: "short",
  }).format(value);
}

function formatPct(value: number | null | undefined, digits = 1) {
  if (value == null || Number.isNaN(value)) return "—";
  return `${value.toFixed(digits)}%`;
}

function horizonLabel(days: number | null | undefined) {
  if (days == null) return "No deadline";
  if (days <= 365) return "<1y · 100% conservative";
  if (days <= 365 * 3) return "1–3y · 80% conservative";
  if (days <= 365 * 7) return "3–7y · balanced";
  return "7y+ · growth allowed";
}

function guardrailText(type: GoalType, days: number | null | undefined) {
  if (type === "emergency") return "Cash/RDPU only. Jangan expose ke crypto.";
  if (days != null && days <= 365 * 3) return "Prioritas aman: cash, RDPU, SBN/ORI. Crypto max 0–10%.";
  if (days != null && days <= 365 * 7) return "Moderate bucket: RDPT/SBN + sebagian equity.";
  return "Long-term bucket: boleh growth, tetap pakai max allocation.";
}

type DashboardData = Awaited<ReturnType<typeof personalDashboardService.snapshot>>;
type GoalWithProgress = NonNullable<DashboardData["goals"][number]>;

function GoalBucketCard({ goal }: { goal: GoalWithProgress }) {
  const meta = goalLabels[goal.type] ?? goalLabels.other;
  const Icon = meta.icon;
  const progress = Math.min(100, Math.max(0, goal.progressPct ?? 0));
  const remaining = Math.max(0, goal.targetAmount - goal.currentAmount);

  return (
    <Card className="overflow-hidden">
      <CardContent className="space-y-5">
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className={`flex h-12 w-12 items-center justify-center rounded-xl border ${meta.tone}`}>
              <Icon className="h-6 w-6" />
            </div>
            <div>
              <p className="text-lg font-semibold text-slate-100">{goal.name}</p>
              <p className="mt-1 font-mono text-xs uppercase tracking-[0.18em] text-slate-400">{meta.label} bucket</p>
            </div>
          </div>
          <Badge variant={priorityVariant[goal.priority]}>{goal.priority}</Badge>
        </div>

        <div>
          <div className="mb-2 flex items-center justify-between font-mono text-xs text-slate-400">
            <span>{formatIdr(goal.currentAmount, true)} saved</span>
            <span>{formatPct(progress, 0)}</span>
          </div>
          <div className="h-3 rounded-full bg-slate-800">
            <div className="h-3 rounded-full bg-cyan-300 shadow-[0_0_18px_rgba(34,211,238,0.35)]" style={{ width: `${progress}%` }} />
          </div>
        </div>

        <div className="grid gap-3 sm:grid-cols-3">
          <MiniStat label="Target" value={formatIdr(goal.targetAmount, true)} />
          <MiniStat label="Remaining" value={formatIdr(remaining, true)} />
          <MiniStat label="Monthly need" value={formatIdr(goal.monthlyNeeded, true)} />
        </div>

        <div className="rounded-lg border border-slate-700 bg-slate-900/60 p-4">
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-cyan-300">Guardrail</p>
          <p className="mt-2 text-sm leading-6 text-slate-300">{horizonLabel(goal.daysToDeadline)} — {guardrailText(goal.type, goal.daysToDeadline)}</p>
        </div>
      </CardContent>
    </Card>
  );
}

function MiniStat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg border border-slate-700 bg-slate-900/55 p-3">
      <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-slate-500">{label}</p>
      <p className="mt-2 font-mono text-sm font-semibold text-slate-100">{value}</p>
    </div>
  );
}

function AllocationRow({ deviation, totalValue }: { deviation: RebalancingDeviation; totalValue: number }) {
  const currentWidth = Math.min(100, Math.max(0, deviation.current));
  const targetWidth = Math.min(100, Math.max(0, deviation.target));
  const deltaIdr = (totalValue * Math.abs(deviation.deviation)) / 100;
  const actionClass = deviation.action === "trim" ? "text-rose-300" : deviation.action === "add" ? "text-emerald-300" : "text-slate-300";

  return (
    <div className="space-y-2 rounded-lg border border-slate-800 bg-slate-950/35 p-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="font-medium text-slate-100">{assetLabels[deviation.assetType] ?? deviation.assetType}</p>
          <p className="mt-1 text-xs text-slate-500">Current {formatPct(deviation.current)} · Target {formatPct(deviation.target)}</p>
        </div>
        <p className={`font-mono text-sm font-semibold uppercase ${actionClass}`}>{deviation.action} {formatIdr(deltaIdr, true)}</p>
      </div>
      <div className="relative h-3 rounded-full bg-slate-800">
        <div className="absolute left-0 top-0 h-3 rounded-full bg-cyan-300/80" style={{ width: `${currentWidth}%` }} />
        <div className="absolute top-[-4px] h-5 w-0.5 bg-amber-300" style={{ left: `${targetWidth}%` }} />
      </div>
    </div>
  );
}

function BreakdownGrid({ breakdown }: { breakdown?: Record<string, number> | null }) {
  const entries = Object.entries(breakdown ?? {}).sort((a, b) => b[1] - a[1]);
  const total = entries.reduce((sum, [, value]) => sum + value, 0);
  return (
    <div className="space-y-3">
      {entries.map(([key, value]) => {
        const pct = total === 0 ? 0 : (value / total) * 100;
        return (
          <div key={key}>
            <div className="mb-1 flex justify-between gap-3 text-sm">
              <span className="text-slate-300">{assetLabels[key] ?? key}</span>
              <span className="font-mono text-slate-100">{formatIdr(value, true)} · {formatPct(pct)}</span>
            </div>
            <div className="h-2 rounded-full bg-slate-800">
              <div className="h-2 rounded-full bg-cyan-300/75" style={{ width: `${Math.min(100, pct)}%` }} />
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default async function PersonalFinancePage() {
  const user = await requireUser();
  const data = await personalDashboardService.snapshot(user.id);
  const goals = data.goals.filter((goal): goal is GoalWithProgress => Boolean(goal));
  const criticalGoals = goals.filter((goal) => goal.priority === "critical" || goal.priority === "high").length;
  const protectionGaps = data.insurance.gaps.filter((gap) => gap.priority === "critical" || gap.priority === "high").length;
  const trimAlerts = data.rebalancing.deviations.filter((deviation) => deviation.action === "trim");
  const totalGoalTarget = goals.reduce((sum, goal) => sum + goal.targetAmount, 0);
  const totalGoalSaved = goals.reduce((sum, goal) => sum + goal.currentAmount, 0);

  return (
    <AppShell>
      <PageTitle
        title="Personal Finance"
        description="Goal-based cockpit untuk net worth, cashflow, proteksi, rebalancing, dan bucket Haji/TK/EV/EF. Fokusnya bukan cari alpha doang — tapi menjaga goal 1–3 tahun tetap aman."
      />

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <MetricCard label="Net worth" value={formatIdr(data.netWorth?.netWorth, true)} detail={`Snapshot ${data.netWorth?.snapshotDate?.slice(0, 10) ?? "—"}`} trend="neutral" />
        <MetricCard label="30d cashflow" value={formatIdr(data.cashFlow.netCashFlow, true)} detail={`Saving rate ${formatPct(data.cashFlow.savingsRate)}`} trend={data.cashFlow.netCashFlow >= 0 ? "up" : "down"} />
        <MetricCard label="Goal funding" value={formatPct(totalGoalTarget ? (totalGoalSaved / totalGoalTarget) * 100 : 0)} detail={`${goals.length} active buckets · ${criticalGoals} priority`} trend="neutral" />
        <MetricCard label="Protection gaps" value={String(protectionGaps)} detail={`${formatIdr(data.insurance.monthlyPremium.shariah, true)} current shariah premium`} trend={protectionGaps > 0 ? "down" : "up"} />
      </div>

      <div className="mt-4 grid gap-4 xl:grid-cols-[1.05fr_0.95fr]">
        <Card>
          <CardHeader title="Net worth allocation" description="Current asset mix vs long-term goal safety. Short-term goals should not depend on crypto drawdown recovery." />
          <CardContent>
            <BreakdownGrid breakdown={data.netWorth?.breakdownJson} />
          </CardContent>
        </Card>

        <Card>
          <CardHeader title="Cashflow diagnosis" description="30-day spending summary. One-off expenses should be separated from recurring burn." />
          <CardContent className="space-y-4">
            <div className="grid gap-3 sm:grid-cols-3">
              <MiniStat label="Income" value={formatIdr(data.cashFlow.totalIncome, true)} />
              <MiniStat label="Expense" value={formatIdr(data.cashFlow.totalExpense, true)} />
              <MiniStat label="Net" value={formatIdr(data.cashFlow.netCashFlow, true)} />
            </div>
            <div className="space-y-3">
              {data.cashFlow.topCategories.map((category) => (
                <div key={category.categoryId ?? category.name}>
                  <div className="mb-1 flex justify-between gap-3 text-sm">
                    <span className="text-slate-300">{category.name}</span>
                    <span className="font-mono text-slate-100">{formatIdr(category.amount, true)} · {formatPct(category.pctOfExpense)}</span>
                  </div>
                  <div className="h-2 rounded-full bg-slate-800">
                    <div className="h-2 rounded-full bg-amber-300/80" style={{ width: `${Math.min(100, category.pctOfExpense)}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="mt-4 grid gap-4 xl:grid-cols-[0.9fr_1.1fr]">
        <Card>
          <CardHeader title="Rebalancing guardrails" description="Action cue berbasis target allocation. Ini loss-prevention layer utama." />
          <CardContent className="space-y-3">
            {data.rebalancing.alerts.length > 0 ? (
              <div className="space-y-3">
                {data.rebalancing.alerts.map((alert) => (
                  <div key={alert.assetType} className="rounded-lg border border-rose-300/20 bg-rose-400/10 p-4 text-sm leading-6 text-rose-100">
                    <div className="mb-2 flex items-center gap-2 font-semibold text-rose-300"><AlertTriangle className="h-4 w-4" /> {alert.severity.toUpperCase()}</div>
                    {alert.message}
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-slate-400">No major allocation drift.</p>
            )}

            <div className="space-y-3 pt-2">
              {data.rebalancing.deviations
                .sort((a, b) => Math.abs(b.deviation) - Math.abs(a.deviation))
                .map((deviation) => (
                  <AllocationRow key={deviation.assetType} deviation={deviation} totalValue={data.rebalancing.totalValueIdr} />
                ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader title="Decision queue" description="Apa yang harus direview dulu supaya portfolio gak ulang minus besar." />
          <CardContent>
            <div className="space-y-3">
              {trimAlerts.map((deviation) => (
                <div key={deviation.assetType} className="rounded-lg border border-rose-300/20 bg-slate-950/45 p-4">
                  <Badge variant="danger">Review trim</Badge>
                  <p className="mt-3 text-lg font-semibold text-slate-100">{assetLabels[deviation.assetType]} overweight {formatPct(deviation.deviation)}</p>
                  <p className="mt-2 text-sm leading-6 text-slate-400">Jangan tambah exposure sebelum bucket Haji/TK/EF aman. Pakai DCA-out / take-profit review, bukan panic sell.</p>
                </div>
              ))}
              {data.insurance.gaps.slice(0, 3).map((gap) => (
                <div key={gap.type} className="rounded-lg border border-amber-300/20 bg-slate-950/45 p-4">
                  <Badge variant={gap.priority === "critical" ? "danger" : "warning"}>{gap.priority}</Badge>
                  <p className="mt-3 text-lg font-semibold capitalize text-slate-100">{gap.type.replaceAll("_", " ")} protection gap</p>
                  <p className="mt-2 text-sm leading-6 text-slate-400">{gap.recommendation}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <section className="mt-8">
        <div className="mb-4 flex flex-wrap items-end justify-between gap-3">
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.28em] text-cyan-300">Goal Buckets</p>
            <h2 className="mt-2 text-3xl font-bold text-slate-100">Haji · TK · EV · Emergency Fund</h2>
            <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-400">Setiap goal dipisah jadi ember. Goal pendek harus konservatif, growth portfolio jangan nyeret dana wajib keluarga.</p>
          </div>
          <Badge variant="default">{formatIdr(totalGoalSaved, true)} / {formatIdr(totalGoalTarget, true)}</Badge>
        </div>
        <div className="grid gap-4 lg:grid-cols-2">
          {goals.map((goal) => <GoalBucketCard key={goal.id} goal={goal} />)}
        </div>
      </section>
    </AppShell>
  );
}
