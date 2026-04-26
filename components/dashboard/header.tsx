
export function Header() {
    return (
        <header className="flex items-center justify-between px-5 py-4 border-b border-gray-200">
            <div className="flex items-center gap-2">
                <div className="w-7 h-7 bg-[#1D9E75] rounded-md flex items-center justify-center text-white text-xs font-medium">
                    CQ
                </div>
                <span className="text-gray-500 ml-1 font-normal">
                    Customer Success Dashboard
                </span>

            </div>
            <span className="text-xs text-gray-500">April 2026 · Internal</span>
        </header>
    );
}