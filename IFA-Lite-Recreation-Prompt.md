# IFA Lite — Complete Recreation Prompt

Build **IFA Lite** — a fully static (no backend, no database) React + Vite web application for internal users to manage brokers/IFAs. This replicates a legacy Citrix-based Windows desktop EXE. All data lives in-memory via React context with embedded seed data. There are 6 tabs: IFA Detail, Contacts, Lookups, Retirement Income, Equity Release, and Notes.

---

## Technology Stack

| Layer | Technology |
|---|---|
| Framework | React 18 + Vite |
| Styling | Tailwind CSS v4 (inline `@theme` configuration) |
| Routing | wouter (single route `/`, tab-based navigation via React context) |
| State | React Context — two providers: `AppProvider` (UI state) + `DataStoreProvider` (in-memory CRUD) |
| Data | In-memory seed data arrays — no API calls, no database |
| Icons | lucide-react |
| Combobox | cmdk (custom searchable dropdown component) |
| Utilities | clsx + tailwind-merge |
| Fonts | Google Fonts: Livvic (400–700) and Mulish (300–400) |

---

## Design System

### Typography

| Font | Role | CSS Reference |
|---|---|---|
| **Livvic** | Headings, labels, buttons, tabs, fieldset legends | `font-sans` (set as default sans in Tailwind theme) |
| **Mulish** | Inputs, body text, table data, footer text | `font-[Mulish]` |

### Colour Palette

| Token | Hex | Usage |
|---|---|---|
| Navy Header | `#00263e` | App header background, Locate IFA modal title bar |
| Navy Dark | `#002f5c` | Panel headers ("ASSOCIATED CONTACTS", "SEARCH RESULTS"), modal title bars |
| Primary Blue | `#006cf4` | Active tab top border, fieldset legend text, primary button bg, broker badge accent, Save button |
| Button Blue | `#04589b` | Secondary button border/text, table header underlines, circular button border |
| Hover Blue | `#003578` | Button hover bg, combobox highlight bg, row hover bg |
| Selected Row | `#05579B` | Active/selected table row background |
| Green Focus | `#178830` | Input focus/hover border (2px), combobox open border (3px) |
| Border Grey | `#BBBBBB` | Default input borders, fieldset borders, toolbar border |
| Disabled Grey | `#CCCCCC` | Disabled input background |
| Disabled Border | `#ACACAC` | Disabled input border |
| Text Dark | `#3d3d3d` | Primary body/label text |
| Text Muted | `#979797` | Placeholder text, empty-state text, disabled Save button bg |
| Page BG | `#f0f0f0` | Page background, modal background |
| Tab Inactive BG | `#eaf5f8` | Inactive tab background, table column headers, note card left stripe |
| Tab Hover | `#dceef3` | Tab hover state |
| Error Red | `#d72714` | Combobox error/validation state |
| Link Blue | `#005a9c` | IFA Ref link styling in Lookups results |
| Alt Row | `rgba(231,235,236,0.2)` | Alternating table row tint |

### Spacing & Layout

| Property | Value |
|---|---|
| Page horizontal padding | `px-[142px]` on header, tab bar, footer, and content |
| Zoom | `html { zoom: 0.8 }` with root container `height: calc(100vh / 0.8)` |
| Input border | `1px solid #BBBBBB`, radius `8px` (`rounded-lg`) |
| Input focus border | `2px solid #178830` |
| Fieldset border | `1px solid #BBBBBB`, `rounded-lg`, bg white, `p-4 pt-2` |
| Fieldset legend | Uppercase, `xs bold #006cf4 font-sans tracking-wider px-2` |
| Active tab top border | `2px solid #006cf4` |
| Table header underline | `2px solid #04589b` (or `3px` in Lookups) |

### Button Variants

| Variant | Background | Text | Border | Hover | Shape |
|---|---|---|---|---|---|
| **Primary** | `#006cf4` | white | none | bg `#003578` | `rounded-full`, `shadow-md` |
| **Secondary** | white | `#04589b` | `1px solid #04589b` | bg `#003578`, text white | `rounded-full` |
| **Outline** | white | `#3d3d3d` | `1px solid #BBBBBB` | border/text `#006cf4` | `rounded-full` |
| **Circular** | white | `#04589b` | `1px solid #04589b` | bg `#003578`, text white | `w-[44px] h-[44px] rounded-[30px]` |
| **Circular Small** | white | `#3d3d3d` | `1px solid #BBBBBB` | border/text `#006cf4` | `w-[28px] h-[28px] rounded-full` |

### Reusable Form Components

**Combobox (cmdk-based):**
- Height: `34px`, border radius: `8px`
- Default border: `1px solid #BBBBBB`, hover border: `#178830`
- Open state: `3px solid #178830`, no bottom border, squared bottom corners
- Dropdown: `3px solid #178830`, top-connected, `rounded-b-[8px]`, `max-h-200px`, `shadow-lg`
- Highlight: `bg-#003578 text-white`
- Chevron: `#006cf4`, rotates 180° on open
- Searchable: input becomes editable when dropdown opens
- Keyboard: Arrow keys navigate, Enter selects, Escape closes

**FormInput:** `flex items-center gap-3 mb-2`, label `w-1/3 xs semibold #3d3d3d font-sans text-right truncate`, input `flex-1 px-3 py-1.5 sm font-[Mulish] rounded-lg`

**FormSelect:** Same layout as FormInput but uses Combobox component (not native `<select>`)

**FormRadioGroup:** `flex items-center gap-3 mb-2`, label `w-1/3`, radio accent `#006cf4`, `gap-4` between options

**FormCheckbox:** `flex items-center gap-2 mb-2`, accent `#178830`, size `w-4 h-4`

**Fieldset:** `border 1px solid #BBBBBB rounded-lg bg-white p-4 pt-2`, legend uppercase `xs bold #006cf4 font-sans tracking-wider px-2`

---

## Global Layout Shell

### Header
- Background: `#00263e` (navy), not sticky
- Padding: `px-[142px] pt-4 pb-6`
- Left: LV= logo image (`h-6`)
- Right: "Logout" button (primary, compact)
- Below logo: `1px solid slate-600/50` divider, then "IFA Lite" title (`30px`, Livvic, white, `tracking-tight`)

### Tab Bar
- Sticky: `top-0 z-30`, white background, `px-[142px] pt-4`
- 6 tabs with icons from lucide-react:
  1. `ifa-detail` — "IFA Detail" — FileText icon
  2. `contacts` — "Contacts" — Users icon
  3. `lookups` — "Lookups" — Search icon
  4. `retirement` — "Retirement Income" — Briefcase icon
  5. `equity` — "Equity Release" — Home icon
  6. `notes` — "Notes" — Database icon
- Active tab: white bg, `#4a4a49` text, `2px solid #006cf4` top border, `#006cf4` icon, `shadow-[0_-2px_8px_rgba(0,0,0,0.08)]`, side borders
- Inactive tab: `#eaf5f8` bg, `#0d2c41` text, `rgba(13,44,65,0.6)` icon
- Common: `min-w-[140px]`, `px-6 py-3`, `15px semibold font-sans`, `rounded-t-lg`

### Footer
- Not sticky (pushed to bottom by `flex-1` main content)
- White background, `border-top 1px solid slate-200`
- Left: LV= logo (`h-6`)
- Right: "Liverpool Victoria Financial Services Limited" / "County Gates, Bournemouth BH1 2NF" (`10px`, `slate-400`, Mulish)

---

## Global State

### AppContext
| Property | Type | Default | Description |
|---|---|---|---|
| `activeTab` | `TabId` | `ifa-detail` | Currently visible tab |
| `activeBrokerId` | `number \| null` | `null` (auto-set to first broker on load) | Selected broker ID |
| `activeIfaRef` | `string` | `""` | Display label for current broker in toolbar |
| `isDirty` | `boolean` | `false` | True when IFA Detail form has unsaved changes |
| `isSaving` | `boolean` | `false` | True during save mutation |
| `registerSaveHandler` | callback | — | Callback registration for tab-level save logic |
| `triggerSave` | callback | — | Invokes the registered save handler |

### DataStoreProvider (In-Memory CRUD)
Wraps `useState` arrays for all entities. Provides hooks:
- `useListBrokers()` / `useGetBroker(id)` / `useUpdateBroker()` / `useCreateBroker()`
- `useListContacts(brokerId)` / `useListNotes(brokerId)` / `useCreateNote()`
- `useGetRetirementIncome(brokerId)` / `useGetEquityRelease(brokerId)`

Each hook returns `{ data, isLoading, mutate?, isPending? }` matching react-query-style shapes.

---

## Data Model & Seed Data

### Broker Interface
```typescript
interface Broker {
  id: number;
  ifaRef: string;
  brokerNo: string;
  fimbraNo: string;
  brokerName: string;
  brokerName2?: string;
  tradingName?: string;
  addressLine1?: string;
  addressLine2?: string;
  town?: string;
  county?: string;
  postcode?: string;
  telephone?: string;
  fax?: string;
  email?: string;
  initials?: string;
  dateChecked?: string;
  status: string; // "Authorised" | "Cancelled" | "Revoked" | "Duplicate Record"
  fcaReference?: string;
  annuityToba?: boolean;
  sentDate?: string;
  grade?: string;
  nextDiaryDate?: string;
  ifaMemberNo?: string;
  brokerManager?: string;
  keyAccount?: string;
  partnerCode?: string;
  region?: string;
  createdBy?: string;
  createdDate?: string;
  amendedBy?: string;
  amendedDate?: string;
  [key: string]: string | number | boolean | null | undefined;
  // Plus ~60 additional legacy columns used in the 64-column Lookups grid
}
```

### Contact Interface
```typescript
interface Contact {
  id: number;
  brokerId: number;
  reference: string;
  title?: string;
  initials?: string;
  forename?: string;
  surname?: string;
  salutation?: string;
  position?: string;
  addressLine1-6?: string;
  homeTelephone?: string;
  mobileTelephone?: string;
  emailAddress?: string;
  paidByBacs?: boolean;
  bankSortCode?: string;
  bankAccountNo?: string;
  bankAccountName?: string;
  bankReference?: string;
  useNetworkTerms?: boolean;
  network?: boolean;
  defaultAdviceType?: string;
  defaultRemunerationBasis?: string;
  networkIfa?: string;
  networkName?: string;
  networkPostcode?: string;
  tiedAgent?: boolean;
  principalAgentRef?: string;
  principal?: boolean;
}
```

### Note Interface
```typescript
interface Note {
  id: number;
  brokerId: number;
  noteType: "SYS" | "USR";
  description: string;
  oldValue?: string;
  newValue?: string;
  updatedBy?: string;
  updatedDate?: string;
  label?: string; // "NPA", "PIPA", "PRP", "USR"
}
```

### Seed Data Quantities
- **6 brokers** with realistic UK financial services data (IFA refs like "AGEPA-003", "BKBFL-001", etc.)
- **30 notes** spread across all 6 brokers, mixing SYS and USR types. SYS notes have oldValue/newValue. Some have labels (NPA, PIPA, PRP).
- Contacts, Retirement Income, and Equity Release records as needed

---

## Tab 1: IFA Detail

### Toolbar (visible only on this tab, sticky below tab bar)
- White card with border `#BBBBBB`, rounded corners, shadow
- Left group:
  - **Broker badge**: `4px` blue accent bar + "Broker: {ifaRef}" (ref text in `#006cf4`)
  - Vertical divider
  - **Action combobox** (200px): Appointment, Broker Pack Follow Up, Duplicate, Hold
  - Vertical divider
  - **Record navigator**: 5 circular 44×44 buttons — First / Prev / "N of M" counter / Next / Last
- Right group:
  - **(New IFA)** — FilePlus2 icon → opens Insert IFA Modal. Tooltip: "New IFA"
  - **(Locate IFA)** — ScanSearch icon → opens Locate IFA Modal. Tooltip: "Locate IFA"
  - **(Lookup IFA)** — Search icon → opens Lookup IFA Modal. Tooltip: "Lookup IFA"
  - Vertical divider
  - **(Save)** — Save icon (or spinning RefreshCw). Blue bg `#006cf4` when dirty, grey `#979797` when clean

### Form Layout
Three-panel horizontal flex: Left form (flex-1, min-w 600px), Right form, Associated Contacts sidebar (350px fixed)

**Left + Right form grid** (`grid-cols-2 gap-x-8 gap-y-1`):

| Left Column | Right Column |
|---|---|
| **Broker Name + Address** (5-line connected block) | FCA Reference |
| *(connected block spans 5 rows vertically)* | Annuity TOBA (radio: Yes / No) |
| — | Status (combobox: Authorised, Cancelled, Revoked, Duplicate Record) |
| — | Sent Date |
| — | — |
| Town | Grade (combobox: 8 options) |
| County | Next Diary Date |
| Postcode | IFA Member Number |
| Telephone | Broker Manager (combobox: 14 managers) |
| Fax Number | Key Account (combobox: A–Z) |
| Email Address | Partner Code |
| Initials | Region (combobox: 18 regions with code prefixes) |
| Date Checked | — |

**Connected fields pattern** for Broker Name + Address:
- 5 stacked `<input>` elements sharing one continuous border
- Line 1: Broker Name — `rounded-t-lg`, `border-b-0`
- Line 2: Broker Name 2 (overflow) — `border-b-0`
- Line 3: Address Line 1 — "Address" label floats left via negative margin — `border-b-0`
- Line 4: Address Line 2 — `border-b-0`
- Line 5: Address Line 3 — `rounded-b-lg`

Below a `<hr>` separator: **Audit section** (disabled, grey bg): Created By, Created Date, Amended By, Amended Date

**Empty state:** Dashed border container with AlertCircle icon, "No Broker Selected", "Please select a broker from the Lookups tab first."

### Associated Contacts Panel (right sidebar, 350px)
- Navy header (`#002f5c`): "ASSOCIATED CONTACTS" (uppercase, bold, white)
- Table: 5 columns — **Ref, Title, Initials, Surname, Position**
- Header: `bg-#eaf5f8`, `2px solid #04589b` bottom border
- Row hover: `bg-#05579B text-white`
- Empty: "No contacts found"

### Save Flow
1. Editing any field sets `isDirty = true`
2. Save compares all fields against `originalData`
3. `updateBroker` mutation fires
4. For each changed field → `createNote({ noteType: "SYS", description: "{Label} updated by SYSTEM on {dd/mm/yyyy}", oldValue, newValue })`
5. Tracked fields (22): brokerName, addressLine1, addressLine2, town, county, postcode, telephone, fax, email, initials, dateChecked, fcaReference, annuityToba, status, sentDate, grade, nextDiaryDate, ifaMemberNo, brokerManager, keyAccount, partnerCode, region

---

## Tab 2: Contacts

### Toolbar (visible only on this tab, sticky below tab bar)
- Reference badge: accent bar + "Reference: {reference}" (ref in `#006cf4`)
- Vertical divider
- Navigation: First / Prev / "X of Y" / Next / Last (circular 44×44 buttons)
- Right: **[+ Add New]** secondary button with Plus icon (placeholder, not wired)
- No Save button on this toolbar

### Left Column (sticky)
No fieldset wrappers. Uses 4-column CSS grid (`grid-cols-[auto_1fr_auto_1fr] gap-x-3 gap-y-2`):

| Row | Left | Right |
|---|---|---|
| 1 | Title (Combobox: Mr/Mrs/Ms/Dr) | Initials |
| 2 | Forename | Surname |
| 3 | Salutation | Position |
| 4 | Address (6-line connected block, `col-span-3`) | — |
| 5 | Home Telephone | Mobile Telephone |
| 6 | Email Address (`col-span-3`) | — |

All fields except Title are read-only.

### Right Column (scrollable)

**Fieldset: IFA Bank Detail**
- **Paid By BACS**: rendered as a **nested fieldset card** (centered, with its own border/title) containing Yes/No radio
- Bank Sort Code, Bank Account Number, Bank Account Name, Bank Reference — standard inputs

**Fieldset: Network Related Detail**
- Checkbox: "Use terms from principal agent/network" (indented with `w-1/3` spacer)
- **Network**: FormRadioGroup Y/N (own row, above Default Advice Type)
- Default Advice Type: FormSelect (Independent, Restricted)
- Default Remuneration Basis: FormSelect (Fee, Commission)
- **Default Distribution Channel** heading (navy `#00263e`, bold)
  - Restricted Advice: FormSelect
  - Simplified Advice: FormSelect
  - Non Advised: FormSelect
- **Nested Fieldset: IFA Member Detail**
  - Network IFA: input + circular Search button → opens Network Lookup Modal
  - Network Name: read-only (grey bg `#CCCCCC`)
  - Postcode: read-only (grey bg `#CCCCCC`)
  - **Tied Agent**: nested fieldset card with Yes/No radio (centered)
- **Nested Fieldset: Network Members**
  - Table: IFA Ref, Broker Name, Post Code
  - Header: `bg-#eaf5f8`, `2px solid #04589b`
  - Empty: "No network members" (italic)
- Principal Agent Ref: input + circular Search button + circular Clr button
- Principal: Radio N / Y

**Fieldset: Quote Terms**
- Description: "Best rate required for all quotes greater than or equal to:"
- Internal / LV.com: input (default "0")
- Portals: input (default "0")

---

## Tab 3: Lookups

### Search Criteria (inside a Fieldset)
- 3 text inputs: Postcode (`140px`, placeholder "e.g. EC1A"), IFA Reference (`140px`), IFA Name (`180px`)
- **Status**: checkbox group (vertical, NOT a dropdown) — Authorised (checked by default), Cancelled, Duplicate Record, Revoked
- **No explicit Search button** — filtering is live/reactive
- **[Select]** button (primary, Check icon): enabled when row selected → loads broker, switches to IFA Detail
- **[Club]** button (secondary, Building icon): opens Club Modal

### Search Results Panel
- Header: `bg-#002f5c`, "Search Results ({count})" white text, subtitle "Click a row to view details" (`10px white/60`)
- Table: 64 columns (all broker fields), horizontally scrollable, `min-width: {cols * 140}px`
- Column header: `bg-#eaf5f8`, sticky, `3px #04589b` underline
- IFA_REF column: `font-medium text-#005a9c underline`
- Row click: highlight `bg-#05579B text-white`
- Row double-click: select broker → navigate to IFA Detail
- Alternating row tint: `rgba(231,235,236,0.2)`

---

## Tab 4: Retirement Income

Three identical product sections (fieldsets): **Non Profit Annuity**, **PIPA**, **PRP**

Each section: 3-column grid:
- Col 1: Default adviser charges % (disabled), Amount, Default Commission %
- Col 2: Expense Discount, Marketing Allowance
- Col 3: Two buttons — "[+] Advice Type/Distribution Channel Pricing" (green PlusCircle), "[+] Special Deals" (blue PlusCircle)

No banner at top, no Save button at bottom (modals have their own Save).

---

## Tab 5: Equity Release

**Row 1** (3-column grid):
- Mortgage Permissions? (radio Yes/No)
- ERLM TOBA? (radio Yes/No)
- Club Membership (table: Name, Ref + Add/Edit/View/Remove buttons)

**Row 2** (2-column grid):
- Flexible Commission: Broker Rate, Minimum Amount, Network Rate, [x] Trail Commission
- Lump Sum Commission: Broker Rate, Minimum Amount, Network Rate

**Row 3** — Special Deals parent fieldset (2-column: Flexible left, Lump Sum right):
- **Age Band table**: 7 rows (60-65 through 91+), columns: Exclusive % (header checkbox), (+/-), Discounted % (header checkbox), Cash Back
- **Valuation sub-fieldset**: [x] Free Up To (Amount or Max Property Value), [x] Fee discount, [x] Refund discount/fee on completion, [x] Reduce fees upfront
- **Fees**: Packaging Fee, Application Fee, LTV % (+ or -)

---

## Tab 6: Notes

- **No header or toolbar** — notes list renders directly
- **No "Add Note" button** — notes are system-generated via Save flow
- Vertical scrollable stack of note cards

**Note card:**
- Left strip (40px): `bg-#eaf5f8`, note type letters stacked vertically ("SYS" or "USR"), `11px bold #00263e font-sans`
- Right body: `px-4 py-3`, min-height 80px
  - Optional **label** prefix in bold (e.g. "NPA :") followed by description
  - OLD VALUE / NEW VALUE rows when `oldValue` exists (bold 100px labels)
- **Empty placeholder rows**: `bg-#d8d8d8`, `min-h-60px`, fills up to 6 total visible rows
- Empty state: "No notes found for this record."

---

## Modal Windows

### 1. Insert IFA Modal
- Trigger: IFA Detail toolbar → [+New] button
- Width: 420px, bg: `#f0f0f0`
- Title bar: `bg-#002f5c`, "Insert IFA"
- Fields: Broker Name (required, autofocus), Address (3-line connected), Town/County/Postcode (3-col grid), Telephone/Fax (2-col)
- Footer: [Ok] (primary, Check icon) + [Cancel] (secondary, X icon)
- On OK: creates broker with status "Authorised", navigates to it

### 2. Locate IFA Modal
- Trigger: IFA Detail toolbar → [Locate] button
- Width: 480px, bg: `#f0f0f0`
- Title bar: `bg-#00263e`, "Locate IFA"
- Single search input (autofocus), placeholder "Enter IFA reference..."
- [Find] button (primary, disabled when empty), [Quit] button (secondary)
- Results table (shown after search): IFA Ref, Broker Name, Postcode. Max-h 200px. Click row → selects & closes.

### 3. Lookup IFA Modal (full Citrix-style)
- Trigger: IFA Detail toolbar → [Search] button
- Width: 780px, max-h: 85vh, bg: `#f0f0f0`
- Title bar: `bg-#002f5c`, "IFA Lookup"
- Filter row: IFA Ref + Postcode + Broker Name inputs (live filtering) + 4 status checkboxes (Authorised checked by default)
- 3 action buttons (vertical, right): OK (primary, disabled until selected), Cancel (secondary), New (opens Insert IFA modal)
- Results table: IFA_REF, POST_CODE, BROKER_NAME. Click selects; double-click confirms.
- **Amendable Details** fieldset below table: read-only Address (4 lines), Post Code, SIB No, Authorised By, Authorised On, IFA Portfolio checkbox. All disabled grey bg.

### 4. Club Modal
- Trigger: Lookups tab → [Club] button
- Width: 640px, title: "Add / Search Clubs" (`bg-#00263e`)
- Filters: Club Name, Club Reference, Post Code (live filtering)
- Table: Club Name, Club Reference, Post Code, Active. 15 sample clubs.
- Footer: [New], [Edit], [Cancel]

### 5. IFA Network Lookup Modal
- Trigger: Contacts tab → Network IFA search button
- Width: 680px, max-h: 80vh, title: "IFA Network Lookup" (`bg-#002f5c`)
- Filters: IFA Ref, Postcode, Broker Name (live filtering)
- Action bar: [OK] (disabled until selected), [Cancel]
- Table: IFA_REF, POST_CODE, BROKER_NAME. Click selects; double-click confirms.
- Footer: "{count} record(s) found — click to select, double-click to confirm"
- On select: fills Network IFA, Network Name, Postcode on Contacts form

### 6. Advice Type/Distribution Channel Pricing Modal
- Trigger: Retirement Income → any product → [+] Advice Type button
- Width: 95vw / max 1100px, max-h: 90vh, title: "Advice Type/Distribution Channel Pricing" (`bg-#002f5c`)
- Product label at top
- Scrollable table with sticky columns 1–2 and sticky header
- 4 advice type groups (Independent, Non advised, Simplified, Restricted), each with 1 Advice Type row + 3 Distribution Channel rows (Whole of Market, Tied, Multi-tied)
- 5 data columns: Expense Discount, Marketing Allowance, Adviser Charge Amount, Adviser Charge %, Commission %
- Footer: [Save] + [Cancel] centered

### 7. Special Deals Modal
- Trigger: Retirement Income → any product → [+] Special Deals button
- Width: 780px, max-h: 90vh, title: "Special Deals" (`bg-#002f5c`)
- Product label + "Adjustments" section title
- Table: Deal Name, Expense Discount, Marketing Allowance, Start Date, End Date, Active
- Footer: [Add], [Save], [Edit], [Cancel]

---

## Navigation Flows

1. **App Init**: DataStoreProvider loads seed data → AppProvider sets activeTab: ifa-detail → first broker auto-selected → IFA Detail renders
2. **Lookup → Detail**: Double-click row or [Select] → setActiveBrokerId → switch to IFA Detail tab
3. **Insert New IFA**: [+New] → InsertIfaModal → fill form → [Ok] → createBroker (status: Authorised) → navigate to new broker
4. **Locate IFA**: [Locate] → LocateIfaModal → type reference → [Find] → click result → select broker
5. **Lookup IFA**: [Search] → LookupIfaModal → filter → click/double-click → select broker. [New] → opens InsertIfaModal
6. **Save**: [Save] → compare all fields vs originalData → updateBroker → createNote for each change → reset isDirty
7. **Network Lookup**: Contacts → [Q] button → NetworkLookupModal → filter → select → fills Network IFA/Name/Postcode
8. **Contact Navigation**: [|<] [<] [>] [>|] → currentIndex updates → network overrides reset → form re-renders

---

## Key Implementation Details

- All circular toolbar buttons: `w-[44px] h-[44px] rounded-[30px]`, white bg, `border-[#04589b]`, hover fills `bg-[#003578]` with white text. Disabled at boundaries with `opacity-30`.
- Hover tooltips on toolbar buttons: navy bg, white text, 10px font
- Connected fields (Broker Name/Address, Contact Address): stacked inputs sharing continuous borders — `rounded-t-lg` on first, `rounded-b-lg` on last, `border-b-0` on all except last
- Nested fieldset cards (Paid By BACS, Tied Agent): `<Fieldset>` components centered with `flex justify-center`, `mb-0 px-6`
- Combobox options for Grade: Standard, Major, Key Account, National, Regional, Premier, Diamond, Platinum (or similar legacy values)
- Region options use code prefix format: "BIR - Birmingham", "BRS - Bristol", "LON - London", etc.
- Broker Manager combobox: 14 manager names
- Key Account combobox: A through Z
- The LV= logo is an inline SVG or small image asset
