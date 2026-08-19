type SalesStatCardProps = {
  label: string;
  value: string;
};

export function SalesStatCard({ label, value }: SalesStatCardProps) {
  return (
    <div className="w-[220px] rounded-[7px] border border-brand-border bg-white p-4">
      <p className="text-sm font-medium text-text-muted">{label}</p>
      <p className="mt-1 text-xl font-bold text-text-primary">{value}</p>
    </div>
  );
}
