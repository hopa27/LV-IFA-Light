export interface Broker {
  id: number;
  ifaRef: string;
  brokerNo: string;
  fimbraNo: string;
  brokerName: string;
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
  status: string;
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
}

export interface Contact {
  id: number;
  brokerId: number;
  reference: string;
  title?: string;
  initials?: string;
  forename?: string;
  surname?: string;
  salutation?: string;
  position?: string;
  addressLine1?: string;
  addressLine2?: string;
  addressLine3?: string;
  addressLine4?: string;
  homeTelephone?: string;
  mobileTelephone?: string;
  emailAddress?: string;
  paidByBacs?: boolean;
  bankSortCode?: string;
  bankAccountNo?: string;
  bankAccountName?: string;
  bankReference?: string;
  useNetworkTerms?: boolean;
  defaultAdviceType?: string;
  defaultRemunerationBasis?: string;
  defaultDistributionChannel?: string;
  network?: boolean;
  tiedAgent?: boolean;
  isPrincipal?: boolean;
  networkIfa?: string;
  networkName?: string;
  networkPostcode?: string;
  principalAgentRef?: string;
  [key: string]: string | number | boolean | null | undefined;
}

export interface Note {
  id: number;
  brokerId: number;
  noteType: string;
  description: string;
  oldValue?: string;
  newValue?: string;
  updatedBy?: string;
  updatedDate?: string;
  label?: string;
  [key: string]: string | number | boolean | null | undefined;
}

export interface RetirementIncome {
  id: number;
  brokerId: number;
  [key: string]: string | number | boolean | null | undefined;
}

export interface EquityRelease {
  id: number;
  brokerId: number;
  [key: string]: string | number | boolean | null | undefined;
}

export interface ListBrokersParams {
  postcode?: string;
  ifaReference?: string;
  ifaName?: string;
  authorised?: boolean;
  cancelled?: boolean;
  duplicateRecord?: boolean;
  revoked?: boolean;
  [key: string]: any;
}

const brokerData = [
  {
    ifaRef: "AGEPA-003", brokerNo: "", fimbraNo: "", brokerName: "Age Partnership",
    building: "2200 Century Way", noStreet: "Thorpe Park", district: "", city: "Leeds", county: "West Yorkshire",
    addressLine1: "2200 Century Way", addressLine2: "Thorpe Park", town: "Leeds",
    postcode: "LS15 8ZB", telephone: "DO NOT USE FOR Equity", fax: "", email: "",
    salutation: "", classCode: "",
    createdDate: "14/11/2005 10:32:21", createdBy: "LOPCXT", amendedDate: "", amendedBy: "",
    repkey: "", rsmNo: "20", nextIfaIllRef: "", sibReference: "425432",
    sibAuthorisationDate: "30/11/2017", sibInitials: "NW", brokerPackSent: "Yes", brokerPackSentDate: "",
    nextDiaryDate: "", area: "LS", keyAccount: "No", grade: "1", nextContactNo: "",
    status: "Authorised", consultant: "274",
    peverelBroker: "", paidByBacs: "Y", bankSortCode: "7714814", bankAccountNo: "24782346",
    bankAccountName: "Age Partnership", bankRef: "LV=",
    networkIfaReference: "", ifaCommission: "2.5", networkCommission: "0", network: "", memberNumber: "",
    plaIfaCommission: "2", plaNetworkCommission: "0", ifaWhen: "", ifaPortfolio: "",
    brokerNameUpper: "AGE PARTNERSHIP", expense: "", coCode: "STALW-001",
    ltcCommission: "1", acareCommission: "1",
    namId: "7", ilaCommission: "2", ilaExpense: "",
    ifaIlaCommissionPct: "", ifaIlaExpensePct: "", networkIlaCommissionPct: "",
    icfpCommission: "4", icfpExpense: "", networkIcfpCommissionPct: "0", partnerCode: "0",
  },
  {
    ifaRef: "AGEPA-001", brokerNo: "", fimbraNo: "", brokerName: "Age Partnership",
    building: "2200 Century Way", noStreet: "Thorpe Park", district: "", city: "Leeds", county: "West Yorkshire",
    addressLine1: "2200 Century Way", addressLine2: "Thorpe Park", town: "Leeds",
    postcode: "LS15 8ZB", telephone: "0113 265 8888", fax: "0113 232 1071", email: "WITH CASHBACK",
    salutation: "", classCode: "",
    createdDate: "14/11/2005 10:20:53", createdBy: "LOPCXT", amendedDate: "", amendedBy: "",
    repkey: "", rsmNo: "20", nextIfaIllRef: "", sibReference: "425432",
    sibAuthorisationDate: "30/11/2017", sibInitials: "NW", brokerPackSent: "Yes", brokerPackSentDate: "",
    nextDiaryDate: "", area: "LS", keyAccount: "No", grade: "1", nextContactNo: "",
    status: "Authorised", consultant: "274",
    peverelBroker: "", paidByBacs: "Y", bankSortCode: "7714814", bankAccountNo: "24782346",
    bankAccountName: "Age Partnership", bankRef: "LV=",
    networkIfaReference: "", ifaCommission: "2.5", networkCommission: "0", network: "", memberNumber: "",
    plaIfaCommission: "2", plaNetworkCommission: "0", ifaWhen: "", ifaPortfolio: "",
    brokerNameUpper: "AGE PARTNERSHIP", expense: "", coCode: "STALW-001",
    ltcCommission: "1", acareCommission: "1",
    namId: "7", ilaCommission: "2", ilaExpense: "",
    ifaIlaCommissionPct: "", ifaIlaExpensePct: "", networkIlaCommissionPct: "",
    icfpCommission: "4", icfpExpense: "0", networkIcfpCommissionPct: "0", partnerCode: "0",
  },
  {
    ifaRef: "AGEPA-004", brokerNo: "", fimbraNo: "", brokerName: "Age Partnership",
    building: "2200 Century Way", noStreet: "Thorpe Park", district: "", city: "Leeds", county: "West Yorkshire",
    addressLine1: "2200 Century Way", addressLine2: "Thorpe Park", town: "Leeds",
    postcode: "LS15 8ZB", telephone: "0800 0810 811", fax: "", email: "",
    salutation: "", classCode: "",
    createdDate: "14/11/2005 10:33:50", createdBy: "LOPCXT", amendedDate: "", amendedBy: "",
    repkey: "", rsmNo: "20", nextIfaIllRef: "", sibReference: "425432",
    sibAuthorisationDate: "30/11/2017", sibInitials: "NW", brokerPackSent: "Yes", brokerPackSentDate: "",
    nextDiaryDate: "", area: "LS", keyAccount: "No", grade: "1", nextContactNo: "",
    status: "Authorised", consultant: "274",
    peverelBroker: "", paidByBacs: "Y", bankSortCode: "7714814", bankAccountNo: "24782346",
    bankAccountName: "Age Partnership", bankRef: "LV=",
    networkIfaReference: "", ifaCommission: "2.5", networkCommission: "No", network: "No", memberNumber: "",
    plaIfaCommission: "2", plaNetworkCommission: "", ifaWhen: "", ifaPortfolio: "",
    brokerNameUpper: "AGE PARTNERSHIP", expense: "", coCode: "STALW-001",
    ltcCommission: "1", acareCommission: "1",
    namId: "7", ilaCommission: "2", ilaExpense: "",
    ifaIlaCommissionPct: "", ifaIlaExpensePct: "", networkIlaCommissionPct: "2",
    icfpCommission: "4", icfpExpense: "0", networkIcfpCommissionPct: "0", partnerCode: "0",
  },
  {
    ifaRef: "AGEBE-001", brokerNo: "", fimbraNo: "", brokerName: "Age Partnership Ltd",
    building: "2200 Century Way", noStreet: "Thorpe Park", district: "", city: "Leeds", county: "West Yorkshire",
    addressLine1: "2200 Century Way", addressLine2: "Thorpe Park", town: "Leeds",
    postcode: "LS15 8ZB", telephone: "0113 232 1070", fax: "", email: "",
    salutation: "", classCode: "",
    createdDate: "27/03/2014 10:59:18", createdBy: "LV17716", amendedDate: "", amendedBy: "",
    repkey: "", rsmNo: "20", nextIfaIllRef: "", sibReference: "425432",
    sibAuthorisationDate: "30/11/2017", sibInitials: "NW", brokerPackSent: "Yes", brokerPackSentDate: "",
    nextDiaryDate: "", area: "LS", keyAccount: "No", grade: "", nextContactNo: "",
    status: "Authorised", consultant: "-150",
    peverelBroker: "", paidByBacs: "Y", bankSortCode: "7714814", bankAccountNo: "24782346",
    bankAccountName: "Age Partnership Lt", bankRef: "LV=",
    networkIfaReference: "", ifaCommission: "1", networkCommission: "0", network: "", memberNumber: "",
    plaIfaCommission: "2", plaNetworkCommission: "0", ifaWhen: "", ifaPortfolio: "",
    brokerNameUpper: "AGE PARTNERSHIP LTD", expense: "", coCode: "STALW-001",
    ltcCommission: "1", acareCommission: "1",
    namId: "", ilaCommission: "2", ilaExpense: "",
    ifaIlaCommissionPct: "", ifaIlaExpensePct: "", networkIlaCommissionPct: "",
    icfpCommission: "4", icfpExpense: "0", networkIcfpCommissionPct: "0", partnerCode: "0",
  },
  {
    ifaRef: "AGEPA-002", brokerNo: "", fimbraNo: "", brokerName: "Age Partnership Wealth Management Limited",
    building: "2200 Century Way", noStreet: "Thorpe Park", district: "", city: "Leeds", county: "West Yorkshire",
    addressLine1: "2200 Century Way", addressLine2: "Thorpe Park", town: "Leeds",
    postcode: "LS15 8ZB", telephone: "0844 893 6554", fax: "", email: "",
    salutation: "", classCode: "",
    createdDate: "01/09/2015 11:03:03", createdBy: "LV24283", amendedDate: "", amendedBy: "",
    repkey: "", rsmNo: "20", nextIfaIllRef: "", sibReference: "670493",
    sibAuthorisationDate: "01/11/2017", sibInitials: "CG", brokerPackSent: "Yes", brokerPackSentDate: "",
    nextDiaryDate: "", area: "LS", keyAccount: "No", grade: "", nextContactNo: "",
    status: "Authorised", consultant: "-150",
    peverelBroker: "", paidByBacs: "Y", bankSortCode: "7714814", bankAccountNo: "24782346",
    bankAccountName: "Age Partnership We", bankRef: "LV=",
    networkIfaReference: "", ifaCommission: "", networkCommission: "", network: "", memberNumber: "",
    plaIfaCommission: "2", plaNetworkCommission: "0", ifaWhen: "", ifaPortfolio: "",
    brokerNameUpper: "AGE PARTNERSHIP WEALTH MANAGEMENT LIMITED", expense: "", coCode: "STALW-001",
    ltcCommission: "1", acareCommission: "1",
    namId: "", ilaCommission: "2", ilaExpense: "",
    ifaIlaCommissionPct: "", ifaIlaExpensePct: "", networkIlaCommissionPct: "",
    icfpCommission: "4", icfpExpense: "0", networkIcfpCommissionPct: "0", partnerCode: "0",
  },
  {
    ifaRef: "AGENT-001", brokerNo: "", fimbraNo: "", brokerName: "Agentis Fin & Mortgage Sol",
    building: "Ground Floor", noStreet: "40 Thorpe Wood", district: "", city: "Peterborough", county: "",
    addressLine1: "Ground Floor", addressLine2: "40 Thorpe Wood", town: "Peterborough",
    postcode: "PE3 6SR", telephone: "07909 647070", fax: "", email: "frances@agentisfinancial.co.uk",
    salutation: "", classCode: "",
    createdDate: "15/07/2022 08:58:45", createdBy: "LV31066", amendedDate: "", amendedBy: "",
    repkey: "", rsmNo: "5", nextIfaIllRef: "", sibReference: "631659",
    sibAuthorisationDate: "15/07/2022", sibInitials: "LD", brokerPackSent: "No", brokerPackSentDate: "",
    nextDiaryDate: "", area: "PE", keyAccount: "No", grade: "", nextContactNo: "",
    status: "Authorised", consultant: "-150",
    peverelBroker: "", paidByBacs: "N", bankSortCode: "", bankAccountNo: "",
    bankAccountName: "", bankRef: "STONE-022",
    networkIfaReference: "", ifaCommission: "1", networkCommission: "0", network: "", memberNumber: "",
    plaIfaCommission: "2", plaNetworkCommission: "0", ifaWhen: "", ifaPortfolio: "",
    brokerNameUpper: "AGENTIS FIN & MORTGAGE SOL", expense: "", coCode: "STALW-001",
    ltcCommission: "1", acareCommission: "1",
    namId: "", ilaCommission: "2", ilaExpense: "",
    ifaIlaCommissionPct: "", ifaIlaExpensePct: "", networkIlaCommissionPct: "",
    icfpCommission: "4", icfpExpense: "0", networkIcfpCommissionPct: "0", partnerCode: "0",
  },
];

export const initialBrokers: Broker[] = brokerData.map((b, i) => ({ ...b, id: i + 1 }) as Broker);

const contactRaw: any[] = [];

export const initialContacts: Contact[] = contactRaw.map((c, i) => ({ ...c, id: i + 1 }) as Contact);

const notesRaw: any[] = [
  { brokerId: 1, noteType: "SYS", label: "NPA", description: "Grade updated by SYSTEM on 10/01/2024", oldValue: "Standard", newValue: "National Accounts", updatedBy: "SYSTEM", updatedDate: "10/01/2024 09:15:32" },
  { brokerId: 1, noteType: "SYS", label: "PIPA", description: "Broker Manager updated by SYSTEM on 10/01/2024", oldValue: "Unassigned", newValue: "Sarah Jenkins", updatedBy: "SYSTEM", updatedDate: "10/01/2024 09:15:32" },
  { brokerId: 1, noteType: "USR", label: "NPA", description: "Broker pack sent via recorded delivery. Confirmed receipt by phone.", updatedBy: "LOPCXT", updatedDate: "15/01/2024 14:22:10" },
  { brokerId: 1, noteType: "SYS", label: "PRP", description: "Key Account updated by SYSTEM on 22/02/2024", oldValue: "No", newValue: "Yes", updatedBy: "SYSTEM", updatedDate: "22/02/2024 11:05:44" },
  { brokerId: 1, noteType: "USR", label: "PIPA", description: "Annual review completed. All compliance documentation up to date.", updatedBy: "LV17716", updatedDate: "01/03/2024 16:30:00" },
  { brokerId: 1, noteType: "SYS", label: "NPA", description: "Region updated by SYSTEM on 15/03/2024", oldValue: "Yorkshire", newValue: "Yorkshire & Humber", updatedBy: "SYSTEM", updatedDate: "15/03/2024 08:45:12" },

  { brokerId: 2, noteType: "SYS", label: "NPA", description: "Status updated by SYSTEM on 05/11/2023", oldValue: "Pending", newValue: "Authorised", updatedBy: "SYSTEM", updatedDate: "05/11/2023 10:00:15" },
  { brokerId: 2, noteType: "USR", label: "PIPA", description: "Initial broker setup completed. TOBA signed and returned.", updatedBy: "LOPCXT", updatedDate: "06/11/2023 09:30:22" },
  { brokerId: 2, noteType: "SYS", label: "PRP", description: "Telephone updated by SYSTEM on 12/12/2023", oldValue: "0113 265 8800", newValue: "0113 265 8888", updatedBy: "SYSTEM", updatedDate: "12/12/2023 14:18:05" },
  { brokerId: 2, noteType: "USR", label: "NPA", description: "Cashback arrangement confirmed with head office. See email ref CB-2024-0012.", updatedBy: "LV24283", updatedDate: "20/01/2024 11:42:33" },
  { brokerId: 2, noteType: "SYS", label: "PIPA", description: "Email updated by SYSTEM on 28/01/2024", oldValue: "", newValue: "WITH CASHBACK", updatedBy: "SYSTEM", updatedDate: "28/01/2024 15:10:00" },

  { brokerId: 3, noteType: "SYS", label: "NPA", description: "IFA Commission updated by SYSTEM on 14/11/2023", oldValue: "2.0", newValue: "2.5", updatedBy: "SYSTEM", updatedDate: "14/11/2023 10:35:00" },
  { brokerId: 3, noteType: "USR", label: "PRP", description: "Broker confirmed new telephone number for equity release queries only.", updatedBy: "NW", updatedDate: "20/11/2023 13:25:18" },
  { brokerId: 3, noteType: "SYS", label: "PIPA", description: "Network updated by SYSTEM on 03/01/2024", oldValue: "", newValue: "No", updatedBy: "SYSTEM", updatedDate: "03/01/2024 09:50:30" },
  { brokerId: 3, noteType: "USR", label: "NPA", description: "Compliance check passed. FCA reference verified against register.", updatedBy: "LV17716", updatedDate: "15/02/2024 10:15:45" },

  { brokerId: 4, noteType: "SYS", label: "PRP", description: "Broker Name updated by SYSTEM on 27/03/2014", oldValue: "Age Partnership", newValue: "Age Partnership Ltd", updatedBy: "SYSTEM", updatedDate: "27/03/2014 10:59:18" },
  { brokerId: 4, noteType: "USR", label: "NPA", description: "Company rebranded from Age Partnership to Age Partnership Ltd. Updated all records.", updatedBy: "LV17716", updatedDate: "27/03/2014 11:05:00" },
  { brokerId: 4, noteType: "SYS", label: "PIPA", description: "IFA Commission updated by SYSTEM on 15/06/2023", oldValue: "2.5", newValue: "1", updatedBy: "SYSTEM", updatedDate: "15/06/2023 08:20:10" },
  { brokerId: 4, noteType: "USR", label: "PRP", description: "Commission rate reduced per new network agreement effective July 2023.", updatedBy: "CG", updatedDate: "15/06/2023 08:25:00" },
  { brokerId: 4, noteType: "SYS", label: "NPA", description: "Bank Account Name updated by SYSTEM on 01/09/2023", oldValue: "Age Partnership", newValue: "Age Partnership Lt", updatedBy: "SYSTEM", updatedDate: "01/09/2023 14:30:22" },

  { brokerId: 5, noteType: "SYS", label: "NPA", description: "Status updated by SYSTEM on 01/09/2015", oldValue: "Pending", newValue: "Authorised", updatedBy: "SYSTEM", updatedDate: "01/09/2015 11:03:03" },
  { brokerId: 5, noteType: "USR", label: "PIPA", description: "Wealth management division registered. Separate IFA reference created.", updatedBy: "LV24283", updatedDate: "01/09/2015 11:10:00" },
  { brokerId: 5, noteType: "SYS", label: "PRP", description: "SIB Reference updated by SYSTEM on 01/11/2017", oldValue: "425432", newValue: "670493", updatedBy: "SYSTEM", updatedDate: "01/11/2017 09:00:00" },
  { brokerId: 5, noteType: "USR", label: "NPA", description: "New SIB authorisation received. Initials updated to CG.", updatedBy: "CG", updatedDate: "01/11/2017 09:15:30" },
  { brokerId: 5, noteType: "USR", label: "PIPA", description: "Quarterly review — no issues raised. Next review scheduled for Q2 2024.", updatedBy: "LV24283", updatedDate: "18/12/2023 16:00:00" },

  { brokerId: 6, noteType: "SYS", label: "NPA", description: "Status updated by SYSTEM on 15/07/2022", oldValue: "Pending", newValue: "Authorised", updatedBy: "SYSTEM", updatedDate: "15/07/2022 08:58:45" },
  { brokerId: 6, noteType: "USR", label: "PRP", description: "New broker onboarded. Contact: Frances. Specialises in mortgage solutions.", updatedBy: "LV31066", updatedDate: "15/07/2022 09:05:00" },
  { brokerId: 6, noteType: "SYS", label: "PIPA", description: "Paid By BACS updated by SYSTEM on 20/08/2022", oldValue: "Y", newValue: "N", updatedBy: "SYSTEM", updatedDate: "20/08/2022 10:30:15" },
  { brokerId: 6, noteType: "USR", label: "NPA", description: "Broker requested cheque payments. BACS details removed.", updatedBy: "LD", updatedDate: "20/08/2022 10:35:00" },
  { brokerId: 6, noteType: "SYS", label: "PRP", description: "IFA Commission updated by SYSTEM on 10/01/2023", oldValue: "0", newValue: "1", updatedBy: "SYSTEM", updatedDate: "10/01/2023 14:20:00" },
  { brokerId: 6, noteType: "USR", label: "PIPA", description: "First year review completed. Commission rate agreed at 1%. Broker pack not yet sent.", updatedBy: "LD", updatedDate: "15/07/2023 11:00:00" },
];

export const initialNotes: Note[] = notesRaw.map((n, i) => ({ ...n, id: i + 1 }) as Note);

const retirementRaw: any[] = [];

export const initialRetirementIncome: RetirementIncome[] = retirementRaw.map((r, i) => ({ ...r, id: i + 1 }) as RetirementIncome);

const equityRaw: any[] = [];

export const initialEquityRelease: EquityRelease[] = equityRaw.map((e, i) => ({ ...e, id: i + 1 }) as EquityRelease);
