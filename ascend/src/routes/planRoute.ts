import { Router } from "express";
import { createPlan, getPlans, editPlan, deletePlan } from "../controllers/planController";
const planRoute = Router();

planRoute.post("/createPlan", createPlan);
planRoute.get("/getPlans", getPlans);
planRoute.patch("/editPlan/:id", editPlan);
planRoute.delete("/deletePlan/:id", deletePlan);

export default planRoute;
