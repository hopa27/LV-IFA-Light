import { pgTable, serial, integer, boolean, numeric } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod/v4";
import { brokersTable } from "./brokers";

export const equityReleaseTable = pgTable("equity_release", {
  id: serial("id").primaryKey(),
  brokerId: integer("broker_id").notNull().references(() => brokersTable.id).unique(),
  mortgagePermissions: boolean("mortgage_permissions").default(true),
  erlmToba: boolean("erlm_toba").default(true),
  flexibleBrokerRate: numeric("flexible_broker_rate").default("1"),
  flexibleMinimumAmount: numeric("flexible_minimum_amount").default("0"),
  flexibleNetworkRate: numeric("flexible_network_rate").default("0"),
  flexibleTrailCommission: boolean("flexible_trail_commission").default(false),
  lumpSumBrokerRate: numeric("lump_sum_broker_rate").default("1"),
  lumpSumMinimumAmount: numeric("lump_sum_minimum_amount").default("0"),
  lumpSumNetworkRate: numeric("lump_sum_network_rate").default("0"),
  packagingFee: numeric("packaging_fee").default("0"),
  applicationFee: numeric("application_fee").default("0"),
  ltvPercent: numeric("ltv_percent").default("0"),
  lumpSumPackagingFee: numeric("lump_sum_packaging_fee").default("0"),
  lumpSumApplicationFee: numeric("lump_sum_application_fee").default("0"),
  lumpSumLtvPercent: numeric("lump_sum_ltv_percent").default("0"),
});

export const insertEquityReleaseSchema = createInsertSchema(equityReleaseTable).omit({ id: true });
export type InsertEquityRelease = z.infer<typeof insertEquityReleaseSchema>;
export type EquityRelease = typeof equityReleaseTable.$inferSelect;
