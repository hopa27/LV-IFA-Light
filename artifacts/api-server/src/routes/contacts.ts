import { Router, type IRouter } from "express";
import { db } from "@workspace/db";
import { contactsTable } from "@workspace/db/schema";
import { eq } from "drizzle-orm";
import {
  ListContactsParams,
  CreateContactBody,
  CreateContactParams,
  UpdateContactBody,
  UpdateContactParams,
} from "@workspace/api-zod";

const router: IRouter = Router();

router.get("/brokers/:brokerId/contacts", async (req, res) => {
  try {
    const { brokerId } = ListContactsParams.parse({ brokerId: req.params.brokerId });
    const contacts = await db
      .select()
      .from(contactsTable)
      .where(eq(contactsTable.brokerId, brokerId));
    res.json(contacts);
  } catch (err) {
    req.log.error({ err }, "Error listing contacts");
    res.status(500).json({ error: "Internal server error" });
  }
});

router.post("/brokers/:brokerId/contacts", async (req, res) => {
  try {
    const { brokerId } = CreateContactParams.parse({ brokerId: req.params.brokerId });
    const body = CreateContactBody.parse(req.body);
    const [contact] = await db
      .insert(contactsTable)
      .values({ ...body, brokerId })
      .returning();
    res.status(201).json(contact);
  } catch (err) {
    req.log.error({ err }, "Error creating contact");
    res.status(500).json({ error: "Internal server error" });
  }
});

router.put("/brokers/:brokerId/contacts/:id", async (req, res) => {
  try {
    const { id } = UpdateContactParams.parse({
      brokerId: req.params.brokerId,
      id: req.params.id,
    });
    const body = UpdateContactBody.parse(req.body);
    const [contact] = await db
      .update(contactsTable)
      .set(body)
      .where(eq(contactsTable.id, id))
      .returning();
    if (!contact) {
      res.status(404).json({ error: "Contact not found" });
      return;
    }
    res.json(contact);
  } catch (err) {
    req.log.error({ err }, "Error updating contact");
    res.status(500).json({ error: "Internal server error" });
  }
});

export default router;
