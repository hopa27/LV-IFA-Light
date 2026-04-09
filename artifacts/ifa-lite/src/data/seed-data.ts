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

const notesRaw: any[] = [];

export const initialNotes: Note[] = notesRaw.map((n, i) => ({ ...n, id: i + 1 }) as Note);

const retirementRaw: any[] = [];

export const initialRetirementIncome: RetirementIncome[] = retirementRaw.map((r, i) => ({ ...r, id: i + 1 }) as RetirementIncome);

const equityRaw: any[] = [];

export const initialEquityRelease: EquityRelease[] = equityRaw.map((e, i) => ({ ...e, id: i + 1 }) as EquityRelease);
