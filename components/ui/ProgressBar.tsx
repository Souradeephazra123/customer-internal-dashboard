interface ProgressBarProps {
  value: number; // 0–100
  color?: string;
}

export function ProgressBar({ value, color = "#1D9E75" }: ProgressBarProps) {
  return (
    <div className="h-1.25 rounded-sm bg-gray-100 overflow-hidden mt-0.5">
      <div
        className="h-full rounded-sm"
        style={{ width: `${Math.min(value, 100)}%`, background: color }}
      />
    </div>
  );
}