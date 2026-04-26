// // src/components/tabs/SupportComms.tsx
// "use client";

// import { useState, useMemo } from "react";
// import { TICKETS, sortTicketsByPriority } from "@/data/tickets";
// import { getCustomerName } from "@/data/customer";
// import { MetricCard } from "@/components/ui/MetricCard";
// import { PrioBadge, TicketStatusBadge } from "@/components/ui/Badge";
// import { FilterBar, FilterInput, FilterSelect } from "@/components/ui/FilterBar";

// export function SupportComms() {
//   const [search, setSearch] = useState("");
//   const [statusFilter, setStatusFilter] = useState("");
//   const [prioFilter, setPrioFilter] = useState("");
//   const [channelFilter, setChannelFilter] = useState("");

//   // Aggregate KPIs
//   const openCount = TICKETS.filter((t) => t.status === "Open").length;
//   const criticalOpen = TICKETS.filter(
//     (t) => t.priority === "Critical" && t.status !== "Resolved"
//   ).length;
//   const resolvedCount = TICKETS.filter((t) => t.status === "Resolved").length;

//   const csatTickets = TICKETS.filter((t) => t.csat !== null);
//   const avgCsat = (
//     csatTickets.reduce((a, t) => a + (t.csat ?? 0), 0) / csatTickets.length
//   ).toFixed(1);

//   const unresolvedTickets = TICKETS.filter((t) => t.status !== "Resolved");
//   const avgAge = Math.round(
//     unresolvedTickets.reduce((a, t) => a + t.age, 0) / unresolvedTickets.length
//   );

//   // Filtered + sorted
//   const filtered = useMemo(() => {
//     const q = search.toLowerCase();
//     const result = TICKETS.filter(
//       (t) =>
//         (!q || t.subject.toLowerCase().includes(q)) &&
//         (!statusFilter || t.status === statusFilter) &&
//         (!prioFilter || t.priority === prioFilter) &&
//         (!channelFilter || t.channel === channelFilter)
//     );
//     return sortTicketsByPriority(result);
//   }, [search, statusFilter, prioFilter, channelFilter]);

//   return (
//     <>
//       {/* KPI row */}
//       <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2.5 mb-5">
//         <MetricCard label="Open tickets" value={openCount} valueColor="#BA7517" />
//         <MetricCard label="Critical open" value={criticalOpen} valueColor="#A32D2D" />
//         <MetricCard
//           label="Resolved (30d)"
//           value={resolvedCount}
//           valueColor="#3B6D11"
//         />
//         <MetricCard label="Avg CSAT" value={`${avgCsat}/5`} />
//         <MetricCard label="Avg age (open)" value={`${avgAge}d`} />
//       </div>

//       {/* Filters */}
//       <FilterBar>
//         <FilterInput
//           placeholder="Search subject..."
//           value={search}
//           onChange={(e) => setSearch(e.target.value)}
//           style={{ width: 160 }}
//         />
//         <FilterSelect
//           value={statusFilter}
//           onChange={(e) => setStatusFilter(e.target.value)}
//         >
//           <option value="">All statuses</option>
//           <option>Open</option>
//           <option>In Progress</option>
//           <option>Resolved</option>
//         </FilterSelect>
//         <FilterSelect
//           value={prioFilter}
//           onChange={(e) => setPrioFilter(e.target.value)}
//         >
//           <option value="">All priorities</option>
//           <option>Critical</option>
//           <option>High</option>
//           <option>Medium</option>
//           <option>Low</option>
//         </FilterSelect>
//         <FilterSelect
//           value={channelFilter}
//           onChange={(e) => setChannelFilter(e.target.value)}
//         >
//           <option value="">All channels</option>
//           <option>Slack</option>
//           <option>Email</option>
//           <option>Portal</option>
//           <option>Phone</option>
//         </FilterSelect>
//       </FilterBar>

//       {/* Tickets table */}
//       <div className="bg-white border border-gray-200 rounded-lg p-3.5 overflow-x-auto">
//         <table className="w-full text-xs border-collapse">
//           <thead>
//             <tr>
//               {["ID", "Customer", "Subject", "Priority", "Status", "Channel", "CSAT", "Age"].map(
//                 (h) => (
//                   <th
//                     key={h}
//                     className="text-left px-2.5 py-1.75 text-xs font-semibold text-gray-500 border-b border-gray-200 whitespace-nowrap"
//                   >
//                     {h}
//                   </th>
//                 )
//               )}
//             </tr>
//           </thead>
//           <tbody>
//             {filtered.map((t) => (
//               <tr key={t.id} className="hover:bg-gray-50">
//                 <td className="px-2.5 py-2 border-b border-gray-100 text-gray-400 text-[11px]">
//                   {t.id}
//                 </td>
//                 <td className="px-2.5 py-2 border-b border-gray-100 font-medium">
//                   {getCustomerName(t.custId)}
//                 </td>
//                 <td className="px-2.5 py-2 border-b border-gray-100">
//                   {t.subject}
//                 </td>
//                 <td className="px-2.5 py-2 border-b border-gray-100">
//                   <PrioBadge priority={t.priority} />
//                 </td>
//                 <td className="px-2.5 py-2 border-b border-gray-100">
//                   <TicketStatusBadge status={t.status} />
//                 </td>
//                 <td className="px-2.5 py-2 border-b border-gray-100">
//                   {t.channel}
//                 </td>
//                 <td className="px-2.5 py-2 border-b border-gray-100">
//                   {t.csat ? "★".repeat(t.csat) : "—"}
//                 </td>
//                 <td
//                   className={`px-2.5 py-2 border-b border-gray-100 ${
//                     t.age > 7 ? "text-[#A32D2D] font-medium" : "text-gray-500"
//                   }`}
//                 >
//                   {t.age}d
//                 </td>
//               </tr>
//             ))}
//             {filtered.length === 0 && (
//               <tr>
//                 <td
//                   colSpan={8}
//                   className="px-2.5 py-8 text-center text-gray-400 text-sm"
//                 >
//                   No tickets match the current filters.
//                 </td>
//               </tr>
//             )}
//           </tbody>
//         </table>
//       </div>
//     </>
//   );
// }



// src/components/tabs/SupportComms.tsx
"use client";

import { useState, useMemo } from "react";
import {
  TICKETS,
  sortTicketsByPriority,
  getDistinctChannels,
  getDistinctStatuses,
  getDistinctPriorities,
} from "@/data/tickets";
import { MetricCard } from "@/components/ui/MetricCard";
import { PrioBadge, TicketStatusBadge } from "@/components/ui/Badge";
import { FilterBar, FilterInput, FilterSelect } from "@/components/ui/FilterBar";

export function SupportComms() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [prioFilter, setPrioFilter] = useState("");
  const [channelFilter, setChannelFilter] = useState("");
  const [csmFilter, setCsmFilter] = useState("");

  // ---- Dropdown options derived from actual data ----
  const channels = useMemo(() => getDistinctChannels(), []);
  const statuses = useMemo(() => getDistinctStatuses(), []);
  const priorities = useMemo(() => getDistinctPriorities(), []);
  const csms = useMemo(
    () => [...new Set(TICKETS.map((t) => t.assignedCsm))].sort(),
    []
  );

  // ---- Aggregate KPIs — all from real client fields ----
  const openCount = TICKETS.filter((t) => t.status === "Open").length;
  const inProgressCount = TICKETS.filter((t) => t.status === "In Progress").length;
  const waitingCount = TICKETS.filter(
    (t) => t.status === "Waiting on Customer"
  ).length;
  const resolvedCount = TICKETS.filter((t) => t.status === "Resolved").length;
  const criticalOpen = TICKETS.filter(
    (t) => t.priority === "Critical" && t.status !== "Resolved"
  ).length;

  // Avg CSAT from tickets that have a score
  const csatTickets = TICKETS.filter((t) => t.csatScore !== null);
  const avgCsat =
    csatTickets.length > 0
      ? (
          csatTickets.reduce((a, t) => a + (t.csatScore ?? 0), 0) /
          csatTickets.length
        ).toFixed(1)
      : "N/A";

  // Avg resolution days from tickets that have it
  const resolvedTickets = TICKETS.filter((t) => t.resolutionDays !== null);
  const avgResolution =
    resolvedTickets.length > 0
      ? (
          resolvedTickets.reduce((a, t) => a + (t.resolutionDays ?? 0), 0) /
          resolvedTickets.length
        ).toFixed(1)
      : "N/A";

  // ---- Filtered + sorted ----
  const filtered = useMemo(() => {
    const q = search.toLowerCase();
    const result = TICKETS.filter(
      (t) =>
        (!q ||
          t.subject.toLowerCase().includes(q) ||
          t.ticketId.toLowerCase().includes(q) ||
          t.companyName.toLowerCase().includes(q)) &&
        (!statusFilter || t.status === statusFilter) &&
        (!prioFilter || t.priority === prioFilter) &&
        (!channelFilter || t.channel === channelFilter) &&
        (!csmFilter || t.assignedCsm === csmFilter)
    );
    return sortTicketsByPriority(result);
  }, [search, statusFilter, prioFilter, channelFilter, csmFilter]);

  return (
    <>
      {/* KPI row — derived from actual client fields only */}
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2.5 mb-5">
        <MetricCard
          label="Open"
          value={openCount}
          valueColor="#BA7517"
        />
        <MetricCard
          label="In Progress"
          value={inProgressCount}
          valueColor="#185FA5"
        />
        <MetricCard
          label="Waiting on Customer"
          value={waitingCount}
          valueColor="#6B21A8"
        />
        <MetricCard
          label="Resolved"
          value={resolvedCount}
          valueColor="#3B6D11"
        />
        <MetricCard
          label="Critical (unresolved)"
          value={criticalOpen}
          valueColor="#A32D2D"
        />
        <MetricCard
          label="Avg CSAT"
          value={avgCsat === "N/A" ? avgCsat : `${avgCsat}/5`}
        />
        <MetricCard
          label="Avg Resolution"
          value={avgResolution === "N/A" ? avgResolution : `${avgResolution}d`}
        />
      </div>

      {/* Filters — options derived from actual data, not hardcoded */}
      <FilterBar>
        <FilterInput
          placeholder="Search subject, ID, or company..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{ width: 220 }}
        />
        <FilterSelect
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <option value="">All statuses</option>
          {statuses.map((s) => (
            <option key={s}>{s}</option>
          ))}
        </FilterSelect>
        <FilterSelect
          value={prioFilter}
          onChange={(e) => setPrioFilter(e.target.value)}
        >
          <option value="">All priorities</option>
          {priorities.map((p) => (
            <option key={p}>{p}</option>
          ))}
        </FilterSelect>
        <FilterSelect
          value={channelFilter}
          onChange={(e) => setChannelFilter(e.target.value)}
        >
          <option value="">All channels</option>
          {channels.map((c) => (
            <option key={c}>{c}</option>
          ))}
        </FilterSelect>
        <FilterSelect
          value={csmFilter}
          onChange={(e) => setCsmFilter(e.target.value)}
        >
          <option value="">All CSMs</option>
          {csms.map((c) => (
            <option key={c}>{c}</option>
          ))}
        </FilterSelect>
      </FilterBar>

      {/* Tickets table — every column is a real client field */}
      <div className="bg-white border border-gray-200 rounded-lg p-3.5 overflow-x-auto">
        <table className="w-full text-xs border-collapse">
          <thead>
            <tr>
              {[
                "Ticket ID",
                "Company",
                "Subject",
                "Channel",
                "Priority",
                "Status",
                "Created",
                "Last Updated",
                "Assigned CSM",
                "Resolution Days",
                "CSAT",
              ].map((h) => (
                <th
                  key={h}
                  className="text-left px-2.5 py-1.75 text-[11px] font-semibold uppercase tracking-wider text-gray-500 border-b border-gray-200 whitespace-nowrap"
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.map((t) => (
              <tr key={t.ticketId} className="hover:bg-gray-50">
                <td className="px-2.5 py-2 border-b border-gray-100 text-gray-400 text-[11px]">
                  {t.ticketId}
                </td>
                <td className="px-2.5 py-2 border-b border-gray-100 font-medium">
                  {t.companyName}
                </td>
                <td className="px-2.5 py-2 border-b border-gray-100 max-w-62.5 truncate">
                  {t.subject}
                </td>
                <td className="px-2.5 py-2 border-b border-gray-100">
                  {t.channel}
                </td>
                <td className="px-2.5 py-2 border-b border-gray-100">
                  <PrioBadge priority={t.priority} />
                </td>
                <td className="px-2.5 py-2 border-b border-gray-100">
                  <TicketStatusBadge status={t.status} />
                </td>
                <td className="px-2.5 py-2 border-b border-gray-100 text-gray-500 whitespace-nowrap">
                  {t.createdDate}
                </td>
                <td className="px-2.5 py-2 border-b border-gray-100 text-gray-500 whitespace-nowrap">
                  {t.lastUpdated}
                </td>
                <td className="px-2.5 py-2 border-b border-gray-100">
                  {t.assignedCsm}
                </td>
                <td
                  className={`px-2.5 py-2 border-b border-gray-100 ${
                    t.resolutionDays !== null && t?.resolutionDays > 7
                      ? "text-[#A32D2D] font-medium"
                      : "text-gray-500"
                  }`}
                >
                  {t.resolutionDays ?? "—"}
                </td>
                <td className="px-2.5 py-2 border-b border-gray-100">
                  {t.csatScore !== null ? "★".repeat(t?.csatScore) : "—"}
                </td>
              </tr>
            ))}
            {filtered.length === 0 && (
              <tr>
                <td
                  colSpan={11}
                  className="px-2.5 py-8 text-center text-gray-400 text-sm"
                >
                  No tickets match the current filters.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
}