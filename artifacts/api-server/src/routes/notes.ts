import { Router, type IRouter } from "express";
import { db } from "@workspace/db";
import { notesTable } from "@workspace/db/schema";
import { eq } from "drizzle-orm";
import {
  ListNotesParams,
  CreateNoteBody,
  CreateNoteParams,
} from "@workspace/api-zod";

const router: IRouter = Router();

router.get("/brokers/:brokerId/notes", async (req, res) => {
  try {
    const { brokerId } = ListNotesParams.parse({ brokerId: req.params.brokerId });
    const notes = await db
      .select()
      .from(notesTable)
      .where(eq(notesTable.brokerId, brokerId));
    res.json(notes);
  } catch (err) {
    req.log.error({ err }, "Error listing notes");
    res.status(500).json({ error: "Internal server error" });
  }
});

router.post("/brokers/:brokerId/notes", async (req, res) => {
  try {
    const { brokerId } = CreateNoteParams.parse({ brokerId: req.params.brokerId });
    const body = CreateNoteBody.parse(req.body);
    const [note] = await db
      .insert(notesTable)
      .values({ ...body, brokerId })
      .returning();
    res.status(201).json(note);
  } catch (err) {
    req.log.error({ err }, "Error creating note");
    res.status(500).json({ error: "Internal server error" });
  }
});

export default router;
