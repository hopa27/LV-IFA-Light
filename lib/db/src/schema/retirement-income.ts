import { pgTable, serial, integer, numeric } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod/v4";
import { brokersTable } from "./brokers";

export const retirementIncomeTable = pgTable("retirement_income", {
  id: serial("id").primaryKey(),
  brokerId: integer("broker_id").notNull().references(() => brokersTable.id).unique(),
  npaAdviserCharges: numeric("npa_adviser_charges").default("0"),
  npaAmount: numeric("npa_amount").default("0"),
  npaCommission: numeric("npa_commission").default("1.3"),
  npaExpenseDiscount: numeric("npa_expense_discount").default("0"),
  npaMarketingAllowance: numeric("npa_marketing_allowance").default("0"),
  pipaAdviserCharges: numeric("pipa_adviser_charges").default("0"),
  pipaAmount: numeric("pipa_amount").default("0"),
  pipaCommission: numeric("pipa_commission").default("1.4"),
  pipaExpenseDiscount: numeric("pipa_expense_discount").default("0"),
  pipaMarketingAllowance: numeric("pipa_marketing_allowance").default("0"),
  prpAdviserCharges: numeric("prp_adviser_charges").default("0"),
  prpAmount: numeric("prp_amount").default("0"),
  prpCommission: numeric("prp_commission").default("2"),
  prpExpenseDiscount: numeric("prp_expense_discount").default("0"),
  prpMarketingAllowance: numeric("prp_marketing_allowance").default("0"),
});

export const insertRetirementIncomeSchema = createInsertSchema(retirementIncomeTable).omit({ id: true });
export type InsertRetirementIncome = z.infer<typeof insertRetirementIncomeSchema>;
export type RetirementIncome = typeof retirementIncomeTable.$inferSelect;
