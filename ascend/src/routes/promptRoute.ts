import { Router } from "express";
import { createPrompt, getPrompts, editPrompt, deletePrompt } from "../controllers/promptController";
const promptRoute = Router();

promptRoute.post("/createPrompt", createPrompt);
promptRoute.get("/getPrompts", getPrompts);
promptRoute.patch("/editPrompt/:id", editPrompt);
promptRoute.delete("/deletePrompt/:id", deletePrompt);

export default promptRoute;
