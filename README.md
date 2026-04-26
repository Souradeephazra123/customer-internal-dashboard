# Customer Internal Dashboard

A dashboard app built with Next.js 16 and React 19 for internal customer and operations reporting.

## Start the project

Install dependencies and run the dev server:

```bash
npm install
npm run dev
```

Then open:

```bash
http://localhost:3000
```

## What is present

This project includes a single dashboard shell with four main tabs:

- **Customer Overview** — customer health, MRR, status badges, location, and search/filter controls.
- **Usage Metrics** — usage trend charts and KPI cards for inspections, damage rate, drivers, and API calls.
- **Support Communications** — support ticket list, status and priority badges, CSAT, resolution metrics, and filters.
- **Fleet Distribution** — vehicle fleet breakdown, telematics/FMS distribution charts, and dynamic filtering.

## What you can see

The app shows:

- summary metric cards for key business indicators
- interactive tables with search and filter controls
- chart visualizations using Chart.js doughnut and line charts
- a live fleet table with customer, vehicle, telematics, and FMS data
- an interactive customer overview with geographic data and account health

## Key functionality

- client-side filtering on table and chart data
- dynamic tab navigation across dashboard sections
- memoized data counts and distinct filter options
- responsive chart and layout components
- reusable UI primitives for metrics, badges, filters, and progress bars

## Scripts

- `npm run dev` — start development server
- `npm run build` — build production app
- `npm start` — run built app
- `npm run lint` — run ESLint checks
