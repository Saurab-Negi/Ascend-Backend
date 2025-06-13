import { Router } from "express";
import { createQuestion } from "../controllers/questionController";

const questionRoute = Router();

questionRoute.post("/createQuestion", createQuestion);

export default questionRoute;
