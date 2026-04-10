# IFA Lite — Screen Flow (ASCII Layout)

---

## Application Shell

```
+============================================================================================+
| [LV= Logo]                                                                      [ Logout ] |
|--------------------------------------------------------------------------------------------|
| IFA Lite                                                                                   |
+============================================================================================+
| +-------------+ +----------+ +---------+ +-------------------+ +----------------+ +------+ |
| | IFA Detail  | | Contacts | | Lookups | | Retirement Income | | Equity Release | | Notes| |
| +-------------+ +----------+ +---------+ +-------------------+ +----------------+ +------+ |
|--------------------------------------------------------------------------------------------|
|                                                                                            |
|                            << ACTIVE TAB CONTENT HERE >>                                   |
|                                                                                            |
+============================================================================================+
| [LV= Logo]                    Liverpool Victoria Financial Services Limited                |
|                                County Gates, Bournemouth BH1 2NF                           |
+============================================================================================+
```

---

## TAB 1: IFA Detail

```
+============================================================================================+
| TABS: [*IFA Detail*] [Contacts] [Lookups] [Retirement Income] [Equity Release] [Notes]     |
+============================================================================================+
| TOOLBAR (sticky)                                                                           |
| +----------------------------------------------------------------------------------------+ |
| | |  Broker: AGEPA-003  | [v Appointment   ] | |<< | < | 1 of 6 | > | >>| |             | |
| |                                                           [+New] [Locate] [Search] | [S]| |
| +----------------------------------------------------------------------------------------+ |
|                                                                                            |
| FORM (2-column grid)                                    ASSOCIATED CONTACTS (right panel)  |
| +--------------------------------------------------+   +--------------------------------+ |
| |                                                    |   | ASSOCIATED CONTACTS            | |
| |  Broker Name  [___________________________]       |   |--------------------------------| |
| |                                                    |   | Ref  | Name       | Position   | |
| |       Address  [_Line 1____________________]       |   |------|------------|------------| |
| |                [_Line 2____________________]       |   | 001  | Mr J Smith | Director   | |
| |                [_Line 3____________________]       |   | 002  | Mrs A Doe  | Manager    | |
| |                                                    |   |      |            |            | |
| |          Town  [___________________________]       |   |      |            |            | |
| |        County  [___________________________]       |   |      |            |            | |
| |      Postcode  [___________________________]       |   |      |            |            | |
| |     Telephone  [___________________________]       |   |      |            |            | |
| |    Fax Number  [___________________________]       |   |      |            |            | |
| | Email Address  [___________________________]       |   |      |            |            | |
| |      Initials  [___________________________]       |   |      |            |            | |
| |  Date Checked  [___________________________]       |   |      |            |            | |
| |                                                    |   +--------------------------------+ |
| | RIGHT COLUMN:                                      |                                     |
| |  FCA Reference  [_________________________]       |                                     |
| |   Annuity TOBA  ( ) Yes  ( ) No                   |                                     |
| |         Status  [v Authorised              ]       |                                     |
| |      Sent Date  [_________________________]       |                                     |
| |          Grade  [v -- Select --            ]       |                                     |
| | Next Diary Date [_________________________]       |                                     |
| | IFA Member No.  [_________________________]       |                                     |
| | Broker Manager  [v -- Select --            ]       |                                     |
| |    Key Account  [v                         ]       |                                     |
| |   Partner Code  [_________________________]       |                                     |
| |         Region  [v -- Select --            ]       |                                     |
| +--------------------------------------------------+                                      |
| -------- separator --------                                                                |
| | Created By  [LORDXT_________] | Created Date [14/11/2005 10:33:21] |                     |
| | Amended By  [________________] | Amended Date [___________________] |                     |
+============================================================================================+
```

### No Broker Selected State (IFA Detail)

```
+============================================================================================+
| TABS: [*IFA Detail*] [Contacts] [Lookups] [Retirement Income] [Equity Release] [Notes]     |
+============================================================================================+
| +----------------------------------------------------------------------------------------+ |
| |                                                                                        | |
| |        - - - - - - - - - - - - - - - - - - - - - - - - - - - - -                      | |
| |       |                                                           |                     | |
| |       |                     (!) Warning Icon                      |                     | |
| |       |                                                           |                     | |
| |       |                  No Broker Selected                       |                     | |
| |       |        Please select a broker from the Lookups tab first. |                     | |
| |       |                                                           |                     | |
| |        - - - - - - - - - - - - - - - - - - - - - - - - - - - - -                      | |
| +----------------------------------------------------------------------------------------+ |
+============================================================================================+
```

---

## TAB 2: Contacts

```
+============================================================================================+
| TABS: [IFA Detail] [*Contacts*] [Lookups] [Retirement Income] [Equity Release] [Notes]     |
+============================================================================================+
| TOOLBAR (sticky)                                                                           |
| +----------------------------------------------------------------------------------------+ |
| | |  Reference: REF-001  |  |<< | < | 1 of 3 | > | >>|               [ + Add New ]      | |
| +----------------------------------------------------------------------------------------+ |
|                                                                                            |
| LEFT COLUMN (sticky)                        RIGHT COLUMN (scrollable)                      |
| +-------------------------------------+   +--------------------------------------------+  |
| | 4-column grid:                       |   |                                            |  |
| |    Title [v Mr   ]  Initials [JT___] |   | +-- IFA Bank Detail ----+                 |  |
| | Forename [John___]  Surname  [Smith] |   | | Paid By BACS  ( )Yes ( )No              |  |
| |Salutation[Mr Smit]  Position [Dir__] |   | | Bank Sort Code  [_________]             |  |
| |                                       |   | | Bank Account No [_________]             |  |
| |  Address [_Line 1__________________] |   | | Bank Acct Name  [_________]             |  |
| |          [_Line 2__________________] |   | | Bank Reference  [_________]             |  |
| |          [_Line 3__________________] |   | +----------------------------------------+  |
| |          [_Line 4__________________] |   |                                            |  |
| |          [_Line 5__________________] |   | +-- Network Related Detail --+             |  |
| |          [_Line 6__________________] |   | |          [x] Use terms from principal    |  |
| |                                       |   | |                    agent/network        |  |
| |  Home Tel [________] Mobile [______] |   | |                                         |  |
| |                                       |   | | Network         ( ) Y  ( ) N           |  |
| |    Email Address [_________________] |   | | Default Advice Type [v Independent ]    |  |
| +-------------------------------------+   | | Default Remuneration [v Commission ]    |  |
|                                             | |                                         |  |
|                                             | | Default Distribution Channel            |  |
|                                             | |   Restricted Advice [v_______]          |  |
|                                             | |   Simplified Advice [v_______]          |  |
|                                             | |   Non Advised       [v_______]          |  |
|                                             | |                                         |  |
|                                             | | +-- IFA Member Detail -------+          |  |
|                                             | | | Network IFA [________] (O) |          |  |
|                                             | | | Network Name [========]    |          |  |
|                                             | | | Postcode     [========]    |          |  |
|                                             | | |    +-- Tied Agent --+      |          |  |
|                                             | | |    | ( )Yes ( )No   |      |          |  |
|                                             | | |    +----------------+      |          |  |
|                                             | | +----------------------------+          |  |
|                                             | |                                         |  |
|                                             | | +-- Network Members ---------+          |  |
|                                             | | | IFA Ref | Broker Name | Post Code |  |  |
|                                             | | |---------+-------------+-----------|  |  |
|                                             | | | No network members                |  |  |
|                                             | | +-----------------------------------+  |  |
|                                             | |                                         |  |
|                                             | | Principal Agent Ref [______] (O) [Clr] |  |
|                                             | | Principal      ( ) N  ( ) Y            |  |
|                                             | +----------------------------------------+  |
|                                             |                                            |  |
|                                             | +-- Quote Terms -----+                    |  |
|                                             | |  Best rate required for all quotes >=:  |  |
|                                             | |  Internal / LV.com  [0_____]           |  |
|                                             | |  Portals            [0_____]           |  |
|                                             | +----------------------------------------+  |
|                                             +--------------------------------------------+  |
+============================================================================================+
```

Legend:
- `(O)` = circular Search button
- `[Clr]` = circular Clear button
- `[========]` = read-only greyed-out field

---

## TAB 3: Lookups

```
+============================================================================================+
| TABS: [IFA Detail] [Contacts] [*Lookups*] [Retirement Income] [Equity Release] [Notes]     |
+============================================================================================+
| +-- Search Criteria ------------------------------------------------------------------+    |
| |                                                                                      |    |
| |  Postcode       IFA Reference     IFA Name           Status                          |    |
| |  [__________]   [____________]    [_____________]    [x] Authorised                  |    |
| |                                                      [ ] Cancelled                   |    |
| |                                                      [ ] Duplicate Record            |    |
| |                                                      [ ] Revoked                     |    |
| |                                                                     [Select] [Club]  |    |
| +--------------------------------------------------------------------------------------+    |
|                                                                                            |
| +-- Search Results (6) ----------------------------------------------------------------+   |
| | Click a row to view details                                                           |   |
| |                                                                                       |   |
| | IFA_REF | BROKER_NO | FIMBRA_NO | BROKER_NAME | BUILDING | NO_STREET | ... (75 cols) |   |
| |---------+-----------+-----------+-------------+----------+-----------+----------------|   |
| | AGEPA-003| 12345    |  67890    | Age Partner | 2200 Cen | Century W | ...            |   |
| | SMITH-001| 12346    |  67891    | Smith & Co  | 100 High | High St   | ...            |   |
| | JONES-002| 12347    |  67892    | Jones Ltd   | Unit 5   | Park Ave  | ...            |   |
| | ...      | ...      |  ...      | ...         | ...      | ...       | ...            |   |
| |          |          |           |             |          |           |                 |   |
| +--horizontal scroll -->                                                                |   |
| +---------------------------------------------------------------------------------------+   |
+============================================================================================+
```

---

## TAB 4: Retirement Income

```
+============================================================================================+
| TABS: [IFA Detail] [Contacts] [Lookups] [*Retirement Income*] [Equity Release] [Notes]     |
+============================================================================================+
|                                                                                            |
| +-- Non Profit Annuity -----------------------------------------------------------+        |
| |  Default Adviser      |  Expense Discount    |  [+] Advice Type/Distribution    |        |
| |    Charges % [______] |  [________________]  |      Channel Pricing             |        |
| |  Amount      [______] |  Marketing Allowance |  [+] Special Deals               |        |
| |  Default               |  [________________]  |                                  |        |
| |    Commission % [____] |                      |                                  |        |
| +------------------------------------------------------------------------------+            |
|                                                                                            |
| +-- PIPA -----------------------------------------------------------------+                |
| |  Default Adviser      |  Expense Discount    |  [+] Advice Type/Distribution    |        |
| |    Charges % [______] |  [________________]  |      Channel Pricing             |        |
| |  Amount      [______] |  Marketing Allowance |  [+] Special Deals               |        |
| |  Default               |  [________________]  |                                  |        |
| |    Commission % [____] |                      |                                  |        |
| +------------------------------------------------------------------------------+            |
|                                                                                            |
| +-- PRP ------------------------------------------------------------------+                |
| |  Default Adviser      |  Expense Discount    |  [+] Advice Type/Distribution    |        |
| |    Charges % [______] |  [________________]  |      Channel Pricing             |        |
| |  Amount      [______] |  Marketing Allowance |  [+] Special Deals               |        |
| |  Default               |  [________________]  |                                  |        |
| |    Commission % [____] |                      |                                  |        |
| +------------------------------------------------------------------------------+            |
|                                                                                            |
+============================================================================================+
```

---

## TAB 5: Equity Release

```
+============================================================================================+
| TABS: [IFA Detail] [Contacts] [Lookups] [Retirement Income] [*Equity Release*] [Notes]     |
+============================================================================================+
|                                                                                            |
| +-- Mortgage Permissions? -+ +-- ERLM TOBA? ----------+ +-- Club Membership ----------+   |
| | ( ) Yes    ( ) No        | | ( ) Yes    ( ) No       | | Name         | Ref          |   |
| +--------------------------+ +-------------------------+ | No memberships              |   |
|                                                          | [Add] [Edit] [View] [Remove]|   |
|                                                          +-----------------------------+   |
|                                                                                            |
| +-- Flexible Commission --------------------+ +-- Lump Sum Commission ----------------+   |
| | Broker Rate    [_____]  Min Amount [_____] | | Broker Rate    [_____]  Min Amt [____] |   |
| | Network Rate   [_____]  [x] Trail Comm.   | | Network Rate   [_____]                 |   |
| +--------------------------------------------+ +---------------------------------------+   |
|                                                                                            |
| +-- Special Deals ----------------------------------------------------------------+       |
| | +-- Flexible ----------------------------+ +-- Lump Sum -------------------------+ |     |
| | |                                         | |                                     | |     |
| | | +-- Age Band Details -------+           | | +-- Age Band Details -------+       | |     |
| | | | Age Band |Excl%|+/-|Disc%|CashBk|    | | | Age Band |Excl%|+/-|Disc%|CashBk| | |     |
| | | |----------|-----|---|-----|------|     | | |----------|-----|---|-----|------| | |     |
| | | | 60-65    |[___]|[_]|[___]|[____]|    | | | 60-65    |[___]|[_]|[___]|[____]| | |     |
| | | | 66-70    |[___]|[_]|[___]|[____]|    | | | 66-70    |[___]|[_]|[___]|[____]| | |     |
| | | | 71-75    |[___]|[_]|[___]|[____]|    | | | 71-75    |[___]|[_]|[___]|[____]| | |     |
| | | | 76-80    |[___]|[_]|[___]|[____]|    | | | 76-80    |[___]|[_]|[___]|[____]| | |     |
| | | | 81-85    |[___]|[_]|[___]|[____]|    | | | 81-85    |[___]|[_]|[___]|[____]| | |     |
| | | | 86-90    |[___]|[_]|[___]|[____]|    | | | 86-90    |[___]|[_]|[___]|[____]| | |     |
| | | | 91 +     |[___]|[_]|[___]|[____]|    | | | 91 +     |[___]|[_]|[___]|[____]| | |     |
| | | +-------------------------------+      | | +-------------------------------+   | |     |
| | |                                         | |                                     | |     |
| | | +-- Valuation ----------------+         | | +-- Valuation ----------------+     | |     |
| | | | [x] Free Up to:             |         | | | [x] Free Up to:             |     | |     |
| | | |   Amount [____]             |         | | |   Amount [____]             |     | |     |
| | | |   or Max Property Val [___] |         | | |   or Max Property Val [___] |     | |     |
| | | | [x] Fee discount: [_______] |         | | | [x] Fee discount: [_______] |     | |     |
| | | | [x] Refund discount/fee amt |         | | | [x] Refund discount/fee amt |     | |     |
| | | | [x] Reduce fees upfront     |         | | | [x] Reduce fees upfront     |     | |     |
| | | +------------------------------+        | | +------------------------------+    | |     |
| | |                                         | |                                     | |     |
| | | Packaging Fee    [___________]          | | Packaging Fee    [___________]      | |     |
| | | Application Fee  [___________]          | | Application Fee  [___________]      | |     |
| | | LTV % (+ or -)   [___________]          | | LTV % (+ or -)   [___________]      | |     |
| | +-----------------------------------------+ +-------------------------------------+ |     |
| +--------------------------------------------------------------------------+           |
+============================================================================================+
```

---

## TAB 6: Notes

```
+============================================================================================+
| TABS: [IFA Detail] [Contacts] [Lookups] [Retirement Income] [Equity Release] [*Notes*]     |
+============================================================================================+
|                                                               [ + Add Note ]               |
|                                                                                            |
| +-- Note Card 1 -------------------------------------------------------------------+      |
| | S |  Status updated by SYSTEM on 01/01/2024                                       |      |
| | Y |                                                                                |      |
| | S |  OLD VALUE : Cancelled                                                         |      |
| |   |  NEW VALUE : Authorised                                                        |      |
| +---+--------------------------------------------------------------------------------+     |
|                                                                                            |
| +-- Note Card 2 -------------------------------------------------------------------+      |
| | S |  Broker Name updated by SYSTEM on 15/03/2024                                   |      |
| | Y |                                                                                |      |
| | S |  OLD VALUE : Old Name Ltd                                                      |      |
| |   |  NEW VALUE : Age Partnership                                                   |      |
| +---+--------------------------------------------------------------------------------+     |
|                                                                                            |
| +-- Empty Placeholder -----+                                                              |
| | (greyed out empty slot)   |                                                              |
| +---------------------------+                                                              |
| +-- Empty Placeholder -----+                                                              |
| | (greyed out empty slot)   |                                                              |
| +---------------------------+                                                              |
|                                                                                            |
+============================================================================================+
```

---

## MODAL: Insert IFA (from IFA Detail toolbar -> [+New] button)

```
         +================================================+
         | Insert IFA                               [ X ] |
         |================================================|
         |                                                 |
         |  Broker Name                                    |
         |  [___________________________________________]  |
         |                                                 |
         |  Address                                        |
         |  [_Line 1____________________________________]  |
         |  [_Line 2____________________________________]  |
         |  [_Line 3____________________________________]  |
         |                                                 |
         |  Town           County          Postcode        |
         |  [____________] [____________] [__________]     |
         |                                                 |
         |  Telephone                 Fax                  |
         |  [____________________]    [________________]   |
         |                                                 |
         |  -------- separator --------                    |
         |                                 [ Ok ] [Cancel] |
         +================================================+
```

---

## MODAL: Locate IFA (from IFA Detail toolbar -> [Locate] button)

```
         +================================================+
         | Locate IFA                               [ X ] |
         |================================================|
         |                                                 |
         |  [_Enter IFA reference..._____________________] |
         |                                                 |
         |  +-- Results Table (after search) -----------+  |
         |  | IFA Ref    | Broker Name     | Postcode   |  |
         |  |------------+-----------------+------------|  |
         |  | AGEPA-003  | Age Partnership | LS15 8ZB   |  |
         |  | SMITH-001  | Smith & Co      | EC1A 1BB   |  |
         |  +-------------------------------------------+  |
         |                                                 |
         |                         [ Find ]  [ Quit ]      |
         +================================================+
```

---

## MODAL: Add / Search Clubs (from Lookups -> [Club] button)

```
         +============================================================+
         | Add / Search Clubs                                   [ X ] |
         |============================================================|
         |                                                             |
         |  Club Name         Club Reference      Post Code           |
         |  [______________]  [______________]     [__________]        |
         |                                                             |
         |  +-- Club Table ------------------------------------------+|
         |  | Club Name                | Club Ref   | Post Code | Act ||
         |  |--------------------------+------------+-----------+-----||
         |  | Advise Wise Mortgage Clb | MC201491   | LS15 8ZB  | Yes ||
         |  | Advise Wise Plus Mort Cl | MC201493   | LS15 8ZB  | Yes ||
         |  | Air Mortgage Club        | ER200411   | GL1 1UD   | Yes ||
         |  | Air Platinum Club        | ER200971   | GL1 1UD   | Yes ||
         |  | Bower Special Deal 2013  | MC200750   | CM5 0GA   | Yes ||
         |  | Connect Mortgage Club    | MC200320   | EC2A 4HD  | Yes ||
         |  | ...                      | ...        | ...       | ... ||
         |  +----------------------------------------------------+    |
         |                                                             |
         |                           [ + New ]  [ Edit ]  [ Cancel ]   |
         +============================================================+
```

---

## MODAL: IFA Network Lookup (from Contacts -> Network IFA search button)

```
         +============================================================+
         | IFA Network Lookup                                   [ X ] |
         |============================================================|
         |                                                             |
         |  IFA Ref.           Postcode          Broker Name           |
         |  [______________]   [____________]    [______________]      |
         |                                                             |
         |  [ OK ]  [ Cancel ]                                         |
         |                                                             |
         |  +-- Results Table ----------------------------------------+|
         |  | IFA_REF    | POST_CODE  | BROKER_NAME                   ||
         |  |------------+------------+-------------------------------||
         |  | AGEPA-003  | LS15 8ZB   | Age Partnership               ||
         |  | SMITH-001  | EC1A 1BB   | Smith & Co                    ||
         |  | JONES-002  | SW1A 1AA   | Jones Ltd                     ||
         |  +-----------------------------------------------------+   |
         |                                                             |
         |  6 records found - click to select, double-click to confirm |
         +============================================================+
```

---

## MODAL: Advice Type/Distribution Channel Pricing (from Retirement Income -> [+] button)

```
  +==========================================================================================+
  | Advice Type/Distribution Channel Pricing                                          [ X ]  |
  |==========================================================================================|
  | Product: Non Profit Annuity                                                              |
  |                                                                                          |
  | +-- Scrollable Table (horizontal + vertical) ----------------------------------------+   |
  | |              |               | Expense  | Marketing | Adviser Chg | Adviser | Comm  |  |
  | | (sticky col) | (sticky col)  | Discount | Allowance | Amount      | Chg %   | %     |  |
  | |--------------+---------------+----------+-----------+-------------+---------+-------|  |
  | | Advice Type  | Restricted    | [______] | [_______] | [_________] | [_____] | [___] |  |
  | | Distribution | Whole of Mkt  | [______] | [_______] | [_________] | [_____] | [___] |  |
  | |   Channel    | Tied          | [______] | [_______] | [_________] | [_____] | [___] |  |
  | |              | Multi-tied    | [______] | [_______] | [_________] | [_____] | [___] |  |
  | |---------- separator ----------------------------------------------------------------|  |
  | | Advice Type  | Simplified    | [______] | [_______] | [_________] | [_____] | [___] |  |
  | | Distribution | Whole of Mkt  | [______] | [_______] | [_________] | [_____] | [___] |  |
  | |   Channel    | Tied          | [______] | [_______] | [_________] | [_____] | [___] |  |
  | |              | Multi-tied    | [______] | [_______] | [_________] | [_____] | [___] |  |
  | |---------- separator ----------------------------------------------------------------|  |
  | | Advice Type  | Non advised   | [______] | [_______] | [_________] | [_____] | [___] |  |
  | | Distribution | Whole of Mkt  | [______] | [_______] | [_________] | [_____] | [___] |  |
  | |   Channel    | Tied          | [______] | [_______] | [_________] | [_____] | [___] |  |
  | |              | Multi-tied    | [______] | [_______] | [_________] | [_____] | [___] |  |
  | |---------- separator ----------------------------------------------------------------|  |
  | | Advice Type  | Independent   | [______] | [_______] | [_________] | [_____] | [___] |  |
  | | Distribution | Whole of Mkt  | [______] | [_______] | [_________] | [_____] | [___] |  |
  | |   Channel    | Tied          | [______] | [_______] | [_________] | [_____] | [___] |  |
  | |              | Multi-tied    | [______] | [_______] | [_________] | [_____] | [___] |  |
  | +------------------------------------------------------------------------------------+   |
  |                                                                                          |
  |                              [ Save ]   [ Cancel ]                                       |
  +==========================================================================================+
```

---

## MODAL: Special Deals (from Retirement Income -> [+] Special Deals button)

```
         +============================================================+
         | Special Deals                                        [ X ] |
         |============================================================|
         |                                                             |
         |  Product: Non Profit Annuity                                |
         |                                                             |
         |                     Adjustments                             |
         |                                                             |
         |  +-- Deals Table ----------------------------------------+  |
         |  | Deal Name | Expense  | Marketing  | Start Date | End  |  |
         |  |           | Discount | Allowance  | DD/MM/YYYY | Date |  |
         |  |           |          |            |            | Act  |  |
         |  |-----------+----------+------------+------------+------|  |
         |  |                 No special deals                      |  |
         |  +------------------------------------------------------+  |
         |                                                             |
         |  -------- separator --------                                |
         |          [ Add ]  [ Save ]  [ Edit ]  [ Cancel ]            |
         +============================================================+
```

---

## Navigation Flow Diagram

```
+---------------------+
|    Application       |
|    (Layout Shell)    |
+----------+----------+
           |
           | 6 Tabs
           |
  +--------+--------+--------+--------+--------+--------+
  |        |        |        |        |        |        |
  v        v        v        v        v        v        v
+------+ +------+ +------+ +------+ +------+ +------+
| IFA  | | Con- | | Look-| | Ret. | | Eq.  | | Notes|
| Det. | | tacts| | ups  | | Inc. | | Rel. | |      |
+--+---+ +--+---+ +--+---+ +--+---+ +--+---+ +------+
   |        |        |        |        |
   |        |        |        |        +-- No modals; inline content
   |        |        |        |
   |        |        |        +---> [+] Advice Type Pricing --> MODAL: Pricing Grid
   |        |        |        +---> [+] Special Deals --------> MODAL: Special Deals
   |        |        |
   |        |        +---> [Club] ----> MODAL: Add/Search Clubs
   |        |        +---> [Select] --> Navigates to IFA Detail tab (with broker loaded)
   |        |        +---> Double-click row --> Navigates to IFA Detail tab
   |        |
   |        +---> (O) Network IFA Search --> MODAL: IFA Network Lookup
   |
   +---> [+New]   --> MODAL: Insert IFA
   +---> [Locate] --> MODAL: Locate IFA
   +---> [Search] --> MODAL: Locate IFA (same modal)
   +---> [Save]   --> Saves changes (creates audit notes in Notes tab)
   +---> [<<][<][>][>>] --> Navigate broker records
```

---

## Interaction Behaviours

| Area                   | Behaviour                                                           |
|------------------------|---------------------------------------------------------------------|
| Tab switching          | Click any tab to switch; all share the same layout shell            |
| Broker navigation      | `<<` First, `<` Prev, `>` Next, `>>` Last through all brokers       |
| Lookups row click      | Highlights row (blue); double-click navigates to IFA Detail         |
| Lookups [Select]       | Loads highlighted broker and switches to IFA Detail tab             |
| IFA Detail [Save]      | Persists changes, logs field-level audit trail to Notes tab         |
| Contacts [Add New]     | Placeholder button (not yet wired)                                  |
| Contacts navigation    | `<<` `<` `>` `>>` through contacts for the active broker           |
| Network IFA Search     | Opens lookup modal; click selects, double-click confirms            |
| Club modal             | Filter clubs by name/ref/postcode; click selects row                |
| Pricing modal          | Full grid of editable inputs; sticky left columns; horizontal scroll|
| Notes [Add Note]       | Placeholder button (not yet wired)                                  |
| Dirty state            | Save button enables (blue) when IFA Detail form has unsaved changes |
| Toolbar combobox       | Dropdown: Appointment, Broker Pack Follow Up, Duplicate, Hold       |
