import { Router } from "express";
import { createTemple, getTemples, editTemple, deleteTemple } from "../controllers/templeController";

const templeRoute = Router();

templeRoute.post("/createTemple", createTemple);
templeRoute.get("/getTemples", getTemples);
templeRoute.patch("/editTemple/:id", editTemple);
templeRoute.delete("/deleteTemple/:id", deleteTemple);

export default templeRoute;
