import { pgTable, serial, text, boolean, numeric, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod/v4";

export const brokersTable = pgTable("brokers", {
  id: serial("id").primaryKey(),
  ifaRef: text("ifa_ref"),
  brokerNo: text("broker_no"),
  fimbraNo: text("fimbra_no"),
  brokerName: text("broker_name").notNull(),
  tradingName: text("trading_name"),
  addressLine1: text("address_line1"),
  addressLine2: text("address_line2"),
  town: text("town"),
  county: text("county"),
  postcode: text("postcode"),
  telephone: text("telephone"),
  fax: text("fax"),
  email: text("email"),
  initials: text("initials"),
  dateChecked: text("date_checked"),
  fcaReference: text("fca_reference"),
  annuityToba: boolean("annuity_toba").default(false),
  status: text("status").default("Active"),
  sentDate: text("sent_date"),
  grade: text("grade"),
  nextDiaryDate: text("next_diary_date"),
  ifaMemberNo: text("ifa_member_no"),
  brokerManager: text("broker_manager"),
  keyAccount: text("key_account"),
  partnerCode: text("partner_code"),
  region: text("region"),
  createdBy: text("created_by"),
  createdDate: text("created_date"),
  amendedBy: text("amended_by"),
  amendedDate: text("amended_date"),
});

export const insertBrokerSchema = createInsertSchema(brokersTable).omit({ id: true });
export type InsertBroker = z.infer<typeof insertBrokerSchema>;
export type Broker = typeof brokersTable.$inferSelect;
