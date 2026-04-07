# IFA Lite — Screen Digest V1

application:
  name: IFA Lite
  version: 1.0.0
  type: Internal Broker/IFA Management Tool
  description: Fully static (no backend/database) React/Vite web application for internal users to manage brokers/IFAs. Replaces a legacy Citrix-based Windows desktop EXE. All data is held in-memory via React context; changes persist only for the current browser session.
  framework: React 18 + Vite + TypeScript
  styling: Tailwind CSS
  routing: wouter (client-side, single page)
  state_management: React Context (AppContext + DataStoreContext)
  fonts:
    headings_buttons_labels_tabs: Livvic (font-sans)
    inputs_body_table_data: Mulish (font-[Mulish])

design_tokens:
  colors:
    navy_header: "#00263e"
    primary_blue: "#006cf4"
    button_blue: "#04589b"
    button_blue_alt: "#05579b"
    hover_dark: "#003578"
    green_focus: "#178830"
    border_grey: "#BBBBBB"
    grid_header: "#002f5c"
    background: "#f0f0f0"
    tab_inactive: "#eaf5f8"
    text_primary: "#3d3d3d"
    text_secondary: "#979797"
    link_blue: "#005a9c"
    row_highlight: "#05579B"
    row_alt: "#e7ebec"
  layout:
    horizontal_padding: "px-[142px]"
    zoom: "html { zoom: 0.8 }"
    root_height: "calc(100vh / 0.8)"
  border_radius:
    inputs: rounded-lg
    buttons: rounded-full
    fieldsets: rounded-lg
    navigation_arrows: rounded-[30px]

data_model:
  entities:
    broker:
      description: Primary entity representing a financial adviser/broker firm
      fields:
        - { name: id, type: number, auto: true }
        - { name: ifaRef, type: string, auto: "NEW-{padded id}", display: "IFA Reference" }
        - { name: brokerNo, type: string, auto: "BRK{padded id}" }
        - { name: fimbraNo, type: string }
        - { name: brokerName, type: string, required: true }
        - { name: tradingName, type: string }
        - { name: addressLine1, type: string }
        - { name: addressLine2, type: string }
        - { name: town, type: string }
        - { name: county, type: string }
        - { name: postcode, type: string }
        - { name: telephone, type: string }
        - { name: fax, type: string }
        - { name: email, type: string }
        - { name: initials, type: string }
        - { name: dateChecked, type: string, format: "DD/MM/YYYY" }
        - { name: status, type: string, values: [Authorised, Cancelled, Revoked, Duplicate Record] }
        - { name: fcaReference, type: string }
        - { name: annuityToba, type: boolean }
        - { name: sentDate, type: string, format: "DD/MM/YYYY" }
        - { name: grade, type: string, values: [National Accounts, Major Accounts, Nursery Accounts, Others, Networks, Annuity Accounts, Regional, Standard] }
        - { name: nextDiaryDate, type: string, format: "DD/MM/YYYY" }
        - { name: ifaMemberNo, type: string }
        - { name: brokerManager, type: string, values: [Stuart Watson, Trudy Davidson, Natalie Pye, Keith Harvey, Amit Mishra, Shaun King, Robot Machine, Sarah Collins, David Thompson, James Whitaker, Helen Carter, Mark Reynolds, Lisa Brennan, Paul Henderson] }
        - { name: keyAccount, type: string }
        - { name: partnerCode, type: string }
        - { name: region, type: string, values: [BIR, BRI, CDF, EDI, EXE, GLA, HEO, HIT, LEE, LON, MAN, MID, NEW, NOR, NOT, REA, SOU] }
        - { name: createdBy, type: string }
        - { name: createdDate, type: string }
        - { name: amendedBy, type: string }
        - { name: amendedDate, type: string }
      seed_count: 13

    contact:
      description: Individual contact person linked to a broker
      parent: broker (via brokerId)
      fields:
        - { name: id, type: number, auto: true }
        - { name: brokerId, type: number, foreign_key: broker.id }
        - { name: reference, type: string, display: "Contact Ref" }
        - { name: title, type: string, values: [Mr, Mrs, Ms, Dr, Miss] }
        - { name: initials, type: string }
        - { name: forename, type: string }
        - { name: surname, type: string }
        - { name: salutation, type: string }
        - { name: position, type: string }
        - { name: addressLine1, type: string }
        - { name: addressLine2, type: string }
        - { name: addressLine3, type: string }
        - { name: addressLine4, type: string }
        - { name: homeTelephone, type: string }
        - { name: mobileTelephone, type: string }
        - { name: emailAddress, type: string }
        - { name: paidByBacs, type: boolean }
        - { name: bankSortCode, type: string }
        - { name: bankAccountNo, type: string }
        - { name: bankAccountName, type: string }
        - { name: bankReference, type: string }
        - { name: useNetworkTerms, type: boolean }
        - { name: defaultAdviceType, type: string, values: [Independent, Restricted] }
        - { name: defaultRemunerationBasis, type: string, values: [Fee, Commission] }
        - { name: defaultDistributionChannel, type: string }
        - { name: network, type: boolean }
        - { name: tiedAgent, type: boolean }
        - { name: isPrincipal, type: boolean }
        - { name: networkIfa, type: string }
        - { name: networkName, type: string }
        - { name: networkPostcode, type: string }
        - { name: principalAgentRef, type: string }
      seed_count: 17

    note:
      description: Audit trail entry linked to a broker; auto-created on field changes and manually via Add Note
      parent: broker (via brokerId)
      fields:
        - { name: id, type: number, auto: true }
        - { name: brokerId, type: number, foreign_key: broker.id }
        - { name: noteType, type: string, values: [SYS, MAN], display: "Note Type" }
        - { name: description, type: string }
        - { name: oldValue, type: string, optional: true }
        - { name: newValue, type: string, optional: true }
        - { name: updatedBy, type: string }
        - { name: updatedDate, type: string }
      seed_count: 33

    retirement_income:
      description: Commission and fee configuration for retirement income products per broker
      parent: broker (via brokerId)
      products: [Non Profit Annuity (npa), PIPA (pipa), PRP (prp)]
      per_product_fields:
        - { name: "{prefix}AdviserCharges", type: string, display: "Default adviser charges %" }
        - { name: "{prefix}Amount", type: string, display: "Amount" }
        - { name: "{prefix}Commission", type: string, display: "Default Commission %" }
        - { name: "{prefix}ExpenseDiscount", type: string, display: "Expense Discount" }
        - { name: "{prefix}MarketingAllowance", type: string, display: "Marketing allowance" }
      seed_count: 10

    equity_release:
      description: Equity release commission, deals, valuation and fee configuration per broker
      parent: broker (via brokerId)
      fields:
        - { name: mortgagePermissions, type: boolean }
        - { name: erlmToba, type: boolean }
        - { name: flexibleBrokerRate, type: string }
        - { name: flexibleMinimumAmount, type: string }
        - { name: flexibleNetworkRate, type: string }
        - { name: flexibleTrailCommission, type: boolean }
        - { name: lumpSumBrokerRate, type: string }
        - { name: lumpSumMinimumAmount, type: string }
        - { name: lumpSumNetworkRate, type: string }
        - { name: packagingFee, type: string }
        - { name: applicationFee, type: string }
        - { name: ltvPercent, type: string }
        - { name: lumpSumPackagingFee, type: string }
        - { name: lumpSumApplicationFee, type: string }
        - { name: lumpSumLtvPercent, type: string }
      seed_count: 6

  mutations:
    createBroker:
      input: Partial<Broker> (brokerName required)
      behavior: Generates auto-incremented id, ifaRef "NEW-{padded}", brokerNo, fimbraNo, createdBy "SYSTEM", createdDate now. ID counter uses useRef seeded from max existing ID to prevent duplicates.
      returns: Broker

    updateBroker:
      input: id + Partial<Broker>
      behavior: Merges data into existing broker record in-memory. Synchronous (no setTimeout).
      returns: Broker

    addNote:
      input: brokerId + Partial<Note>
      behavior: Generates auto-incremented id, prepends to notes array. ID counter uses useRef seeded from max existing ID.
      returns: Note

  queries:
    useListBrokers:
      params: { postcode?, ifaReference?, ifaName?, authorised?, cancelled?, duplicateRecord?, revoked? }
      returns: "{ data: Broker[], isLoading: false }"

    useGetBroker:
      params: id
      returns: "{ data: Broker | undefined, isLoading: false }"

    useListContacts:
      params: brokerId
      returns: "{ data: Contact[], isLoading: false }"

    useListNotes:
      params: brokerId
      returns: "{ data: Note[], isLoading: false }"

    useGetRetirementIncome:
      params: brokerId
      returns: "{ data: RetirementIncome | undefined, isLoading: false }"

    useGetEquityRelease:
      params: brokerId
      returns: "{ data: EquityRelease | undefined, isLoading: false }"

global_components:
  header:
    component: Layout (header section)
    sticky: false
    background: "#00263e"
    height: auto (pt-4 pb-6)
    padding: "px-[142px]"
    elements:
      top_row:
        left: LV= Logo image (/lve-logo.png, h-6)
        right: Logout button (primary variant, pill shape)
      divider: 1px horizontal line (slate-600/50)
      title:
        text: "IFA Lite"
        font: Livvic
        size: 30px
        weight: normal
        color: white

  tab_bar:
    component: Layout (tab section)
    background: white
    padding: "px-[142px] pt-4"
    tabs:
      - { id: ifa-detail, label: "IFA Detail", icon: FileText }
      - { id: contacts, label: "Contacts", icon: Users }
      - { id: lookups, label: "Lookups", icon: Search }
      - { id: retirement, label: "Retirement Income", icon: Briefcase }
      - { id: equity, label: "Equity Release", icon: Home }
      - { id: notes, label: "Notes", icon: Database }
    active_style:
      background: white
      text_color: "#4a4a49"
      border_top: "2px solid #006cf4"
      border_sides: "1px solid #BBBBBB"
      shadow: "0 -2px 8px rgba(0,0,0,0.08)"
      margin_bottom: "-1px"
    inactive_style:
      background: "#eaf5f8"
      text_color: "#0d2c41"
      hover: "#dceef3"
    behavior:
      - Clicking a tab sets activeTab in AppContext
      - Default tab on load: ifa-detail
      - Tab content rendered by TabRouter switch statement

  toolbar:
    component: Layout (toolbar section)
    visibility: "Only rendered when activeTab === 'ifa-detail'"
    sticky: true (top-0 z-20)
    background: white
    borders: "border-b border-t border-[#BBBBBB]"
    padding: "px-[142px] py-3"
    layout: flex justify-between
    left_section:
      - broker_badge:
          condition: "activeIfaRef is not empty"
          display: "Broker: {activeIfaRef}"
          accent: "4px blue bar (w-1 h-5 bg-[#006cf4])"
          font: semibold 14px navy
      - divider: "1px vertical grey"
      - action_combobox:
          width: 200px
          options: [Appointment, Broker Pack Follow Up, Duplicate, Hold]
          default: Appointment
      - divider: "1px vertical grey"
      - navigation_buttons:
          style: "44x44px circular pill border-[#04589b]"
          hover: "bg-[#003578] text-white"
          disabled: "opacity-30"
          buttons:
            - { icon: ChevronFirst, title: "First Record", action: "goFirst()" }
            - { icon: ChevronLeft, title: "Previous Record", action: "goPrev()" }
            - counter: "{currentIndex + 1} of {total}"
            - { icon: ChevronRight, title: "Next Record", action: "goNext()" }
            - { icon: ChevronLast, title: "Last Record", action: "goLast()" }
    right_section:
      - new_ifa_button:
          variant: secondary
          icon: FilePlus2
          text: "New IFA"
          action: "Opens InsertIfaModal"
          disabled_when: createBrokerMutation.isPending
      - locate_ifa_button:
          variant: secondary
          icon: ScanSearch
          text: "Locate IFA"
          action: "Opens LocateIfaModal"
      - divider: "1px vertical grey"
      - save_button:
          variant: primary
          icon: Save (or RefreshCw spinning when saving)
          text: "Save Changes"
          disabled_when: "!isDirty || isSaving"
          action: "triggerSave() -> calls registered save handler from IFA Detail tab"

  footer:
    component: Layout (footer section)
    background: white
    border_top: "1px solid slate-200"
    padding: "py-4 px-[142px]"
    layout: flex justify-between items-center
    elements:
      left: LV= Logo image (h-6)
      right:
        - company_info:
            line1: "Liverpool Victoria Financial Services Limited"
            line2: "County Gates, Bournemouth BH1 2NF"
            font: Mulish 10px slate-400

  shared_form_components:
    Fieldset:
      element: "<fieldset>"
      border: "1px solid #BBBBBB"
      border_radius: rounded-lg
      padding: "p-4 pt-2"
      background: white
      legend:
        font: Livvic
        size: 12px (text-xs)
        weight: bold
        color: "#006cf4"
        transform: uppercase
        letter_spacing: wider

    FormInput:
      layout: "flex items-center gap-3 mb-2"
      label:
        width: "w-1/3 (default, configurable via labelWidth)"
        alignment: text-right
        font: "Livvic 12px semibold #3d3d3d"
      input:
        flex: "flex-1"
        padding: "px-3 py-1.5"
        font: "Mulish 14px #3d3d3d"
        border: "1px solid #BBBBBB"
        border_radius: rounded-lg
        focus: "border-[#178830] 2px, outline-none"
        hover: "border-[#178830]"
        disabled: "bg-[#CCCCCC] border-[#ACACAC]"

    FormSelect:
      layout: same as FormInput
      dropdown: Custom Combobox component (cmdk-based)
      features:
        - Type-ahead search filtering
        - ChevronDown indicator
        - Keyboard navigation
        - Click-outside to close

    FormRadioGroup:
      layout: "flex items-center gap-3 mb-2"
      label: "w-1/3 text-right"
      options: "horizontal flex gap-4"
      accent: "#006cf4"

    FormCheckbox:
      layout: "flex items-center gap-2 mb-2"
      size: "w-4 h-4"
      accent: "#178830"

    Button:
      shape: rounded-full (pill)
      padding: "px-6 py-2"
      font: "Livvic 14px semibold"
      icon_gap: "gap-2"
      variants:
        primary:
          background: "#006cf4"
          text: white
          hover: "#003578"
          disabled: "#979797"
        secondary:
          background: white
          text: "#04589b"
          border: "1px solid #04589b"
          hover: "#003578 text-white"
          font_weight: bold
        outline:
          background: white
          text: "#3d3d3d"
          border: "1px solid #BBBBBB"
          hover: "border-[#006cf4] text-[#006cf4]"

screens:
  - id: ifa_detail
    title: IFA Detail
    tab_id: ifa-detail
    component: IfaDetailTab
    url: / (default tab on load)
    toolbar_visible: true

    layout:
      display: flex gap-6
      left_panel:
        flex: "flex-1 min-w-[600px]"
      right_panel:
        width: "w-[350px]"

    components:
      section_header:
        text: "GENERAL INFORMATION"
        style: "text-xs font-bold text-[#006cf4] border-b-2 border-[#006cf4]/20 pb-1 mb-3 uppercase tracking-wider"

      form_grid:
        display: "grid grid-cols-2 gap-x-8 gap-y-1"
        left_column_fields:
          - { field: brokerName, component: FormInput, editable: true }
          - { field: addressLine1, component: FormInput, editable: true }
          - { field: addressLine2, component: FormInput, editable: true }
          - { field: town, component: FormInput, editable: true }
          - { field: county, component: FormInput, editable: true }
          - { field: postcode, component: FormInput, editable: true }
          - { field: telephone, component: FormInput, editable: true }
          - { field: fax, component: FormInput, editable: true }
          - { field: email, component: FormInput, editable: true }
          - { field: initials, component: FormInput, editable: true }
          - { field: dateChecked, component: FormInput, editable: true }
        right_column_fields:
          - { field: tradingName, component: FormInput, editable: true }
          - { field: fcaReference, component: FormInput, editable: true }
          - { field: annuityToba, component: FormRadioGroup, options: [Yes, No] }
          - { field: status, component: FormSelect, options: [Authorised, Cancelled, Revoked, Duplicate Record] }
          - { field: sentDate, component: FormInput, editable: true }
          - { field: grade, component: FormSelect, options: [National Accounts, Major Accounts, Nursery Accounts, Others, Networks, Annuity Accounts, Regional, Standard] }
          - { field: nextDiaryDate, component: FormInput, editable: true }
          - { field: ifaMemberNo, component: FormInput, editable: true }
          - { field: brokerManager, component: FormSelect, options: "[14 manager names]" }
          - { field: keyAccount, component: FormSelect, options: "[A-Z letters]" }
          - { field: partnerCode, component: FormInput, editable: true }
          - { field: region, component: FormSelect, options: "[17 region codes]" }

      audit_footer:
        background: "#eaf5f8"
        border_radius: rounded-lg
        padding: p-3
        font: "Mulish 12px #979797"
        display: "flex justify-between"
        left: "Created By: {createdBy} on {createdDate}"
        right: "Amended By: {amendedBy} on {amendedDate}"

      associated_contacts_panel:
        position: right panel
        header:
          text: "ASSOCIATED CONTACTS"
          background: "#002f5c"
          text_color: white
          font: "Livvic 12px bold uppercase tracking-wider"
        table:
          columns:
            - { header: Ref, field: reference, style: "text-[#005a9c] font-semibold" }
            - { header: Name, field: "title + initials + surname" }
            - { header: Position, field: position, truncate: "max-w-[100px]" }
          row_hover: "bg-[#05579B] text-white"
          alternating_rows: true
          empty_state: "No contacts found"

    behavior:
      on_load:
        - Broker data loaded into form state
        - Original data snapshot stored for dirty tracking
        - activeIfaRef set from broker.ifaRef
      on_field_change:
        - formData updated
        - isDirty calculated by comparing formData to originalData
      on_save:
        - updateBroker mutation called with full formData
        - For each changed field (compared to originalData), a SYS note is created via addNote
        - Note description: "{FieldLabel} updated by SYSTEM on {today}"
        - Note includes oldValue and newValue
        - On success: originalData reset, isDirty set to false
      no_broker_state:
        display: "Centered placeholder with AlertCircle icon"
        heading: "No Broker Selected"
        body: "Please select a broker from the Lookups tab first."

  - id: contacts
    title: Contacts
    tab_id: contacts
    component: ContactsTab
    toolbar_visible: false

    layout:
      display: "flex flex-col min-h-full"
      top_bar:
        display: "flex justify-between"
        border_bottom: "border-b border-[#BBBBBB] mb-4 pb-2"
        left:
          - counter: "Contact {currentIndex + 1} of {contacts.length}"
          - prev_button: "outline variant, ChevronLeft icon"
          - next_button: "outline variant, ChevronRight icon"
        right:
          - add_new_button: "secondary variant, Plus icon, text 'Add New'"
          - save_contact_button: "primary variant, Save icon, text 'Save Contact'"
      main_grid:
        display: "grid grid-cols-1 lg:grid-cols-2 gap-x-8 gap-y-4"

    left_column_fieldsets:
      personal_details:
        title: "PERSONAL DETAILS"
        fields:
          - { field: reference, component: FormInput, readOnly: true, style: "bg-[#eaf5f8] font-bold text-[#006cf4]" }
          - { fields: [title, initials], layout: "flex gap-2 (Title as FormSelect, Initials as FormInput with labelWidth w-16)" }
          - { field: forename, component: FormInput }
          - { field: surname, component: FormInput }
          - { field: salutation, component: FormInput }
          - { field: position, component: FormInput }

      contact_information:
        title: "CONTACT INFORMATION"
        fields:
          - { field: addressLine1, component: FormInput }
          - { field: addressLine2, component: FormInput }
          - { field: addressLine3, component: FormInput }
          - { field: addressLine4, component: FormInput }
          - separator: "border-t border-[#BBBBBB] mt-4 pt-4"
          - { field: homeTelephone, label: "Home Tel", component: FormInput }
          - { field: mobileTelephone, label: "Mobile Tel", component: FormInput }
          - { field: emailAddress, label: "Email", component: FormInput, type: email }

    right_column_fieldsets:
      ifa_bank_detail:
        title: "IFA BANK DETAIL"
        fields:
          - { field: paidByBacs, component: FormRadioGroup, options: [Yes, No] }
          - { field: bankSortCode, component: FormInput }
          - { field: bankAccountNo, label: "Bank Account No.", component: FormInput }
          - { field: bankAccountName, component: FormInput }
          - { field: bankReference, component: FormInput }

      network_related_detail:
        title: "NETWORK RELATED DETAIL"
        fields:
          - { field: useNetworkTerms, component: FormCheckbox, label: "Use terms from principal agent/network", indent: "pl-[33%]" }
          - { field: defaultAdviceType, label: "Default Advice Type", component: FormSelect, options: [Independent, Restricted] }
          - { field: defaultRemunerationBasis, label: "Remuneration Basis", component: FormSelect, options: [Fee, Commission] }
          - { field: defaultDistributionChannel, label: "Distribution Channel", component: FormInput }
          - sub_grid:
              display: "grid grid-cols-2 gap-4 mt-4"
              left:
                - { field: network, component: FormRadioGroup, options: [Y, N] }
                - { field: tiedAgent, label: "Tied Agent", component: FormRadioGroup, options: [Yes, No] }
                - { field: isPrincipal, label: "Principal", component: FormRadioGroup, options: [Y, N] }
              right:
                - { label: Restricted, component: FormSelect, options: [] }
                - { label: Simplified, component: FormSelect, options: [] }
                - { label: "Non Advised", component: FormSelect, options: [] }

      ifa_member_detail:
        title: "IFA MEMBER DETAIL"
        fields:
          - network_ifa_row:
              layout: "flex items-center gap-3 mb-2"
              label: "Network IFA (w-1/3, right-aligned)"
              input: "readOnly text input (flex-1)"
              search_button:
                variant: outline
                icon: Search (w-3 h-3)
                action: "Opens NetworkLookupModal"
          - { field: networkName, label: "Network Name", component: FormInput, readOnly: true, style: "bg-[#CCCCCC]" }
          - { field: networkPostcode, label: "Postcode", component: FormInput, readOnly: true, style: "bg-[#CCCCCC]" }

      network_members:
        title: "NETWORK MEMBERS"
        table:
          columns: [IFA Ref, Broker Name, Post Code]
          empty_state: "No network members"
          style: "border border-[#BBBBBB] rounded-lg"

      principal_agent:
        title: "PRINCIPAL AGENT"
        layout: "flex gap-2 items-center"
        fields:
          - { field: principalAgentRef, label: "Principal Agent Ref", component: FormInput }
          - search_button: { variant: outline, icon: Search }
          - clear_button: { variant: outline, text: "Clr" }

    behavior:
      on_load:
        - Contacts loaded for activeBrokerId
        - currentIndex defaults to 0
        - networkOverrides initialized to null
      contact_navigation:
        - Prev/Next buttons cycle currentIndex through contacts array
        - Counter shows "Contact X of Y"
        - On contact change: networkOverrides reset to null
      network_ifa_lookup:
        - Search button opens NetworkLookupModal
        - On selection: networkOverrides set with { networkIfa, networkName, networkPostcode }
        - Displayed values: override ?? contact field ?? empty string
      no_broker_state:
        display: "Centered text: 'Please select a broker first.'"

  - id: lookups
    title: Lookups
    tab_id: lookups
    component: LookupsTab
    toolbar_visible: false

    components:
      search_criteria:
        component: Fieldset
        title: "SEARCH CRITERIA"
        layout: "flex items-end gap-4 flex-wrap"
        fields:
          - { label: Postcode, width: "w-[140px]", placeholder: "e.g. EC1A" }
          - { label: "IFA Reference", width: "w-[140px]" }
          - { label: "IFA Name", width: "w-[180px]" }
          - { label: Status, component: Combobox, width: "w-[170px]", options: [Authorised, Cancelled, Duplicate Record, Revoked], default: Authorised }
        buttons:
          position: "ml-auto (right-aligned)"
          - { text: Search, icon: Search, variant: primary, width: "w-28", action: "handleSearch()" }
          - { text: Club, icon: Building, variant: secondary, width: "w-28", action: "Opens ClubModal" }

      results_table:
        container:
          background: white
          border: "1px solid #BBBBBB"
          border_radius: rounded-lg
          shadow: shadow-sm
          overflow: hidden
        header_bar:
          background: "#002f5c"
          border_bottom: "3px solid #04589b"
          text: "Search Results ({count})"
          sub_text: "Click a row to view details"
          font: "Livvic 14px semibold white uppercase"
        table:
          columns: 75 total (all broker fields exposed as columns)
          scrolling: "horizontal overflow-auto"
          min_width: "{columns.length * 140}px"
          column_headers:
            background: "#eaf5f8"
            sticky: true
            border_bottom: "3px solid #04589b"
            font: "Livvic 12px semibold #002f5c"
          rows:
            alternating: "white / #e7ebec (20% opacity)"
            hover: "bg-[#05579B] text-white"
            cursor: pointer
            ifa_ref_column: "font-medium text-[#005a9c] underline"
            click_action: "setActiveBrokerId(broker.id) -> navigates to IFA Detail tab"

    behavior:
      on_search:
        - Filters built from form fields (postcode prefix match, ifaReference/ifaName substring match, status exact match)
        - useListBrokers called with filter params
        - Results displayed immediately (synchronous in-memory)
      on_row_click:
        - setActiveBrokerId called with clicked broker's id
        - AppContext automatically switches to ifa-detail tab (handleSetBroker logic)

  - id: retirement
    title: Retirement Income
    tab_id: retirement
    component: RetirementTab
    toolbar_visible: false

    components:
      banner:
        text: "Retirement Income Commission & Fee Configuration"
        style: "bg-[#eaf5f8] border border-[#04589b]/30 text-[#002f5c] px-4 py-2.5 rounded-lg text-sm font-semibold"

      product_sections:
        count: 3
        layout: "vertical stack with gap-4"
        items:
          - { title: "NON PROFIT ANNUITY", prefix: npa }
          - { title: "PIPA", prefix: pipa }
          - { title: "PRP", prefix: prp }
        each_section:
          component: ProductSection (Fieldset wrapper)
          inner_layout: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          column_1:
            - { label: "Default adviser charges %", field: "{prefix}AdviserCharges" }
            - { label: "Amount", field: "{prefix}Amount" }
            - { label: "Default Commission %", field: "{prefix}Commission" }
          column_2:
            - { label: "Expense Discount", field: "{prefix}ExpenseDiscount" }
            - { label: "Marketing allowance", field: "{prefix}MarketingAllowance" }
          column_3:
            border_left: "border-l border-[#BBBBBB] pl-6"
            buttons:
              - { text: "Advice Type/Distribution Channel pricing", icon: PlusCircle (green), variant: secondary }
              - { text: "Special deals", icon: PlusCircle (blue), variant: secondary }

      save_button:
        position: "flex justify-end mt-4"
        text: "Save Configuration"
        variant: primary
        width: "w-40"

    behavior:
      no_broker_state: "Centered placeholder text"

  - id: equity_release
    title: Equity Release
    tab_id: equity
    component: EquityReleaseTab
    toolbar_visible: false

    layout:
      display: "flex flex-col min-h-full"
      top_row: "grid grid-cols-2 gap-6 mb-4"
      main_area: "grid grid-cols-2 gap-6"

    components:
      top_left:
        permissions:
          title: "PERMISSIONS"
          fields:
            - { field: mortgagePermissions, label: "Mortgage Permissions", component: FormRadioGroup, options: [Yes, No] }
            - { field: erlmToba, label: "ERLM TOBA", component: FormRadioGroup, options: [Yes, No] }

      top_right:
        club_membership:
          title: "CLUB MEMBERSHIP"
          table:
            columns: [Name, Ref]
            empty_state: "No memberships"
            max_height: h-24
          action_buttons:
            layout: "flex gap-2"
            buttons:
              - { text: Add, variant: secondary }
              - { text: Edit, variant: secondary }
              - { text: View, variant: secondary }
              - { text: Remove, variant: outline }

      left_column:
        flexible_commission:
          title: "FLEXIBLE COMMISSION"
          fields:
            - { field: flexibleBrokerRate, label: "Broker Rate" }
            - { field: flexibleMinimumAmount, label: "Minimum Amount" }
            - { field: flexibleNetworkRate, label: "Network Rate" }
            - { field: flexibleTrailCommission, label: "Trail Commission", component: FormCheckbox, indent: "pl-[33%]" }

        flexible_special_deals:
          title: "FLEXIBLE SPECIAL DEALS (AGE BANDS)"
          table:
            type: editable grid
            columns:
              - { header: "Age Band", type: label }
              - { header: "Exclusive %", type: input, width: "w-14" }
              - { header: "(+/-)", type: checkbox }
              - { header: "Discounted %", type: input, width: "w-14" }
              - { header: "Cash Back", type: input, width: "w-14" }
            rows: ["60-65", "66-70", "71-75", "76-80", "81-85", "86-90", "91+"]
            alternating_rows: "white / #f4f7f8"

        flexible_valuation:
          title: "FLEXIBLE VALUATION"
          fields:
            - { layout: "flex items-center gap-2", items: ["checkbox 'Free Up to:'", "amount input", "text 'or'", "max property input"] }
            - { layout: "flex items-center gap-2", items: ["checkbox 'Fee discount:'", "amount input"] }
            - { checkbox: "Refund discount/fee amount on completion" }
            - { checkbox: "Reduce fees upfront" }

        flexible_fees:
          title: "FLEXIBLE FEES"
          fields:
            - { field: packagingFee, label: "Packaging Fee" }
            - { field: applicationFee, label: "Application Fee" }
            - { field: ltvPercent, label: "LTV % (+ or -)" }

      right_column:
        lump_sum_commission:
          title: "LUMP SUM COMMISSION"
          fields:
            - { field: lumpSumBrokerRate, label: "Broker Rate" }
            - { field: lumpSumMinimumAmount, label: "Minimum Amount" }
            - { field: lumpSumNetworkRate, label: "Network Rate" }

        lump_sum_special_deals:
          title: "LUMP SUM SPECIAL DEALS (AGE BANDS)"
          table: same structure as flexible_special_deals

        lump_sum_valuation:
          title: "LUMP SUM VALUATION"
          fields: same structure as flexible_valuation

        lump_sum_fees:
          title: "LUMP SUM FEES"
          fields:
            - { field: lumpSumPackagingFee, label: "Packaging Fee" }
            - { field: lumpSumApplicationFee, label: "Application Fee" }
            - { field: lumpSumLtvPercent, label: "LTV % (+ or -)" }

    behavior:
      symmetrical_layout: "Flexible (left) mirrors Lump Sum (right)"
      no_broker_state: "Centered placeholder text"

  - id: notes
    title: Notes
    tab_id: notes
    component: NotesTab
    toolbar_visible: false

    components:
      header_bar:
        layout: "flex justify-between items-center mb-4"
        left:
          icon: History (w-5 h-5, color: "#006cf4")
          text: "Audit Trail & Notes"
          font: "Livvic 18px bold #00263e"
        right:
          add_note_button:
            variant: primary
            icon: Plus
            text: "Add Note"

      notes_list:
        container:
          background: white
          border: "1px solid #BBBBBB"
          border_radius: rounded-lg
          overflow: auto
          flex: "flex-1"
        empty_state:
          text: "No notes found for this record."
          font: "Mulish, #979797, centered, py-12"
        note_card:
          layout: "flex (horizontal)"
          divider: "divide-y divide-[#BBBBBB]"
          hover: "bg-[#eaf5f8]/50"
          left_gutter:
            width: "w-10"
            background: "#eaf5f8"
            border_right: "1px solid #BBBBBB"
            content:
              text: "{note.noteType}" (e.g. SYS, MAN)
              style: "vertical text (writing-mode: vertical-lr), 10px bold #006cf4, letter-spacing 2px"
          body:
            padding: "px-4 py-3"
            font: "Mulish 14px #3d3d3d"
            description: "font-medium"
            old_new_values:
              condition: "oldValue or newValue is defined"
              margin_top: mt-1
              font_size: 12px
              label_style: "font-bold #979797 uppercase"
              format:
                - "OLD VALUE : {oldValue || '—'}"
                - "NEW VALUE : {newValue || '—'}"

    behavior:
      notes_source: "useListNotes(activeBrokerId) — returns all notes for active broker"
      auto_notes: "SYS notes auto-created when IFA Detail fields are saved (one note per changed field)"
      manual_notes: "MAN notes created via Add Note button (stub)"
      sort_order: "Newest first (prepended to array by addNote)"
      no_broker_state: "Centered placeholder text"

modals:
  - id: insert_ifa_modal
    title: Insert IFA
    trigger: "New IFA button in toolbar (IFA Detail tab only)"
    component: InsertIfaModal
    width: "w-[420px]"
    header:
      background: "#002f5c"
      text: "Insert IFA"
      close_button: X icon
    fields:
      - { name: brokerName, label: "Broker Name", required: true, autoFocus: true, full_width: true, border_radius: rounded-lg }
      - { name: addressLine1, placeholder: "Address Line 1", full_width: true }
      - { name: addressLine2, placeholder: "Address Line 2", full_width: true }
      - { name: town, label: "(Town)", label_style: "#979797 10px", width: "w-[180px]", right_aligned: true }
      - { name: county, label: "(County)", label_style: "#979797 10px", width: "w-[180px]", right_aligned: true }
      - { name: postcode, label: "(Postcode)", label_style: "#979797 10px", width: "w-[180px]", right_aligned: true }
      - { name: telephone, label: "Telephone", layout: "half-width left" }
      - { name: fax, label: "Fax", layout: "half-width right" }
    footer:
      border_top: "1px solid #BBBBBB"
      buttons:
        - { text: "Ok", icon: Check, variant: primary, action: "validate and create" }
        - { text: "Cancel", icon: X, variant: secondary, action: close }
    behavior:
      validation: "Alert if brokerName is empty"
      on_ok: "createBroker mutation with form data + status 'Authorised', navigate to new broker, close modal"
      on_cancel: "Close without action"
      keyboard: "Escape closes modal"
      backdrop: "Click outside closes modal"

  - id: locate_ifa_modal
    title: Locate IFA
    trigger: "Locate IFA button in toolbar (IFA Detail tab only)"
    component: LocateIfaModal
    width: "w-[480px]"
    header:
      background: "#00263e"
      text: "Locate IFA"
      close_button: X icon
    search_input:
      placeholder: "Enter IFA reference..."
      autoFocus: true
      keyboard: "Enter triggers search"
    results_table:
      condition: "Shown only after search is submitted"
      columns:
        - { header: "IFA Ref", style: "text-[#005a9c] font-medium" }
        - { header: "Broker Name" }
        - { header: "Postcode" }
      max_height: "200px"
      row_click: "Selects broker (setActiveBrokerId) and closes modal"
      alternating_rows: true
      hover: "bg-[#05579B] text-white"
    footer_buttons:
      - { text: "Find", icon: Search, variant: primary, disabled_when: "search term empty" }
      - { text: "Quit", icon: X, variant: secondary, action: close }
    behavior:
      search: "useListBrokers with ifaReference filter (substring match)"
      on_row_click: "onSelect(broker.id) then onClose()"
      keyboard: "Enter to search, Escape to close"
      backdrop: "Click outside closes modal"

  - id: network_lookup_modal
    title: IFA Network Lookup
    trigger: "Search button next to Network IFA field in Contacts tab"
    component: NetworkLookupModal
    width: "w-[680px]"
    max_height: "80vh"
    header:
      background: "#002f5c"
      text: "IFA Network Lookup"
      close_button: X icon
    search_fields:
      layout: "flex gap-3 items-end"
      fields:
        - { name: ifaRef, label: "IFA Ref.", width: "flex-1" }
        - { name: postcode, label: "Postcode", width: "flex-1" }
        - { name: brokerName, label: "Broker Name", width: "flex-1" }
    action_bar:
      border: "border-b border-[#BBBBBB]"
      buttons:
        - { text: "OK", icon: Check, variant: primary, disabled_when: "no row selected" }
        - { text: "Cancel", icon: X, variant: secondary }
    results_table:
      columns:
        - { header: "IFA_REF" }
        - { header: "POST_CODE" }
        - { header: "BROKER_NAME" }
      max_height: "350px"
      selection_style: "bg-[#05579B] text-white"
      alternating_rows: true
      single_click: "Select row"
      double_click: "Select and confirm (calls onSelect immediately)"
    status_bar:
      text: "{count} record(s) found — click to select, double-click to confirm"
      font: "Mulish 10px #979797"
    behavior:
      filtering: "Live real-time filter on all three fields (case-insensitive substring match on full broker list)"
      on_ok: "Calls onSelect(ifaRef, brokerName, postcode), sets networkOverrides in ContactsTab"
      on_cancel: "Close without action"
      result_on_contacts_form:
        - "Network IFA field: filled with selected broker's ifaRef"
        - "Network Name field: filled with selected broker's brokerName (read-only, grey bg)"
        - "Postcode field: filled with selected broker's postcode (read-only, grey bg)"
        - "Overrides reset when user navigates to a different contact"

  - id: club_modal
    title: Add / Search Clubs
    trigger: "Club button in Lookups tab search criteria"
    component: ClubModal
    width: "w-[640px]"
    header:
      background: "#00263e"
      text: "Add / Search Clubs"
      close_button: X icon
    search_fields:
      layout: "flex items-end gap-4"
      fields:
        - { name: clubName, label: "Club Name", width: "w-[200px]" }
        - { name: clubReference, label: "Club Reference", width: "w-[150px]" }
        - { name: postCode, label: "Post Code", width: "w-[120px]" }
    results_table:
      container: "border border-[#BBBBBB] rounded-lg max-h-[260px] overflow-y-auto"
      column_headers:
        background: "#002f5c"
        text_color: white
        border_bottom: "3px solid #04589b"
      columns:
        - { header: "Club Name" }
        - { header: "Club Reference" }
        - { header: "Post Code" }
        - { header: "Active" }
      selection_style: "bg-[#05579B] text-white"
      alternating_rows: true
      single_click: "Select row"
      double_click: "Close modal"
    footer_buttons:
      - { text: "New", icon: Plus, variant: primary }
      - { text: "Edit", icon: Pencil, variant: secondary }
      - { text: "Cancel", icon: X, variant: secondary, action: close }
    seed_data:
      count: 15
      examples: ["Advise Wise Mortgage Club (MC201491)", "Air Mortgage Club (ER200411)", "Connect Mortgage Club (MC200320)"]
    behavior:
      filtering: "Live real-time filter on clubName, clubReference, postCode (case-insensitive substring)"
      keyboard: "Escape closes modal"
      backdrop: "Click outside closes modal"

app_context:
  provider: AppProvider
  state:
    activeTab:
      type: TabId
      default: "ifa-detail"
      values: [lookups, ifa-detail, contacts, retirement, equity, notes]
    activeBrokerId:
      type: "number | null"
      default: null
      auto_init: "Set to first broker's ID on initial load"
    activeIfaRef:
      type: string
      default: ""
      updated_by: "IfaDetailTab on broker load"
    isDirty:
      type: boolean
      default: false
      tracks: "Whether IFA Detail form has unsaved changes"
    isSaving:
      type: boolean
      default: false
      tracks: "Whether a save operation is in progress"
    layoutVersion:
      type: "'v1' | 'v2'"
      default: v1
      note: "V2 layout exists but is excluded from this digest"
  cross_tab_behavior:
    broker_selection_from_lookups:
      - "User clicks row in Lookups results table"
      - "setActiveBrokerId called with broker ID"
      - "handleSetBroker resets isDirty and auto-switches activeTab to 'ifa-detail'"
      - "IFA Detail tab loads selected broker's data"
    toolbar_visibility:
      - "Toolbar rendered only when activeTab === 'ifa-detail'"
      - "Other tabs show clean content area without broker navigation"
    save_handler_registration:
      - "IfaDetailTab registers its handleSave function via registerSaveHandler"
      - "Toolbar Save Changes button calls triggerSave, which invokes the registered handler"
      - "Handler is unregistered on tab unmount"

data_store:
  provider: DataStoreProvider
  wraps: AppProvider
  storage: "React useState (in-memory, session-only)"
  initialization: "Seed data arrays cloned via spread operator"
  id_generation: "useRef counters seeded from max existing IDs + 1"
  immutability: "State updates via functional setState (prev => [...prev, newItem] or prev.map(...))"
  persistence: "None — all data lost on page refresh"

ascii_layout:
  global_shell: |
    +============================================================================================+
    |  [LV= Logo]                                                                    [Logout]    |
    |  ________________________________________________________________________________________  |
    |  IFA Lite                                                                                  |
    +============================================================================================+
    | [IFA Detail] | [Contacts] | [Lookups] | [Retirement Income] | [Equity Release] | [Notes]   |
    +--------------------------------------------------------------------------------------------+
    |  << TOOLBAR — only on IFA Detail tab >>                                                    |
    +--------------------------------------------------------------------------------------------+
    |                                                                                            |
    |                              << TAB CONTENT AREA >>                                        |
    |                                                                                            |
    +--------------------------------------------------------------------------------------------+
    |  [LV= Logo]              Liverpool Victoria Financial Services Limited                     |
    |                           County Gates, Bournemouth BH1 2NF                                |
    +============================================================================================+

  ifa_detail_toolbar: |
    +--------------------------------------------------------------------------------------------+
    | |Broker: {ref}| [Appointment v] | [|<][<] N of M [>][>|] |  [New IFA][Locate IFA] | [Save] |
    +--------------------------------------------------------------------------------------------+

  ifa_detail_content: |
    +---------------------------------------------------+------------------------------+
    | GENERAL INFORMATION                               | ASSOCIATED CONTACTS          |
    |                                                   |------------------------------|
    |  LEFT COL             |  RIGHT COL                | Ref | Name       | Position  |
    |  Broker Name [____]   |  Trading Name [____]      |-----|------------|-----------|
    |  Address 1   [____]   |  FCA Ref      [____]      | 001 | Mr RG Green| Director  |
    |  Address 2   [____]   |  Ann TOBA  (o)Y (o)N      | 002 | Mrs LG Grn | Compl Off |
    |  Town        [____]   |  Status    [________v]    +------------------------------+
    |  County      [____]   |  Sent Date   [____]       |
    |  Postcode    [____]   |  Grade     [________v]    |
    |  Telephone   [____]   |  Next Diary  [____]       |
    |  Fax         [____]   |  IFA Member  [____]       |
    |  Email       [____]   |  Broker Mgr [________v]  |
    |  Initials    [____]   |  Key Acct   [________v]  |
    |  Date Chkd   [____]   |  Partner Cd  [____]       |
    |                       |  Region     [________v]  |
    |---------------------------------------------------|
    | Created By: X on date  |  Amended By: Y on date  |
    +---------------------------------------------------+

  contacts_content: |
    +--------------------------------------------------------------------------------------------+
    | Contact 1 of 2  [<][>]                                         [Add New] [Save Contact]    |
    +--------------------------------------------------------------------------------------------+
    | LEFT COLUMN                          | RIGHT COLUMN                                        |
    |                                      |                                                     |
    | += PERSONAL DETAILS ===============+ | += IFA BANK DETAIL ===============+                 |
    | | Ref [001] Title [Mr v] Init [RG] | | | Paid By BACS (o)Y (o)N         |                 |
    | | Forename [______] Surname [____] | | | Bank Sort Code [_____________] |                 |
    | | Salutation [____] Position [___] | | | Bank Acct No   [_____________] |                 |
    | +==================================+ | | Bank Acct Name [_____________] |                 |
    |                                      | | Bank Reference [_____________] |                 |
    | += CONTACT INFORMATION ============+ | +==================================+                |
    | | Addr 1-4   [____] x 4           | |                                                     |
    | | Home Tel   [____]               | | += NETWORK RELATED DETAIL ========+                 |
    | | Mobile     [____]               | | | [x] Use terms from principal..  |                 |
    | | Email      [____]               | | | Advice Type  [v]  Network (o)(o)|                 |
    | +==================================+ | | Remun Basis  [v]  Tied Agt(o)(o)|                 |
    |                                      | | Dist Channel [__] Principal(o)(o)|                |
    |                                      | +==================================+                |
    |                                      |                                                     |
    |                                      | += IFA MEMBER DETAIL =============+                |
    |                                      | | Network IFA [__________] [Q]    |                |
    |                                      | | Network Name [__________]       |                |
    |                                      | | Postcode     [__________]       |                |
    |                                      | +==================================+                |
    +--------------------------------------------------------------------------------------------+

  lookups_content: |
    +--------------------------------------------------------------------------------------------+
    | += SEARCH CRITERIA =======================================================================+|
    | | Postcode [____] IFA Ref [____] IFA Name [______] Status [Authorised v] [Search] [Club] ||
    | +========================================================================================+|
    |                                                                                            |
    | +========================================================================================+|
    | | SEARCH RESULTS (13)                                     Click a row to view details     ||
    | |----------------------------------------------------------------------------------------|
    | | IFA_REF | BROKER_NO | FIMBRA_NO | BROKER_NAME | ... (75 columns, horizontal scroll)    ||
    | |---------|-----------|-----------|-------------|----------------------------------------||
    | | A G S-001| BRK001   | FIM001    | AF          | ...                                   ||
    | +========================================================================================+|
    +--------------------------------------------------------------------------------------------+

  retirement_content: |
    +--------------------------------------------------------------------------------------------+
    | [Retirement Income Commission & Fee Configuration]                                         |
    |                                                                                            |
    | += NON PROFIT ANNUITY ====================================================================+|
    | | Adv charges % [__] | Expense Disc [__] | [+ Advice Type/Dist Channel]                  ||
    | | Amount        [__] | Mktg Allow   [__] | [+ Special deals]                             ||
    | | Commission %  [__] |                   |                                                ||
    | +========================================================================================+|
    |                                                                                            |
    | += PIPA ==================================================================================+|
    | | (same structure)                                                                        ||
    | +========================================================================================+|
    |                                                                                            |
    | += PRP ===================================================================================+|
    | | (same structure)                                                                        ||
    | +========================================================================================+|
    |                                                                    [Save Configuration]    |
    +--------------------------------------------------------------------------------------------+

  equity_release_content: |
    +--------------------------------------------------------------------------------------------+
    | += PERMISSIONS ============+  += CLUB MEMBERSHIP =================+                       |
    | | Mortgage Perm (o)Y (o)N  |  | Name | Ref |                     |                       |
    | | ERLM TOBA     (o)Y (o)N  |  | (empty)     |                     |                       |
    | +=========================+  | [Add][Edit][View][Remove]          |                       |
    |                              +====================================+                       |
    |                                                                                            |
    | += FLEXIBLE COMMISSION ===+  += LUMP SUM COMMISSION ==============+                       |
    | | Broker Rate [____]      |  | Broker Rate [____]                 |                       |
    | | Min Amount  [____]      |  | Min Amount  [____]                 |                       |
    | | Network Rate[____]      |  | Network Rate[____]                 |                       |
    | | [x] Trail Commission    |  +====================================+                       |
    | +========================+                                                                |
    |                              += LUMP SUM SPECIAL DEALS ===========+                       |
    | += FLEXIBLE SPECIAL DEALS +  | Age |Excl%|(+/-)|Disc%|Cash Back   |                       |
    | | Age |Excl%|(+/-)|Disc%|CB  | 60-65|[  ]|[ ]  |[  ]|[       ]   |                       |
    | | 60-65|[ ]|[ ] |[ ]|[ ]    | ...  |    |     |    |             |                       |
    | | ...  |   |    |   |       | 91+  |[  ]|[ ]  |[  ]|[       ]   |                       |
    | | 91+  |[ ]|[ ] |[ ]|[ ]   +=====================================+                       |
    | +========================+                                                                |
    |                              += LUMP SUM VALUATION ===============+                       |
    | += FLEXIBLE VALUATION ===+   | [x] Free Up to: [__] or [______]  |                       |
    | | [x] Free Up to: [__]  |   | [x] Fee discount: [__]            |                       |
    | | [x] Fee discount: [__]|   | [x] Refund discount on completion |                       |
    | | [x] Refund disc compl |   | [x] Reduce fees upfront           |                       |
    | | [x] Reduce fees upfrt |   +=====================================+                       |
    | +========================+                                                                |
    |                              += LUMP SUM FEES ====================+                       |
    | += FLEXIBLE FEES ========+   | Packaging Fee  [____]              |                       |
    | | Packaging Fee  [____]  |   | Application Fee[____]              |                       |
    | | Application Fee[____]  |   | LTV % (+/-)    [____]              |                       |
    | | LTV % (+/-)    [____]  |   +=====================================+                       |
    | +========================+                                                                |
    +--------------------------------------------------------------------------------------------+

  notes_content: |
    +--------------------------------------------------------------------------------------------+
    | [History] Audit Trail & Notes                                            [Add Note]        |
    +--------------------------------------------------------------------------------------------+
    | +========================================================================================+|
    | |     |                                                                                  ||
    | | SYS | Grade updated by KHARVEY on 15/01/2025                                           ||
    | |     | OLD VALUE : Regional                                                             ||
    | |     | NEW VALUE : National Accounts                                                    ||
    | |-----|---------------------------------------------------------------------------------||
    | | MAN | Annual review completed. All documentation up to date.                           ||
    | |-----|---------------------------------------------------------------------------------||
    | | SYS | Broker Manager updated by ADMIN on 10/06/2024                                    ||
    | |     | OLD VALUE : David Thompson                                                       ||
    | |     | NEW VALUE : Keith Harvey                                                         ||
    | +========================================================================================+|
    +--------------------------------------------------------------------------------------------+

  insert_ifa_modal: |
    +========================================+
    | Insert IFA                         [X] |
    +----------------------------------------+
    | Broker Name                            |
    | [________________________________]     |
    | [________________________________]     | <- Addr 1
    | [________________________________]     | <- Addr 2
    |                   (Town)  [________]   |
    |                 (County)  [________]   |
    |               (Postcode)  [________]   |
    | Telephone         Fax                  |
    | [______________]  [______________]     |
    | ────────────────────────────────────   |
    |                      [Ok]  [Cancel]    |
    +========================================+

  locate_ifa_modal: |
    +============================================+
    | Locate IFA                             [X] |
    +--------------------------------------------+
    | [Enter IFA reference..._____________]      |
    |                                            |
    | IFA Ref  | Broker Name   | Postcode        |  <- after search
    | ---------|---------------|----------        |
    | A G S-001| AF            | HP4 3QZ          |
    |                                            |
    |                       [Find]  [Quit]       |
    +============================================+

  network_lookup_modal: |
    +================================================================+
    | IFA Network Lookup                                         [X] |
    +----------------------------------------------------------------+
    | IFA Ref. [______]  Postcode [______]  Broker Name [______]     |
    +----------------------------------------------------------------+
    | [OK]  [Cancel]                                                 |
    +----------------------------------------------------------------+
    | IFA_REF    | POST_CODE  | BROKER_NAME                         |
    | -----------|------------|-----------------------------         |
    | A G S-001  | HP4 3QZ    | AF                                  |
    | A J B-001  | DL5 7DW    | Aldton Park Financial..             |
    +----------------------------------------------------------------+
    | 13 records found — click to select, double-click to confirm    |
    +================================================================+

  club_modal: |
    +======================================================+
    | Add / Search Clubs                               [X] |
    +------------------------------------------------------+
    | Club Name [________]  Club Ref [______]  Post [____] |
    +------------------------------------------------------+
    | Club Name              | Club Ref | Post  | Active   |
    | -----------------------|----------|-------|--------  |
    | Advise Wise Mortgage   | MC201491 | LS15..| Yes      |
    | Air Mortgage Club      | ER200411 | GL1.. | Yes      |
    +------------------------------------------------------+
    |                          [New]  [Edit]  [Cancel]     |
    +======================================================+
