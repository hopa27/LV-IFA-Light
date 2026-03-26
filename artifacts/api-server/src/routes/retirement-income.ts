import { Router, type IRouter } from "express";
import { db } from "@workspace/db";
import { retirementIncomeTable } from "@workspace/db/schema";
import { eq } from "drizzle-orm";
import {
  GetRetirementIncomeParams,
  UpdateRetirementIncomeParams,
  UpdateRetirementIncomeBody,
} from "@workspace/api-zod";

const router: IRouter = Router();

router.get("/brokers/:brokerId/retirement-income", async (req, res) => {
  try {
    const { brokerId } = GetRetirementIncomeParams.parse({ brokerId: req.params.brokerId });
    const [record] = await db
      .select()
      .from(retirementIncomeTable)
      .where(eq(retirementIncomeTable.brokerId, brokerId));
    if (!record) {
      const [newRecord] = await db
        .insert(retirementIncomeTable)
        .values({ brokerId })
        .returning();
      res.json(newRecord);
      return;
    }
    res.json(record);
  } catch (err) {
    req.log.error({ err }, "Error getting retirement income");
    res.status(500).json({ error: "Internal server error" });
  }
});

router.put("/brokers/:brokerId/retirement-income", async (req, res) => {
  try {
    const { brokerId } = UpdateRetirementIncomeParams.parse({ brokerId: req.params.brokerId });
    const body = UpdateRetirementIncomeBody.parse(req.body);

    const [existing] = await db
      .select()
      .from(retirementIncomeTable)
      .where(eq(retirementIncomeTable.brokerId, brokerId));

    if (existing) {
      const [updated] = await db
        .update(retirementIncomeTable)
        .set(body)
        .where(eq(retirementIncomeTable.brokerId, brokerId))
        .returning();
      res.json(updated);
    } else {
      const [created] = await db
        .insert(retirementIncomeTable)
        .values({ ...body, brokerId })
        .returning();
      res.json(created);
    }
  } catch (err) {
    req.log.error({ err }, "Error updating retirement income");
    res.status(500).json({ error: "Internal server error" });
  }
});

export default router;
