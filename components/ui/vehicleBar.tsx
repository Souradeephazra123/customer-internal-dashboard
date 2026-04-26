// src/components/ui/VehicleBar.tsx

interface Segment {
  value: number;
  color: string;
  label: string;
}

interface VehicleBarProps {
  segments: Segment[];
  total: number;
}

export function VehicleBar({ segments, total }: VehicleBarProps) {
  if (total === 0) return <div className="h-2 bg-gray-100 rounded-full" />;

  return (
    <div className="group relative">
      <div className="flex h-2 rounded-full overflow-hidden bg-gray-100">
        {segments.map((seg, i) =>
          seg.value > 0 ? (
            <div
              key={i}
              className="h-full transition-all duration-300 first:rounded-l-full last:rounded-r-full"
              style={{
                width: `${(seg.value / total) * 100}%`,
                background: seg.color,
              }}
            />
          ) : null
        )}
      </div>
      {/* Hover tooltip */}
      <div className="absolute bottom-full left-0 mb-2 hidden group-hover:flex bg-gray-900 text-white text-[10px] rounded-lg px-3 py-2 gap-3 whitespace-nowrap z-10 shadow-lg">
        {segments
          .filter((s) => s.value > 0)
          .map((seg, i) => (
            <span key={i} className="flex items-center gap-1">
              <span
                className="w-2 h-2 rounded-sm"
                style={{ background: seg.color }}
              />
              {seg.label}: {seg.value}
            </span>
          ))}
      </div>
    </div>
  );
}

export const VEHICLE_COLORS = {
  cargoVan: "#1D9E75",
  sprinterVan: "#378ADD",
  boxTruck: "#BA7517",
  pickupTruck: "#6B21A8",
  electricVan: "#E24B4A",
};