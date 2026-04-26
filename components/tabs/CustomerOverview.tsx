"use client";

import { useState, useMemo } from "react";
import { CUSTOMERS } from "@/data/customer";
import { MetricCard } from "@/components/ui/MetricCard";
import { StatusBadge, TierBadge } from "@/components/ui/Badge";
import { HealthDot } from "@/components/ui/HealthDot";
import { FilterBar, FilterInput, FilterSelect } from "@/components/ui/FilterBar";
import { USMap } from "@/components/maps/USMap";
import { CSM_LIST, TIER_LIST } from "@/lib/constants";
import { fmtMrr } from "@/lib/utils";

export function CustomerOverview() {
  const [search, setSearch] = useState("");
  const [tierFilter, setTierFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [csmFilter, setCsmFilter] = useState("");

  const activeCustomers = useMemo(
    () => CUSTOMERS.filter((c) => c.status !== "Churned"),
    []
  );

  const totalMrr = useMemo(
    () => activeCustomers.reduce((a, c) => a + c.mrr, 0),
    [activeCustomers]
  );

  const active = CUSTOMERS.filter((c) => c.status === "Active").length;
  const atRisk = CUSTOMERS.filter((c) => c.status === "At Risk").length;
  const churned = CUSTOMERS.filter((c) => c.status === "Churned").length;

  const filtered = useMemo(() => {
    const q = search.toLowerCase();
    return CUSTOMERS.filter(
      (c) =>
        (!q ||
          c.companyName.toLowerCase().includes(q) ||
          c.customerId.toLowerCase().includes(q)) &&
        (!tierFilter || c.tier === tierFilter) &&
        (!statusFilter || c.status === statusFilter) &&
        (!csmFilter || c.csm === csmFilter)
    );
  }, [search, tierFilter, statusFilter, csmFilter]);

  return (
    <>
      
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2.5 mb-5">
        <MetricCard
          label="Total MRR"
          value={fmtMrr(totalMrr)}
          sub={`${activeCustomers.length} active accounts`}
        />
        <MetricCard
          label="Active"
          value={active}
          sub="customers"
          valueColor="#3B6D11"
        />
        <MetricCard
          label="At Risk"
          value={atRisk}
          sub="need attention"
          valueColor="#BA7517"
        />
        <MetricCard
          label="Churned"
          value={churned}
          sub="lost accounts"
          valueColor="#A32D2D"
        />
        <MetricCard
          label="Total Customers"
          value={CUSTOMERS.length}
          sub="all time"
        />
      </div>

      
      <FilterBar>
        <FilterInput
          placeholder="Search name or ID..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{ width: 180 }}
        />
        <FilterSelect
          value={tierFilter}
          onChange={(e) => setTierFilter(e.target.value)}
        >
          <option value="">All tiers</option>
          {TIER_LIST.map((t) => (
            <option key={t}>{t}</option>
          ))}
        </FilterSelect>
        <FilterSelect
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <option value="">All statuses</option>
          <option>Active</option>
          <option>At Risk</option>
          <option>Churned</option>
        </FilterSelect>
        <FilterSelect
          value={csmFilter}
          onChange={(e) => setCsmFilter(e.target.value)}
        >
          <option value="">All CSMs</option>
          {CSM_LIST.map((c) => (
            <option key={c}>{c}</option>
          ))}
        </FilterSelect>
      </FilterBar>

      
      <div className="bg-white border border-gray-200 rounded-lg p-3.5 overflow-x-auto">
        <table className="w-full text-xs border-collapse">
          <thead>
            <tr>
              {[
                "ID",
                "Company",
                "Status",
                "Tier",
                "MRR",
                "CSM",
                "Location",
                "Contact",
                "Contract Start",
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
            {filtered.map((c) => (
              <tr key={c.customerId} className="hover:bg-gray-50">
                <td className="px-2.5 py-2 border-b border-gray-100 text-gray-400 text-[11px]">
                  {c.customerId}
                </td>
                <td className="px-2.5 py-2 border-b border-gray-100 font-medium">
                  <HealthDot status={c.status} />
                  {c.companyName}
                </td>
                <td className="px-2.5 py-2 border-b border-gray-100">
                  <StatusBadge status={c.status} />
                </td>
                <td className="px-2.5 py-2 border-b border-gray-100">
                  <TierBadge tier={c.tier} />
                </td>
                <td className="px-2.5 py-2 border-b border-gray-100">
                  {fmtMrr(c.mrr)}
                </td>
                <td className="px-2.5 py-2 border-b border-gray-100">
                  {c.csm}
                </td>
                <td className="px-2.5 py-2 border-b border-gray-100">
                  {c.city}, {c.state}
                </td>
                <td className="px-2.5 py-2 border-b border-gray-100">
                  <div>{c.primaryContact}</div>
                  <div className="text-[10px] text-gray-400">{c.email}</div>
                </td>
                <td className="px-2.5 py-2 border-b border-gray-100 text-gray-500">
                  {c.contractStart}
                </td>
              </tr>
            ))}
            {filtered.length === 0 && (
              <tr>
                <td
                  colSpan={9}
                  className="px-2.5 py-8 text-center text-gray-400 text-sm"
                >
                  No customers match the current filters.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

     
      <USMap />
    </>
  );
}