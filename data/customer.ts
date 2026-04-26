
import { Customer } from "@/types";

export const CUSTOMERS: Customer[] = [
  { id: 1, name: "SwiftPath Logistics", csm: "Priya Nair", tier: "Enterprise", mrr: 12400, status: "Healthy", state: "CA", city: "Los Angeles", nps: 72, churnRisk: "Low", since: "2023-01" },
  { id: 2, name: "IronHaul Fleet", csm: "Marcus Lee", tier: "Growth", mrr: 5800, status: "At Risk", state: "TX", city: "Houston", nps: 44, churnRisk: "High", since: "2023-05" },
  { id: 3, name: "BlueLine Delivery", csm: "Priya Nair", tier: "Enterprise", mrr: 14200, status: "Healthy", state: "NY", city: "New York", nps: 81, churnRisk: "Low", since: "2022-11" },
  { id: 4, name: "Cascade Freight", csm: "Tom Okafor", tier: "Starter", mrr: 2100, status: "Healthy", state: "WA", city: "Seattle", nps: 68, churnRisk: "Low", since: "2024-01" },
  { id: 5, name: "PeakRoute Co", csm: "Marcus Lee", tier: "Growth", mrr: 6300, status: "Churned", state: "CO", city: "Denver", nps: 22, churnRisk: "Lost", since: "2023-03" },
  { id: 6, name: "Meridian Last Mile", csm: "Sara Kim", tier: "Enterprise", mrr: 15800, status: "Healthy", state: "IL", city: "Chicago", nps: 78, churnRisk: "Low", since: "2022-06" },
  { id: 7, name: "Sunbelt Dispatch", csm: "Tom Okafor", tier: "Growth", mrr: 4900, status: "At Risk", state: "AZ", city: "Phoenix", nps: 39, churnRisk: "High", since: "2023-09" },
  { id: 8, name: "NorthStar Freight", csm: "Priya Nair", tier: "Starter", mrr: 1800, status: "Healthy", state: "MN", city: "Minneapolis", nps: 65, churnRisk: "Low", since: "2024-03" },
  { id: 9, name: "Coastal Carriers", csm: "Sara Kim", tier: "Growth", mrr: 7100, status: "Healthy", state: "FL", city: "Miami", nps: 74, churnRisk: "Low", since: "2023-02" },
  { id: 10, name: "Ridgeline Express", csm: "Marcus Lee", tier: "Enterprise", mrr: 11500, status: "Healthy", state: "GA", city: "Atlanta", nps: 69, churnRisk: "Low", since: "2022-09" },
  { id: 11, name: "DeltaFlow Logistics", csm: "Sara Kim", tier: "Starter", mrr: 2400, status: "At Risk", state: "LA", city: "New Orleans", nps: 41, churnRisk: "Medium", since: "2023-11" },
  { id: 12, name: "Apex Delivery Group", csm: "Priya Nair", tier: "Enterprise", mrr: 13700, status: "Healthy", state: "OH", city: "Columbus", nps: 82, churnRisk: "Low", since: "2022-04" },
  { id: 13, name: "TerraLink Freight", csm: "Tom Okafor", tier: "Growth", mrr: 5500, status: "Healthy", state: "NC", city: "Charlotte", nps: 70, churnRisk: "Low", since: "2023-06" },
  { id: 14, name: "Harbor Run Co", csm: "Marcus Lee", tier: "Starter", mrr: 1600, status: "Healthy", state: "OR", city: "Portland", nps: 63, churnRisk: "Low", since: "2024-02" },
  { id: 15, name: "Summit Logistics", csm: "Sara Kim", tier: "Growth", mrr: 6800, status: "At Risk", state: "UT", city: "Salt Lake City", nps: 35, churnRisk: "High", since: "2023-07" },
  { id: 16, name: "GreatPlains Freight", csm: "Tom Okafor", tier: "Starter", mrr: 2200, status: "Healthy", state: "KS", city: "Wichita", nps: 61, churnRisk: "Low", since: "2024-01" },
  { id: 17, name: "Eastbound Express", csm: "Priya Nair", tier: "Enterprise", mrr: 13100, status: "Healthy", state: "PA", city: "Philadelphia", nps: 76, churnRisk: "Low", since: "2022-08" },
  { id: 18, name: "Lone Star Fleet", csm: "Marcus Lee", tier: "Growth", mrr: 5200, status: "Healthy", state: "TX", city: "Dallas", nps: 67, churnRisk: "Low", since: "2023-04" },
  { id: 19, name: "Riverway Carriers", csm: "Sara Kim", tier: "Starter", mrr: 1900, status: "At Risk", state: "TN", city: "Nashville", nps: 38, churnRisk: "Medium", since: "2023-10" },
  { id: 20, name: "Vanguard Dispatch", csm: "Tom Okafor", tier: "Enterprise", mrr: 16200, status: "Healthy", state: "MI", city: "Detroit", nps: 80, churnRisk: "Low", since: "2022-03" },
  { id: 21, name: "Frontier Logistics", csm: "Priya Nair", tier: "Growth", mrr: 4400, status: "Healthy", state: "NM", city: "Albuquerque", nps: 66, churnRisk: "Low", since: "2023-08" },
  { id: 22, name: "Keystone Fleet", csm: "Marcus Lee", tier: "Starter", mrr: 2600, status: "Healthy", state: "VA", city: "Richmond", nps: 62, churnRisk: "Low", since: "2024-01" },
  { id: 23, name: "Pacific Link Co", csm: "Sara Kim", tier: "Growth", mrr: 7400, status: "Healthy", state: "CA", city: "San Francisco", nps: 75, churnRisk: "Low", since: "2023-01" },
  { id: 24, name: "Horizon Haulers", csm: "Tom Okafor", tier: "Starter", mrr: 1700, status: "Churned", state: "NV", city: "Las Vegas", nps: 18, churnRisk: "Lost", since: "2023-12" },
  { id: 25, name: "Crossroads Freight", csm: "Priya Nair", tier: "Enterprise", mrr: 12800, status: "Healthy", state: "MO", city: "St. Louis", nps: 77, churnRisk: "Low", since: "2022-10" },
  { id: 26, name: "Tidewater Carriers", csm: "Marcus Lee", tier: "Growth", mrr: 5900, status: "At Risk", state: "SC", city: "Charleston", nps: 42, churnRisk: "High", since: "2023-06" },
  { id: 27, name: "Alpine Express", csm: "Sara Kim", tier: "Starter", mrr: 2300, status: "Healthy", state: "ID", city: "Boise", nps: 64, churnRisk: "Low", since: "2024-02" },
  { id: 28, name: "Bayou Fleet", csm: "Tom Okafor", tier: "Growth", mrr: 4700, status: "Healthy", state: "MS", city: "Jackson", nps: 58, churnRisk: "Low", since: "2023-09" },
  { id: 29, name: "Cornerstone Delivery", csm: "Priya Nair", tier: "Enterprise", mrr: 14900, status: "Healthy", state: "MA", city: "Boston", nps: 83, churnRisk: "Low", since: "2022-05" },
  { id: 30, name: "RedRock Logistics", csm: "Marcus Lee", tier: "Starter", mrr: 2000, status: "At Risk", state: "OK", city: "Oklahoma City", nps: 36, churnRisk: "Medium", since: "2023-11" },
];

export function getCustomerById(id: number): Customer | undefined {
  return CUSTOMERS.find((c) => c.id === id);
}

export function getCustomerName(id: number): string {
  return getCustomerById(id)?.name ?? `#${id}`;
}