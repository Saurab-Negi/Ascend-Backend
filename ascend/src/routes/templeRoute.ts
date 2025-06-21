import { Router } from "express";
import { createTemple } from "../controllers/templeController";

const templeRoute = Router();

templeRoute.post("/createTemple", createTemple);

export default templeRoute;
