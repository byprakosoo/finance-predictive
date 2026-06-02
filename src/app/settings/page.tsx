import { AppShell, PageTitle } from "@/components/app-shell";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

export default function SettingsPage() {
  return (
    <AppShell>
      <PageTitle
        title="Settings"
        description="Account and system configuration placeholders for the later authenticated backend phase."
      />

      <div className="grid gap-4 lg:grid-cols-2">
        <Card>
          <CardHeader title="Account" description="Google auth will replace this mock profile." />
          <CardContent>
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-md bg-slate-900 font-semibold text-white">AI</div>
              <div>
                <p className="font-medium text-slate-950">Alex Investor</p>
                <p className="text-sm text-muted-foreground">alex@example.com</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader title="Refresh policy" description="Read-only MVP defaults from the PRD." />
          <CardContent>
            <div className="space-y-3">
              <SettingRow label="Market data cache" value="15 minutes" />
              <SettingRow label="Macro data cache" value="24 hours" />
              <SettingRow label="Morning brief" value="Once per day" />
              <SettingRow label="AI summary" value="Optional later" />
            </div>
          </CardContent>
        </Card>
      </div>
    </AppShell>
  );
}

function SettingRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between gap-4 rounded-md border border-border p-3">
      <span className="text-sm font-medium text-slate-950">{label}</span>
      <Badge variant="default">{value}</Badge>
    </div>
  );
}
