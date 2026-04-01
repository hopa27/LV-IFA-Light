# IFA Lite - Broker/IFA Management System

## Overview

Web-based IFA (Independent Financial Adviser) management application, replacing the legacy Windows desktop application. Built as a pnpm workspace monorepo with React frontend and Express API backend.

## Stack

- **Monorepo tool**: pnpm workspaces
- **Node.js version**: 24
- **Package manager**: pnpm
- **TypeScript version**: 5.9
- **Frontend**: React + Vite + Tailwind CSS + React Query
- **API framework**: Express 5
- **Database**: PostgreSQL + Drizzle ORM
- **Validation**: Zod (`zod/v4`), `drizzle-zod`
- **API codegen**: Orval (from OpenAPI spec)
- **Build**: esbuild (CJS bundle for server), Vite (frontend)

## Structure

```text
artifacts-monorepo/
├── artifacts/
│   ├── api-server/         # Express API server (port 8080)
│   └── ifa-lite/           # React + Vite frontend (port 25791)
├── lib/
│   ├── api-spec/           # OpenAPI spec + Orval codegen config
│   ├── api-client-react/   # Generated React Query hooks
│   ├── api-zod/            # Generated Zod schemas from OpenAPI
│   └── db/                 # Drizzle ORM schema + DB connection
├── scripts/                # Utility scripts (seed, etc.)
├── pnpm-workspace.yaml
├── tsconfig.base.json
├── tsconfig.json
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

### Database Tables

- `brokers` - Main broker/IFA records
- `contacts` - Contact details linked to brokers
- `notes` - Audit trail notes
- `retirement_income` - Commission settings per broker
- `equity_release` - Equity release settings per broker

### API Endpoints

All under `/api`:
- `GET/POST /brokers` - List/create brokers
- `GET/PUT /brokers/:id` - Get/update specific broker
- `GET/POST /brokers/:brokerId/contacts` - List/create contacts
- `PUT /brokers/:brokerId/contacts/:id` - Update contact
- `GET/POST /brokers/:brokerId/notes` - List/create notes
- `GET/PUT /brokers/:brokerId/retirement-income` - Get/update retirement income
- `GET/PUT /brokers/:brokerId/equity-release` - Get/update equity release

## Development Commands

- `pnpm --filter @workspace/api-spec run codegen` - Regenerate API client hooks and Zod schemas
- `pnpm --filter @workspace/db run push` - Push database schema changes
- `pnpm --filter @workspace/scripts run seed` - Seed sample data
- `pnpm run typecheck` - Full type checking across all packages

## Authentication

Designed for SSO integration - placeholder for single sign-on authentication. Access control for user groups is planned but SSO provider integration will be configured later.
