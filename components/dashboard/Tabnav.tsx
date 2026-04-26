
import { TABS } from "@/lib/constants";
import { cn } from "@/lib/utils";
import type { TabId } from "@/types";

interface TabNavProps {
  activeTab: TabId;
  onTabChange: (tab: TabId) => void;
}

export function TabNav({ activeTab, onTabChange }: TabNavProps) {
  return (
    <nav className="flex border-b border-gray-100/2 px-5 gap-0">
      {TABS.map((tab) => (
        <button
          key={tab.id}
          onClick={() => onTabChange(tab.id)}
          className={cn(
            "px-4 py-2.5 text-[13px] border-b-2 transition-colors whitespace-nowrap font-bold",
            activeTab === tab.id
              ? "text-[#1D9E75] border-[#1D9E75] font-bold"
              : "text-gray-500 border-transparent hover:text-gray-900"
          )}
        >
          {tab.label}
        </button>
      ))}
    </nav>
  );
}