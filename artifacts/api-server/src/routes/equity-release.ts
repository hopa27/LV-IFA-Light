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

function toEquityReleaseDbFields(body: ReturnType<typeof UpdateEquityReleaseBody.parse>) {
  const { id: _id, brokerId: _brokerId, ...rest } = body;
  return {
    ...rest,
    flexibleBrokerRate: rest.flexibleBrokerRate?.toString(),
    flexibleMinimumAmount: rest.flexibleMinimumAmount?.toString(),
    flexibleNetworkRate: rest.flexibleNetworkRate?.toString(),
    lumpSumBrokerRate: rest.lumpSumBrokerRate?.toString(),
    lumpSumMinimumAmount: rest.lumpSumMinimumAmount?.toString(),
    lumpSumNetworkRate: rest.lumpSumNetworkRate?.toString(),
    packagingFee: rest.packagingFee?.toString(),
    applicationFee: rest.applicationFee?.toString(),
    ltvPercent: rest.ltvPercent?.toString(),
    lumpSumPackagingFee: rest.lumpSumPackagingFee?.toString(),
    lumpSumApplicationFee: rest.lumpSumApplicationFee?.toString(),
    lumpSumLtvPercent: rest.lumpSumLtvPercent?.toString(),
  };
}

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

    const dbFields = toEquityReleaseDbFields(body);
    if (existing) {
      const [updated] = await db
        .update(equityReleaseTable)
        .set(dbFields)
        .where(eq(equityReleaseTable.brokerId, brokerId))
        .returning();
      res.json(updated);
    } else {
      const [created] = await db
        .insert(equityReleaseTable)
        .values({ ...dbFields, brokerId })
        .returning();
      res.json(created);
    }
  } catch (err) {
    req.log.error({ err }, "Error updating equity release");
    res.status(500).json({ error: "Internal server error" });
  }
});

export default router;
