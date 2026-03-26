import { db } from "@workspace/db";
import { brokersTable, contactsTable, notesTable, retirementIncomeTable, equityReleaseTable } from "@workspace/db/schema";

async function seed() {
  console.log("Seeding database...");

  const brokerData = [
    { ifaRef: "A G S-001", brokerNo: "", fimbraNo: "", brokerName: "AF", tradingName: "First Class Financial", addressLine1: "5 Eaton Bray Road", town: "Northchurch", postcode: "HP4 3QZ", telephone: "01442 876543", status: "Authorised", fcaReference: "207520", grade: "National Accounts", brokerManager: "Keith Harvey", region: "South", createdBy: "ADMIN", createdDate: "15/02/2002 15:00" },
    { ifaRef: "A J B-001", brokerNo: "", fimbraNo: "", brokerName: "Aldton Park Financial Services Ltd", addressLine1: "93 Aldton Park", town: "Newton Aycliffe", postcode: "DL5 7DW", telephone: "01325 310234", status: "Authorised", fcaReference: "305421", grade: "Regional", brokerManager: "Sarah Collins", region: "North", createdBy: "ADMIN", createdDate: "20/03/2003 10:30" },
    { ifaRef: "A ONE-001", brokerNo: "", fimbraNo: "", brokerName: "a1 Financial Services", addressLine1: "30 High Street", town: "Wethersfield", postcode: "CM7 4BS", telephone: "01371 850234", status: "Cancelled", fcaReference: "401234", grade: "Standard", brokerManager: "Keith Harvey", region: "East", createdBy: "ADMIN", createdDate: "05/06/2004 14:15" },
    { ifaRef: "A T C-001", brokerNo: "", fimbraNo: "", brokerName: "A T C Financial Management", addressLine1: "Solway House Business Park", town: "Kingstown", postcode: "CA3 0HA", telephone: "01228 670345", status: "Authorised", fcaReference: "312567", grade: "National Accounts", brokerManager: "David Thompson", region: "North", createdBy: "ADMIN", createdDate: "12/09/2001 09:45" },
    { ifaRef: "A&JIN-001", brokerNo: "", fimbraNo: "", brokerName: "A & J Mortgages Ltd", addressLine1: "1 Qarrenlton Grove", town: "Johnstone", postcode: "PA5 8HG", telephone: "01505 321456", status: "Authorised", fcaReference: "456789", grade: "Regional", brokerManager: "Sarah Collins", region: "Scotland", createdBy: "ADMIN", createdDate: "01/11/2005 11:20" },
    { ifaRef: "A&JPE-001", brokerNo: "", fimbraNo: "", brokerName: "A & J Perry Ltd", addressLine1: "Cardale", town: "Burnley", postcode: "BB11 3RQ", telephone: "01onal 432567", status: "Authorised", fcaReference: "523456", grade: "Standard", brokerManager: "Keith Harvey", region: "North West", createdBy: "ADMIN", createdDate: "18/04/2003 16:00" },
    { ifaRef: "A.R.D-001", brokerNo: "", fimbraNo: "", brokerName: "A.R.D Consultancy Ltd", addressLine1: "9 Melville Street", town: "Edinburgh", postcode: "EH3 7PE", telephone: "0131 226 7890", status: "Authorised", fcaReference: "634567", grade: "National Accounts", brokerManager: "David Thompson", region: "Scotland", createdBy: "ADMIN", createdDate: "22/07/2002 13:30" },
    { ifaRef: "A1FIN-002", brokerNo: "", fimbraNo: "", brokerName: "A1 Financial Services Online Ltd", addressLine1: "7-8 The Shrubberies", town: "George Street", postcode: "GL1 1PQ", telephone: "01452 523456", status: "Authorised", fcaReference: "745678", grade: "Regional", brokerManager: "Sarah Collins", region: "South West", createdBy: "ADMIN", createdDate: "30/01/2006 10:00" },
    { ifaRef: "AAFFI-001", brokerNo: "", fimbraNo: "", brokerName: "AAF Financial Ltd", addressLine1: "82 Broadpark Road", town: "Liverpool", postcode: "L14 9QA", telephone: "0151 228 9012", status: "Authorised", fcaReference: "856789", grade: "Standard", brokerManager: "Keith Harvey", region: "North West", createdBy: "ADMIN", createdDate: "14/05/2004 15:45" },
    { ifaRef: "AAMOR-001", brokerNo: "", fimbraNo: "", brokerName: "AA Mortgage Gateway Ltd", addressLine1: "84 Kensington High Street", town: "London", postcode: "W8 4PT", telephone: "020 7937 8901", status: "Authorised", fcaReference: "967890", grade: "National Accounts", brokerManager: "David Thompson", region: "London", createdBy: "ADMIN", createdDate: "03/08/2001 12:15" },
    { ifaRef: "CLRKH-001", brokerNo: "", fimbraNo: "", brokerName: "The Clarkson Hill Group Plc.", tradingName: "First Class Financial", addressLine1: "61 Lincombe Road", town: "Radstock", county: "Somerset", postcode: "BA3 3YJ", telephone: "01761 420773", email: "info@clarksonhill.co.uk", status: "Cancelled", fcaReference: "207520", annuityToba: true, grade: "National Accounts", brokerManager: "Keith Harvey", region: "South West", createdBy: "ADMIN", createdDate: "15/02/2002 15:00", initials: "CH", dateChecked: "01/03/2024" },
  ];

  const inserted = await db.insert(brokersTable).values(brokerData).returning();
  console.log(`Inserted ${inserted.length} brokers`);

  const clarksonId = inserted[inserted.length - 1].id;

  await db.insert(contactsTable).values([
    { brokerId: clarksonId, reference: "001", title: "Mr", initials: "JC", forename: "John", surname: "Clarkson", position: "Director", paidByBacs: true, bankSortCode: "774814", bankAccountNo: "24782346", bankAccountName: "(SMT) Money Matter", bankReference: "LV=" },
    { brokerId: clarksonId, reference: "002", title: "Mrs", initials: "SH", forename: "Sarah", surname: "Hill", position: "Manager" },
  ]);
  console.log("Inserted contacts");

  await db.insert(notesTable).values([
    { brokerId: clarksonId, noteType: "SYS", description: "NPA - Expense Discount updated by ERIPORA on 13/07/2015", oldValue: ".5", newValue: "0" },
    { brokerId: clarksonId, noteType: "SYS", description: "NPA - Expense Discount updated by ERIPORA on 25/02/2014", oldValue: "0", newValue: ".5" },
    { brokerId: clarksonId, noteType: "SYS", description: "PIPA - Expense Discount updated by ERIPORA on 17/06/2013", oldValue: ".4", newValue: "0" },
    { brokerId: clarksonId, noteType: "SYS", description: "NPA - Expense Discount updated by ERIPORA on 12/06/2013", oldValue: "-.7", newValue: "0" },
  ]);
  console.log("Inserted notes");

  await db.insert(retirementIncomeTable).values([
    { brokerId: clarksonId, npaCommission: "1.3", pipaCommission: "1.4", prpCommission: "2" },
  ]);
  console.log("Inserted retirement income");

  await db.insert(equityReleaseTable).values([
    { brokerId: clarksonId, mortgagePermissions: true, erlmToba: true, flexibleBrokerRate: "1", lumpSumBrokerRate: "1" },
  ]);
  console.log("Inserted equity release");

  console.log("Seeding complete!");
  process.exit(0);
}

seed().catch((err) => {
  console.error("Seeding failed:", err);
  process.exit(1);
});
