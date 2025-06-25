import { Router } from "express";
import preSignedRoute from "./preSignedRoute";
import questionRoute from "./questionRoute";
import stKeyRoute from "./stKeyRoute";
import userRoute from "./userRoute";
import planRoute from "./planRoute";
import promptRoute from "./promptRoute";
import templeRoute from "./templeRoute";
import aiRoute from "./aiRoute";

const router = Router();

router.use("/", preSignedRoute);
router.use("/", stKeyRoute);
router.use("/", questionRoute);
router.use("/", userRoute);
router.use("/", planRoute);
router.use("/", promptRoute);
router.use("/", templeRoute);
router.use("/", aiRoute);

export default router;
