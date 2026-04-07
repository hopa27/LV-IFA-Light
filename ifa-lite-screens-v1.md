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
| |Broker: A G S-001 | [Appointment v] | [|<] [<] 1 of 13 [>] [>|] | [New IFA] [Locate IFA] | [Save Changes] |
+--------------------------------------------------------------------------------------------+
|                                                                                            |
|  GENERAL INFORMATION                                                                       |
|  ______________________________________________________________________________________    |
|                                                                                            |
|  LEFT COLUMN                              |  RIGHT COLUMN                                  |
|  ─────────────────────────────────────────|──────────────────────────────────────────────── |
|       Broker Name  [________________]     |    Trading Name  [________________]             |
|    Address Line 1  [________________]     |   FCA Reference  [________________]             |
|    Address Line 2  [________________]     |   Annuity TOBA   (o) Yes  (o) No               |
|             Town   [________________]     |         Status   [Authorised      v]            |
|           County   [________________]     |      Sent Date   [________________]             |
|         Postcode   [________________]     |          Grade   [National Accts  v]            |
|        Telephone   [________________]     | Next Diary Date  [________________]             |
|              Fax   [________________]     |  IFA Member No   [________________]             |
|            Email   [________________]     | Broker Manager   [Keith Harvey    v]            |
|         Initials   [________________]     |    Key Account   [-- Select --    v]            |
|     Date Checked   [________________]     |   Partner Code   [________________]             |
|                                           |         Region   [-- Select --    v]            |
|  ─────────────────────────────────────────|────────────────────────────────────────────     |
|  Created By: SYSTEM on 01/01/2020         |  Amended By: — on —                            |
|  ─────────────────────────────────────────|────────────────────────────────────────────     |
|                                                                                            |
|                                           |  +================================+            |
|                                           |  | ASSOCIATED CONTACTS            |            |
|                                           |  +--------------------------------+            |
|                                           |  | Ref  | Name          | Position|            |
|                                           |  |------|---------------|---------|            |
|                                           |  | 001  | Mr RG Green   | Director|            |
|                                           |  | 002  | Mrs LG Green  | Compl.. |            |
|                                           |  +================================+            |
+--------------------------------------------------------------------------------------------+
```

**Toolbar Behavior (IFA Detail tab only):**
- Broker reference badge with blue accent bar
- Combobox dropdown: Appointment / Broker Pack Follow Up / Duplicate / Hold
- Navigation: First / Prev / "N of M" / Next / Last (circular pill buttons)
- [New IFA] opens Insert IFA modal (see 1b)
- [Locate IFA] opens Locate IFA modal (see 1c)
- [Save Changes] enabled only when form has unsaved edits; saves in-memory + creates audit note

**Form Behavior:**
- Two-column grid layout
- All fields are editable text inputs or dropdowns
- On save, changed fields generate system notes visible in the Notes tab
- "No Broker Selected" placeholder shown if no broker is active

---

### 1b. Insert IFA Modal (triggered by [New IFA])

```
+========================================+
| Insert IFA                         [X] |
+----------------------------------------+
|                                        |
|  Broker Name                           |
|  [________________________________]   |
|                                        |
|  [________________________________]   |  <- Address Line 1
|  [________________________________]   |  <- Address Line 2
|                                        |
|                   (Town)  [________]   |
|                 (County)  [________]   |
|               (Postcode)  [________]   |
|                                        |
|  Telephone         Fax                 |
|  [______________]  [______________]    |
|                                        |
|  ─────────────────────────────────     |
|                      [Ok]  [Cancel]    |
+========================================+
```

**Behavior:**
- Broker Name is required — shows alert if empty on OK
- On OK: creates new broker with status "Authorised", navigates to it, closes modal
- On Cancel / Escape / backdrop click: closes without action

---

### 1c. Locate IFA Modal (triggered by [Locate IFA])

```
+============================================+
| Locate IFA                             [X] |
+--------------------------------------------+
|                                            |
|  [Enter IFA reference..._______________]   |
|                                            |
|  +--------------------------------------+  |
|  | IFA Ref  | Broker Name   | Postcode  |  |  <- shown after search
|  |----------|---------------|-----------|  |
|  | A G S-001| AF            | HP4 3QZ   |  |
|  | B K L-002| Baker Ltd     | SW1A 1AA  |  |
|  +--------------------------------------+  |
|                                            |
|                       [Find]  [Quit]       |
+============================================+
```

**Behavior:**
- Type IFA reference, press Enter or click [Find] to search
- Results table shown only after a search is submitted
- Click any row to select that broker and close the modal
- [Quit] / Escape / backdrop click: closes without action

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
