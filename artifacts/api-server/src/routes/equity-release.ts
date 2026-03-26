import { Router, type IRouter } from "express";
import { db } from "@workspace/db";
import { equityReleaseTable } from "@workspace/db/schema";
import { eq } from "drizzle-orm";
import {
  GetEquityReleaseParams,
  UpdateEquityReleaseParams,
  UpdateEquityReleaseBody,
} from "@workspace/api-zod";

const router: IRouter = Router();

router.get("/brokers/:brokerId/equity-release", async (req, res) => {
  try {
    const { brokerId } = GetEquityReleaseParams.parse({ brokerId: req.params.brokerId });
    const [record] = await db
      .select()
      .from(equityReleaseTable)
      .where(eq(equityReleaseTable.brokerId, brokerId));
    if (!record) {
      const [newRecord] = await db
        .insert(equityReleaseTable)
        .values({ brokerId })
        .returning();
      res.json(newRecord);
      return;
    }
    res.json(record);
  } catch (err) {
    req.log.error({ err }, "Error getting equity release");
    res.status(500).json({ error: "Internal server error" });
  }
});

router.put("/brokers/:brokerId/equity-release", async (req, res) => {
  try {
    const { brokerId } = UpdateEquityReleaseParams.parse({ brokerId: req.params.brokerId });
    const body = UpdateEquityReleaseBody.parse(req.body);

    const [existing] = await db
      .select()
      .from(equityReleaseTable)
      .where(eq(equityReleaseTable.brokerId, brokerId));

    if (existing) {
      const [updated] = await db
        .update(equityReleaseTable)
        .set(body)
        .where(eq(equityReleaseTable.brokerId, brokerId))
        .returning();
      res.json(updated);
    } else {
      const [created] = await db
        .insert(equityReleaseTable)
        .values({ ...body, brokerId })
        .returning();
      res.json(created);
    }
  } catch (err) {
    req.log.error({ err }, "Error updating equity release");
    res.status(500).json({ error: "Internal server error" });
  }
});

export default router;
