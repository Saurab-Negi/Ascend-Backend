import { Router } from "express";
import questionRoute from "./questionRoute";
import stKeyRoute from "./stKeyRoute";

const router = Router();

router.use("/", stKeyRoute);
router.use("/", questionRoute);

export default router;
