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


  const channels = useMemo(() => getDistinctChannels(), []);
  const statuses = useMemo(() => getDistinctStatuses(), []);
  const priorities = useMemo(() => getDistinctPriorities(), []);
  const csms = useMemo(
    () => [...new Set(TICKETS.map((t) => t.assignedCsm))].sort(),
    []
  );

  const openCount = TICKETS.filter((t) => t.status === "Open").length;
  const inProgressCount = TICKETS.filter((t) => t.status === "In Progress").length;
  const waitingCount = TICKETS.filter(
    (t) => t.status === "Waiting on Customer"
  ).length;
  const resolvedCount = TICKETS.filter((t) => t.status === "Resolved").length;
  const criticalOpen = TICKETS.filter(
    (t) => t.priority === "Critical" && t.status !== "Resolved"
  ).length;

  
  const csatTickets = TICKETS.filter((t) => t.csatScore !== null);
  const avgCsat =
    csatTickets.length > 0
      ? (
          csatTickets.reduce((a, t) => a + (t.csatScore ?? 0), 0) /
          csatTickets.length
        ).toFixed(1)
      : "N/A";

  
  const resolvedTickets = TICKETS.filter((t) => t.resolutionDays !== null);
  const avgResolution =
    resolvedTickets.length > 0
      ? (
          resolvedTickets.reduce((a, t) => a + (t.resolutionDays ?? 0), 0) /
          resolvedTickets.length
        ).toFixed(1)
      : "N/A";


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