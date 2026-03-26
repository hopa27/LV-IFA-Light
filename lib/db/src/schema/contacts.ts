import { pgTable, serial, integer, text, boolean } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod/v4";
import { brokersTable } from "./brokers";

export const contactsTable = pgTable("contacts", {
  id: serial("id").primaryKey(),
  brokerId: integer("broker_id").notNull().references(() => brokersTable.id),
  reference: text("reference"),
  title: text("title"),
  initials: text("initials"),
  forename: text("forename"),
  surname: text("surname"),
  salutation: text("salutation"),
  position: text("position"),
  addressLine1: text("address_line1"),
  addressLine2: text("address_line2"),
  addressLine3: text("address_line3"),
  addressLine4: text("address_line4"),
  homeTelephone: text("home_telephone"),
  mobileTelephone: text("mobile_telephone"),
  emailAddress: text("email_address"),
  paidByBacs: boolean("paid_by_bacs").default(true),
  bankSortCode: text("bank_sort_code"),
  bankAccountNo: text("bank_account_no"),
  bankAccountName: text("bank_account_name"),
  bankReference: text("bank_reference"),
  useNetworkTerms: boolean("use_network_terms").default(false),
  defaultAdviceType: text("default_advice_type"),
  defaultRemunerationBasis: text("default_remuneration_basis"),
  defaultDistributionChannel: text("default_distribution_channel"),
  restrictedAdvice: text("restricted_advice"),
  simplifiedAdvice: text("simplified_advice"),
  nonAdvised: text("non_advised"),
  networkIfa: text("network_ifa"),
  networkName: text("network_name"),
  networkPostcode: text("network_postcode"),
  tiedAgent: boolean("tied_agent").default(false),
  principalAgentRef: text("principal_agent_ref"),
  isPrincipal: boolean("is_principal").default(false),
  network: boolean("network").default(false),
});

export const insertContactSchema = createInsertSchema(contactsTable).omit({ id: true });
export type InsertContact = z.infer<typeof insertContactSchema>;
export type Contact = typeof contactsTable.$inferSelect;
