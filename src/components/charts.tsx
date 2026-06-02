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

const colors = ["#0f766e", "#2563eb", "#d97706", "#e11d48", "#64748b"];

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
          <Tooltip formatter={(value: number) => formatCurrency(value)} />
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
              <stop offset="5%" stopColor="#0f766e" stopOpacity={0.22} />
              <stop offset="95%" stopColor="#0f766e" stopOpacity={0} />
            </linearGradient>
          </defs>
          <XAxis dataKey="day" axisLine={false} tickLine={false} fontSize={12} />
          <YAxis hide domain={["dataMin - 1200", "dataMax + 1200"]} />
          <Tooltip formatter={(value: number) => formatCurrency(value)} />
          <Area type="monotone" dataKey="value" stroke="#0f766e" strokeWidth={2} fill="url(#portfolioValue)" />
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
          <XAxis dataKey="name" axisLine={false} tickLine={false} fontSize={12} />
          <YAxis hide domain={[0, 100]} />
          <Tooltip />
          <Bar dataKey="score" radius={[4, 4, 0, 0]} fill="#2563eb" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
