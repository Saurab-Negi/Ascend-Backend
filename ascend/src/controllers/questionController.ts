import { Request, Response } from "express";
import { v4 as uuidv4 } from "uuid";
import questionModel from "../models/questionModel";

export const createQuestion = async (req: Request, res: Response) => {
  try {
    const { question, stKeyId } = req.body;

    const questions = new questionModel({
      id: uuidv4(),
      question,
      stKeyId
    });

    await questions.save();
    res.sendFormattedResponse(201, true, "Question created successfully");
  } catch (error) {
    console.error("createQuestion error: ", error);
    if (error instanceof Error) {
      res.sendFormattedResponse(500, false, "Internal server error", null, error.message);
    } else {
      res.sendFormattedResponse(500, false, "Internal server error", null, "Unknown error");
    }
  }
};
