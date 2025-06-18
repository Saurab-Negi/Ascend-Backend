import { Router } from "express";
import preSignedRoute from "./preSignedRoute";
import questionRoute from "./questionRoute";
import stKeyRoute from "./stKeyRoute";
import userRoute from "./userRoute";

const router = Router();

router.use("/", preSignedRoute);
router.use("/", stKeyRoute);
router.use("/", questionRoute);
router.use("/", userRoute);

export default router;
