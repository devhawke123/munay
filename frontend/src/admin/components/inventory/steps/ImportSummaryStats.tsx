import type { ImportSummary } from "../importTypes";

function SummaryStat({
  label,
  value,
  tone,
}: {
  label: string;
  value: string;
  tone?: "success" | "danger";
}) {
  const toneClass = tone === "success" ? "text-success" : tone === "danger" ? "text-danger" : "text-text-primary";

  return (
    <div className="rounded-[10px] border border-brand/10 bg-tint-brand py-4 text-center">
      <p className={`text-3xl font-bold ${toneClass}`}>{value}</p>
      <p className="mt-1 text-xs text-text-muted">{label}</p>
    </div>
  );
}

export function ImportSummaryStats({ summary }: { summary: ImportSummary }) {
  return (
    <div className="grid grid-cols-3 gap-3">
      <SummaryStat label="Total Rows" value={String(summary.totalRows)} />
      <SummaryStat
        label="Invalid Rows"
        value={String(summary.invalidRows)}
        tone={summary.invalidRows > 0 ? "danger" : undefined}
      />
      <SummaryStat label="Valid Rows" value={String(summary.validRows)} tone="success" />
    </div>
  );
}
