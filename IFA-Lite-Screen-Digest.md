application:
  name: IFA Lite
  version: 1.0.0
  type: Internal Broker/IFA Management Tool
  description: >
    Fully static (no backend database) React/Vite web application for internal users
    to manage brokers/IFAs. Replicates a legacy Citrix-based Windows desktop EXE.
    All data is embedded in-memory via React context (DataStoreProvider).
    Features 6 tabs covering IFA details, contacts, lookups, retirement income,
    equity release, and audit notes.
  tech_stack:
    framework: React 18 + Vite
    styling: Tailwind CSS v4 (inline @theme)
    routing: wouter (single route, tab-based navigation via React context)
    state: React Context (AppProvider + DataStoreProvider)
    data: In-memory seed data (no API/database)
    fonts:
      - name: Livvic
        role: Headings, labels, buttons, tabs (font-sans)
        weights: [400, 500, 600, 700]
      - name: Mulish
        role: Inputs, body text, table data (font-[Mulish])
        weights: [300, 400]
    icons: lucide-react
    components: cmdk (combobox), clsx + tailwind-merge (class merging)
  zoom: "html { zoom: 0.8 }"
  root_height: "calc(100vh / 0.8)"

global_state:
  context: AppContext
  properties:
    activeTab:
      type: TabId
      values: [lookups, ifa-detail, contacts, retirement, equity, notes]
      default: ifa-detail
    activeBrokerId:
      type: "number | null"
      description: Currently selected broker; auto-set to first broker on load
    activeIfaRef:
      type: string
      description: Display label for current broker in toolbar
    isDirty:
      type: boolean
      description: True when IFA Detail form has unsaved changes
    isSaving:
      type: boolean
      description: True during save mutation
    registerSaveHandler:
      description: Callback registration for tab-level save logic
    triggerSave:
      description: Invokes the registered save handler

  data_store: DataStoreProvider
  entities:
    brokers:
      type: Broker[]
      seed_count: 6
      fields: [id, ifaRef, brokerNo, fimbraNo, brokerName, tradingName, addressLine1, addressLine2, town, county, postcode, telephone, fax, email, initials, dateChecked, status, fcaReference, annuityToba, sentDate, grade, nextDiaryDate, ifaMemberNo, brokerManager, keyAccount, partnerCode, region, createdBy, createdDate, amendedBy, amendedDate, building, noStreet, district, city, salutation, classCode, repkey, rsmNo, nextIfaIllRef, sibReference, sibAuthorisationDate, sibInitials, brokerPackSent, brokerPackSentDate, area, nextContactNo, consultant, peverelBroker, paidByBacs, bankSortCode, bankAccountNo, bankAccountName, bankRef, networkIfaReference, ifaCommission, networkCommission, network, memberNumber, plaIfaCommission, plaNetworkCommission, ifaWhen, ifaPortfolio, brokerNameUpper, expense, coCode, ltcCommission, acareCommission, namId, ilaCommission, ilaExpense, ifaIlaCommissionPct, ifaIlaExpensePct, networkIlaCommissionPct, icfpCommission, icfpExpense, networkIcfpCommissionPct]
    contacts:
      type: Contact[]
      seed_count: 0
      fields: [id, brokerId, reference, title, initials, forename, surname, salutation, position, addressLine1-6, homeTelephone, mobileTelephone, emailAddress, paidByBacs, bankSortCode, bankAccountNo, bankAccountName, bankReference, useNetworkTerms, defaultAdviceType, defaultRemunerationBasis, defaultDistributionChannel, network, tiedAgent, isPrincipal, networkIfa, networkName, networkPostcode, principalAgentRef, quoteTermsInternal, quoteTermsPortals]
    notes:
      type: Note[]
      seed_count: 0
      fields: [id, brokerId, noteType, description, oldValue, newValue, updatedBy, updatedDate]
    retirement_income:
      type: RetirementIncome[]
      seed_count: 0
      fields: [id, brokerId, "{prefix}Amount", "{prefix}Commission", "{prefix}ExpenseDiscount", "{prefix}MarketingAllowance"]
      prefixes: [npa, pipa, prp]
    equity_release:
      type: EquityRelease[]
      seed_count: 0
      fields: [id, brokerId, mortgagePermissions, erlmToba, flexibleBrokerRate, flexibleNetworkRate, flexibleMinimumAmount, flexibleTrailCommission, lumpSumBrokerRate, lumpSumNetworkRate, lumpSumMinimumAmount, packagingFee, applicationFee, ltvPercent, lumpSumPackagingFee, lumpSumApplicationFee, lumpSumLtvPercent]

design_tokens:
  colors:
    navy_header: "#00263e"
    navy_dark: "#002f5c"
    primary_blue: "#006cf4"
    button_blue: "#04589b"
    hover_blue: "#003578"
    selected_row: "#05579B"
    green_focus: "#178830"
    border_grey: "#BBBBBB"
    disabled_grey: "#CCCCCC"
    disabled_border: "#ACACAC"
    text_dark: "#3d3d3d"
    text_muted: "#979797"
    bg_page: "#f0f0f0"
    tab_inactive: "#eaf5f8"
    tab_hover: "#dceef3"
    table_header_bg: "#eaf5f8"
    white: "#ffffff"
    error_red: "#d72714"
    link_blue: "#005a9c"
    alt_row: "rgba(231,235,236,0.2)"
  spacing:
    page_horizontal_padding: "142px"
    content_gap: "8px (gap-x-8 = 32px between columns)"
  borders:
    input: "1px solid #BBBBBB"
    input_focus: "2px solid #178830"
    input_radius: "8px (rounded-lg)"
    fieldset: "1px solid #BBBBBB, rounded-lg"
    tab_active_top: "2px solid #006cf4"
    table_header_bottom: "2px solid #04589b"
  buttons:
    primary:
      bg: "#006cf4"
      hover: "#003578"
      text: white
      disabled_bg: "#979797"
      shape: rounded-full
      shadow: shadow-md
    secondary:
      bg: white
      text: "#04589b"
      border: "1px solid #04589b"
      hover_bg: "#003578"
      hover_text: white
      shape: rounded-full
    outline:
      bg: white
      text: "#3d3d3d"
      border: "1px solid #BBBBBB"
      hover_border: "#006cf4"
      hover_text: "#006cf4"
      shape: rounded-full
    circular:
      size: "44px x 44px"
      shape: "rounded-[30px]"
      border: "1px solid #04589b"
      bg: white
      text: "#04589b"
      hover_bg: "#003578"
      hover_text: white
    circular_small:
      size: "28px x 28px (w-7 h-7)"
      shape: "!rounded-full"

global_components:
  header:
    component: Header
    sticky: false
    background: "#00263e"
    padding: "px-[142px] pt-4 pb-6"
    elements:
      left: LV= Logo (h-6 image)
      right: Logout button (primary variant, compact)
      divider: "1px solid slate-600/50"
      title: "IFA Lite" (30px, Livvic, white, tracking-tight)

  tab_bar:
    component: TabBar
    sticky: true (top-0 z-30)
    background: white
    padding: "px-[142px] pt-4"
    tabs:
      - id: ifa-detail
        label: IFA Detail
        icon: FileText
      - id: contacts
        label: Contacts
        icon: Users
      - id: lookups
        label: Lookups
        icon: Search
      - id: retirement
        label: Retirement Income
        icon: Briefcase
      - id: equity
        label: Equity Release
        icon: Home
      - id: notes
        label: Notes
        icon: Database
    tab_style:
      active:
        bg: white
        text: "#4a4a49"
        border_top: "2px solid #006cf4"
        border_sides: "1px solid #BBBBBB"
        shadow: "0 -2px 8px rgba(0,0,0,0.08)"
        icon_color: "#006cf4"
      inactive:
        bg: "#eaf5f8"
        text: "#0d2c41"
        hover_bg: "#dceef3"
        icon_color: "rgba(13,44,65,0.6)"
      min_width: 140px
      padding: "px-6 py-3"
      font: "15px semibold font-sans"
      shape: rounded-t-lg

  toolbar_ifa_detail:
    component: IFA Detail Toolbar
    sticky: true (below tab bar)
    visible_on: ifa-detail tab only
    background: "#f0f0f0"
    container: white, border #BBBBBB, rounded-lg, shadow-sm
    padding: "px-6 py-3"
    elements:
      broker_badge:
        label: "Broker:"
        value: "{activeIfaRef}"
        accent_bar: "4px #006cf4 left border"
        font: "14px bold navy"
        value_color: "#006cf4"
      action_combobox:
        width: 200px
        options: [Appointment, Broker Pack Follow Up, Duplicate, Hold]
        default: Appointment
        component: Combobox
      record_navigator:
        buttons: [First (|<<), Previous (<), Next (>), Last (>>|)]
        counter: "{currentIndex + 1} of {total}"
        counter_font: "14px bold Mulish #4a4a49"
        button_style: circular 44x44
        disabled_when: "at boundary or no broker"
      action_buttons:
        - icon: FilePlus2
          tooltip: "New IFA"
          action: opens InsertIfaModal
        - icon: ScanSearch
          tooltip: "Locate IFA"
          action: opens LocateIfaModal
        - icon: Search
          tooltip: "Lookup IFA"
          action: opens LocateIfaModal
      save_button:
        icon: Save (or RefreshCw spinning when saving)
        tooltip: "Save Changes"
        style: "44x44 rounded-[30px] bg-[#006cf4] text-white"
        disabled_bg: "#979797"
        enabled_when: isDirty && !isSaving

  toolbar_contacts:
    component: Contacts Toolbar
    sticky: true (below tab bar)
    visible_on: contacts tab only
    background: "#f0f0f0"
    container: white, border #BBBBBB, rounded-lg, shadow-sm
    elements:
      contact_badge:
        label: "Reference:"
        value: "{currentContact.reference}"
        accent_bar: "4px #006cf4 left border"
      contact_navigator:
        buttons: [First (|<<), Previous (<), Next (>), Last (>>|)]
        counter: "{currentIndex + 1} of {contacts.length}"
        button_style: circular 44x44
      add_new_button:
        label: "+ Add New"
        variant: secondary
        status: placeholder (not wired)

  footer:
    component: Footer
    sticky: false
    position: bottom (pushed by flex-1 main)
    background: white
    border_top: "1px solid slate-200"
    padding: "py-4 px-[142px]"
    elements:
      left: LV= Logo (h-6)
      right:
        - "Liverpool Victoria Financial Services Limited" (10px, slate-400, Mulish)
        - "County Gates, Bournemouth BH1 2NF" (10px, slate-400, Mulish)

  combobox:
    component: Combobox (cmdk-based)
    height: 34px
    border_radius: 8px
    border_default: "1px solid #BBBBBB"
    border_hover: "#178830"
    border_open: "3px solid #178830 (no bottom border, squared bottom corners)"
    dropdown:
      border: "3px solid #178830 (no top border)"
      radius: "rounded-b-[8px]"
      max_height: 200px
      shadow: shadow-lg
    item_highlight: "bg-[#003578] text-white"
    chevron: "#006cf4, rotates 180deg when open"
    searchable: true (input becomes editable when open)
    keyboard: ArrowDown/Up to navigate, Enter to select, Escape to close

  fieldset:
    component: Fieldset
    border: "1px solid #BBBBBB"
    radius: rounded-lg
    padding: "p-4 pt-2"
    background: white
    legend:
      text: uppercase
      font: "xs bold #006cf4 font-sans"
      tracking: wider
      padding: "px-2"

  form_input:
    component: FormInput
    layout: "flex items-center gap-3 mb-2"
    label:
      width: "w-1/3 (default, configurable via labelWidth prop)"
      font: "xs semibold #3d3d3d font-sans text-right"
      truncate: true
    input:
      flex: flex-1
      padding: "px-3 py-1.5"
      font: "sm Mulish #3d3d3d"
      border: "1px solid #BBBBBB rounded-lg"
      focus: "2px solid #178830"
      hover: "#178830"
      disabled: "bg-#CCCCCC border-#ACACAC"

  form_select:
    component: FormSelect
    layout: same as FormInput
    uses: Combobox component (not native select)

  form_radio_group:
    component: FormRadioGroup
    layout: "flex items-center gap-3 mb-2"
    label_width: w-1/3
    radio_accent: "#006cf4"
    spacing: "gap-4 between options"

  form_checkbox:
    component: FormCheckbox
    layout: "flex items-center gap-2 mb-2"
    accent: "#178830"
    size: "w-4 h-4"

screens:

  # ============================================================================
  # TAB 1: IFA DETAIL
  # ============================================================================
  ifa_detail_tab:
    component: IfaDetailTab
    file: components/tabs/IfaDetailTab.tsx
    requires_broker: true
    empty_state:
      icon: AlertCircle (w-12 h-12, #BBBBBB)
      title: "No Broker Selected"
      subtitle: "Please select a broker from the Lookups tab first."
      container: "dashed 2px #BBBBBB border, rounded-lg, centered"
    layout:
      type: flex horizontal
      gap: gap-6
      left_panel:
        flex: flex-1
        min_width: 600px
        content:
          form_grid:
            columns: 2
            gap: "gap-x-8 gap-y-1"
            left_column_fields:
              - Broker Name (text input)
              - Address (3-line connected block: rounded-t-lg, no rounding middle, rounded-b-lg; border-b-0 on first two)
              - Town (text input)
              - County (text input)
              - Postcode (text input)
              - Telephone (text input)
              - Fax Number (text input)
              - Email Address (text input)
              - Initials (text input)
              - Date Checked (text input)
            right_column_fields:
              - FCA Reference (text input)
              - Annuity TOBA (radio: Yes/No)
              - Status (combobox: Authorised, Cancelled, Revoked, Duplicate Record)
              - Sent Date (text input)
              - Grade (combobox: National Accounts, Major Accounts, Nursery Accounts, Others, Networks, Annuity Accounts, Regional, Standard)
              - Next Diary Date (text input)
              - IFA Member Number (text input)
              - Broker Manager (combobox: 14 managers)
              - Key Account (combobox: A-Z)
              - Partner Code (text input)
              - Region (combobox: 18 regions with codes)
          separator: "hr border-t #BBBBBB mt-4 mb-2"
          audit_section:
            columns: 2
            fields:
              - Created By (disabled)
              - Created Date (disabled)
              - Amended By (disabled)
              - Amended Date (disabled)

      right_panel:
        width: 350px
        component: Associated Contacts
        container: "border #BBBBBB rounded-lg shadow-sm"
        header:
          bg: "#002f5c"
          text: "ASSOCIATED CONTACTS" (white, xs, bold, uppercase)
          padding: "px-3 py-2.5"
        table:
          columns: [Ref, Name, Position]
          header_bg: "#eaf5f8"
          header_border: "2px solid #04589b"
          header_font: "xs semibold #002f5c font-sans"
          row_hover: "bg-#05579B text-white"
          alt_row: "rgba(231,235,236,0.2)"
          empty_text: "No contacts found"

    save_behaviour:
      trigger: toolbar Save button (when isDirty)
      action: updateBroker mutation
      audit_trail: >
        On success, compares every labelled field against original values.
        For each change, creates a Note (type: SYS) with description
        "{FieldLabel} updated by SYSTEM on {DD/MM/YYYY}", oldValue, newValue.
      post_save: resets isDirty, updates originalData

  # ============================================================================
  # TAB 2: CONTACTS
  # ============================================================================
  contacts_tab:
    component: ContactsTab
    file: components/tabs/ContactsTab.tsx
    requires_broker: true
    empty_state: "Please select a broker first." (centered, muted)
    layout:
      type: "grid grid-cols-1 lg:grid-cols-2 gap-x-8 gap-y-4"

      left_column:
        sticky: true (below toolbar)
        z_index: 10
        form_grid:
          type: "grid grid-cols-[auto_1fr_auto_1fr] gap-x-3 gap-y-2 items-center"
          label_min_width: 70px
          paired_rows:
            - [Title (Combobox: Mr/Mrs/Ms/Dr), Initials (input)]
            - [Forename (input), Surname (input)]
            - [Salutation (input), Position (input)]
          full_width_rows:
            - label: Address
              type: 6-line connected input block
              label_alignment: self-start pt-2
              span: col-span-3
              input_borders:
                first: "rounded-t-lg border-b-0"
                middle: "border-b-0 (4 lines)"
                last: "rounded-b-lg"
            - paired: [Home Telephone (input), Mobile Telephone (input)]
            - label: Email Address
              type: email input
              span: col-span-3
          all_fields_readonly: true

      right_column:
        scrollable: true
        sections:
          - fieldset: IFA Bank Detail
            fields:
              - Paid By BACS (radio: Yes/No)
              - Bank Sort Code (input)
              - Bank Account Number (input)
              - Bank Account Name (input)
              - Bank Reference (input)

          - fieldset: Network Related Detail
            fields:
              - checkbox: "Use terms from principal agent/network" (indented with w-1/3 spacer)
              - Network (radio: Y/N)
              - Default Advice Type (combobox: Independent, Restricted)
              - Default Remuneration Basis (combobox: Fee, Commission)
              - heading_group:
                  title: "Default Distribution Channel"
                  title_color: "#00263e"
                  title_font: "xs semibold font-sans"
                  sub_fields:
                    - Restricted Advice (combobox)
                    - Simplified Advice (combobox)
                    - Non Advised (combobox)

            nested_fieldsets:
              - fieldset: IFA Member Detail
                fields:
                  - Network IFA (input + circular Search button)
                    search_action: opens NetworkLookupModal
                  - Network Name (input, read-only, grey bg #CCCCCC)
                  - Postcode (input, read-only, grey bg #CCCCCC)
                  - nested_fieldset: Tied Agent
                    type: "centered, compact"
                    content: radio (Yes/No)

              - fieldset: Network Members
                content:
                  table:
                    columns: [IFA Ref, Broker Name, Post Code]
                    header_bg: "#eaf5f8"
                    header_border: "2px solid #04589b"
                    empty_text: "No network members" (italic, muted)

              - inline_field: Principal Agent Ref
                type: "input + circular Search button + circular Clr button"
              - Principal (radio: N/Y)

          - fieldset: Quote Terms
            description: "Best rate required for all quotes greater than or equal to:" (indented with w-1/3 spacer)
            fields:
              - "Internal / LV.com" (input, default "0")
              - Portals (input, default "0")

  # ============================================================================
  # TAB 3: LOOKUPS
  # ============================================================================
  lookups_tab:
    component: LookupsTab
    file: components/tabs/LookupsTab.tsx
    requires_broker: false
    layout:
      type: flex-col

      search_criteria:
        component: Fieldset (title: "Search Criteria")
        layout: "flex items-center gap-4 flex-wrap"
        filters:
          - label: Postcode
            type: text input
            width: 140px
            placeholder: "e.g. EC1A"
          - label: IFA Reference
            type: text input
            width: 140px
          - label: IFA Name
            type: text input
            width: 180px
          - label: Status
            type: checkbox group (vertical)
            options:
              - Authorised (default: checked)
              - Cancelled (default: unchecked)
              - Duplicate Record (default: unchecked)
              - Revoked (default: unchecked)
        buttons:
          position: "ml-auto"
          items:
            - label: Select
              icon: Check
              variant: primary
              width: w-28
              enabled_when: "row selected"
              action: "loads broker, switches to IFA Detail tab"
            - label: Club
              icon: Building
              variant: secondary
              width: w-28
              action: opens ClubModal

      results_panel:
        flex: flex-1
        container: "border #BBBBBB rounded-lg shadow-sm"
        header:
          bg: "#002f5c"
          border_bottom: "3px solid #04589b"
          text: "Search Results ({count})" (white, sm, semibold, uppercase)
          subtitle: "Click a row to view details" (10px, white/60, Mulish)
        table:
          total_columns: 75
          min_width: "{columns * 140}px"
          horizontal_scroll: true
          header:
            bg: "#eaf5f8"
            sticky: true (top-0)
            border_bottom: "3px solid #04589b"
            font: "xs semibold #002f5c font-sans whitespace-nowrap"
          body_font: "xs Mulish"
          ifa_ref_column:
            style: "font-medium text-#005a9c underline"
          row_interactions:
            click: "highlights row (bg-#05579B text-white)"
            double_click: "selects broker, navigates to IFA Detail tab"
          alt_row: "rgba(231,235,236,0.2)"

  # ============================================================================
  # TAB 4: RETIREMENT INCOME
  # ============================================================================
  retirement_tab:
    component: RetirementTab
    file: components/tabs/RetirementTab.tsx
    requires_broker: true
    empty_state: "Please select a broker first."
    layout:
      type: "flex-col gap-4"
      sections:
        - component: ProductSection
          repeated: 3
          instances:
            - title: Non Profit Annuity
              prefix: npa
            - title: PIPA
              prefix: pipa
            - title: PRP
              prefix: prp
          layout_per_section:
            type: Fieldset
            content_grid: "grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            column_1:
              - Default Adviser Charges % (disabled input)
              - Amount (input)
              - Default Commission % (input)
            column_2:
              - Expense Discount (input)
              - Marketing Allowance (input)
            column_3:
              border_left: "1px solid #BBBBBB"
              padding_left: pl-6
              buttons:
                - label: "Advice Type/Distribution Channel Pricing"
                  icon: PlusCircle (#178830 green)
                  variant: secondary
                  action: opens AdviceTypePricingModal
                - label: "Special Deals"
                  icon: PlusCircle (#006cf4 blue)
                  variant: secondary
                  action: opens SpecialDealsModal

  # ============================================================================
  # TAB 5: EQUITY RELEASE
  # ============================================================================
  equity_release_tab:
    component: EquityReleaseTab
    file: components/tabs/EquityReleaseTab.tsx
    requires_broker: true
    empty_state: "Please select a broker first."
    layout:
      type: flex-col

      row_1:
        grid: "grid-cols-[1fr_1fr_1fr] gap-4"
        sections:
          - fieldset: "Mortgage Permissions?"
            content: radio (Yes/No)
          - fieldset: "ERLM TOBA?"
            content: radio (Yes/No)
          - fieldset: "Club Membership"
            content:
              table:
                columns: [Name, Ref]
                header_bg: "#002f5c"
                header_text: white
                empty_text: "No memberships"
              buttons: [Add, Edit, View (secondary), Remove (outline)]
              button_style: "text-xs py-1 compact rounded-md"

      row_2:
        grid: "grid-cols-2 gap-4"
        sections:
          - fieldset: "Flexible Commission"
            grid: "grid-cols-2 gap-x-4 gap-y-1"
            fields:
              - Broker Rate (input, label w-auto)
              - Minimum Amount (input, label w-auto)
              - Network Rate (input, label w-auto)
              - Trail Commission (checkbox)
          - fieldset: "Lump Sum Commission"
            grid: "grid-cols-2 gap-x-4 gap-y-1"
            fields:
              - Broker Rate (input, label w-auto)
              - Minimum Amount (input, label w-auto)
              - Network Rate (input, label w-auto)

      row_3:
        fieldset: "Special Deals"
        content_grid: "grid-cols-2 gap-4"
        sub_sections:
          - fieldset: Flexible
          - fieldset: Lump Sum
        each_contains:
          - nested_fieldset: "Age Band Details"
            table:
              type: editable input grid
              columns:
                - Age Band (label, not editable)
                - "Exclusive % (with header checkbox)"
                - "(+ / -)"
                - "Discounted % (with header checkbox)"
                - Cash Back
              rows: ["60-65", "66-70", "71-75", "76-80", "81-85", "86-90", "91 +"]
              input_width: w-14
              input_style: "border #BBBBBB rounded, text-center"
          - nested_fieldset: Valuation
            fields:
              - "Free Up to:" (checkbox + Amount input + "or" + Max Property Value input)
              - "Fee discount:" (checkbox + input)
              - "Refund discount/fee amount on completion" (checkbox)
              - "Reduce fees upfront" (checkbox)
          - extra_fields:
              - Packaging Fee (input)
              - Application Fee (input)
              - "LTV % (+ or -)" (input)

  # ============================================================================
  # TAB 6: NOTES
  # ============================================================================
  notes_tab:
    component: NotesTab
    file: components/tabs/NotesTab.tsx
    requires_broker: true
    empty_state: "Please select a broker first."
    no_notes_state: "No notes found for this record." (centered, border #BBBBBB, rounded-lg)
    layout:
      type: flex-col
      header:
        alignment: "flex justify-end"
        button:
          label: "+ Add Note"
          variant: primary
          status: placeholder (not wired)
      notes_list:
        flex: flex-1
        item_component: NoteCard
        card_layout:
          container: "border #BBBBBB rounded-lg, flex horizontal, bg-white, mb-2"
          left_stripe:
            width: w-10
            bg: "#eaf5f8"
            border_right: "1px solid #BBBBBB"
            content: "noteType characters stacked vertically (e.g. S/Y/S)"
            font: "11px bold #00263e font-sans"
          body:
            padding: "px-4 py-3"
            min_height: 80px
            description:
              font: "sm semibold #00263e font-[Mulish]"
            change_detail:
              visible_when: "oldValue is not null"
              margin_top: mt-2
              font: "xs Mulish #3d3d3d"
              format:
                - "OLD VALUE : {oldValue}"
                - "NEW VALUE : {newValue}"
              label_width: 100px
              label_font_weight: bold
      empty_placeholders:
        count: "max(0, 6 - notes.length)"
        style: "border #BBBBBB rounded-lg bg-#d8d8d8 min-h-[60px]"

modals:

  # ============================================================================
  # MODAL: INSERT IFA
  # ============================================================================
  insert_ifa_modal:
    component: InsertIfaModal
    file: components/Layout.tsx
    trigger: IFA Detail toolbar -> [+New] button
    overlay: "fixed inset-0 bg-black/40 z-50 centered"
    container:
      width: 420px
      bg: "#f0f0f0"
      border: "1px solid #BBBBBB"
      radius: rounded-lg
      shadow: shadow-2xl
    title_bar:
      bg: "#002f5c"
      text: "Insert IFA" (sm, semibold, white, font-sans)
      close_button: X icon (white/70, hover white)
    fields:
      - Broker Name (text input, full width, autofocus, required)
      - Address (3-line connected block)
      - Town / County / Postcode (3-column grid)
      - Telephone / Fax (2-column flex)
    footer:
      border_top: "1px solid #BBBBBB"
      buttons:
        - "Ok" (primary, icon: Check) -> creates broker with status "Authorised", navigates to it
        - "Cancel" (secondary, icon: X) -> closes
    keyboard: Escape closes

  # ============================================================================
  # MODAL: LOCATE IFA
  # ============================================================================
  locate_ifa_modal:
    component: LocateIfaModal
    file: components/Layout.tsx
    trigger: IFA Detail toolbar -> [Locate] or [Search] button
    overlay: "fixed inset-0 bg-black/40 z-50 centered"
    container:
      width: 480px
      bg: "#f0f0f0"
      border: "1px solid #BBBBBB"
      radius: rounded-lg
      shadow: shadow-2xl
    title_bar:
      bg: "#00263e"
      text: "Locate IFA" (sm, semibold, white, font-sans)
      close_button: X icon
    search_input:
      type: text
      placeholder: "Enter IFA reference..."
      autofocus: true
      keyboard: Enter triggers search, Escape closes
    results_table:
      visible_when: search submitted
      max_height: 200px
      scrollable: true
      columns: [IFA Ref, Broker Name, Postcode]
      header_bg: "#eaf5f8"
      row_click: "selects broker, closes modal"
      row_hover: "bg-#05579B text-white"
    footer:
      buttons:
        - "Find" (primary, icon: Search, disabled when empty)
        - "Quit" (secondary, icon: X) -> closes

  # ============================================================================
  # MODAL: ADD / SEARCH CLUBS
  # ============================================================================
  club_modal:
    component: ClubModal
    file: components/shared/ClubModal.tsx
    trigger: Lookups tab -> [Club] button
    overlay: "fixed inset-0 bg-black/40 z-50 centered"
    container:
      width: 640px
      bg: "#f0f0f0"
      border: "1px solid #BBBBBB"
      radius: rounded-lg
      shadow: shadow-2xl
    title_bar:
      bg: "#00263e"
      text: "Add / Search Clubs" (sm, semibold, white, font-sans)
      close_button: X icon
    filters:
      layout: "flex items-end gap-4"
      fields:
        - Club Name (text, 200px, autofocus)
        - Club Reference (text, 150px)
        - Post Code (text, 120px)
      filtering: live (useMemo, filters on every keystroke)
    results_table:
      max_height: 260px
      scrollable: true
      header_bg: "#002f5c"
      header_text: white
      header_border: "3px solid #04589b"
      columns: [Club Name, Club Reference, Post Code, Active]
      sample_data: 15 clubs
      row_click: selects row
      row_double_click: closes modal
      selected_row: "bg-#05579B text-white"
      alt_row: "rgba(231,235,236,0.2)"
    footer:
      buttons:
        - "+ New" (primary, icon: Plus)
        - "Edit" (secondary, icon: Pencil)
        - "Cancel" (secondary, icon: X)
    keyboard: Escape closes

  # ============================================================================
  # MODAL: IFA NETWORK LOOKUP
  # ============================================================================
  network_lookup_modal:
    component: NetworkLookupModal
    file: components/tabs/ContactsTab.tsx
    trigger: Contacts tab -> Network IFA circular search button
    overlay: "fixed inset-0 bg-black/50 z-50 centered"
    container:
      width: 680px
      max_height: 80vh
      bg: "#f0f0f0"
      border: "1px solid #BBBBBB"
      radius: rounded-lg
      shadow: shadow-2xl
      flex: column
    title_bar:
      bg: "#002f5c"
      text: "IFA Network Lookup" (sm, semibold, white, font-sans)
      close_button: X icon
    filters:
      layout: "flex gap-3 items-end"
      border_bottom: "1px solid #BBBBBB"
      padding: "px-4 py-3"
      fields:
        - IFA Ref. (text, flex-1, autofocus)
        - Postcode (text, flex-1)
        - Broker Name (text, flex-1)
      label_font: "10px semibold #3d3d3d font-sans"
      filtering: live (useMemo)
    action_bar:
      border_bottom: "1px solid #BBBBBB"
      padding: "px-4 py-2"
      buttons:
        - "OK" (primary, icon: Check, disabled when nothing selected)
        - "Cancel" (secondary, icon: X)
    results_table:
      max_height: 350px
      scrollable: true
      header_bg: "#eaf5f8"
      header_sticky: true
      header_border: "2px solid #04589b"
      columns: [IFA_REF, POST_CODE, BROKER_NAME]
      row_click: selects row
      row_double_click: confirms selection and closes
      selected_row: "bg-#05579B text-white"
      empty_text: "No records found" (italic, muted)
    footer:
      border_top: "1px solid #BBBBBB"
      bg: "#f0f0f0"
      text: "{count} record(s) found - click to select, double-click to confirm" (10px, #979797, Mulish)

  # ============================================================================
  # MODAL: ADVICE TYPE PRICING
  # ============================================================================
  advice_type_pricing_modal:
    component: AdviceTypePricingModal
    file: components/tabs/RetirementTab.tsx
    trigger: Retirement Income -> any ProductSection -> [+] Advice Type button
    overlay: "fixed inset-0 bg-black/40 z-50 centered"
    container:
      width: "95vw max-w-[1100px]"
      max_height: 90vh
      bg: "#f0f0f0"
      border: "1px solid #BBBBBB"
      radius: rounded-lg
      shadow: shadow-2xl
      flex: column
    title_bar:
      bg: "#002f5c"
      text: "Advice Type/Distribution Channel Pricing" (sm, semibold, white, font-sans)
      close_button: X icon
    product_label:
      text: "Product: {productTitle}" (sm, semibold, #00263e, font-sans)
      padding: "px-5 pt-4 pb-2"
      shrink: false
    table:
      container: "overflow-auto flex-1 px-5"
      min_width: 900px
      width: 100%
      sticky_columns:
        - column: 1 (Advice Type / Distribution Channel labels)
          left: 0
          min_width: 100px
          bg: "#f0f0f0"
          z_index: 5
        - column: 2 (sub-type names)
          left: 100px
          min_width: 120px
          bg: "#f0f0f0"
          z_index: 5
      header:
        sticky: true (top-0 z-10)
        bg: "#eaf5f8"
        border_bottom: "2px solid #04589b"
        sticky_headers_z: 20
      columns: ["{empty}", "{empty}", Expense Discount, Marketing Allowance, Adviser Charge Amount, "Adviser Charge %", "Commission %"]
      input_min_width: 100px
      data_structure:
        repeat_for: [Restricted, Simplified, Non advised, Independent]
        per_advice_type:
          - row: "Advice Type | {name}" (editable inputs for each column)
          - rows: "Distribution Channel | Whole of Market / Tied / Multi-tied" (3 rows, first has rowSpan=3 label)
        separator: "border-t-2 #BBBBBB between advice types"
    footer:
      border_top: "1px solid #BBBBBB"
      bg: "#f0f0f0"
      padding: "px-5 pb-4 pt-3"
      buttons:
        - Save (primary, centered)
        - Cancel (secondary, centered)

  # ============================================================================
  # MODAL: SPECIAL DEALS
  # ============================================================================
  special_deals_modal:
    component: SpecialDealsModal
    file: components/tabs/RetirementTab.tsx
    trigger: Retirement Income -> any ProductSection -> [+] Special Deals button
    overlay: "fixed inset-0 bg-black/40 z-50 centered"
    container:
      width: 780px
      max_height: 90vh
      bg: "#f0f0f0"
      border: "1px solid #BBBBBB"
      radius: rounded-lg
      shadow: shadow-2xl
      flex: column
    title_bar:
      bg: "#002f5c"
      text: "Special Deals" (sm, semibold, white, font-sans)
      close_button: X icon
    content:
      padding: p-5
      product_label: "Product: {productTitle}" (sm, semibold, #00263e)
      section_title: "Adjustments" (sm, bold, #00263e, centered)
      table:
        min_height: 250px
        container: "border #BBBBBB rounded-lg"
        header_bg: "#eaf5f8"
        header_border: "2px solid #04589b"
        columns: [Deal Name, Expense Discount, Marketing Allowance, "Start Date (DD/MM/YYYY)", "End Date (DD/MM/YYYY)", Active]
        empty_text: "No special deals" (italic, muted, centered)
    footer:
      border_top: "1px solid #BBBBBB"
      buttons:
        - Add (primary)
        - Save (primary)
        - Edit (primary)
        - Cancel (secondary)

navigation_flows:
  app_init:
    sequence:
      - DataStoreProvider loads seed data into memory
      - AppProvider initialises with activeTab: ifa-detail
      - useListBrokers fetches all brokers
      - First broker auto-selected (activeBrokerId = brokers[0].id)
      - IFA Detail tab renders with first broker data

  lookup_to_detail:
    trigger: "Double-click row in Lookups OR click Select button"
    sequence:
      - setActiveBrokerId(selectedId)
      - handleSetBroker resets isDirty, sets activeTab to ifa-detail
      - IFA Detail tab loads with selected broker

  insert_ifa:
    trigger: "[+New] button in IFA Detail toolbar"
    sequence:
      - InsertIfaModal opens
      - User fills form, clicks Ok
      - createBroker mutation adds new broker (status: Authorised)
      - onSuccess: setActiveBrokerId(newBroker.id), close modal
      - IFA Detail renders with new broker

  locate_ifa:
    trigger: "[Locate] or [Search] button in IFA Detail toolbar"
    sequence:
      - LocateIfaModal opens
      - User types IFA reference, clicks Find (or Enter)
      - Results table appears with matching brokers
      - User clicks a row
      - setActiveBrokerId(broker.id), modal closes
      - IFA Detail loads with selected broker

  save_changes:
    trigger: "Save button in IFA Detail toolbar (enabled when isDirty)"
    sequence:
      - triggerSave() invokes registered saveHandler
      - Handler compares formData vs originalData for all labelled fields
      - updateBroker mutation fires
      - onSuccess: for each changed field, createNote (type SYS, with old/new values)
      - isDirty reset to false, originalData updated

  network_lookup:
    trigger: "Circular search button next to Network IFA in Contacts tab"
    sequence:
      - NetworkLookupModal opens
      - User filters by IFA Ref / Postcode / Broker Name
      - Click selects row; double-click confirms
      - onSelect: sets networkIfa, networkName, networkPostcode overrides
      - Modal closes, Contacts form updates read-only fields

  contact_navigation:
    trigger: "Navigation buttons (|<<, <, >, >>|) in Contacts toolbar"
    sequence:
      - currentIndex updates
      - networkOverrides reset to null
      - Contact form re-renders with new contact data
