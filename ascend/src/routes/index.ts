import { Router } from "express";
import questionRoute from "./questionRoute";
import stKeyRoute from "./stKeyRoute";
import userRoute from "./userRoute";

const router = Router();

router.use("/", stKeyRoute);
router.use("/", questionRoute);
router.use("/", userRoute);

export default router;
