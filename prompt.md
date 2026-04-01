# IFA Lite — Build Prompt

Build **IFA Lite**, a fully static (no backend/database) React + Vite + Tailwind CSS web application for internal users to manage brokers/IFAs (Independent Financial Advisers). This replicates a legacy Citrix-based Windows desktop EXE as a modern web app. All data is embedded in-memory using React context — there is no API server, no database, no network requests. The app deploys as plain HTML/JS/CSS.

---

## Tech Stack

- **React 19** + **Vite** + **TypeScript**
- **Tailwind CSS v4** (using `@tailwindcss/vite` plugin)
- **lucide-react** for icons
- **cmdk** (v1.x) for the custom Combobox component
- **clsx** + **tailwind-merge** for class merging
- **Google Fonts**: Livvic (headings, buttons, tabs, labels) and Mulish (form inputs, body text, table data)
- No router library — tab switching is managed via React context state

---

## Global Design System

### Colors
| Token | Hex | Usage |
|-------|-----|-------|
| Navy | `#00263e` | Header background |
| Primary Blue | `#006cf4` | Active tab borders, fieldset legends, icon accents |
| Button Blue | `#04589b` / `#05579b` | Buttons, table hover rows |
| Hover Blue | `#003578` | Button hover, combobox item hover |
| Grid Header | `#002f5c` | Table/grid header backgrounds, sidebar headers |
| Focus Green | `#178830` | Input focus/hover borders |
| Error Red | `#d72714` | Error states |
| Border Grey | `#BBBBBB` | Standard input/fieldset borders |
| Background | `#f0f0f0` | Page background |
| Text | `#3d3d3d` | Body text color |
| Alt Row Light Blue | `#eaf5f8` | Inactive tab backgrounds, alternating rows |
| Alt Row Grey | `#e7ebec` | Alternating row variant (at 20% opacity) |

### Typography
- **Livvic** (`font-sans`): Used for the "IFA Lite" heading (30px), tab labels, fieldset legends, button text, form labels
- **Mulish** (`font-[Mulish]`): Used for all form input values, table cell data, footer text

### Layout
- `html { zoom: 0.8; }` — the entire UI is scaled to 80% for data density
- Root element: `height: calc(100vh / 0.8)` to compensate for zoom
- Horizontal padding: `px-[142px]` on header, nav bar, main content, and footer
- Custom scrollbars: 6px wide, thumb color `#62bda8`, hover `#4ea896`

### Shared Form Components

**Fieldset**: `border border-[#BBBBBB] rounded-lg p-4 pt-2 mb-4 bg-white` with a `<legend>` styled as `text-xs font-bold text-[#006cf4] px-2 uppercase tracking-wider font-sans`

**FormInput**: Label (`text-xs font-semibold text-right font-sans`, default `w-1/3`) + input (`px-3 py-1.5 text-sm border border-[#BBBBBB] rounded-lg bg-white font-[Mulish]`). On focus: `border-[#178830] border-2`. On hover: `border-[#178830]`. Disabled: `bg-[#CCCCCC] border-[#ACACAC]`.

**FormSelect**: Wraps a custom **Combobox** component (see below) with a label. Fires a synthetic `onChange` event compatible with standard form handling.

**FormCheckbox**: Label + styled checkbox with green accent (`accent-[#178830]`).

**FormRadioGroup**: Horizontal row of radio buttons with labels, using green accent color.

**Button**: Three variants — `primary` (bg `#04589b`, hover `#003578`, white text), `secondary` (white bg, blue border/text), `outline` (transparent, border only). All use `font-sans` (Livvic), `text-xs font-semibold`, `rounded-full`, `px-5 py-2`.

### Custom Combobox (built with cmdk)
A searchable dropdown replacement for all `<select>` elements throughout the app:
- Trigger button shows selected value or placeholder, with a chevron icon
- Opens a floating popover panel with a search input and scrollable option list
- Keyboard navigation: Arrow keys, Enter to select, Escape to close
- Border changes to green (`#178830`) when open/focused
- Items highlight with `#003578` background on hover
- Click outside closes the popover
- Used everywhere: Status, Grade, Broker Manager, Key Account, Region, Layout Version, Action dropdown

---

## Application Architecture

### Data Layer (fully static, in-memory)

**Seed Data** (`src/data/seed-data.ts`):
All data is embedded as TypeScript arrays with proper interfaces. No API calls whatsoever.

**Data Store** (`src/data/static-store.tsx`):
A React context provider (`DataStoreProvider`) wrapping the app with `useState` arrays initialized from seed data. Provides these mutations:
- `updateBroker(id, data)` — merges partial data into existing broker
- `createBroker(data)` — creates a new broker with auto-incrementing ID (using `useRef` counter for safety), generates default ifaRef/brokerNo/fimbraNo
- `addNote(brokerId, data)` — prepends a new note with auto-incrementing ID

**Static Hooks** (`src/hooks/use-static-data.ts`):
Drop-in hooks that return `{ data, isLoading: false }` for queries and `{ mutate, isPending: false }` for mutations:
- `useListBrokers(params?, options?)` — filters brokers by postcode, ifaReference, ifaName, status (authorised/cancelled/duplicateRecord/revoked). Supports `query.enabled`.
- `useGetBroker(id, options?)` — finds single broker by ID
- `useUpdateBroker()` — returns `{ mutate({ id, data }, { onSuccess? }) }`
- `useCreateBroker()` — returns `{ mutate({ data }, { onSuccess? }) }`
- `useListContacts(brokerId, options?)` — filters contacts by brokerId
- `useListNotes(brokerId, options?)` — filters notes by brokerId
- `useCreateNote()` — returns `{ mutate({ brokerId, data }, { onSuccess? }) }`
- `useGetRetirementIncome(brokerId, options?)` — finds retirement record
- `useGetEquityRelease(brokerId, options?)` — finds equity release record

### App Context (`src/context/app-context.tsx`)
Global UI state managing:
- `activeTab`: one of `'ifa-detail' | 'contacts' | 'lookups' | 'retirement' | 'equity' | 'notes'`
- `activeBrokerId` / `activeIfaRef`: currently selected broker
- `isDirty` / `isSaving`: unsaved changes tracking
- `layoutVersion`: `'v1' | 'v2'` for IFA Detail tab layout switching
- `registerSaveHandler(fn)` / `triggerSave()`: tabs register their save logic, toolbar button triggers it

### App.tsx
Wraps everything in `DataStoreProvider` > `TooltipProvider` > `AppProvider` > `Layout`. Contains a `TabRouter` that renders the active tab component based on context state.

---

## Layout Shell (`src/components/Layout.tsx`)

### Header
- Dark navy (`#00263e`) background
- LV= logo (white SVG, height ~22px) top-left
- "Logout" button top-right (rounded-full, white text on `#05579b`)
- "IFA Lite" title below logo in `text-[30px] font-sans font-semibold text-white`

### Tab Navigation Bar
- 6 tabs in a horizontal row: **IFA Detail** (home icon), **Contacts** (users icon), **Lookups** (search icon), **Retirement Income** (landmark icon), **Equity Release** (home icon), **Notes** (file-text icon)
- Each tab: `font-sans text-xs font-semibold`, with Lucide icon + label
- Inactive tabs: `bg-[#eaf5f8]` background, grey text, bottom border
- Active tab: white background, blue top border (`border-t-2 border-t-[#006cf4]`), negative margin-bottom `-1px` to overlap container border, subtle shadow

### Toolbar (sticky, below tabs)
Contains three sections in a row:
1. **Broker Context**: Blue left border, "Broker:" label + active IFA ref in blue, then an Action combobox (options: Appointment, Duplicate, Cancellation, etc.)
2. **Pagination**: First/Prev/Next/Last buttons (44×44px, rounded-full, blue outline) with Lucide icons (ChevronsLeft, ChevronLeft, ChevronRight, ChevronsRight). "X of Y" counter between Prev/Next. Buttons disable at boundaries.
3. **Actions**: "New IFA" (secondary button), "Locate IFA" (secondary), "Save Changes" (primary, with save icon)

### Locate IFA Modal
- Overlay modal with dark header (`#002f5c`)
- Search input with "Enter" key support
- Results table: IFA Ref, Broker Name, Postcode columns
- Row click selects broker and closes modal
- Styled like a classic Windows dialog

### New IFA Flow
- Creates a new broker with default name "New IFA", status "Authorised"
- Auto-navigates to the new broker's IFA Detail tab

### Footer
- Light grey background, small text
- "LV= Liverpool Victoria" branding
- Layout version switcher (V1/V2 combobox) — toggles the IFA Detail tab layout

---

## Tab 1: IFA Detail (`IfaDetailTabV2.tsx` — the V2 card-based layout is default)

A two-column form layout with a right sidebar for Associated Contacts.

### Main Form (left side, ~70% width)
Single "GENERAL INFORMATION" fieldset containing a two-column grid of label+input pairs:

**Left Column:**
- Broker Name (text input)
- Address Line 1
- Address Line 2
- Town
- County
- Postcode
- Telephone
- Fax
- Email
- Initials
- Date Checked

**Right Column:**
- Trading Name
- FCA Reference
- Annuity TOBA (Yes/No radio group)
- Status (Combobox: Authorised, Cancelled, Duplicate Record, Revoked)
- Sent Date
- Grade (Combobox: National Accounts, Regional, Standard)
- Next Diary Date
- IFA Member No
- Broker Manager (Combobox: Keith Harvey, Sarah Collins, David Thompson)
- Key Account (Combobox: Yes, No)
- Partner Code
- Region (Combobox: North, South, East, West, etc.)

### Footer Bar
Shows "Created By: [user] — [date]" and "Amended By: [user] — [date]" in small grey text.

### Save Behavior
On save, compares every field against original data. For each changed field, automatically creates a system note (type "SYS") documenting old/new values. Then calls `updateBroker`.

### Associated Contacts Sidebar (right, ~300px)
- Dark header (`#002f5c`): "ASSOCIATED CONTACTS"
- Table with columns: Ref, Name, Position
- Ref values are clickable links (blue, underline on hover)
- Clicking a contact ref navigates to the Contacts tab with that contact selected
- Uses Mulish font for table data

---

## Tab 2: Contacts (`ContactsTab.tsx`)

Manages contacts associated with the active broker.

### Contact Pagination Header
"Contact X of Y" display with left/right chevron buttons to cycle through contacts for the current broker.

### Form Layout (two-column grid with multiple fieldsets)

**Personal Details** fieldset:
- Reference (read-only/disabled)
- Title, Initials, Forename, Surname, Salutation, Position

**Contact Information** fieldset:
- Address Lines 1-4
- Home Telephone, Mobile Telephone, Email Address

**IFA Bank Detail** fieldset:
- Paid By BACS (Yes/No radio)
- Sort Code, Account No, Account Name, Bank Reference

**Network Related Detail** fieldset:
- "Use network terms" checkbox
- Default Advice Type (Combobox)
- Default Remuneration Basis (Combobox)
- Default Distribution Channel (Combobox)
- Radio groups for Restricted Advice, Simplified Advice, Non-Advised
- Network IFA field with Search button
- Tied Agent (Yes/No radio)
- Principal Agent Ref
- Is Principal checkbox

**Network Members** sub-table (within the Network fieldset):
- Columns: IFA Ref, Broker Name, Postcode
- Designed for showing related network IFA records

---

## Tab 3: Lookups (`LookupsTab.tsx`)

### Search Criteria Fieldset
- Postcode (text input)
- IFA Reference (text input)
- IFA Name (text input)
- Status (Combobox: Authorised, Cancelled, Duplicate Record, Revoked)
- "Search" button (primary) and "Club" button (opens ClubModal)

### Results Grid
- Massive horizontal-scrolling table with 75 columns covering every broker field
- Sticky header row: `bg-[#eaf5f8]`, `text-[#002f5c]`, `font-sans font-semibold`
- Row hover: `hover:bg-[#05579B] hover:text-white`
- Alternating row striping
- Clicking a row selects that broker (updates `activeBrokerId` globally) and navigates to IFA Detail tab
- Selected row highlighted in blue

### Club Modal (`ClubModal.tsx`)
- Overlay dialog for searching mortgage clubs
- 15 hardcoded sample clubs with Name, Reference, PostCode, Active status
- Three search fields: Club Name, Club Reference, Post Code
- Client-side filtering
- Table with columns: Club Name, Reference, Post Code, Active
- Row hover highlights
- "Add" and "Edit" buttons (non-functional placeholders)
- Close via X button or clicking outside

---

## Tab 4: Retirement Income (`RetirementTab.tsx`)

Three identical product sections rendered via a `ProductSection` helper:

### Sections: Non-profit Annuity (NPA), PIPA, PRP

Each section is a fieldset containing:
- Default Adviser Charges % (text input)
- Amount £ (text input)
- Default Commission % (text input)
- Expense Discount (text input)
- Marketing Allowance (text input)

Each section also has two secondary buttons:
- "Advice Type/Distribution Channel pricing"
- "Special deals"

Data comes from the `RetirementIncome` record matched by `brokerId`.

---

## Tab 5: Equity Release (`EquityReleaseTab.tsx`)

### Top Section
- Mortgage Permissions checkbox
- ERLM TOBA checkbox

### Flexible Product Section (fieldset)
- Broker Rate %, Minimum Amount £, Network Rate %, Trail Commission (Yes/No checkbox)
- Packaging Fee, Application Fee, LTV %

### Lump Sum Product Section (fieldset)
- Broker Rate %, Minimum Amount £, Network Rate %
- Packaging Fee, Application Fee, LTV %

### Club Membership (fieldset)
- Mini table showing club membership entries
- Action buttons: Add, Edit, View, Remove

### Special Deals Tables
Two large tables for age-banded commission rates:

**Flexible Special Deals** table:
- Age bands from 60 to 91+ (rows)
- Columns: Age Band, Exclusive %, (+/-) checkbox, Discounted %, Cash Back

**Lump Sum Special Deals** table:
- Same structure as Flexible

---

## Tab 6: Notes (`NotesTab.tsx`)

### Note List (vertical, reverse chronological)
Each note displays:
- Left margin: note type label ("SYS" or "MAN") rotated vertically (`writingMode: vertical-lr`) with distinct background colors
- Main body: description text, "Updated By" and date metadata
- If the note has `oldValue`/`newValue`: renders a structured comparison block showing "Old Value: X" → "New Value: Y" with visual diff styling

### Empty State
Centered icon with "No notes found for this broker" message.

---

## Seed Data Requirements

Embed the following data directly in the source code (no database):

### 13 Brokers
Representing UK-based IFA firms with realistic data:
1. AF / First Class Financial (Hertfordshire, HP4 3QZ)
2. Aldton Park Financial Services Ltd (County Durham, DL5 7DW)
3. a1 Financial Services (Essex, CM7 4BS) — Status: Cancelled
4. A T C Financial Management (Cumbria, CA3 0HA)
5. A & J Mortgages Ltd (Renfrewshire, PA5 8HG)
6. A & J Perry Ltd (Lancashire, BB11 3RQ)
7. A.R.D Consultancy Ltd (Edinburgh, EH3 7PE)
8. A1 Financial Services Online Ltd (Gloucestershire, GL1 1PQ)
9. AAF Financial Ltd (Merseyside, L14 9QA)
10. AA Mortgage Gateway Ltd (London, W8 4PT)
11. The Clarkson Hill Group Plc. (Somerset, BA3 3YJ) — Status: Cancelled
12. Brookwood Financial Planning (Hampshire, PO5 3NU)
13. Hartfield & Associates (Devon, EX1 1EZ)

Each broker has: id, ifaRef, brokerNo, fimbraNo, brokerName, tradingName, address fields, contact fields, status, fcaReference, grade, brokerManager, region, partnerCode, keyAccount, annuityToba, sentDate, nextDiaryDate, ifaMemberNo, createdBy/Date, amendedBy/Date.

### 17 Contacts
Distributed across brokers (2 contacts for broker 1, 2 for broker 2, 1 for broker 4, 1 for broker 5, 2 for broker 6, 1 for broker 7, 2 for broker 10, 3 for broker 11, 1 for broker 12, 2 for broker 13). Each has: reference, title, name fields, position, address, phone/email, banking details, network settings.

### 38 Notes
Mix of "SYS" (system-generated change logs with oldValue/newValue) and "MAN" (manual notes). Distributed across all 13 brokers. System notes document field changes (e.g., "Grade updated by KHARVEY", "Status updated by ADMIN"). Manual notes contain business context (e.g., "Annual review completed", "Broker ceased trading").

### 11 Retirement Income Records
For brokers 1, 2, 4, 5, 6, 7, 8, 10, 11, 12, 13. Fields: NPA/PIPA/PRP adviser charges, amounts, commission rates, expense discounts, marketing allowances.

### 9 Equity Release Records
For brokers 1, 2, 4, 6, 7, 10, 11, 12, 13. Fields: mortgage permissions, ERLM TOBA, flexible/lump sum broker rates, minimum amounts, network rates, packaging/application fees, LTV percentages.

---

## Key Behaviors

1. **Broker Navigation**: First/Prev/Next/Last buttons cycle through all brokers. The "X of Y" counter updates. All tabs reflect the currently selected broker.
2. **Dirty State Tracking**: When form data changes, `isDirty` becomes true. The Save button visually indicates pending changes.
3. **Auto-generated Audit Notes**: When saving IFA Detail changes, the system automatically creates SYS notes for each changed field, recording old and new values.
4. **Locate IFA Search**: Modal search filters brokers by IFA reference (partial match). Selecting a result navigates to that broker.
5. **Cross-tab Navigation**: Clicking a contact ref in the IFA Detail sidebar switches to the Contacts tab.
6. **Layout Version Toggle**: Footer combobox switches between V1 (simpler form) and V2 (card-based with section headers) for the IFA Detail tab.
7. **All dropdowns are Combobox**: No native `<select>` elements anywhere — every dropdown uses the custom searchable Combobox built with cmdk.
