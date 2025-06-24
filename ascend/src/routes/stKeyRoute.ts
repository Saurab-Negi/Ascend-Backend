import { Router } from "express";
import { createStKey, getStKey, editStKey, deleteStKey } from "../controllers/stKeyController";

const stKeyRoute = Router();

stKeyRoute.post("/createStKey", createStKey);
stKeyRoute.get("/getStKey", getStKey);
stKeyRoute.patch("/editStKey/:id", editStKey);
stKeyRoute.delete("/deleteStKey/:id", deleteStKey);

export default stKeyRoute;
