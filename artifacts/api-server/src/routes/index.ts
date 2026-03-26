import { Router, type IRouter } from "express";
import healthRouter from "./health";
import brokersRouter from "./brokers";
import contactsRouter from "./contacts";
import notesRouter from "./notes";
import retirementIncomeRouter from "./retirement-income";
import equityReleaseRouter from "./equity-release";

const router: IRouter = Router();

router.use(healthRouter);
router.use(brokersRouter);
router.use(contactsRouter);
router.use(notesRouter);
router.use(retirementIncomeRouter);
router.use(equityReleaseRouter);

export default router;
