import Link from "next/link";
import { ArrowRight, BarChart3, ShieldCheck, Sparkles, WalletCards } from "lucide-react";
import { Button } from "@/components/ui/button";

const featureCards = [
  { icon: WalletCards, label: "Manual portfolio tracking" },
  { icon: Sparkles, label: "Alpha score discovery" },
  { icon: ShieldCheck, label: "Decision support only" },
];

export default function LandingPage() {
  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <section className="mx-auto flex min-h-screen w-full max-w-6xl flex-col justify-between px-4 py-6 sm:px-6">
        <nav className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-md bg-teal-500">
              <BarChart3 className="h-5 w-5" />
            </div>
            <div>
              <p className="font-semibold">Crypto Alpha</p>
              <p className="text-xs text-slate-400">Portfolio Tracker</p>
            </div>
          </div>
          <Link href="/dashboard">
            <Button variant="secondary">Open demo</Button>
          </Link>
        </nav>

        <div className="grid gap-10 py-16 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
          <div>
            <h1 className="max-w-3xl text-4xl font-semibold tracking-normal sm:text-5xl lg:text-6xl">
              Crypto Alpha Portfolio Tracker
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-7 text-slate-300">
              A portfolio-first market intelligence workspace for tracking holdings, reviewing transparent signals,
              reading a daily brief, and discovering altcoins worth manual review.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/dashboard">
                <Button>
                  Review dashboard <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
              <Button variant="secondary">Sign in with Google</Button>
            </div>
          </div>

          <div className="rounded-lg border border-white/10 bg-white/8 p-4 shadow-2xl">
            <div className="grid gap-3">
              {[
                ["Total value", "$67,271.40", "+3.77% all-time"],
                ["Macro status", "Neutral", "Yield pressure offset by CPI cooling"],
                ["Fear & Greed", "38 Fear", "Sentiment remains cautious"],
              ].map(([label, value, detail]) => (
                <div key={label} className="rounded-md border border-white/10 bg-slate-900 p-4">
                  <p className="text-xs uppercase text-slate-400">{label}</p>
                  <p className="mt-2 text-2xl font-semibold">{value}</p>
                  <p className="mt-2 text-xs text-slate-400">{detail}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="grid gap-3 pb-4 sm:grid-cols-3">
          {featureCards.map(({ icon: Icon, label }) => (
            <div key={label} className="flex items-center gap-3 rounded-md border border-white/10 bg-white/5 p-4 text-sm text-slate-200">
              <Icon className="h-4 w-4 text-teal-300" />
              {label}
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
