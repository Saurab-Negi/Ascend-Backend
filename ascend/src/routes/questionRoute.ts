import { Router } from "express";
import { createQuestion, getAllQuestions, updateQuestion, deleteQuestion } from "../controllers/questionController";

const questionRoute = Router();

questionRoute.post("/createQuestion", createQuestion);
questionRoute.get("/getAllQuestions", getAllQuestions);
questionRoute.patch("/updateQuestion/:id", updateQuestion);
questionRoute.delete("/deleteQuestion/:id", deleteQuestion);

export default questionRoute;
