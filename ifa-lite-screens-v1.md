# IFA Lite — V1 Screen Layouts & Behavior

---

## GLOBAL LAYOUT (All Screens)

```
+============================================================================================+
|  [LV= Logo]                                                                    [Logout]    |
|  ________________________________________________________________________________________  |
|                                                                                            |
|  IFA Lite                                                                                  |
+============================================================================================+
| [IFA Detail] | [Contacts] | [Lookups] | [Retirement Income] | [Equity Release] | [Notes]   |
+--------------------------------------------------------------------------------------------+
|                                                                                            |
|                              << TAB CONTENT AREA >>                                        |
|                                                                                            |
+--------------------------------------------------------------------------------------------+
|  [LV= Logo]              Liverpool Victoria Financial Services Limited                     |
|                           County Gates, Bournemouth BH1 2NF                                |
+============================================================================================+
```

**Behavior:**
- Header: Navy (#00263e) bar with LV= logo (left), Logout button (right), divider, "IFA Lite" title
- Tabs: 6 tabs in a row. Active tab has white background, blue top border, slightly overlaps content border. Inactive tabs have light blue (#eaf5f8) background
- Footer: White bar with LV= logo and company address
- Content area: Light grey (#f0f0f0) background

---

## 1. IFA DETAIL TAB

### 1a. Main Screen (with Toolbar — only visible on this tab)

```
+--------------------------------------------------------------------------------------------+
| |Broker: AGEPA-003 | [Appointment v] | [|<] [<] 1 of 6 [>] [>|] | (New) (Locate) (Search) | (Save) |
+--------------------------------------------------------------------------------------------+
|                                                                                            |
|  LEFT COLUMN                              |  RIGHT COLUMN         | ASSOCIATED CONTACTS    |
|  ─────────────────────────────────────────|───────────────────────|────────────────────────|
|                       ┌────────────────┐  |                       | +====================+ |
|  Broker Name          │ Age Partner... │  |  FCA Reference [____] | | Ref | Name   | Pos  | |
|                       │ (line 2)       │  |  Annuity TOBA  (o)(o) | |-----|--------|------| |
|  Address              │ 2200 Century.. │  |  Status  [Authorised] | | 001 | Mr RG  | Dir  | |
|                       │ Thorpe Park    │  |  Sent Date     [____] | | 002 | Mrs LG | Com  | |
|                       └────────────────┘  |                       | +====================+ |
|          Town  [________________]         |          Grade  [___v] |                        |
|        County  [________________]         | Next Diary Date [____] |                        |
|      Postcode  [________________]         | IFA Member No   [____] |                        |
|     Telephone  [________________]         | Broker Manager  [___v] |                        |
|    Fax Number  [________________]         |    Key Account  [___v] |                        |
|  Email Address [________________]         |   Partner Code  [____] |                        |
|      Initials  [________________]         |         Region  [___v] |                        |
|  Date Checked  [________________]         |                        |                        |
|  ─────────────────────────────────────────|────────────────────────|                        |
|     Created By [LORDXT ] (disabled)       |  Created Date [14/11/..] (disabled)              |
|     Amended By [_______] (disabled)       |  Amended Date [________] (disabled)              |
|  ─────────────────────────────────────────|──────────────────────────|                      |
+--------------------------------------------------------------------------------------------+
```

**Layout Notes:**
- Three-panel layout: left form fields, right form fields, Associated Contacts sidebar (350px fixed width)
- Left/right fields arranged in a 2-column CSS grid (`grid-cols-2 gap-x-8 gap-y-1`)
- Broker Name and Address are **connected fields** — a single bordered block with 5 stacked single-line inputs:
  - Line 1: Broker Name (primary) — `rounded-t-lg`, no bottom border
  - Line 2: Broker Name overflow (for long names) — no bottom border
  - Line 3: Address Line 1 — "Address" label floats to the left via negative margin, no bottom border
  - Line 4: Address Line 2 — no bottom border
  - Line 5: Address Line 3 — `rounded-b-lg`
  - All inputs share continuous side borders; only the top and bottom have rounded corners
- The connected block spans `row-span-5` in the grid, with FCA Reference, Annuity TOBA, Status, and Sent Date aligned to its right

**Toolbar (IFA Detail tab only):**
- Rendered inside a white card with border, rounded corners, and shadow (`bg-white border border-[#BBBBBB] rounded-lg`)
- Left group:
  - **Broker badge**: blue accent bar (4px, `bg-[#006cf4]`) + "Broker: AGEPA-003" text (ref in blue)
  - Vertical divider
  - **Action combobox** (200px wide): Appointment / Broker Pack Follow Up / Duplicate / Hold
  - Vertical divider
  - **Navigation buttons** (5): First (`ChevronFirst`) / Prev (`ChevronLeft`) / "N of M" label / Next (`ChevronRight`) / Last (`ChevronLast`)
    - All circular: `w-[44px] h-[44px] rounded-[30px]`
    - Style: white bg, `border-[#04589b]`, hover fills `bg-[#003578]` + white text
    - Disabled at boundaries (first/last), `opacity-30`
- Right group (separated by gap):
  - **(New IFA)** — `FilePlus2` icon, opens Insert IFA modal (see 1b). Tooltip: "New IFA"
  - **(Locate IFA)** — `ScanSearch` icon, opens Locate IFA modal (see 1c). Tooltip: "Locate IFA"
  - **(Lookup IFA)** — `Search` icon, opens Lookup IFA modal (see 1d). Tooltip: "Lookup IFA"
  - Vertical divider
  - **(Save)** — `Save` icon (or spinning `RefreshCw` while saving). Solid blue bg (`bg-[#006cf4]`), disabled grey (`bg-[#979797]`) when form is clean. Tooltip: "Save Changes"
- All action buttons share the same circular 44×44 pill style with hover tooltips (navy bg, white text, 10px font)

**Form Behavior:**
- All fields are editable text inputs or Combobox dropdowns (custom component with search, keyboard nav, green focus border)
- Combobox dropdowns used for: Status, Grade, Broker Manager, Key Account (A–Z), Region (code prefix e.g. "BIR - Birmingham")
- Annuity TOBA is a Yes/No radio group
- Created By / Created Date / Amended By / Amended Date are disabled (read-only, grey background `bg-[#CCCCCC]`) below a horizontal rule separator
- "No Broker Selected" placeholder shown if no broker is active — centered message with dashed border and alert icon
- On load, form state is initialised from the broker record; `isDirty` is set to false
- Editing any field sets `isDirty = true`, enabling the Save button

**Save Flow:**
1. User edits one or more fields, Save button becomes enabled (blue)
2. User clicks Save → for each changed field (compared against `originalData`):
   - A SYS note is created with:
     - `noteType: "SYS"`
     - `description: "{Field Label} updated by SYSTEM on {dd/mm/yyyy}"`
     - `oldValue`: previous value (string)
     - `newValue`: new value (string)
     - `updatedBy: "SYSTEM"`
     - `updatedDate: "{dd/mm/yyyy}"`
   - Field labels come from `FIELD_LABELS` map (e.g. `brokerName` → "Broker Name", `fcaReference` → "FCA Reference")
3. Tracked fields: `brokerName`, `addressLine1`, `addressLine2`, `town`, `county`, `postcode`, `telephone`, `fax`, `email`, `initials`, `dateChecked`, `fcaReference`, `annuityToba`, `status`, `sentDate`, `grade`, `nextDiaryDate`, `ifaMemberNo`, `brokerManager`, `keyAccount`, `partnerCode`, `region`
4. After successful save, `originalData` is updated to match current form, `isDirty` resets to false
5. Save button shows spinning icon while saving, then returns to floppy disk icon
6. Generated notes appear in the Notes tab (see section 6)

**Associated Contacts Panel:**
- Fixed 350px width sidebar on the right
- Navy header (`bg-[#002f5c]`): "ASSOCIATED CONTACTS" (uppercase, bold, white, tracked)
- Table with 3 columns: Ref, Name, Position
- Sticky header row with light blue bg (`bg-[#eaf5f8]`), blue bottom border
- Alternating row backgrounds; hover highlights row in blue (`bg-[#05579B]`) with white text
- Shows "No contacts found" when broker has no contacts

---

### 1b. Insert IFA Modal (triggered by New IFA button)

```
+========================================+
| Insert IFA                         [X] |  <- Navy header (#002f5c)
+----------------------------------------+
|                                        |
|  Broker Name                           |
|  [________________________________]   |
|                                        |
|  Address                               |
|  ┌────────────────────────────────┐   |
|  │ Line 1                         │   |
|  │ Line 2                         │   |
|  │ Line 3                         │   |
|  └────────────────────────────────┘   |
|                                        |
|  (Town) [______] (County) [______] (Postcode) [______]   <- 3-column grid
|                                        |
|  Telephone           Fax               |
|  [______________]    [______________]  |  <- 2-column, equal width
|                                        |
|  ─────────────────────────────────     |  <- border-t separator
|                  [✓ Ok]  [✕ Cancel]    |  <- right-aligned buttons
+========================================+
```

**Behavior:**
- Modal width: 420px, background: `#f0f0f0`
- Broker Name is required — shows browser `alert()` if empty on OK
- Address: 3 connected inputs (rounded-t on first, rounded-b on last, shared borders)
- Town / County / Postcode: 3-column grid layout (`grid-cols-3 gap-3`)
- Telephone / Fax: 2 equal columns side by side
- Buttons: primary "Ok" (with ✓ icon) and secondary "Cancel" (with ✕ icon), right-aligned below separator
- On OK: creates new broker with `status: "Authorised"`, navigates to it, closes modal
- On Cancel / Escape / backdrop click: closes without action
- All inputs use green focus border (`focus:border-[#178830]`)

---

### 1c. Locate IFA Modal (triggered by Locate IFA button)

```
+============================================+
| Locate IFA                             [X] |  <- Navy header (#00263e)
+--------------------------------------------+
|                                            |
|  [Enter IFA reference..._____________]    |  <- auto-focused text input
|                                            |
|  +--------------------------------------+  |
|  | IFA Ref  | Broker Name   | Postcode  |  |  <- shown only after search
|  |----------|---------------|-----------|  |
|  | AGEPA-003| Age Partner.. | LS15 8ZB  |  |  <- click row to select
|  | BKBFL-001| Baker & Sons  | SW1A 1AA  |  |
|  +--------------------------------------+  |
|                                            |
|                  [🔍 Find]  [✕ Quit]       |  <- right-aligned buttons
+============================================+
```

**Behavior:**
- Modal width: 480px, background: `#f0f0f0`
- Single search input, auto-focused on open
- Press Enter or click [Find] to submit search (Find disabled when input empty)
- Searches brokers by IFA reference (partial match, case-insensitive)
- Results table appears only after a search is submitted:
  - 3 columns: IFA Ref (blue, bold), Broker Name, Postcode
  - Max height 200px with scroll
  - Alternating row colours; hover highlights in blue (`bg-[#05579B]`)
  - Click any row → selects that broker and closes modal immediately
  - "Searching..." shown while loading; "No records found." if empty
- [Quit] / Escape / backdrop click: closes without action

---

### 1d. Lookup IFA Modal (triggered by Search/Lookup IFA button)

```
+================================================================================+
| IFA Lookup                                                                 [X] |  <- Navy header (#002f5c)
+--------------------------------------------------------------------------------+
|                                                                                |
|  IFA Ref [________]  Postcode [________]  Broker Name [________]  [x] Authorised   [✓ OK ]  |
|                                                                   [ ] Cancelled    [✕ Cancel] |
|                                                                   [ ] Duplicate Rec [+ New ] |
|                                                                   [ ] Revoked                |
|  +--------------------------------------------------------------------------+  |
|  | IFA_REF       | POST_CODE    | BROKER_NAME                              |  |
|  |---------------|--------------|------------------------------------------|  |
|  | AGEPA-003     | LS15 8ZB     | Age Partnership                         |  |  <- click to select, dblclick to select+close
|  | BKBFL-001     | SW1A 1AA     | Baker & Sons                            |  |
|  | HLXPN-004     | M1 4BT       | Halifax Pension Fund                    |  |
|  +--------------------------------------------------------------------------+  |
|                                                                                |
|  +== AMENDABLE DETAILS ====================================================+  |
|  |  Address [2200 Century Way ]         SIB No        [__________]         |  |
|  |          [Thorpe Park      ]         Authorised By [__________]         |  |
|  |          [Leeds             ]         Authorised On [__________]         |  |
|  |          [West Yorkshire    ]         IFA Portfolio  [ ]                 |  |
|  |  Post Code [LS15 8ZB       ]                                            |  |
|  +=========================================================================+  |
+================================================================================+
```

**Behavior:**
- Modal width: 780px, max height: 85vh, background: `#f0f0f0`
- **Filter row** across the top:
  - 3 text inputs: IFA Ref, Postcode, Broker Name (all live-filter as you type, case-insensitive partial match)
  - 4 status checkboxes: Authorised (checked by default), Cancelled, Duplicate Record, Revoked
  - 3 action buttons stacked vertically: OK (primary, disabled until row selected), Cancel (secondary), New (secondary, opens Insert IFA modal)
- **Results table**: 3 columns (IFA_REF, POST_CODE, BROKER_NAME)
  - Min height 180px, max height 280px with scroll
  - Single-click selects a row (highlighted in blue `bg-[#05579B]`); double-click selects and closes
  - Alternating row backgrounds; sticky header with light blue bg
- **Amendable Details** fieldset below the table:
  - Read-only fields showing the selected broker's details
  - Left column: Address (4 lines: addressLine1, addressLine2, town, county), Post Code
  - Right column: SIB No, Authorised By, Authorised On, IFA Portfolio (checkbox)
  - All fields disabled with grey background (`bg-[#CCCCCC]`, `border-[#ACACAC]`)
- [New] button closes the Lookup modal and opens the Insert IFA modal
- Escape / backdrop click / Cancel: closes without action

---

### 1e. Notes Tab — System-Generated Audit Notes

```
+--------------------------------------------------------------------------------------------+
|                                                                                            |
|  ┌────┬──────────────────────────────────────────────────────────────────────┐              |
|  │ S  │  NPA : Grade updated by SYSTEM                                     │              |
|  │ Y  │                                                                     │              |
|  │ S  │  OLD VALUE  : National Accounts                                    │              |
|  │    │  NEW VALUE  : Major Accounts                                       │              |
|  └────┴──────────────────────────────────────────────────────────────────────┘              |
|                                                                                            |
|  ┌────┬──────────────────────────────────────────────────────────────────────┐              |
|  │ U  │  Called broker to discuss terms — follow up next week               │              |
|  │ S  │                                                                     │              |
|  │ R  │                                                                     │              |
|  └────┴──────────────────────────────────────────────────────────────────────┘              |
|                                                                                            |
|  ┌─────────────────────────────────────────────────────────────────────────────┐            |
|  │  (empty grey placeholder row)                                              │            |
|  └─────────────────────────────────────────────────────────────────────────────┘            |
|                                                                                            |
+--------------------------------------------------------------------------------------------+
```

**Note Card Layout:**
- Each note rendered as a horizontal card with border and rounded corners
- Left strip (40px): light blue background (`bg-[#eaf5f8]`) with note type letters stacked vertically ("SYS" or "USR"), bold navy text
- Right body: padding 16px horizontal, 12px vertical, minimum height 80px
  - First line (bold, navy): optional label prefix (e.g. "NPA :") followed by description text
  - If `oldValue`/`newValue` exist: shown below in 2 rows, each with bold fixed-width (100px) label ("OLD VALUE" / "NEW VALUE") followed by ": {value}"
- Empty placeholder rows: grey background (`bg-[#d8d8d8]`), 60px min height, fills up to 6 total rows

**Note Interface:**
```
Note {
  id: number
  brokerId: number
  noteType: "SYS" | "USR"
  description: string
  oldValue?: string        // only on SYS notes from save
  newValue?: string        // only on SYS notes from save
  updatedBy?: string       // e.g. "SYSTEM", "JSMITH"
  updatedDate?: string     // e.g. "14/11/2005"
  label?: string           // e.g. "NPA", "PIPA", "PRP"
}
```

**Note Types:**
- **SYS** notes: system-generated when fields are saved (see Save Flow above). Always have `oldValue`/`newValue`. Labels like "NPA", "PIPA", "PRP" rendered inline before description
- **USR** notes: user-entered notes with free-text description. No old/new values. No "Add Note" button (notes are system-generated only)
- Seed data includes 31 pre-populated notes across all 6 brokers, mixing SYS and USR types
- Old/new values pattern in seed data: always `"0"` vs a digit `"1"–"9"` for SYS notes; USR notes have no old/new values

---

## 2. CONTACTS TAB

```
+--------------------------------------------------------------------------------------------+
|  Contact 1 of 2  [<] [>]                                    [Add New]  [Save Contact]      |
+--------------------------------------------------------------------------------------------+
|                                                                                            |
|  LEFT COLUMN                              |  RIGHT COLUMN                                  |
|                                           |                                                |
|  +== PERSONAL DETAILS =================+ |  +== IFA BANK DETAIL ================+         |
|  |     Reference  [001_____________]    | |  |  Paid By BACS  (o) Yes  (o) No   |         |
|  |   Title [Mr v] Initials [RG]         | |  |  Bank Sort Code [_____________]  |         |
|  |      Forename  [Robert__________]    | |  |  Bank Account No [____________]  |         |
|  |       Surname  [Green___________]    | |  |  Bank Acct Name  [____________]  |         |
|  |    Salutation  [Mr Green________]    | |  |  Bank Reference  [____________]  |         |
|  |      Position  [Director________]    | |  +===================================+         |
|  +======================================+ |                                                |
|                                           |  +== NETWORK RELATED DETAIL ========+          |
|  +== CONTACT INFORMATION ==============+ |  |  [x] Use terms from principal..  |          |
|  |  Address Line 1 [__________________]| |  |  Default Advice Type [_______v]  |          |
|  |  Address Line 2 [__________________]| |  |  Remuneration Basis  [_______v]  |          |
|  |  Address Line 3 [__________________]| |  |  Distribution Channel [______]   |          |
|  |  Address Line 4 [__________________]| |  |                                  |          |
|  |  ──────────────────────────────────  | |  |  Network  (o) Y (o) N  Restricted [v]      |
|  |      Home Tel   [__________________]| |  |  Tied Agt (o) Y (o) N  Simplified [v]      |
|  |    Mobile Tel   [__________________]| |  |  Principal(o) Y (o) N  Non Advsd  [v]      |
|  |         Email   [__________________]| |  +===================================+         |
|  +======================================+ |                                                |
|                                           |  +== IFA MEMBER DETAIL =============+         |
|                                           |  |  Network IFA  [____________] [Q] |         |
|                                           |  |  Network Name [____________]     |         |
|                                           |  |      Postcode [____________]     |         |
|                                           |  +===================================+         |
|                                           |                                                |
|                                           |  +== NETWORK MEMBERS ===============+         |
|                                           |  | IFA Ref | Broker Name | Post Code|         |
|                                           |  |---------|-------------|----------|         |
|                                           |  | (No network members)             |         |
|                                           |  +===================================+         |
|                                           |                                                |
|                                           |  +== PRINCIPAL AGENT ===============+         |
|                                           |  | Principal Agent Ref [______] [Q] [Clr]     |
|                                           |  +===================================+         |
+--------------------------------------------------------------------------------------------+
```

**Behavior:**
- Contact navigation: [<] [>] arrows cycle through contacts for the active broker
- Network IFA [Q] search button opens the IFA Network Lookup modal (see 2a)
- On selecting a network IFA, the Network Name and Postcode fields auto-fill (read-only, grey background)
- Network overrides reset when switching contacts
- [Add New] / [Save Contact] buttons (stub)
- "Please select a broker first" placeholder if no broker active

---

### 2a. IFA Network Lookup Modal (triggered by Network IFA search button)

```
+================================================================+
| IFA Network Lookup                                         [X] |
+----------------------------------------------------------------+
|  IFA Ref.          Postcode          Broker Name               |
|  [____________]    [____________]    [____________]             |
+----------------------------------------------------------------+
|  [OK]  [Cancel]                                                |
+----------------------------------------------------------------+
|  IFA_REF     | POST_CODE  | BROKER_NAME                       |
|  ------------|------------|----------------------------        |
|  A G S-001   | HP4 3QZ    | AF                                |
|  B K L-002   | SW1A 1AA   | Baker Ltd                         |
|  C D E-003   | EC1A 1BB   | Charles & Co                      |
|  ...         | ...        | ...                                |
+----------------------------------------------------------------+
|  13 records found — click to select, double-click to confirm   |
+================================================================+
```

**Behavior:**
- Live filtering: typing in IFA Ref / Postcode / Broker Name filters the table in real-time
- Single click selects a row (highlighted in blue)
- Double-click selects and confirms immediately
- [OK] confirms selection — fills Network IFA, Network Name, Postcode on the Contacts form
- [OK] disabled until a row is selected
- [Cancel] / Escape / backdrop click: closes without action

---

## 3. LOOKUPS TAB

```
+--------------------------------------------------------------------------------------------+
|  +== SEARCH CRITERIA ====================================================================+ |
|  |  Postcode       IFA Reference    IFA Name           Status                            | |
|  |  [__________]   [__________]     [______________]   [Authorised  v]  [Search] [Club]  | |
|  +=========================================================================================+
|                                                                                            |
|  +========================================================================================+
|  | SEARCH RESULTS (13)                          Click a row to view details               |
|  +----------------------------------------------------------------------------------------+
|  | IFA_REF | BROKER_NO | FIMBRA_NO | BROKER_NAME | BUILDING | NO_STREET | ... (75 cols)  |
|  |---------|-----------|-----------|-------------|----------|-----------|                 |
|  | A G S-001| 1001     |           | AF          | 5 Eaton  | Bray Road | ...            |
|  | B K L-002| 1002     |           | Baker Ltd   | 10 High  | Street    | ...            |
|  | ...     | ...       | ...       | ...         | ...      | ...       | ...            |
|  +========================================================================================+
```

**Behavior:**
- Search filters: Postcode, IFA Reference, IFA Name (text), Status (dropdown)
- [Search] executes the search with current filter values
- [Club] opens the Club modal (see 3a)
- Results table: horizontally scrollable, 75 columns covering all broker fields
- Click any row to navigate to that broker (sets active broker ID, switches to IFA Detail)
- IFA_REF column is styled as a blue underlined link

---

### 3a. Club Modal (triggered by [Club] button)

```
+======================================================+
| Add / Search Clubs                               [X] |
+------------------------------------------------------+
|  Club Name          Club Reference    Post Code      |
|  [______________]   [____________]    [________]     |
+------------------------------------------------------+
|  Club Name                | Club Ref   | Post | Act  |
|  -------------------------|------------|------|----  |
|  Advise Wise Mortgage Club| MC201491   |LS15..|Yes   |
|  Advise Wise Plus Mort... | MC201493   |LS15..|Yes   |
|  Air Mortgage Club        | ER200411   |GL1.. |Yes   |
|  Air Platinum Club        | ER200971   |GL1.. |Yes   |
|  ...                      | ...        | ...  | ...  |
+------------------------------------------------------+
|                          [New]  [Edit]  [Cancel]     |
+======================================================+
```

**Behavior:**
- Live filtering by Club Name, Club Reference, Post Code
- Single click selects row (blue highlight)
- Double-click closes the modal
- [New] / [Edit] buttons (stubs)
- [Cancel] / Escape / backdrop click: closes

---

## 4. RETIREMENT INCOME TAB

```
+--------------------------------------------------------------------------------------------+
|  +-- Retirement Income Commission & Fee Configuration --+                                  |
+--------------------------------------------------------------------------------------------+
|                                                                                            |
|  +== NON PROFIT ANNUITY ===============================================================+  |
|  |  Default adviser charges %  [____]  | Expense Discount     [____] |                 |  |
|  |  Amount                     [____]  | Marketing allowance  [____] | [+ Advice Type] |  |
|  |  Default Commission %       [____]  |                             | [+ Special deals]|  |
|  +=====================================================================================+  |
|                                                                                            |
|  +== PIPA ============================================================================+   |
|  |  Default adviser charges %  [____]  | Expense Discount     [____] |                 |  |
|  |  Amount                     [____]  | Marketing allowance  [____] | [+ Advice Type] |  |
|  |  Default Commission %       [____]  |                             | [+ Special deals]|  |
|  +=====================================================================================+  |
|                                                                                            |
|  +== PRP ==============================================================================+  |
|  |  Default adviser charges %  [____]  | Expense Discount     [____] |                 |  |
|  |  Amount                     [____]  | Marketing allowance  [____] | [+ Advice Type] |  |
|  |  Default Commission %       [____]  |                             | [+ Special deals]|  |
|  +=====================================================================================+  |
|                                                                                            |
|                                                               [Save Configuration]         |
+--------------------------------------------------------------------------------------------+
```

**Behavior:**
- Banner at top: "Retirement Income Commission & Fee Configuration"
- Three identical product sections: Non Profit Annuity, PIPA, PRP
- Each section has a 3-column layout:
  - Col 1: Default adviser charges %, Amount, Default Commission %
  - Col 2: Expense Discount, Marketing allowance
  - Col 3: Two action buttons (Advice Type/Distribution Channel pricing, Special deals)
- [Save Configuration] button at bottom right
- "Please select a broker first" placeholder if no broker active

---

## 5. EQUITY RELEASE TAB

```
+--------------------------------------------------------------------------------------------+
|                                                                                            |
|  LEFT COLUMN                                   |  RIGHT COLUMN                             |
|                                                |                                           |
|  +== PERMISSIONS ========================+     |  +== CLUB MEMBERSHIP ===============+    |
|  |  Mortgage Permissions  (o) Yes (o) No |     |  | Name              | Ref           |    |
|  |  ERLM TOBA            (o) Yes (o) No |     |  |-------------------|---------------|    |
|  +========================================+     |  | (No memberships)                 |    |
|                                                |  +-----------------------------------+    |
|                                                |  [Add] [Edit] [View] [Remove]             |
|                                                |                                           |
|  +== FLEXIBLE COMMISSION ===============+      |  +== LUMP SUM COMMISSION ============+   |
|  |    Broker Rate     [_________]       |      |  |    Broker Rate     [_________]     |   |
|  |  Minimum Amount    [_________]       |      |  |  Minimum Amount    [_________]     |   |
|  |   Network Rate     [_________]       |      |  |   Network Rate     [_________]     |   |
|  |  [x] Trail Commission               |      |  +=====================================+   |
|  +======================================+      |                                           |
|                                                |  +== LUMP SUM SPECIAL DEALS ==========+  |
|  +== FLEXIBLE SPECIAL DEALS (AGE BANDS)=+     |  | Age Band|Excl%|(+/-)|Disc%|CashBack|  |
|  | Age Band|Excl%|(+/-)|Disc%|CashBack  |     |  |---------|-----|-----|-----|--------|  |
|  |---------|-----|-----|-----|---------- |     |  | 60-65   |[   ]|[ ]  |[   ]|[     ] |  |
|  | 60-65   |[   ]|[ ]  |[   ]|[     ]  |     |  | 66-70   |[   ]|[ ]  |[   ]|[     ] |  |
|  | 66-70   |[   ]|[ ]  |[   ]|[     ]  |     |  | 71-75   |[   ]|[ ]  |[   ]|[     ] |  |
|  | 71-75   |[   ]|[ ]  |[   ]|[     ]  |     |  | 76-80   |[   ]|[ ]  |[   ]|[     ] |  |
|  | 76-80   |[   ]|[ ]  |[   ]|[     ]  |     |  | 81-85   |[   ]|[ ]  |[   ]|[     ] |  |
|  | 81-85   |[   ]|[ ]  |[   ]|[     ]  |     |  | 86-90   |[   ]|[ ]  |[   ]|[     ] |  |
|  | 86-90   |[   ]|[ ]  |[   ]|[     ]  |     |  | 91+     |[   ]|[ ]  |[   ]|[     ] |  |
|  | 91+     |[   ]|[ ]  |[   ]|[     ]  |     |  +=========================================+
|  +======================================+      |                                           |
|                                                |  +== LUMP SUM VALUATION ==============+  |
|  +== FLEXIBLE VALUATION ================+      |  |  [x] Free Up to: [___] or [______] |  |
|  |  [x] Free Up to: [___] or [______]  |      |  |  [x] Fee discount: [___]            |  |
|  |  [x] Fee discount: [___]            |      |  |  [x] Refund discount/fee on compl.  |  |
|  |  [x] Refund discount/fee on compl.  |      |  |  [x] Reduce fees upfront            |  |
|  |  [x] Reduce fees upfront            |      |  +=====================================+  |
|  +======================================+      |                                           |
|                                                |  +== LUMP SUM FEES ==================+   |
|  +== FLEXIBLE FEES =====================+      |  |   Packaging Fee   [_________]      |   |
|  |   Packaging Fee   [_________]        |      |  | Application Fee   [_________]      |   |
|  | Application Fee   [_________]        |      |  |   LTV % (+ or -)  [_________]      |   |
|  |   LTV % (+ or -)  [_________]        |      |  +=====================================+  |
|  +======================================+      |                                           |
+--------------------------------------------------------------------------------------------+
```

**Behavior:**
- Two-column symmetrical layout: Flexible (left) vs Lump Sum (right)
- Top row: Permissions (left) and Club Membership table (right) with Add/Edit/View/Remove buttons
- Age Band tables: 7 rows (60-65 through 91+), each with Exclusive %, (+/-) checkbox, Discounted %, Cash Back
- Valuation sections: checkboxes with associated amount inputs
- Fees sections: Packaging Fee, Application Fee, LTV %
- Flexible Commission has an extra "Trail Commission" checkbox
- "Please select a broker first" placeholder if no broker active

---

## 6. NOTES TAB

```
+--------------------------------------------------------------------------------------------+
|  [History icon] Audit Trail & Notes                                          [Add Note]    |
+--------------------------------------------------------------------------------------------+
|                                                                                            |
|  +========================================================================================+
|  |     |                                                                                  |
|  | SYS | Broker Name updated by SYSTEM on 15/01/2024                                     |
|  |     | OLD VALUE : AF Holdings                                                         |
|  |     | NEW VALUE : AF                                                                   |
|  |     |                                                                                  |
|  |-----|--------------------------------------------------------------------------------|
|  |     |                                                                                  |
|  | SYS | Status updated by SYSTEM on 15/01/2024                                         |
|  |     | OLD VALUE : Cancelled                                                           |
|  |     | NEW VALUE : Authorised                                                          |
|  |     |                                                                                  |
|  |-----|--------------------------------------------------------------------------------|
|  |     |                                                                                  |
|  | SYS | Grade updated by SYSTEM on 10/01/2024                                          |
|  |     | OLD VALUE : Standard                                                            |
|  |     | NEW VALUE : National Accounts                                                   |
|  |     |                                                                                  |
|  +========================================================================================+
|                                                                                            |
+--------------------------------------------------------------------------------------------+
```

**Behavior:**
- Header: "Audit Trail & Notes" with history icon, [Add Note] button (right)
- Note list: vertical scrollable list, each entry is a card-like row
- Left gutter: note type badge displayed vertically (e.g. "SYS")
- Note body: description text, followed by OLD VALUE / NEW VALUE when applicable
- Notes are auto-created when fields are saved on the IFA Detail tab
- Rows have hover highlight
- "No notes found for this record" placeholder when empty
- "Please select a broker first" placeholder if no broker active
