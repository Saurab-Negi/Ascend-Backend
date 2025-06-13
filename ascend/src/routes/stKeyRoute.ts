import { Router } from "express";
import { createStKey } from "../controllers/stKeyController";

const stKeyRoute = Router();

stKeyRoute.post("/createStKey", createStKey);

export default stKeyRoute;
