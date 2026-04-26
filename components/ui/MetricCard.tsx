import { cn } from "@/lib/utils";

interface MetricCardProps {
  label: string;
  value: string | number;
  sub?: string;
  valueColor?: string;
  accent?: "green" | "blue" | "amber" | "red" | "purple" | "default";
  size?: "default" | "hero";
}

const ACCENT_STYLES = {
  default: "from-gray-50 to-white border-gray-100",
  green: "from-emerald-50/60 to-white border-emerald-100/60",
  blue: "from-blue-50/60 to-white border-blue-100/60",
  amber: "from-amber-50/60 to-white border-amber-100/60",
  red: "from-red-50/60 to-white border-red-100/60",
  purple: "from-purple-50/60 to-white border-purple-100/60",
};

export function MetricCard({
  label,
  value,
  sub,
  valueColor,
  accent = "default",
  size = "default",
}: MetricCardProps) {
  return (
    <div
      className={cn(
        "rounded-xl border bg-gradient-to-br px-4 py-3.5 transition-shadow hover:shadow-md",
        ACCENT_STYLES[accent],
        size === "hero" && "py-5 px-5"
      )}
    >
      <div
        className={cn(
          "text-[12px] font-semibold uppercase tracking-wider text-gray-400 mb-1.5",
          size === "hero" && "text-xs"
        )}
      >
        {label}
      </div>
      <div
        className={cn(
          "font-semibold tabular-nums",
          size === "hero" ? "text-3xl" : "text-[22px]"
        )}
        style={{ color: valueColor ?? "inherit" }}
      >
        {value}
      </div>
      {sub && (
        <div className="text-[12px] text-gray-400 mt-1">{sub}</div>
      )}
    </div>
  );
}