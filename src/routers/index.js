import { Router } from "express";
import contactsRouter from "./contacts";
import authRouter from "./auth";

const router = Router();

router.use(contactsRouter);
router.use(authRouter);

export default router;