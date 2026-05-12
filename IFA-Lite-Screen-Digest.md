# IFA Lite — Screen Digest

> **Version:** 1.1.0
> **Type:** Internal Broker/IFA Management Tool
> **Description:** Fully static (no backend/database) Angular web application for internal users to manage brokers/IFAs. Replicates a legacy Citrix-based Windows desktop EXE. All data is embedded in-memory via injectable Angular services exposing signals. Features 6 tabs covering IFA details, contacts, lookups, retirement income, equity release, and audit notes.

---

## 1. Technology Stack

| Layer | Technology |
|---|---|
| Framework | Angular 17+ (standalone components, signals, `OnPush`) |
| Styling | Tailwind CSS v4 (inline `@theme`) |
| Routing | Angular Router (single route `/`, tab-based navigation via `AppStateService.activeTab` signal) |
| State | Injectable services (`AppStateService` + `DataStoreService`) using `signal()` / `computed()` / `effect()` |
| Data | In-memory seed data — no HTTP, no database |
| Forms | `ReactiveFormsModule` (`FormBuilder`, `FormGroup`, `FormControl`, `FormArray`) |
| Icons | `lucide-angular` |
| Combobox | Custom `<app-combobox>` built on Angular CDK Overlay/Listbox, implements `ControlValueAccessor` |
| Utilities | Angular `NgClass` / `NgStyle`; native template bindings (no clsx needed) |
| Zoom | `html { zoom: 0.8 }`, root height `calc(100vh / 0.8)` |

### 1.1 Typography

| Font | Role | Weights | CSS Reference |
|---|---|---|---|
| Livvic | Headings, labels, buttons, tabs | 400, 500, 600, 700 | `font-sans` |
| Mulish | Inputs, body text, table data | 300, 400 | `font-[Mulish]` |

---

## 2. Design Tokens

### 2.1 Colour Palette

| Token | Hex | Usage |
|---|---|---|
| Navy Header | `#00263e` | App header background, modal title bars |
| Navy Dark | `#002f5c` | Table panel headers, grid headers |
| Primary Blue | `#006cf4` | Active tab accent, fieldset legends, primary buttons |
| Button Blue | `#04589b` | Secondary button borders, table header underlines |
| Hover Blue | `#003578` | Button/row hover state |
| Selected Row | `#05579B` | Active table row highlight |
| Green Focus | `#178830` | Input focus/hover borders, combobox open state |
| Border Grey | `#BBBBBB` | Default input/fieldset borders |
| Disabled Grey | `#CCCCCC` | Disabled input background |
| Disabled Border | `#ACACAC` | Disabled input border |
| Text Dark | `#3d3d3d` | Primary body text |
| Text Muted | `#979797` | Placeholder/empty-state text |
| Page BG | `#f0f0f0` | Page background |
| Tab Inactive | `#eaf5f8` | Inactive tab background, table header fill |
| Tab Hover | `#dceef3` | Tab hover state |
| Error Red | `#d72714` | Combobox error state |
| Link Blue | `#005a9c` | IFA ref link styling in Lookups |
| Alt Row | `rgba(231,235,236,0.2)` | Alternating table row tint |

### 2.2 Spacing & Borders

| Property | Value |
|---|---|
| Page horizontal padding | `142px` (`px-[142px]`) |
| Input border | `1px solid #BBBBBB` |
| Input focus border | `2px solid #178830` |
| Input radius | `8px` (`rounded-lg`) |
| Fieldset border | `1px solid #BBBBBB, rounded-lg` |
| Active tab top border | `2px solid #006cf4` |
| Table header underline | `2px solid #04589b` (or `3px` in Lookups) |

### 2.3 Button Variants

| Variant | Background | Text | Border | Hover | Shape |
|---|---|---|---|---|---|
| **Primary** | `#006cf4` | white | none | `#003578` | `rounded-full`, `shadow-md` |
| **Secondary** | white | `#04589b` | `1px solid #04589b` | bg `#003578`, text white | `rounded-full` |
| **Outline** | white | `#3d3d3d` | `1px solid #BBBBBB` | border/text `#006cf4` | `rounded-full` |
| **Circular** | white | `#04589b` | `1px solid #04589b` | bg `#003578`, text white | `44x44px`, `rounded-[30px]` |
| **Circular Small** | white | `#3d3d3d` | `1px solid #BBBBBB` | border/text `#006cf4` | `28x28px`, `rounded-full` |

---

## 3. Global State

### 3.1 AppStateService Signals & Methods

| Property | Type | Default | Description |
|---|---|---|---|
| `activeTab` | `WritableSignal<TabId>` | `ifa-detail` | Currently visible tab |
| `activeBrokerId` | `WritableSignal<number \| null>` | `null` (auto-set to first broker on load) | Selected broker ID |
| `activeIfaRef` | `Signal<string>` (computed) | `""` | Display label for current broker in toolbar |
| `isDirty` | `WritableSignal<boolean>` | `false` | True when IFA Detail form has unsaved changes |
| `isSaving` | `WritableSignal<boolean>` | `false` | True during save operation |
| `registerSaveHandler(fn)` | method | — | Registers the active tab's save handler |
| `triggerSave()` | method | — | Invokes the registered save handler |

### 3.2 Data Entities (In-Memory via DataStoreService)

| Entity | Type | Seed Count | Key Fields |
|---|---|---|---|
| **Brokers** | `Broker[]` | 6 | `id`, `ifaRef`, `brokerName`, `postcode`, `status`, `telephone`, `fcaReference`, `grade`, `brokerManager`, `region`, `partnerCode`, + 60 more legacy columns |
| **Contacts** | `Contact[]` | 0 | `id`, `brokerId`, `reference`, `title`, `forename`, `surname`, `addressLine1-6`, `homeTelephone`, `mobileTelephone`, `emailAddress`, `bankSortCode`, `networkIfa`, `principalAgentRef`, etc. |
| **Notes** | `Note[]` | 30 | `id`, `brokerId`, `noteType`, `description`, `oldValue`, `newValue`, `updatedBy`, `updatedDate`, `label` |
| **Retirement Income** | `RetirementIncome[]` | 0 | `id`, `brokerId`, prefixed fields: `{npa\|pipa\|prp}Amount`, `...Commission`, `...ExpenseDiscount`, `...MarketingAllowance` |
| **Equity Release** | `EquityRelease[]` | 0 | `id`, `brokerId`, `mortgagePermissions`, `erlmToba`, `flexibleBrokerRate`, `lumpSumBrokerRate`, `packagingFee`, `ltvPercent`, etc. |

---

## 4. Global Components (Shell)

### 4.1 Header

| Property | Value |
|---|---|
| Sticky | No |
| Background | `#00263e` (navy) |
| Padding | `px-[142px] pt-4 pb-6` |
| Left | LV= logo (`h-6` image) |
| Right | Logout button (primary, compact) |
| Divider | `1px solid slate-600/50` |
| Title | "IFA Lite" — `30px`, Livvic, white, `tracking-tight` |

### 4.2 Tab Bar

| Property | Value |
|---|---|
| Sticky | Yes — `top-0 z-30` |
| Background | white |
| Padding | `px-[142px] pt-4` |

**Tabs:**

| # | ID | Label | Icon |
|---|---|---|---|
| 1 | `ifa-detail` | IFA Detail | FileText |
| 2 | `contacts` | Contacts | Users |
| 3 | `lookups` | Lookups | Search |
| 4 | `retirement` | Retirement Income | Briefcase |
| 5 | `equity` | Equity Release | Home |
| 6 | `notes` | Notes | Database |

**Tab Styling:**

| State | Background | Text | Top Border | Icon Colour |
|---|---|---|---|---|
| Active | white | `#4a4a49` | `2px solid #006cf4` | `#006cf4` |
| Inactive | `#eaf5f8` | `#0d2c41` | none | `rgba(13,44,65,0.6)` |

Common: `min-w-[140px]`, `px-6 py-3`, `15px semibold font-sans`, `rounded-t-lg`. Active has `shadow-[0_-2px_8px_rgba(0,0,0,0.08)]` and side borders.

### 4.3 IFA Detail Toolbar (visible on IFA Detail tab only)

| Property | Value |
|---|---|
| Sticky | Yes — directly below tab bar |
| Container | white, `border #BBBBBB`, `rounded-lg`, `shadow-sm`, `px-6 py-3` |

**Elements (left to right):**

| Element | Details |
|---|---|
| Broker Badge | `\|` accent bar (`4px #006cf4`), "Broker: **{activeIfaRef}**" (14px bold, value in `#006cf4`) |
| Action Combobox | `200px` wide; options: Appointment, Broker Pack Follow Up, Duplicate, Hold; default: Appointment |
| Record Navigator | `\|<<` `<` **1 of 6** `>` `>>\|` — circular 44x44 buttons; counter: 14px bold Mulish `#4a4a49` |
| +New Button | Icon: FilePlus2, tooltip: "New IFA" → opens **Insert IFA Modal** |
| Locate Button | Icon: ScanSearch, tooltip: "Locate IFA" → opens **Locate IFA Modal** |
| Search Button | Icon: Search, tooltip: "Lookup IFA" → opens **Lookup IFA Modal** |
| Save Button | Icon: Save (or RefreshCw spinning), `44x44`, bg `#006cf4` / disabled `#979797`; enabled when `isDirty && !isSaving` |

### 4.4 Contacts Toolbar (visible on Contacts tab only)

| Property | Value |
|---|---|
| Sticky | Yes — directly below tab bar |
| Container | white, `border #BBBBBB`, `rounded-lg`, `shadow-sm` |

**Elements:**

| Element | Details |
|---|---|
| Reference Badge | `\|` accent bar, "Reference: **{reference}**" |
| Contact Navigator | `\|<<` `<` **1 of 3** `>` `>>\|` — circular 44x44 buttons |
| + Add New | Secondary button — placeholder, not yet wired |

### 4.5 Footer

| Property | Value |
|---|---|
| Sticky | No — pushed to bottom by `flex-1` main content |
| Background | white |
| Border Top | `1px solid slate-200` |
| Left | LV= logo (`h-6`) |
| Right | "Liverpool Victoria Financial Services Limited" / "County Gates, Bournemouth BH1 2NF" (`10px`, `slate-400`, Mulish) |

### 4.6 Reusable Form Components

#### Combobox (`<app-combobox>`, Angular CDK Overlay + Listbox, implements `ControlValueAccessor`)
- Height: `34px`, border radius: `8px`
- Default border: `1px solid #BBBBBB`, hover: `#178830`
- Open state: `3px solid #178830` (no bottom border, squared bottom corners)
- Dropdown: `3px solid #178830` top-connected, `rounded-b-[8px]`, `max-h-200px`, `shadow-lg`
- Highlight: `bg-#003578 text-white`
- Chevron: `#006cf4`, rotates 180deg on open
- Searchable: input becomes editable when dropdown opens
- Keyboard: Arrow keys navigate, Enter selects, Escape closes

#### Fieldset
- Border: `1px solid #BBBBBB`, `rounded-lg`, bg white, `p-4 pt-2`
- Legend: uppercase, `xs bold #006cf4 font-sans tracking-wider px-2`

#### FormInput
- Layout: `flex items-center gap-3 mb-2`
- Label: `w-1/3` (default), `xs semibold #3d3d3d font-sans text-right`, truncated
- Input: `flex-1`, `px-3 py-1.5`, `sm Mulish #3d3d3d`, `rounded-lg`, focus `2px #178830`, hover `#178830`

#### FormSelect
- Same layout as FormInput; uses Combobox component (not native `<select>`)

#### FormRadioGroup
- Layout: `flex items-center gap-3 mb-2`, label `w-1/3`, radio accent `#006cf4`, `gap-4` between options

#### FormCheckbox
- Layout: `flex items-center gap-2 mb-2`, accent `#178830`, size `w-4 h-4`

---

## 5. Tab Screens

### 5.1 IFA Detail Tab

| Property | Value |
|---|---|
| Component | `IfaDetailTabComponent` (`<app-ifa-detail-tab>`) |
| File | `features/ifa-detail/ifa-detail-tab.component.ts` |
| Requires Broker | Yes |

**Empty State:** Dashed border container with AlertCircle icon, "No Broker Selected", "Please select a broker from the Lookups tab first."

**Layout:** Horizontal flex (`gap-6`)

#### Left Panel (flex-1, min-w-600px) — 2-Column Form Grid

| Left Column | Right Column |
|---|---|
| Broker Name + Address (5-line connected block: Name, Name 2 overflow, Address 1, Address 2, Address 3) | FCA Reference |
| *(connected block spans 5 rows)* | Annuity TOBA (radio: Yes / No) |
| — | Status (combobox: Authorised, Cancelled, Revoked, Duplicate Record) |
| — | Sent Date |
| — | — |
| Town | Grade (combobox: 8 options) |
| County | Next Diary Date |
| Postcode | IFA Member Number |
| Telephone | Broker Manager (combobox: 14 managers) |
| Fax Number | Key Account (combobox: A–Z) |
| Email Address | Partner Code |
| Initials | Region (combobox: 18 regions with codes) |
| Date Checked | — |

**Separator:** `hr border-t #BBBBBB`

**Audit Section (disabled, 2-column):** Created By, Created Date, Amended By, Amended Date

#### Right Panel — Associated Contacts (350px)

- Header: `bg-#002f5c`, "ASSOCIATED CONTACTS" (white, xs, bold, uppercase)
- Table columns: Ref, Title, Initials, Surname, Position
- Header: `bg-#eaf5f8`, border `2px solid #04589b`
- Row hover: `bg-#05579B text-white`
- Empty: "No contacts found"

#### Save Behaviour

1. Toolbar Save button enabled when `isDirty`
2. Compares every labelled field against original values
3. `dataStore.updateBroker(...)` is called
4. On success: for each changed field, calls `dataStore.createNote({ noteType: 'SYS', description: '{FieldLabel} updated by SYSTEM on {DD/MM/YYYY}', oldValue, newValue })`
5. Resets `appState.isDirty.set(false)`, updates `originalData` snapshot

---

### 5.2 Contacts Tab

| Property | Value |
|---|---|
| Component | `ContactsTabComponent` (`<app-contacts-tab>`) |
| File | `features/contacts/contacts-tab.component.ts` |
| Requires Broker | Yes |

**Empty State:** "Please select a broker first." (centered, muted)

**Layout:** `grid grid-cols-1 lg:grid-cols-2 gap-x-8 gap-y-4`

#### Left Column (sticky below toolbar, z-10)

4-column grid: `grid-cols-[auto_1fr_auto_1fr] gap-x-3 gap-y-2`, label min-width `70px`. All fields read-only.

| Row | Left Label + Input | Right Label + Input |
|---|---|---|
| 1 | Title (Combobox: Mr/Mrs/Ms/Dr) | Initials |
| 2 | Forename | Surname |
| 3 | Salutation | Position |
| 4 | Address (label `self-start pt-2`) | *(input spans `col-span-3`)* |
| — | 6-line connected block (rounded-t first, rounded-b last, `border-b-0` in between) | — |
| 5 | Home Telephone | Mobile Telephone |
| 6 | Email Address | *(input spans `col-span-3`)* |

#### Right Column (scrollable)

**Fieldset: IFA Bank Detail**

| Field | Type |
|---|---|
| Paid By BACS | Nested fieldset card (centered), Radio: Yes / No |
| Bank Sort Code | Input |
| Bank Account Number | Input |
| Bank Account Name | Input |
| Bank Reference | Input |

**Fieldset: Network Related Detail**

| Field | Type |
|---|---|
| *(spacer)* Use terms from principal agent/network | Checkbox (indented with `w-1/3` spacer) |
| Network | FormRadioGroup: Y / N (own row above Default Advice Type) |
| Default Advice Type | FormSelect: Independent, Restricted |
| Default Remuneration Basis | FormSelect: Fee, Commission |
| **Default Distribution Channel** *(heading, navy `#00263e`)* | — |
| &emsp; Restricted Advice | Combobox |
| &emsp; Simplified Advice | Combobox |
| &emsp; Non Advised | Combobox |

**Nested Fieldset: IFA Member Detail**

| Field | Type |
|---|---|
| Network IFA | Input + circular Search button → opens **Network Lookup Modal** |
| Network Name | Input (read-only, grey bg `#CCCCCC`) |
| Postcode | Input (read-only, grey bg `#CCCCCC`) |
| Tied Agent | Nested fieldset with radio: Yes / No (centered) |

**Nested Fieldset: Network Members**

- Table: IFA Ref, Broker Name, Post Code
- Header: `bg-#eaf5f8`, border `2px solid #04589b`
- Empty: "No network members" (italic)

**Inline Fields:**

| Field | Type |
|---|---|
| Principal Agent Ref | Input + circular Search button + circular Clr button |
| Principal | Radio: N / Y |

**Fieldset: Quote Terms**

- Description: "Best rate required for all quotes greater than or equal to:" (indented)
- Internal / LV.com: Input (default "0")
- Portals: Input (default "0")

---

### 5.3 Lookups Tab

| Property | Value |
|---|---|
| Component | `LookupsTabComponent` (`<app-lookups-tab>`) |
| File | `features/lookups/lookups-tab.component.ts` |
| Requires Broker | No |

#### Search Criteria (Fieldset)

| Filter | Type | Width |
|---|---|---|
| Postcode | Text input | `140px`, placeholder "e.g. EC1A" |
| IFA Reference | Text input | `140px` |
| IFA Name | Text input | `180px` |
| Status | Checkbox group (vertical) | — |

**Status checkboxes:** Authorised (checked by default), Cancelled, Duplicate Record, Revoked

**Action Buttons (right-aligned):**
- **Select** (primary, `w-28`, icon: Check) — enabled when row selected → loads broker, switches to IFA Detail tab
- **Club** (secondary, `w-28`, icon: Building) → opens **Club Modal**

#### Search Results Panel

- Header: `bg-#002f5c`, border-bottom `3px solid #04589b`, "Search Results ({count})"
- Subtitle: "Click a row to view details" (10px, white/60)
- Table: **75 columns** (all broker fields), `min-width: {cols * 140}px`, horizontal scroll
- Header: `bg-#eaf5f8`, sticky top, `3px #04589b` underline
- IFA_REF column: `font-medium text-#005a9c underline`
- Row click: highlights (`bg-#05579B text-white`)
- Row double-click: selects broker → navigates to IFA Detail tab
- Alt rows: `rgba(231,235,236,0.2)`

---

### 5.4 Retirement Income Tab

| Property | Value |
|---|---|
| Component | `RetirementTabComponent` (`<app-retirement-tab>`) |
| File | `features/retirement/retirement-tab.component.ts` |
| Requires Broker | Yes |

**Empty State:** "Please select a broker first."

**Layout:** `flex-col gap-4` with 3 identical `ProductSection` components:

| Section | Prefix |
|---|---|
| Non Profit Annuity | `npa` |
| PIPA | `pipa` |
| PRP | `prp` |

**Each ProductSection (Fieldset, 3-column grid):**

| Column 1 | Column 2 | Column 3 (border-left, pl-6) |
|---|---|---|
| Default Adviser Charges % *(disabled)* | Expense Discount | [+] Advice Type/Distribution Channel Pricing → **Pricing Modal** |
| Amount | Marketing Allowance | [+] Special Deals → **Special Deals Modal** |
| Default Commission % | — | — |

---

### 5.5 Equity Release Tab

| Property | Value |
|---|---|
| Component | `EquityReleaseTabComponent` (`<app-equity-release-tab>`) |
| File | `features/equity-release/equity-release-tab.component.ts` |
| Requires Broker | Yes |

**Empty State:** "Please select a broker first."

#### Row 1 — Three-Column Grid

| Mortgage Permissions? | ERLM TOBA? | Club Membership |
|---|---|---|
| Radio: Yes / No | Radio: Yes / No | Table (Name, Ref), header `bg-#002f5c` white text |
| — | — | Empty: "No memberships" |
| — | — | Buttons: Add, Edit, View (secondary), Remove (outline) |

#### Row 2 — Two-Column Grid

| Flexible Commission | Lump Sum Commission |
|---|---|
| Broker Rate, Minimum Amount (2-col grid) | Broker Rate, Minimum Amount (2-col grid) |
| Network Rate, [x] Trail Commission | Network Rate |

#### Row 3 — Special Deals Fieldset (2-column: Flexible + Lump Sum)

Each sub-fieldset contains:

**Age Band Details Table (editable input grid):**

| Age Band | Exclusive % *(header checkbox)* | (+/-) | Discounted % *(header checkbox)* | Cash Back |
|---|---|---|---|---|
| 60-65 | `[___]` | `[_]` | `[___]` | `[___]` |
| 66-70 | `[___]` | `[_]` | `[___]` | `[___]` |
| 71-75 | `[___]` | `[_]` | `[___]` | `[___]` |
| 76-80 | `[___]` | `[_]` | `[___]` | `[___]` |
| 81-85 | `[___]` | `[_]` | `[___]` | `[___]` |
| 86-90 | `[___]` | `[_]` | `[___]` | `[___]` |
| 91 + | `[___]` | `[_]` | `[___]` | `[___]` |

**Valuation Fieldset:**
- [x] Free Up to: Amount `[___]` or Max Property Value `[___]`
- [x] Fee discount: `[___]`
- [x] Refund discount/fee amount on completion
- [x] Reduce fees upfront

**Additional Fields:** Packaging Fee, Application Fee, LTV % (+ or -)

---

### 5.6 Notes Tab

| Property | Value |
|---|---|
| Component | `NotesTabComponent` (`<app-notes-tab>`) |
| File | `features/notes/notes-tab.component.ts` |
| Requires Broker | Yes |

**Empty State:** "Please select a broker first."
**No Notes State:** "No notes found for this record." (centered, bordered, rounded)

**Layout:**
- No header/toolbar — notes list renders directly
- Notes list: vertical stack of note cards

**Note Card Layout:**

| Left Stripe (w-10) | Body (flex-1) |
|---|---|
| `bg-#eaf5f8`, border-right `#BBBBBB` | `px-4 py-3`, min-h `80px` |
| Note type letters stacked vertically (e.g. S/Y/S) | **Label** (bold, inline, e.g. "NPA :") if `note.label` exists, followed by **Description** (sm, semibold, `#00263e`) |
| `11px bold #00263e font-sans` | OLD VALUE : `{oldValue}` / NEW VALUE : `{newValue}` (shown when `oldValue` exists) |

**Empty Placeholders:** `max(0, 6 - notes.length)` greyed-out slots (`bg-#d8d8d8`, `min-h-60px`)

---

## 6. Modal Windows

### 6.1 Insert IFA

| Property | Value |
|---|---|
| Trigger | IFA Detail toolbar → [+New] button |
| Width | `420px` |
| Title Bar | `bg-#002f5c`, "Insert IFA" |

**Fields:**
1. Broker Name (text, full width, autofocus, **required**)
2. Address (3-line connected block)
3. Town / County / Postcode (3-column grid)
4. Telephone / Fax (2-column flex)

**Footer:** `[Ok]` (primary, icon: Check) → creates broker with status "Authorised", navigates to it. `[Cancel]` (secondary, icon: X). Escape closes.

---

### 6.2 Locate IFA

| Property | Value |
|---|---|
| Trigger | IFA Detail toolbar → [Locate] or [Search] button |
| Width | `480px` |
| Title Bar | `bg-#00263e`, "Locate IFA" |

**Search:** Text input, placeholder "Enter IFA reference...", autofocus. Enter triggers search, Escape closes.

**Results Table (shown after search):** max-h `200px`, scrollable. Columns: IFA Ref, Broker Name, Postcode. Row click selects broker and closes. Row hover: `bg-#05579B text-white`.

**Footer:** `[Find]` (primary, disabled when empty), `[Quit]` (secondary).

---

### 6.3 Lookup IFA

| Property | Value |
|---|---|
| Trigger | IFA Detail toolbar → [Search] button |
| Width | `95vw` / `max-w-1100px`, max-h `90vh` |
| Title Bar | `bg-#002f5c`, "IFA Lookup" |

**Search Filters (horizontal row):**
- IFA Ref. (text, flex-1)
- Postcode (text, flex-1)
- Broker Name (text, flex-1)

**Status Checkboxes:** Authorised (checked by default), Cancelled, Duplicate Record, Revoked

**Action Buttons (vertical, right-aligned):**
- **OK** (primary, disabled when nothing selected) — selects broker and closes
- **Cancel** (secondary) — closes modal
- **New** (secondary) — closes Lookup and opens **Insert IFA Modal**

**Results Table:** max-h `280px`, scrollable. Columns: IFA_REF, POST_CODE, BROKER_NAME. Row click selects; double-click confirms & closes. Selected: `bg-#05579B text-white`. Alternating row tint.

**Amendable Details (footer fieldset, blue legend):** 2-column grid of read-only fields populated from selected row:
- Address (3 lines), SIB No, Authorised By, Authorised On, IFA Portfolio (checkbox), Post Code

**Footer Status:** `"{count} record(s) found"` (10px, `#979797`, Mulish).

---

### 6.4 Add / Search Clubs

| Property | Value |
|---|---|
| Trigger | Lookups tab → [Club] button |
| Width | `640px` |
| Title Bar | `bg-#00263e`, "Add / Search Clubs" |

**Filters (live filtering):**
- Club Name (text, `200px`, autofocus)
- Club Reference (text, `150px`)
- Post Code (text, `120px`)

**Results Table:** max-h `260px`, scrollable. Header: `bg-#002f5c`, white text, `3px #04589b` underline. Columns: Club Name, Club Reference, Post Code, Active. 15 sample clubs. Click selects; double-click closes. Selected: `bg-#05579B text-white`.

**Footer:** `[+ New]` (primary), `[Edit]` (secondary), `[Cancel]` (secondary). Escape closes.

---

### 6.5 IFA Network Lookup

| Property | Value |
|---|---|
| Trigger | Contacts tab → Network IFA circular search button |
| Width | `680px`, max-h `80vh` |
| Title Bar | `bg-#002f5c`, "IFA Network Lookup" |

**Filters (live filtering, `border-bottom #BBBBBB`):**
- IFA Ref. (text, flex-1, autofocus)
- Postcode (text, flex-1)
- Broker Name (text, flex-1)
- Label font: `10px semibold #3d3d3d font-sans`

**Action Bar:** `[OK]` (primary, disabled when nothing selected), `[Cancel]` (secondary).

**Results Table:** max-h `350px`, scrollable. Header: `bg-#eaf5f8`, sticky, `2px #04589b`. Columns: IFA_REF, POST_CODE, BROKER_NAME. Click selects; double-click confirms & closes. Empty: "No records found" (italic).

**Footer:** `"{count} record(s) found — click to select, double-click to confirm"` (10px, `#979797`, Mulish).

---

### 6.6 Advice Type/Distribution Channel Pricing

| Property | Value |
|---|---|
| Trigger | Retirement Income → any ProductSection → [+] Advice Type button |
| Width | `95vw` / `max-w-1100px`, max-h `90vh` |
| Title Bar | `bg-#002f5c`, "Advice Type/Distribution Channel Pricing" |

**Product Label:** "Product: {productTitle}" (sm, semibold, `#00263e`)

**Table (scrollable, min-w `900px`):**

| Feature | Details |
|---|---|
| Sticky columns | Col 1 (labels) at `left-0`, min-w `100px`, z-5; Col 2 (names) at `left-100px`, min-w `120px`, z-5; bg `#f0f0f0` |
| Sticky header | `top-0 z-10`, `bg-#eaf5f8`, `2px #04589b`; sticky header cells at z-20 |
| Data columns | Expense Discount, Marketing Allowance, Adviser Charge Amount, Adviser Charge %, Commission % |
| Input min-width | `100px` |

**Repeating Structure (x4: Restricted, Simplified, Non advised, Independent):**

| Row Type | Col 1 (sticky) | Col 2 (sticky) | Cols 3–7 |
|---|---|---|---|
| Advice Type | **Advice Type** | {name} | `[editable inputs]` |
| Distribution Channel (3 rows) | **Distribution Channel** (rowSpan=3) | Whole of Market | `[editable inputs]` |
| — | — | Tied | `[editable inputs]` |
| — | — | Multi-tied | `[editable inputs]` |

Separator: `border-t-2 #BBBBBB` between advice type groups.

**Footer:** `[Save]` (primary), `[Cancel]` (secondary) — centered.

---

### 6.7 Special Deals

| Property | Value |
|---|---|
| Trigger | Retirement Income → any ProductSection → [+] Special Deals button |
| Width | `780px`, max-h `90vh` |
| Title Bar | `bg-#002f5c`, "Special Deals" |

**Content:**
- Product label: "Product: {productTitle}"
- Section title: "Adjustments" (centered, bold)
- Table (min-h `250px`): Deal Name, Expense Discount, Marketing Allowance, Start Date (DD/MM/YYYY), End Date (DD/MM/YYYY), Active
- Empty: "No special deals" (italic)

**Footer:** `[Add]`, `[Save]`, `[Edit]` (primary), `[Cancel]` (secondary).

---

## 7. Navigation Flows

### 7.1 App Initialisation

```
DataStoreService instantiated (providedIn: 'root') — loads seed data into in-memory signals
  → AppStateService instantiated (activeTab: ifa-detail)
    → dataStore.brokers() signal emits all 6 brokers
      → First broker auto-selected via effect() — appState.activeBrokerId.set(brokers[0].id)
        → IFA Detail tab renders with first broker data
```

### 7.2 Lookup → Detail

```
Lookups Tab: double-click row OR click [Select]
  → appState.activeBrokerId.set(selectedId)
    → effect() resets isDirty, sets appState.activeTab.set('ifa-detail')
      → IFA Detail tab loads with selected broker
```

### 7.3 Insert New IFA

```
IFA Detail toolbar: click [+New]
  → InsertIfaModalComponent opens
    → User fills form, clicks [Ok]
      → dataStore.createBroker({ ..., status: "Authorised" })
        → on return: appState.activeBrokerId.set(newBroker.id), close modal
          → IFA Detail renders with new broker
```

### 7.4 Locate Existing IFA

```
IFA Detail toolbar: click [Locate]
  → LocateIfaModalComponent opens (simple text search)
    → User types reference, clicks [Find] or presses Enter
      → Results table shows matching brokers (computed signal over dataStore.brokers())
        → User clicks a row
          → appState.activeBrokerId.set(broker.id), modal closes
            → IFA Detail loads with selected broker
```

### 7.5 Lookup IFA (Advanced)

```
IFA Detail toolbar: click [Search]
  → LookupIfaModalComponent opens (full Citrix-style with filters + Amendable Details)
    → User filters by IFA Ref / Postcode / Broker Name + status checkboxes
      → Results table updates in real-time (computed signal)
        → Click selects row (populates Amendable Details); double-click confirms
          → appState.activeBrokerId.set(broker.id), modal closes
            → IFA Detail loads with selected broker
  → [New] button → closes Lookup, opens InsertIfaModalComponent
```

### 7.6 Save Changes (with Audit Trail)

```
IFA Detail toolbar: click [Save] (enabled when appState.isDirty())
  → appState.triggerSave() invokes registered saveHandler
    → Handler compares form.value vs originalData for all labelled fields
      → dataStore.updateBroker(...) is called
        → on return: for each changed field →
            dataStore.createNote({ noteType: "SYS",
                                   description: "{Label} updated by SYSTEM on {date}",
                                   oldValue, newValue })
          → appState.isDirty.set(false), originalData updated
```

### 7.7 Network Lookup (Contacts)

```
Contacts Tab: click circular search button next to Network IFA
  → NetworkLookupModalComponent opens
    → User filters by IFA Ref / Postcode / Broker Name
      → Click selects row; double-click confirms
        → (selected) emits — parent sets networkIfa, networkName, networkPostcode overrides
          → Modal closes, Contacts form patches read-only fields via form.patchValue(...)
```

### 7.8 Contact Navigation

```
Contacts toolbar: click |<<, <, >, >>|
  → currentIndex signal updates
    → networkOverrides reset to null
      → Contact form re-renders with new contact data (form.patchValue)
```

---

## 8. File Map

| File | Purpose |
|---|---|
| `src/main.ts` | Bootstraps `AppComponent` with `provideRouter`, `provideAnimations`, etc. |
| `src/app/app.component.ts` | Root — `<router-outlet>` + global layout |
| `src/app/app.routes.ts` | Single route `/` → `LayoutComponent` |
| `src/app/core/services/app-state.service.ts` | Global state signals (active tab, broker, dirty/save) |
| `src/app/core/services/data-store.service.ts` | In-memory CRUD over signal-backed arrays |
| `src/app/core/data/seed-data.ts` | Seed data: 6 brokers, TypeScript interfaces |
| `src/app/layout/layout.component.ts` | Shell — header, tab bar, toolbar, footer, Insert/Locate modals |
| `src/app/shared/form-elements/` | `FieldsetComponent`, `FormInputComponent`, `FormSelectComponent`, `FormRadioGroupComponent`, `FormCheckboxComponent`, `ButtonComponent` (CVAs) |
| `src/app/shared/combobox/combobox.component.ts` | Searchable combobox (Angular CDK Overlay/Listbox, `ControlValueAccessor`) |
| `src/app/shared/club-modal/club-modal.component.ts` | Add/Search Clubs modal |
| `src/app/features/ifa-detail/ifa-detail-tab.component.ts` | Tab 1 — broker detail Reactive Form + associated contacts |
| `src/app/features/contacts/contacts-tab.component.ts` | Tab 2 — contact form + bank/network/quote sections + Network Lookup modal |
| `src/app/features/lookups/lookups-tab.component.ts` | Tab 3 — search criteria + 75-column results grid |
| `src/app/features/retirement/retirement-tab.component.ts` | Tab 4 — 3 product sections + Pricing/Special Deals modals |
| `src/app/features/equity-release/equity-release-tab.component.ts` | Tab 5 — permissions, commissions, age bands, valuations |
| `src/app/features/notes/notes-tab.component.ts` | Tab 6 — audit note cards with change tracking |
| `src/styles.scss` | Tailwind config, CSS variables, `html { zoom: 0.8 }` |
