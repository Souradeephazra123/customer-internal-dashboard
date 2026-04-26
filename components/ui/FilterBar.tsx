interface FilterBarProps {
  children: React.ReactNode;
}

export function FilterBar({ children }: FilterBarProps) {
  return (
    <div className="flex flex-wrap items-center gap-2 mb-3.5">{children}</div>
  );
}

export function FilterInput(
  props: React.InputHTMLAttributes<HTMLInputElement>
) {
  return (
    <input
      {...props}
      className="text-xs px-2.5 py-1.5 rounded-md border border-gray-200 bg-white text-gray-900 outline-none focus:border-[#1D9E75] transition-colors"
    />
  );
}

export function FilterSelect(
  props: React.SelectHTMLAttributes<HTMLSelectElement>
) {
  return (
    <select
      {...props}
      className="text-xs px-2.5 py-1.5 rounded-md border border-gray-200 bg-white text-gray-900 outline-none focus:border-[#1D9E75] transition-colors"
    />
  );
}