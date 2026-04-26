// interface ProgressBarProps {
//   value: number; // 0–100
//   color?: string;
// }

// export function ProgressBar({ value, color = "#1D9E75" }: ProgressBarProps) {
//   return (
//     <div className="h-1.25 rounded-sm bg-gray-100 overflow-hidden mt-0.5">
//       <div
//         className="h-full rounded-sm"
//         style={{ width: `${Math.min(value, 100)}%`, background: color }}
//       />
//     </div>
//   );
// }




// src/components/ui/ProgressBar.tsx
interface ProgressBarProps {
  value: number;
  color?: string;
  size?: "sm" | "md";
  showLabel?: boolean;
}

export function ProgressBar({
  value,
  color = "#1D9E75",
  size = "sm",
  showLabel = false,
}: ProgressBarProps) {
  const capped = Math.min(Math.max(value, 0), 100);
  return (
    <div className="flex items-center gap-2">
      <div
        className={`flex-1 rounded-full bg-gray-100 overflow-hidden ${
          size === "md" ? "h-2" : "h-1.25"
        }`}
      >
        <div
          className="h-full rounded-full transition-all duration-500 ease-out "
          style={{ width: `${capped}%`, background: color }}
        />
      </div>
      {showLabel && (
        <span className="text-[11px] tabular-nums text-gray-500 min-w-8 text-right">
          {capped}%
        </span>
      )}
    </div>
  );
}