"use client";

import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import type { Holding } from "@/lib/types";
import { formatCurrency } from "@/lib/utils";

const movement = [
  { day: "Mon", value: 64100 },
  { day: "Tue", value: 65840 },
  { day: "Wed", value: 66420 },
  { day: "Thu", value: 68240 },
  { day: "Fri", value: 67271 },
];

// Cyan-aligned palette that matches the terminal theme.
const colors = ["#22d3ee", "#0ea5e9", "#38bdf8", "#2dd4bf", "#94a3b8"];

function ChartTooltip({ active, payload, label, formatter }: {
  active?: boolean;
  payload?: Array<{ name?: string; value?: number; color?: string }>;
  label?: string;
  formatter?: (value: number) => string;
}) {
  if (!active || !payload || payload.length === 0) return null;
  return (
    <div className="rounded-md border border-border bg-popover px-3 py-2 text-xs shadow-panel">
      {label ? <p className="mb-1 font-mono uppercase tracking-wider text-muted-foreground">{label}</p> : null}
      {payload.map((entry, index) => (
        <p key={index} className="flex items-center gap-2 font-medium text-popover-foreground">
          {entry.color ? <span className="h-2 w-2 rounded-full" style={{ backgroundColor: entry.color }} /> : null}
          {formatter && entry.value != null ? formatter(entry.value) : entry.value}
        </p>
      ))}
    </div>
  );
}

export function AllocationChart({ holdings }: { holdings: Holding[] }) {
  const data = holdings.map((holding) => ({
    name: holding.symbol,
    value: holding.quantity * holding.currentPrice,
  }));

  return (
    <div className="h-64 w-full">
      <ResponsiveContainer>
        <PieChart>
          <Pie data={data} dataKey="value" nameKey="name" innerRadius={58} outerRadius={88} paddingAngle={2}>
            {data.map((entry, index) => (
              <Cell key={entry.name} fill={colors[index % colors.length]} />
            ))}
          </Pie>
          <Tooltip content={<ChartTooltip formatter={(value) => formatCurrency(value)} />} />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}

export function PortfolioMovementChart() {
  return (
    <div className="h-64 w-full">
      <ResponsiveContainer>
        <AreaChart data={movement} margin={{ left: 0, right: 0, top: 8, bottom: 0 }}>
          <defs>
            <linearGradient id="portfolioValue" x1="0" x2="0" y1="0" y2="1">
              <stop offset="5%" stopColor="#22d3ee" stopOpacity={0.22} />
              <stop offset="95%" stopColor="#22d3ee" stopOpacity={0} />
            </linearGradient>
          </defs>
          <XAxis dataKey="day" axisLine={false} tickLine={false} fontSize={12} stroke="hsl(var(--muted-foreground))" />
          <YAxis hide domain={["dataMin - 1200", "dataMax + 1200"]} />
          <Tooltip content={<ChartTooltip formatter={(value) => formatCurrency(value)} />} />
          <Area type="monotone" dataKey="value" stroke="#22d3ee" strokeWidth={2} fill="url(#portfolioValue)" />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}

export function AlphaScoreChart() {
  const data = [
    { name: "TIA", score: 86 },
    { name: "RNDR", score: 78 },
    { name: "ONDO", score: 73 },
    { name: "AKT", score: 71 },
  ];

  return (
    <div className="h-56 w-full">
      <ResponsiveContainer>
        <BarChart data={data} margin={{ left: 0, right: 0, top: 8, bottom: 0 }}>
          <XAxis dataKey="name" axisLine={false} tickLine={false} fontSize={12} stroke="hsl(var(--muted-foreground))" />
          <YAxis hide domain={[0, 100]} />
          <Tooltip cursor={{ fill: "hsl(var(--muted) / 0.5)" }} content={<ChartTooltip />} />
          <Bar dataKey="score" radius={[4, 4, 0, 0]} fill="#22d3ee" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
