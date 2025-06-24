import { Router } from "express";
import { createQuestion, getAllQuestions, editQuestion, deleteQuestion } from "../controllers/questionController";

const questionRoute = Router();

questionRoute.post("/createQuestion", createQuestion);
questionRoute.get("/getAllQuestions", getAllQuestions);
questionRoute.patch("/editQuestion/:id", editQuestion);
questionRoute.delete("/deleteQuestion/:id", deleteQuestion);

export default questionRoute;
