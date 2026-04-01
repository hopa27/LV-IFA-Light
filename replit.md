# IFA Lite - Broker/IFA Management System

## Overview

Web-based IFA (Independent Financial Adviser) management application, replacing the legacy Windows desktop application. Built as a pnpm workspace monorepo. Runs as a **fully static website** — all data is embedded in-memory (no database or API server required).

## Stack

- **Monorepo tool**: pnpm workspaces
- **Node.js version**: 24
- **Package manager**: pnpm
- **TypeScript version**: 5.9
- **Frontend**: React + Vite + Tailwind CSS
- **Data layer**: In-memory React context store with embedded JSON seed data

## Structure

```text
artifacts-monorepo/
├── artifacts/
│   └── ifa-lite/           # React + Vite frontend (static website)
│       └── src/
│           ├── data/
│           │   ├── seed-data.ts      # Embedded JSON data (13 brokers, 17 contacts, 38 notes, etc.)
│           │   └── static-store.tsx  # React context providing in-memory CRUD store
│           ├── hooks/
│           │   └── use-static-data.ts # Drop-in replacement hooks (same API as old generated hooks)
│           ├── components/
│           │   ├── Layout.tsx         # Main layout with tabs, toolbar, navigation
│           │   ├── tabs/              # Tab components (IFA Detail, Contacts, Lookups, etc.)
│           │   └── shared/            # Combobox, FormElements, ClubModal
│           ├── context/
│           │   └── app-context.tsx    # App state (active broker, tab, dirty state, save handler)
│           └── App.tsx
├── pnpm-workspace.yaml
├── tsconfig.base.json
└── package.json
```

## Application Features

### Tabs (matching legacy desktop app)

1. **IFA Detail** - Main broker/IFA information form with contacts grid. Supports V1 (flat form) and V2 (card-based grouped layout) via footer dropdown switcher
2. **Contacts** - Detailed contact management with bank details, network settings
3. **Lookups** - Search and filter brokers by postcode, reference, name, status; horizontally scrollable grid showing all ~65 broker columns
4. **Retirement Income** - Commission settings for NPA, PIPA, PRP products
5. **Equity Release** - Mortgage permissions, commissions, age band special deals
6. **Notes** - Audit trail showing system changes with old/new values

### Data Architecture

- **Static data store** (`src/data/static-store.tsx`): React context wrapping `useState` arrays for brokers, contacts, notes, retirement income, and equity release. Provides `updateBroker`, `createBroker`, and `addNote` mutations.
- **Static hooks** (`src/hooks/use-static-data.ts`): Drop-in replacements for the old generated API hooks (`useListBrokers`, `useGetBroker`, `useUpdateBroker`, `useCreateBroker`, `useListContacts`, `useListNotes`, `useCreateNote`, `useGetRetirementIncome`, `useGetEquityRelease`). Same return shapes (`{ data, isLoading, mutate, isPending }`).
- **Seed data** (`src/data/seed-data.ts`): 13 brokers, 17 contacts, 38 notes, 11 retirement income records, 9 equity release records embedded as TypeScript arrays.

### UI Design Details

- **Colors**: Navy #00263e (header), primary blue #006cf4, hover #003578, green #178830 (focus), border grey #BBBBBB, tab inactive bg #eaf5f8, grid header bg #002f5c
- **Fonts**: Livvic (headings/buttons/tabs), Mulish (inputs/body text)
- **Layout**: All sections use `px-[142px]` horizontal padding; `html { zoom: 0.8 }` + root `height: calc(100vh / 0.8)` for correct scaling
- **Custom Combobox**: Green 3px border when open, type-to-filter, navy highlight, blue rotating chevron. Used for ALL dropdowns app-wide.

## Development Commands

- `pnpm --filter @workspace/ifa-lite run dev` - Start development server
- `pnpm --filter @workspace/ifa-lite run build` - Build for production
- `pnpm --filter @workspace/ifa-lite run typecheck` - Type check

## Authentication

Designed for SSO integration - placeholder for single sign-on authentication. Access control for user groups is planned but SSO provider integration will be configured later.
