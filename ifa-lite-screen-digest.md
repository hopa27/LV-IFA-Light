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
  persistence: None — all data lost on page refresh

global_components:

  header:
    component: Layout
    sticky: false
    background: "#00263e"
    height: auto
    padding: px-[142px] pt-4 pb-6

    elements:
      top_row:
        - logo:
            src: /lve-logo.png
            height: h-6
            position: left

        - logout_button:
            text: Logout
            variant: primary
            shape: rounded-full
            position: right

      divider:
        type: hr
        color: slate-600/50
        width: full

      title:
        text: IFA Lite
        font_family: Livvic
        font_size: 30px
        font_weight: normal
        color: white

  tab_bar:
    component: Layout
    background: white
    padding: px-[142px] pt-4
    border_bottom: 1px solid #BBBBBB

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

    active_tab_style:
      background: white
      text_color: "#4a4a49"
      border_top: 2px solid #006cf4
      border_left: 1px solid #BBBBBB
      border_right: 1px solid #BBBBBB
      margin_bottom: -1px
      shadow: 0 -2px 8px rgba(0,0,0,0.08)

    inactive_tab_style:
      background: "#eaf5f8"
      text_color: "#0d2c41"
      hover: "#dceef3"

  toolbar:
    component: Layout
    visibility: only rendered when activeTab equals ifa-detail
    sticky: true
    top: 0
    z_index: 20
    background: white
    border_top: 1px solid #BBBBBB
    border_bottom: 1px solid #BBBBBB
    padding: px-[142px] py-3
    layout: flex justify-between items-center

    elements:
      left_section:
        - broker_badge:
            condition: activeIfaRef is not empty
            text: "Broker: {activeIfaRef}"
            accent_bar: w-1 h-5 bg-[#006cf4]
            font_size: 14px
            font_weight: semibold
            color: "#00263e"

        - divider:
            type: vertical
            color: "#BBBBBB"

        - action_combobox:
            component: Combobox
            width: 200px
            default: Appointment
            options:
              - Appointment
              - Broker Pack Follow Up
              - Duplicate
              - Hold

        - divider:
            type: vertical
            color: "#BBBBBB"

        - navigation_group:
            layout: flex items-center gap-2

            buttons:
              - first:
                  icon: ChevronFirst
                  title: First Record
                  size: 44x44px
                  shape: rounded-[30px]
                  border: 1px solid #04589b
                  hover: bg-[#003578] text-white
                  disabled: opacity-30

              - prev:
                  icon: ChevronLeft
                  title: Previous Record
                  size: 44x44px
                  shape: rounded-[30px]
                  border: 1px solid #04589b
                  hover: bg-[#003578] text-white
                  disabled: opacity-30

              - counter:
                  text: "{currentIndex + 1} of {total}"
                  font_size: 13px
                  font_weight: bold
                  color: "#3d3d3d"
                  padding: px-3

              - next:
                  icon: ChevronRight
                  title: Next Record
                  size: 44x44px
                  shape: rounded-[30px]
                  border: 1px solid #04589b
                  hover: bg-[#003578] text-white
                  disabled: opacity-30

              - last:
                  icon: ChevronLast
                  title: Last Record
                  size: 44x44px
                  shape: rounded-[30px]
                  border: 1px solid #04589b
                  hover: bg-[#003578] text-white
                  disabled: opacity-30

      right_section:
        - new_ifa_button:
            text: New IFA
            icon: FilePlus2
            variant: secondary
            action: opens InsertIfaModal
            disabled_when: createBrokerMutation.isPending

        - locate_ifa_button:
            text: Locate IFA
            icon: ScanSearch
            variant: secondary
            action: opens LocateIfaModal

        - divider:
            type: vertical
            color: "#BBBBBB"

        - save_button:
            text: Save Changes
            icon: Save
            icon_saving: RefreshCw (spinning)
            variant: primary
            disabled_when: not isDirty or isSaving
            action: triggerSave

  footer:
    component: Layout
    background: white
    border_top: 1px solid slate-200
    padding: py-4 px-[142px]
    layout: flex justify-between items-center

    elements:
      left:
        - logo:
            src: /lve-logo.png
            height: h-6

      right:
        - company_info:
            line1: Liverpool Victoria Financial Services Limited
            line2: County Gates, Bournemouth BH1 2NF
            font_family: Mulish
            font_size: 10px
            color: slate-400

  shared_field_components:

    fieldset:
      element: fieldset
      border: 1px solid #BBBBBB
      border_radius: rounded-lg
      padding: p-4 pt-2
      background: white
      legend:
        font_family: Livvic
        font_size: text-xs
        font_weight: bold
        color: "#006cf4"
        text_transform: uppercase
        letter_spacing: wider

    form_input:
      layout: flex items-center gap-3 mb-2
      label:
        width: w-1/3
        text_align: right
        font_family: Livvic
        font_size: 12px
        font_weight: semibold
        color: "#3d3d3d"
      input:
        flex: flex-1
        padding: px-3 py-1.5
        font_family: Mulish
        font_size: 14px
        color: "#3d3d3d"
        border: 1px solid #BBBBBB
        border_radius: rounded-lg
        focus: border-[#178830] ring-2 ring-[#178830]
        hover: border-[#178830]
        disabled: bg-[#CCCCCC] border-[#ACACAC]

    form_select:
      component: Combobox (cmdk-based)
      layout: same as form_input
      features:
        - Type-ahead search filtering
        - ChevronDown indicator
        - Keyboard navigation
        - Click-outside to close

    form_radio_group:
      layout: flex items-center gap-3 mb-2
      label_width: w-1/3
      label_align: right
      options_layout: flex gap-4
      accent_color: "#006cf4"

    form_checkbox:
      layout: flex items-center gap-2 mb-2
      size: w-4 h-4
      accent_color: "#178830"

    button:
      shape: rounded-full
      padding: px-6 py-2
      font_family: Livvic
      font_size: 14px
      font_weight: semibold
      icon_gap: gap-2
      variants:
        primary:
          background: "#006cf4"
          text_color: white
          hover: "#003578"
          disabled: "#979797"
        secondary:
          background: white
          text_color: "#04589b"
          border: 1px solid #04589b
          hover: bg-[#003578] text-white
          font_weight: bold
        outline:
          background: white
          text_color: "#3d3d3d"
          border: 1px solid #BBBBBB
          hover: border-[#006cf4] text-[#006cf4]

screens:

  - id: ifa_detail
    title: IFA Detail
    tab_id: ifa-detail
    component: IfaDetailTab
    url: /
    state: default_tab_on_load
    toolbar_visible: true

    layout:
      display: flex
      gap: gap-6
      left_panel:
        flex: flex-1
        min_width: 600px
      right_panel:
        width: w-[350px]

    components:

      section_header:
        text: GENERAL INFORMATION
        font_family: Livvic
        font_size: text-xs
        font_weight: bold
        color: "#006cf4"
        text_transform: uppercase
        letter_spacing: wider
        border_bottom: 2px solid rgba(0,107,244,0.2)
        padding_bottom: pb-1
        margin_bottom: mb-3

      form_grid:
        display: grid
        columns: 2
        gap_x: gap-x-8
        gap_y: gap-y-1

        left_column:
          - broker_name:
              component: FormInput
              label: Broker Name
              field: brokerName
              editable: true

          - address_line_1:
              component: FormInput
              label: Address Line 1
              field: addressLine1
              editable: true

          - address_line_2:
              component: FormInput
              label: Address Line 2
              field: addressLine2
              editable: true

          - town:
              component: FormInput
              label: Town
              field: town
              editable: true

          - county:
              component: FormInput
              label: County
              field: county
              editable: true

          - postcode:
              component: FormInput
              label: Postcode
              field: postcode
              editable: true

          - telephone:
              component: FormInput
              label: Telephone
              field: telephone
              editable: true

          - fax:
              component: FormInput
              label: Fax
              field: fax
              editable: true

          - email:
              component: FormInput
              label: Email
              field: email
              editable: true

          - initials:
              component: FormInput
              label: Initials
              field: initials
              editable: true

          - date_checked:
              component: FormInput
              label: Date Checked
              field: dateChecked
              editable: true

        right_column:
          - trading_name:
              component: FormInput
              label: Trading Name
              field: tradingName
              editable: true

          - fca_reference:
              component: FormInput
              label: FCA Reference
              field: fcaReference
              editable: true

          - annuity_toba:
              component: FormRadioGroup
              label: Annuity TOBA
              field: annuityToba
              options:
                - Yes
                - No

          - status:
              component: FormSelect
              label: Status
              field: status
              options:
                - Authorised
                - Cancelled
                - Revoked
                - Duplicate Record

          - sent_date:
              component: FormInput
              label: Sent Date
              field: sentDate
              editable: true

          - grade:
              component: FormSelect
              label: Grade
              field: grade
              options:
                - National Accounts
                - Major Accounts
                - Nursery Accounts
                - Others
                - Networks
                - Annuity Accounts
                - Regional
                - Standard

          - next_diary_date:
              component: FormInput
              label: Next Diary Date
              field: nextDiaryDate
              editable: true

          - ifa_member_no:
              component: FormInput
              label: IFA Member No
              field: ifaMemberNo
              editable: true

          - broker_manager:
              component: FormSelect
              label: Broker Manager
              field: brokerManager
              options:
                - Stuart Watson
                - Trudy Davidson
                - Natalie Pye
                - Keith Harvey
                - Amit Mishra
                - Shaun King
                - Robot Machine
                - Sarah Collins
                - David Thompson
                - James Whitaker
                - Helen Carter
                - Mark Reynolds
                - Lisa Brennan
                - Paul Henderson

          - key_account:
              component: FormSelect
              label: Key Account
              field: keyAccount
              options: A through Z single letters

          - partner_code:
              component: FormInput
              label: Partner Code
              field: partnerCode
              editable: true

          - region:
              component: FormSelect
              label: Region
              field: region
              options:
                - BIR
                - BRI
                - CDF
                - EDI
                - EXE
                - GLA
                - HEO
                - HIT
                - LEE
                - LON
                - MAN
                - MID
                - NEW
                - NOR
                - NOT
                - REA
                - SOU

      audit_footer:
        background: "#eaf5f8"
        border_radius: rounded-lg
        padding: p-3
        font_family: Mulish
        font_size: 12px
        color: "#979797"
        layout: flex justify-between
        left_text: "Created By: {createdBy} on {createdDate}"
        right_text: "Amended By: {amendedBy} on {amendedDate}"

      associated_contacts_panel:
        position: right panel
        width: w-[350px]

        header:
          text: ASSOCIATED CONTACTS
          background: "#002f5c"
          text_color: white
          font_family: Livvic
          font_size: 12px
          font_weight: bold
          text_transform: uppercase
          letter_spacing: wider
          padding: px-3 py-2.5

        table:
          columns:
            - header: Ref
              field: reference
              font_weight: semibold
              color: "#005a9c"

            - header: Name
              field: computed (title + initials + surname)

            - header: Position
              field: position
              max_width: 100px
              overflow: truncate

          row_hover: bg-[#05579B] text-white
          alternating_rows: true
          empty_state: No contacts found

    states:
      default:
        description: Broker data loaded into form. Original snapshot stored for dirty tracking.
      dirty:
        description: One or more fields changed vs original. isDirty flag set to true. Save button enabled.
      saving:
        description: Save in progress. Spinner shown on save button.
      no_broker:
        icon: AlertCircle
        heading: No Broker Selected
        body: Please select a broker from the Lookups tab first.

    behaviors:
      on_load:
        - Broker data loaded into form state from useGetBroker
        - Original data snapshot stored for dirty tracking
        - activeIfaRef set from broker.ifaRef
        - Save handler registered via registerSaveHandler

      on_field_change:
        - formData updated in local state
        - isDirty calculated by deep comparison of formData vs originalData

      on_save:
        - updateBroker mutation called with full formData
        - For each changed field a SYS note is created via addNote
        - Note description format: "{FieldLabel} updated by SYSTEM on {today}"
        - Note includes oldValue and newValue
        - On success: originalData reset to current formData, isDirty set to false

  - id: contacts
    title: Contacts
    tab_id: contacts
    component: ContactsTab
    toolbar_visible: false

    layout:
      display: flex flex-col
      min_height: min-h-full

    components:

      top_bar:
        layout: flex justify-between items-center
        border_bottom: 1px solid #BBBBBB
        margin_bottom: mb-4
        padding_bottom: pb-2

        left_section:
          - counter:
              text: "Contact {currentIndex + 1} of {contacts.length}"
              font_family: Livvic
              font_size: 14px
              font_weight: bold
              color: "#00263e"

          - prev_button:
              icon: ChevronLeft
              variant: outline
              shape: rounded-full

          - next_button:
              icon: ChevronRight
              variant: outline
              shape: rounded-full

        right_section:
          - add_new_button:
              text: Add New
              icon: Plus
              variant: secondary

          - save_contact_button:
              text: Save Contact
              icon: Save
              variant: primary

      main_grid:
        display: grid
        columns: 2
        gap_x: gap-x-8
        gap_y: gap-y-4
        responsive: grid-cols-1 lg:grid-cols-2

      left_column:

        personal_details:
          component: Fieldset
          title: PERSONAL DETAILS

          fields:
            - reference:
                component: FormInput
                label: Reference
                field: reference
                read_only: true
                background: "#eaf5f8"
                font_weight: bold
                color: "#006cf4"

            - title_initials_row:
                layout: flex gap-2
                fields:
                  - title:
                      component: FormSelect
                      label: Title
                      field: title
                      options:
                        - Mr
                        - Mrs
                        - Ms
                        - Dr
                        - Miss
                  - initials:
                      component: FormInput
                      label: Initials
                      label_width: w-16
                      field: initials

            - forename:
                component: FormInput
                label: Forename
                field: forename

            - surname:
                component: FormInput
                label: Surname
                field: surname

            - salutation:
                component: FormInput
                label: Salutation
                field: salutation

            - position:
                component: FormInput
                label: Position
                field: position

        contact_information:
          component: Fieldset
          title: CONTACT INFORMATION

          fields:
            - address_line_1:
                component: FormInput
                label: Address Line 1
                field: addressLine1

            - address_line_2:
                component: FormInput
                label: Address Line 2
                field: addressLine2

            - address_line_3:
                component: FormInput
                label: Address Line 3
                field: addressLine3

            - address_line_4:
                component: FormInput
                label: Address Line 4
                field: addressLine4

            - separator:
                type: hr
                border: 1px solid #BBBBBB
                margin: mt-4 pt-4

            - home_telephone:
                component: FormInput
                label: Home Tel
                field: homeTelephone

            - mobile_telephone:
                component: FormInput
                label: Mobile Tel
                field: mobileTelephone

            - email:
                component: FormInput
                label: Email
                field: emailAddress
                type: email

      right_column:

        ifa_bank_detail:
          component: Fieldset
          title: IFA BANK DETAIL

          fields:
            - paid_by_bacs:
                component: FormRadioGroup
                label: Paid By BACS
                field: paidByBacs
                options:
                  - Yes
                  - No

            - bank_sort_code:
                component: FormInput
                label: Bank Sort Code
                field: bankSortCode

            - bank_account_no:
                component: FormInput
                label: Bank Account No.
                field: bankAccountNo

            - bank_account_name:
                component: FormInput
                label: Bank Account Name
                field: bankAccountName

            - bank_reference:
                component: FormInput
                label: Bank Reference
                field: bankReference

        network_related_detail:
          component: Fieldset
          title: NETWORK RELATED DETAIL

          fields:
            - use_network_terms:
                component: FormCheckbox
                label: Use terms from principal agent/network
                field: useNetworkTerms
                indent: pl-[33%]

            - default_advice_type:
                component: FormSelect
                label: Default Advice Type
                field: defaultAdviceType
                options:
                  - Independent
                  - Restricted

            - remuneration_basis:
                component: FormSelect
                label: Remuneration Basis
                field: defaultRemunerationBasis
                options:
                  - Fee
                  - Commission

            - distribution_channel:
                component: FormInput
                label: Distribution Channel
                field: defaultDistributionChannel

            - sub_grid:
                layout: grid grid-cols-2 gap-4 mt-4
                left:
                  - network:
                      component: FormRadioGroup
                      label: Network
                      field: network
                      options: [Y, N]
                  - tied_agent:
                      component: FormRadioGroup
                      label: Tied Agent
                      field: tiedAgent
                      options: [Yes, No]
                  - principal:
                      component: FormRadioGroup
                      label: Principal
                      field: isPrincipal
                      options: [Y, N]
                right:
                  - restricted:
                      component: FormSelect
                      label: Restricted
                  - simplified:
                      component: FormSelect
                      label: Simplified
                  - non_advised:
                      component: FormSelect
                      label: Non Advised

        ifa_member_detail:
          component: Fieldset
          title: IFA MEMBER DETAIL

          fields:
            - network_ifa:
                layout: flex items-center gap-3 mb-2
                label: Network IFA
                label_width: w-1/3
                label_align: right
                input:
                  type: text
                  read_only: true
                  flex: flex-1
                search_button:
                  icon: Search
                  size: w-3 h-3
                  variant: outline
                  action: opens NetworkLookupModal

            - network_name:
                component: FormInput
                label: Network Name
                field: networkName
                read_only: true
                background: "#CCCCCC"

            - network_postcode:
                component: FormInput
                label: Postcode
                field: networkPostcode
                read_only: true
                background: "#CCCCCC"

        network_members:
          component: Fieldset
          title: NETWORK MEMBERS

          table:
            columns:
              - header: IFA Ref
              - header: Broker Name
              - header: Post Code
            border: 1px solid #BBBBBB
            border_radius: rounded-lg
            empty_state: No network members

        principal_agent:
          component: Fieldset
          title: PRINCIPAL AGENT

          layout: flex gap-2 items-center
          fields:
            - principal_agent_ref:
                component: FormInput
                label: Principal Agent Ref
                field: principalAgentRef
            - search_button:
                icon: Search
                variant: outline
            - clear_button:
                text: Clr
                variant: outline

    states:
      default:
        description: First contact loaded for active broker. Network overrides null.
      no_broker:
        text: Please select a broker first.

    behaviors:
      contact_navigation:
        - Prev/Next buttons cycle currentIndex through contacts array
        - Counter displays "Contact X of Y"
        - On contact change, networkOverrides reset to null

      network_ifa_lookup:
        - Search button opens NetworkLookupModal
        - On selection, networkOverrides set with ifaRef, brokerName, postcode
        - Displayed values use override then fall back to contact field then empty string
        - Overrides reset when navigating to different contact

  - id: lookups
    title: Lookups
    tab_id: lookups
    component: LookupsTab
    toolbar_visible: false

    components:

      search_criteria:
        component: Fieldset
        title: SEARCH CRITERIA
        layout: flex items-end gap-4 flex-wrap

        fields:
          - postcode:
              component: FormInput
              label: Postcode
              width: w-[140px]
              placeholder: e.g. EC1A

          - ifa_reference:
              component: FormInput
              label: IFA Reference
              width: w-[140px]

          - ifa_name:
              component: FormInput
              label: IFA Name
              width: w-[180px]

          - status:
              component: Combobox
              label: Status
              width: w-[170px]
              default: Authorised
              options:
                - Authorised
                - Cancelled
                - Duplicate Record
                - Revoked

        buttons:
          position: ml-auto

          - search_button:
              text: Search
              icon: Search
              variant: primary
              width: w-28
              action: handleSearch

          - club_button:
              text: Club
              icon: Building
              variant: secondary
              width: w-28
              action: opens ClubModal

      results_table:
        container:
          background: white
          border: 1px solid #BBBBBB
          border_radius: rounded-lg
          shadow: shadow-sm
          overflow: hidden

        header_bar:
          background: "#002f5c"
          border_bottom: 3px solid #04589b
          text: "Search Results ({count})"
          sub_text: Click a row to view details
          font_family: Livvic
          font_size: 14px
          font_weight: semibold
          color: white
          text_transform: uppercase

        table:
          total_columns: 75
          scrolling: horizontal overflow-auto
          min_width: computed as columns * 140px

          column_headers:
            background: "#eaf5f8"
            sticky: true
            border_bottom: 3px solid #04589b
            font_family: Livvic
            font_size: 12px
            font_weight: semibold
            color: "#002f5c"

          rows:
            alternating: "white / rgba(231,235,236,0.2)"
            hover: bg-[#05579B] text-white
            cursor: pointer

          ifa_ref_column:
            font_weight: medium
            color: "#005a9c"
            text_decoration: underline

          on_row_click: setActiveBrokerId then auto-switch to ifa-detail tab

    states:
      default:
        description: Search form shown. Results empty until first search.
      results:
        description: Results table populated with matching brokers.

    behaviors:
      on_search:
        - Filters built from form fields
        - Postcode uses prefix match
        - IFA Reference and IFA Name use substring match
        - Status uses exact match
        - useListBrokers called with filter params
        - Results displayed synchronously from in-memory data

      on_row_click:
        - setActiveBrokerId called with clicked broker id
        - AppContext handleSetBroker resets isDirty
        - activeTab automatically switches to ifa-detail

  - id: retirement
    title: Retirement Income
    tab_id: retirement
    component: RetirementTab
    toolbar_visible: false

    components:

      banner:
        text: Retirement Income Commission & Fee Configuration
        background: "#eaf5f8"
        border: 1px solid rgba(4,88,155,0.3)
        color: "#002f5c"
        padding: px-4 py-2.5
        border_radius: rounded-lg
        font_size: text-sm
        font_weight: semibold

      product_sections:
        count: 3
        layout: vertical stack gap-4

        items:
          - title: NON PROFIT ANNUITY
            prefix: npa

          - title: PIPA
            prefix: pipa

          - title: PRP
            prefix: prp

        each_section:
          component: Fieldset
          inner_layout: grid grid-cols-3 gap-6

          column_1:
            - default_adviser_charges:
                component: FormInput
                label: Default adviser charges %
                field: "{prefix}AdviserCharges"

            - amount:
                component: FormInput
                label: Amount
                field: "{prefix}Amount"

            - default_commission:
                component: FormInput
                label: Default Commission %
                field: "{prefix}Commission"

          column_2:
            - expense_discount:
                component: FormInput
                label: Expense Discount
                field: "{prefix}ExpenseDiscount"

            - marketing_allowance:
                component: FormInput
                label: Marketing allowance
                field: "{prefix}MarketingAllowance"

          column_3:
            border_left: 1px solid #BBBBBB
            padding_left: pl-6

            buttons:
              - advice_type_button:
                  text: Advice Type/Distribution Channel pricing
                  icon: PlusCircle (green)
                  variant: secondary

              - special_deals_button:
                  text: Special deals
                  icon: PlusCircle (blue)
                  variant: secondary

      save_button:
        position: flex justify-end mt-4
        text: Save Configuration
        variant: primary
        width: w-40

    states:
      default:
        description: Product sections loaded with broker retirement income data.
      no_broker:
        text: Please select a broker first.

  - id: equity_release
    title: Equity Release
    tab_id: equity
    component: EquityReleaseTab
    toolbar_visible: false

    layout:
      display: flex flex-col
      min_height: min-h-full
      top_row: grid grid-cols-2 gap-6 mb-4
      main_area: grid grid-cols-2 gap-6

    components:

      permissions:
        component: Fieldset
        title: PERMISSIONS
        position: top left

        fields:
          - mortgage_permissions:
              component: FormRadioGroup
              label: Mortgage Permissions
              field: mortgagePermissions
              options: [Yes, No]

          - erlm_toba:
              component: FormRadioGroup
              label: ERLM TOBA
              field: erlmToba
              options: [Yes, No]

      club_membership:
        component: Fieldset
        title: CLUB MEMBERSHIP
        position: top right

        table:
          columns:
            - header: Name
            - header: Ref
          max_height: h-24
          empty_state: No memberships

        action_buttons:
          layout: flex gap-2
          buttons:
            - text: Add
              variant: secondary
            - text: Edit
              variant: secondary
            - text: View
              variant: secondary
            - text: Remove
              variant: outline

      flexible_commission:
        component: Fieldset
        title: FLEXIBLE COMMISSION
        position: left column

        fields:
          - broker_rate:
              component: FormInput
              label: Broker Rate
              field: flexibleBrokerRate

          - minimum_amount:
              component: FormInput
              label: Minimum Amount
              field: flexibleMinimumAmount

          - network_rate:
              component: FormInput
              label: Network Rate
              field: flexibleNetworkRate

          - trail_commission:
              component: FormCheckbox
              label: Trail Commission
              field: flexibleTrailCommission
              indent: pl-[33%]

      lump_sum_commission:
        component: Fieldset
        title: LUMP SUM COMMISSION
        position: right column

        fields:
          - broker_rate:
              component: FormInput
              label: Broker Rate
              field: lumpSumBrokerRate

          - minimum_amount:
              component: FormInput
              label: Minimum Amount
              field: lumpSumMinimumAmount

          - network_rate:
              component: FormInput
              label: Network Rate
              field: lumpSumNetworkRate

      flexible_special_deals:
        component: Fieldset
        title: FLEXIBLE SPECIAL DEALS (AGE BANDS)
        position: left column

        table:
          type: editable grid
          alternating_rows: "white / #f4f7f8"
          columns:
            - header: Age Band
              type: label
            - header: Exclusive %
              type: input
              width: w-14
            - header: (+/-)
              type: checkbox
            - header: Discounted %
              type: input
              width: w-14
            - header: Cash Back
              type: input
              width: w-14
          rows:
            - 60-65
            - 66-70
            - 71-75
            - 76-80
            - 81-85
            - 86-90
            - 91+

      lump_sum_special_deals:
        component: Fieldset
        title: LUMP SUM SPECIAL DEALS (AGE BANDS)
        position: right column
        table: same structure as flexible_special_deals

      flexible_valuation:
        component: Fieldset
        title: FLEXIBLE VALUATION
        position: left column

        fields:
          - free_up_to:
              layout: flex items-center gap-2
              items:
                - checkbox: Free Up to
                - input: amount
                - text: or
                - input: max property value
          - fee_discount:
              layout: flex items-center gap-2
              items:
                - checkbox: Fee discount
                - input: amount
          - refund_discount:
              component: FormCheckbox
              label: Refund discount/fee amount on completion
          - reduce_fees:
              component: FormCheckbox
              label: Reduce fees upfront

      lump_sum_valuation:
        component: Fieldset
        title: LUMP SUM VALUATION
        position: right column
        fields: same structure as flexible_valuation

      flexible_fees:
        component: Fieldset
        title: FLEXIBLE FEES
        position: left column

        fields:
          - packaging_fee:
              component: FormInput
              label: Packaging Fee
              field: packagingFee
          - application_fee:
              component: FormInput
              label: Application Fee
              field: applicationFee
          - ltv_percent:
              component: FormInput
              label: LTV % (+ or -)
              field: ltvPercent

      lump_sum_fees:
        component: Fieldset
        title: LUMP SUM FEES
        position: right column

        fields:
          - packaging_fee:
              component: FormInput
              label: Packaging Fee
              field: lumpSumPackagingFee
          - application_fee:
              component: FormInput
              label: Application Fee
              field: lumpSumApplicationFee
          - ltv_percent:
              component: FormInput
              label: LTV % (+ or -)
              field: lumpSumLtvPercent

    states:
      default:
        description: Symmetrical layout. Flexible (left) mirrors Lump Sum (right).
      no_broker:
        text: Please select a broker first.

  - id: notes
    title: Notes
    tab_id: notes
    component: NotesTab
    toolbar_visible: false

    components:

      header_bar:
        layout: flex justify-between items-center mb-4

        left_section:
          - icon:
              component: History
              size: w-5 h-5
              color: "#006cf4"
          - title:
              text: Audit Trail & Notes
              font_family: Livvic
              font_size: 18px
              font_weight: bold
              color: "#00263e"

        right_section:
          - add_note_button:
              text: Add Note
              icon: Plus
              variant: primary

      notes_list:
        container:
          background: white
          border: 1px solid #BBBBBB
          border_radius: rounded-lg
          overflow: auto
          flex: flex-1

        empty_state:
          text: No notes found for this record.
          font_family: Mulish
          color: "#979797"
          text_align: center
          padding: py-12

        note_card:
          layout: flex horizontal
          divider: divide-y divide-[#BBBBBB]
          hover: bg-[#eaf5f8]/50

          left_gutter:
            width: w-10
            background: "#eaf5f8"
            border_right: 1px solid #BBBBBB
            content:
              text: "{note.noteType}"
              writing_mode: vertical-lr
              font_size: 10px
              font_weight: bold
              color: "#006cf4"
              letter_spacing: 2px

          body:
            padding: px-4 py-3
            font_family: Mulish
            font_size: 14px
            color: "#3d3d3d"

            description:
              font_weight: medium

            old_new_values:
              condition: oldValue or newValue is defined
              margin_top: mt-1
              font_size: 12px
              label_style: font-bold uppercase
              label_color: "#979797"
              format:
                - "OLD VALUE : {oldValue or dash}"
                - "NEW VALUE : {newValue or dash}"

    states:
      default:
        description: Notes listed newest first for active broker.
      no_broker:
        text: Please select a broker first.

    behaviors:
      notes_source: useListNotes filtered by activeBrokerId
      auto_notes: SYS notes auto-created when IFA Detail fields are saved (one note per changed field)
      manual_notes: MAN notes created via Add Note button
      sort_order: Newest first (prepended to array by addNote)

modals:

  - id: insert_ifa_modal
    title: Insert IFA
    trigger: New IFA button in toolbar (IFA Detail tab only)
    component: InsertIfaModal
    width: w-[420px]

    header:
      background: "#002f5c"
      text: Insert IFA
      text_color: white
      font_family: Livvic
      font_weight: bold
      close_button:
        icon: X
        color: white
        hover: text-red-300

    fields:
      - broker_name:
          label: Broker Name
          required: true
          auto_focus: true
          full_width: true
          border_radius: rounded-lg

      - address_line_1:
          placeholder: Address Line 1
          full_width: true

      - address_line_2:
          placeholder: Address Line 2
          full_width: true

      - town:
          label: (Town)
          label_color: "#979797"
          label_size: 10px
          width: w-[180px]
          alignment: right

      - county:
          label: (County)
          label_color: "#979797"
          label_size: 10px
          width: w-[180px]
          alignment: right

      - postcode:
          label: (Postcode)
          label_color: "#979797"
          label_size: 10px
          width: w-[180px]
          alignment: right

      - telephone:
          label: Telephone
          layout: half-width left

      - fax:
          label: Fax
          layout: half-width right

    footer:
      border_top: 1px solid #BBBBBB
      padding: pt-3

      buttons:
        - ok_button:
            text: Ok
            icon: Check
            variant: primary
            action: validate then createBroker

        - cancel_button:
            text: Cancel
            icon: X
            variant: secondary
            action: close modal

    states:
      default:
        description: Empty form ready for input.
      validation_error:
        description: Alert shown if brokerName is empty on OK.

    behaviors:
      validation: Alert if brokerName is empty
      on_ok: createBroker with form data plus status Authorised, navigate to new broker, close modal
      on_cancel: Close without action
      keyboard: Escape closes modal
      backdrop: Click outside closes modal

  - id: locate_ifa_modal
    title: Locate IFA
    trigger: Locate IFA button in toolbar (IFA Detail tab only)
    component: LocateIfaModal
    width: w-[480px]

    header:
      background: "#00263e"
      text: Locate IFA
      text_color: white
      close_button:
        icon: X

    search_input:
      placeholder: Enter IFA reference...
      auto_focus: true
      keyboard: Enter triggers search

    results_table:
      condition: Shown only after search is submitted
      max_height: 200px

      columns:
        - header: IFA Ref
          color: "#005a9c"
          font_weight: medium

        - header: Broker Name

        - header: Postcode

      alternating_rows: true
      hover: bg-[#05579B] text-white
      on_row_click: select broker and close modal

    footer:
      buttons:
        - find_button:
            text: Find
            icon: Search
            variant: primary
            disabled_when: search term empty

        - quit_button:
            text: Quit
            icon: X
            variant: secondary
            action: close modal

    behaviors:
      search: useListBrokers with ifaReference filter (substring match)
      on_row_click: setActiveBrokerId then close modal
      keyboard: Enter to search, Escape to close
      backdrop: Click outside closes modal

  - id: network_lookup_modal
    title: IFA Network Lookup
    trigger: Search button next to Network IFA field in Contacts tab
    component: NetworkLookupModal
    width: w-[680px]
    max_height: 80vh

    header:
      background: "#002f5c"
      text: IFA Network Lookup
      text_color: white
      close_button:
        icon: X

    search_fields:
      layout: flex gap-3 items-end

      fields:
        - ifa_ref:
            label: IFA Ref.
            width: flex-1

        - postcode:
            label: Postcode
            width: flex-1

        - broker_name:
            label: Broker Name
            width: flex-1

    action_bar:
      border_bottom: 1px solid #BBBBBB

      buttons:
        - ok_button:
            text: OK
            icon: Check
            variant: primary
            disabled_when: no row selected

        - cancel_button:
            text: Cancel
            icon: X
            variant: secondary

    results_table:
      max_height: 350px
      alternating_rows: true
      selection_style: bg-[#05579B] text-white

      columns:
        - header: IFA_REF
        - header: POST_CODE
        - header: BROKER_NAME

      single_click: Select row
      double_click: Select and confirm immediately

    status_bar:
      text: "{count} record(s) found — click to select, double-click to confirm"
      font_family: Mulish
      font_size: 10px
      color: "#979797"

    behaviors:
      filtering: Live real-time filter on all three fields (case-insensitive substring match on full broker list)
      on_ok: Calls onSelect with ifaRef, brokerName, postcode
      on_cancel: Close without action
      result_on_contacts_form:
        - Network IFA field filled with selected ifaRef
        - Network Name field filled with selected brokerName (read-only grey bg)
        - Postcode field filled with selected postcode (read-only grey bg)
        - Overrides reset when user navigates to a different contact
      keyboard: Escape closes modal
      backdrop: Click outside closes modal

  - id: club_modal
    title: Add / Search Clubs
    trigger: Club button in Lookups tab search criteria
    component: ClubModal
    width: w-[640px]

    header:
      background: "#00263e"
      text: Add / Search Clubs
      text_color: white
      close_button:
        icon: X

    search_fields:
      layout: flex items-end gap-4

      fields:
        - club_name:
            label: Club Name
            width: w-[200px]

        - club_reference:
            label: Club Reference
            width: w-[150px]

        - post_code:
            label: Post Code
            width: w-[120px]

    results_table:
      container:
        border: 1px solid #BBBBBB
        border_radius: rounded-lg
        max_height: 260px
        overflow: overflow-y-auto

      column_headers:
        background: "#002f5c"
        text_color: white
        border_bottom: 3px solid #04589b

      columns:
        - header: Club Name
        - header: Club Reference
        - header: Post Code
        - header: Active

      selection_style: bg-[#05579B] text-white
      alternating_rows: true
      single_click: Select row
      double_click: Close modal

    footer:
      buttons:
        - new_button:
            text: New
            icon: Plus
            variant: primary

        - edit_button:
            text: Edit
            icon: Pencil
            variant: secondary

        - cancel_button:
            text: Cancel
            icon: X
            variant: secondary
            action: close modal

    seed_data:
      count: 15
      examples:
        - Advise Wise Mortgage Club (MC201491)
        - Air Mortgage Club (ER200411)
        - Connect Mortgage Club (MC200320)

    behaviors:
      filtering: Live real-time filter on clubName, clubReference, postCode (case-insensitive substring)
      keyboard: Escape closes modal
      backdrop: Click outside closes modal

app_state:

  app_context:
    provider: AppProvider
    wraps: Router

    state:
      active_tab:
        type: TabId
        default: ifa-detail
        values: [lookups, ifa-detail, contacts, retirement, equity, notes]

      active_broker_id:
        type: number or null
        default: null
        auto_init: Set to first broker ID on initial load

      active_ifa_ref:
        type: string
        default: empty
        updated_by: IfaDetailTab on broker load

      is_dirty:
        type: boolean
        default: false
        tracks: Whether IFA Detail form has unsaved changes

      is_saving:
        type: boolean
        default: false
        tracks: Whether a save operation is in progress

      layout_version:
        type: v1 or v2
        default: v1

    cross_tab_behaviors:
      broker_selection_from_lookups:
        - User clicks row in Lookups results table
        - setActiveBrokerId called with broker ID
        - handleSetBroker resets isDirty and auto-switches activeTab to ifa-detail
        - IFA Detail tab loads selected broker data

      toolbar_visibility:
        - Toolbar rendered only when activeTab equals ifa-detail
        - Other tabs show clean content area without broker navigation

      save_handler_registration:
        - IfaDetailTab registers its handleSave function via registerSaveHandler
        - Toolbar Save Changes button calls triggerSave which invokes registered handler
        - Handler unregistered on tab unmount

  data_store:
    provider: DataStoreProvider
    wraps: AppProvider
    storage: React useState (in-memory, session-only)
    initialization: Seed data arrays cloned via spread operator
    id_generation: useRef counters seeded from max existing IDs plus 1
    immutability: State updates via functional setState
    persistence: None — all data lost on page refresh

    entities:
      brokers:
        seed_count: 13
        fields: id, ifaRef, brokerNo, fimbraNo, brokerName, tradingName, addressLine1, addressLine2, town, county, postcode, telephone, fax, email, initials, dateChecked, status, fcaReference, annuityToba, sentDate, grade, nextDiaryDate, ifaMemberNo, brokerManager, keyAccount, partnerCode, region, createdBy, createdDate, amendedBy, amendedDate

      contacts:
        seed_count: 17
        parent: brokers (via brokerId)
        fields: id, brokerId, reference, title, initials, forename, surname, salutation, position, addressLine1-4, homeTelephone, mobileTelephone, emailAddress, paidByBacs, bankSortCode, bankAccountNo, bankAccountName, bankReference, useNetworkTerms, defaultAdviceType, defaultRemunerationBasis, defaultDistributionChannel, network, tiedAgent, isPrincipal, networkIfa, networkName, networkPostcode, principalAgentRef

      notes:
        seed_count: 33
        parent: brokers (via brokerId)
        fields: id, brokerId, noteType (SYS or MAN), description, oldValue, newValue, updatedBy, updatedDate

      retirement_income:
        seed_count: 10
        parent: brokers (via brokerId)
        products: Non Profit Annuity (npa), PIPA (pipa), PRP (prp)
        per_product_fields: AdviserCharges, Amount, Commission, ExpenseDiscount, MarketingAllowance

      equity_release:
        seed_count: 6
        parent: brokers (via brokerId)
        fields: mortgagePermissions, erlmToba, flexibleBrokerRate, flexibleMinimumAmount, flexibleNetworkRate, flexibleTrailCommission, lumpSumBrokerRate, lumpSumMinimumAmount, lumpSumNetworkRate, packagingFee, applicationFee, ltvPercent, lumpSumPackagingFee, lumpSumApplicationFee, lumpSumLtvPercent

    mutations:
      create_broker:
        input: Partial Broker (brokerName required)
        auto_generated: id, ifaRef (NEW-{padded}), brokerNo, fimbraNo, createdBy (SYSTEM), createdDate (now)
        returns: Broker

      update_broker:
        input: id plus Partial Broker
        behavior: Merges data into existing record synchronously
        returns: Broker

      add_note:
        input: brokerId plus Partial Note
        behavior: Generates auto-incremented id, prepends to notes array
        returns: Note

    queries:
      use_list_brokers:
        params: postcode, ifaReference, ifaName, authorised, cancelled, duplicateRecord, revoked
        returns: filtered Broker array

      use_get_broker:
        params: id
        returns: single Broker or undefined

      use_list_contacts:
        params: brokerId
        returns: filtered Contact array

      use_list_notes:
        params: brokerId
        returns: filtered Note array

      use_get_retirement_income:
        params: brokerId
        returns: single RetirementIncome or undefined

      use_get_equity_release:
        params: brokerId
        returns: single EquityRelease or undefined
