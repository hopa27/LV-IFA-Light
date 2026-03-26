import { Router, type IRouter } from "express";
import { db } from "@workspace/db";
import { brokersTable } from "@workspace/db/schema";
import { eq, ilike, or, and } from "drizzle-orm";
import {
  ListBrokersQueryParams,
  CreateBrokerBody,
  UpdateBrokerBody,
  GetBrokerParams,
  UpdateBrokerParams,
} from "@workspace/api-zod";

const router: IRouter = Router();

router.get("/brokers", async (req, res) => {
  try {
    const query = ListBrokersQueryParams.parse(req.query);
    const conditions = [];

    if (query.postcode) {
      conditions.push(ilike(brokersTable.postcode, `%${query.postcode}%`));
    }
    if (query.ifaReference) {
      conditions.push(ilike(brokersTable.ifaRef, `%${query.ifaReference}%`));
    }
    if (query.ifaName) {
      conditions.push(ilike(brokersTable.brokerName, `%${query.ifaName}%`));
    }

    const statusFilters = [];
    if (query.authorised) statusFilters.push("Authorised");
    if (query.cancelled) statusFilters.push("Cancelled");
    if (query.duplicateRecord) statusFilters.push("Duplicate Record");
    if (query.revoked) statusFilters.push("Revoked");

    if (statusFilters.length > 0) {
      conditions.push(
        or(...statusFilters.map((s) => eq(brokersTable.status, s)))!
      );
    }

    const where = conditions.length > 0 ? and(...conditions) : undefined;
    const brokers = await db.select().from(brokersTable).where(where).limit(500);
    res.json(brokers);
  } catch (err) {
    req.log.error({ err }, "Error listing brokers");
    res.status(500).json({ error: "Internal server error" });
  }
});

router.post("/brokers", async (req, res) => {
  try {
    const body = CreateBrokerBody.parse(req.body);
    const [broker] = await db.insert(brokersTable).values(body).returning();
    res.status(201).json(broker);
  } catch (err) {
    req.log.error({ err }, "Error creating broker");
    res.status(500).json({ error: "Internal server error" });
  }
});

router.get("/brokers/:id", async (req, res) => {
  try {
    const { id } = GetBrokerParams.parse({ id: req.params.id });
    const [broker] = await db
      .select()
      .from(brokersTable)
      .where(eq(brokersTable.id, id));
    if (!broker) {
      res.status(404).json({ error: "Broker not found" });
      return;
    }
    res.json(broker);
  } catch (err) {
    req.log.error({ err }, "Error getting broker");
    res.status(500).json({ error: "Internal server error" });
  }
});

router.put("/brokers/:id", async (req, res) => {
  try {
    const { id } = UpdateBrokerParams.parse({ id: req.params.id });
    const body = UpdateBrokerBody.parse(req.body);
    const [broker] = await db
      .update(brokersTable)
      .set(body)
      .where(eq(brokersTable.id, id))
      .returning();
    if (!broker) {
      res.status(404).json({ error: "Broker not found" });
      return;
    }
    res.json(broker);
  } catch (err) {
    req.log.error({ err }, "Error updating broker");
    res.status(500).json({ error: "Internal server error" });
  }
});

export default router;
