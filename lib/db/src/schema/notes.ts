import { pgTable, serial, integer, text } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod/v4";
import { brokersTable } from "./brokers";

export const notesTable = pgTable("notes", {
  id: serial("id").primaryKey(),
  brokerId: integer("broker_id").notNull().references(() => brokersTable.id),
  noteType: text("note_type"),
  description: text("description"),
  oldValue: text("old_value"),
  newValue: text("new_value"),
  updatedBy: text("updated_by"),
  updatedDate: text("updated_date"),
});

export const insertNoteSchema = createInsertSchema(notesTable).omit({ id: true });
export type InsertNote = z.infer<typeof insertNoteSchema>;
export type Note = typeof notesTable.$inferSelect;
