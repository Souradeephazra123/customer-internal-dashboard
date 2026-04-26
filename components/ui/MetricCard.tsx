interface MetricCardProps {
  label: string;
  value: string | number;
  sub?: string;
  valueColor?: string;
}

export function MetricCard({ label, value, sub, valueColor }: MetricCardProps) {
  return (
    <div className="bg-gray-200 rounded-lg px-3.5 py-3">
      <div className="text-sm text-gray-500 mb-1">{label}</div>
      <div
        className="text-[22px] font-medium"
        style={{ color: valueColor ?? "inherit" }}
      >
        {value}
      </div>
      {sub && <div className="text-[11px] font-semibold text-gray-500 mt-0.5">{sub}</div>}
    </div>
  );
}