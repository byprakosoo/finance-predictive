"use client";

import { useMemo, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Plus, X } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { HoldingsTable } from "@/components/holdings-table";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import type { Holding, PortfolioSignal } from "@/lib/types";

const holdingSchema = z.object({
  name: z.string().min(2, "Name is required"),
  symbol: z.string().min(2, "Symbol is required").max(10),
  quantity: z.coerce.number().positive("Quantity must be greater than zero"),
  averageBuyPrice: z.coerce.number().positive("Average buy price must be greater than zero"),
  notes: z.string().optional(),
});

type HoldingFormValues = z.infer<typeof holdingSchema>;

const priceBySymbol: Record<string, number> = {
  BTC: 68740,
  ETH: 4120,
  SOL: 132,
  ARB: 0.84,
  TIA: 12.84,
  RNDR: 9.16,
  ONDO: 1.42,
};

export function HoldingManager({
  initialHoldings,
  signals,
}: {
  initialHoldings: Holding[];
  signals: PortfolioSignal[];
}) {
  const [holdings, setHoldings] = useState(initialHoldings);
  const [editing, setEditing] = useState<Holding | null>(null);
  const [open, setOpen] = useState(false);
  const [deletedSymbol, setDeletedSymbol] = useState<string | null>(null);

  const form = useForm<HoldingFormValues>({
    resolver: zodResolver(holdingSchema),
    defaultValues: {
      name: "",
      symbol: "",
      quantity: 0,
      averageBuyPrice: 0,
      notes: "",
    },
  });

  const total = useMemo(
    () => holdings.reduce((sum, holding) => sum + holding.quantity * holding.currentPrice, 0),
    [holdings],
  );

  function startAdd() {
    setEditing(null);
    form.reset({ name: "", symbol: "", quantity: 0, averageBuyPrice: 0, notes: "" });
    setOpen(true);
  }

  function startEdit(holding: Holding) {
    setEditing(holding);
    form.reset({
      name: holding.name,
      symbol: holding.symbol,
      quantity: holding.quantity,
      averageBuyPrice: holding.averageBuyPrice,
      notes: holding.notes ?? "",
    });
    setOpen(true);
  }

  function submit(values: HoldingFormValues) {
    const symbol = values.symbol.toUpperCase();
    const currentPrice = priceBySymbol[symbol] ?? values.averageBuyPrice;
    const next: Holding = {
      id: editing?.id ?? `holding-${symbol.toLowerCase()}-${Date.now()}`,
      assetId: editing?.assetId ?? values.name.toLowerCase().replace(/\s+/g, "-"),
      name: values.name,
      symbol,
      quantity: values.quantity,
      averageBuyPrice: values.averageBuyPrice,
      currentPrice,
      change24h: editing?.change24h ?? 0,
      notes: values.notes,
    };

    setHoldings((items) => (editing ? items.map((item) => (item.id === editing.id ? next : item)) : [next, ...items]));
    setOpen(false);
  }

  function remove(holding: Holding) {
    setHoldings((items) => items.filter((item) => item.id !== holding.id));
    setDeletedSymbol(holding.symbol);
  }

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader
          title="Holdings management"
          description={`Mock session total: ${new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(total)}`}
          action={
            <Button onClick={startAdd}>
              <Plus className="h-4 w-4" /> Add Holding
            </Button>
          }
        />
        <CardContent>
          {deletedSymbol ? (
            <div className="mb-4 rounded-md border border-amber-200 bg-amber-50 px-3 py-2 text-sm text-amber-800">
              Removed {deletedSymbol} from this mock session.
            </div>
          ) : null}
          <HoldingsTable holdings={holdings} signals={signals} onEdit={startEdit} onDelete={remove} />
        </CardContent>
      </Card>

      {open ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/40 p-4">
          <div className="w-full max-w-lg rounded-lg border border-slate-700 bg-slate-900/80 shadow-xl">
            <div className="flex items-center justify-between border-b border-slate-700 px-5 py-4">
              <h2 className="text-base font-semibold text-slate-100">{editing ? "Edit holding" : "Add holding"}</h2>
              <Button variant="ghost" size="icon" onClick={() => setOpen(false)} aria-label="Close dialog">
                <X className="h-4 w-4" />
              </Button>
            </div>
            <form className="space-y-4 p-5" onSubmit={form.handleSubmit(submit)}>
              <Field label="Coin name" error={form.formState.errors.name?.message}>
                <input className="h-10 w-full rounded-md border border-slate-700 px-3 text-sm" {...form.register("name")} placeholder="Bitcoin" />
              </Field>
              <Field label="Symbol" error={form.formState.errors.symbol?.message}>
                <input className="h-10 w-full rounded-md border border-slate-700 px-3 text-sm uppercase" {...form.register("symbol")} placeholder="BTC" />
              </Field>
              <div className="grid gap-4 sm:grid-cols-2">
                <Field label="Quantity" error={form.formState.errors.quantity?.message}>
                  <input className="h-10 w-full rounded-md border border-slate-700 px-3 text-sm" type="number" step="any" {...form.register("quantity")} />
                </Field>
                <Field label="Average buy price" error={form.formState.errors.averageBuyPrice?.message}>
                  <input className="h-10 w-full rounded-md border border-slate-700 px-3 text-sm" type="number" step="any" {...form.register("averageBuyPrice")} />
                </Field>
              </div>
              <Field label="Notes" error={form.formState.errors.notes?.message}>
                <textarea className="min-h-20 w-full rounded-md border border-slate-700 px-3 py-2 text-sm" {...form.register("notes")} />
              </Field>
              <div className="flex justify-end gap-2">
                <Button type="button" variant="secondary" onClick={() => setOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit">{editing ? "Save changes" : "Add holding"}</Button>
              </div>
            </form>
          </div>
        </div>
      ) : null}
    </div>
  );
}

function Field({
  label,
  error,
  children,
}: {
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="mb-1 block text-sm font-medium text-slate-200">{label}</span>
      {children}
      {error ? <span className="mt-1 block text-xs text-rose-400">{error}</span> : null}
    </label>
  );
}
