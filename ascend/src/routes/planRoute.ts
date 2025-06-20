import { Router } from "express";
import { createPlan, getPlans } from "../controllers/planController";
const planRoute = Router();

planRoute.post("/createPlan", createPlan);
planRoute.get("/getPlans", getPlans);

export default planRoute;
