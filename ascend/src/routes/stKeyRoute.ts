import { Router } from "express";
import { createStKey, getStKey, updateStKey, deleteStKey } from "../controllers/stKeyController";

const stKeyRoute = Router();

stKeyRoute.post("/createStKey", createStKey);
stKeyRoute.get("/getStKey", getStKey);
stKeyRoute.patch("/updateStKey/:id", updateStKey);
stKeyRoute.delete("/deleteStKey/:id", deleteStKey);

export default stKeyRoute;
