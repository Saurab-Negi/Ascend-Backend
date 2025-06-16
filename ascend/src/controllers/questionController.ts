import { Request, Response } from "express";
import { v4 as uuidv4 } from "uuid";
import questionModel from "../models/questionModel";

export const createQuestion = async (req: Request, res: Response) => {
  try {
    const { question, stKeyId, stKeyName } = req.body;

    const questions = new questionModel({
      id: uuidv4(),
      question,
      stKeyId,
      stKeyName
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

export const getAllQuestions = async (req: Request, res: Response) => {
  try {
    const questions = await questionModel.scan().exec();

    if (questions.count === 0) {
      return res.sendFormattedResponse(204, false, "No questions found.");
    }

    res.sendFormattedResponse(200, true, null, questions);
  } catch (error) {
    console.error("getAllQuestions error: ", error);
    if (error instanceof Error) {
      res.sendFormattedResponse(500, false, "Internal server error", null, error.message);
    } else {
      res.sendFormattedResponse(500, false, "Internal server error", null, "Unknown error");
    }
  }
};

export const updateQuestion = async (req: Request, res: Response) => {
  try {
    const { id: questionId } = req.params;
    const { question, stKeyId, stKeyName } = req.body;

    const qsn = await questionModel.get(questionId);
    if (!qsn) {
      return res.sendFormattedResponse(204, false, `Question not found with id: ${questionId}`);
    }

    qsn.stKeyId = stKeyId || qsn.stKeyId;
    qsn.stKeyName = stKeyName || qsn.stKeyName;
    qsn.question = question || qsn.question;

    await qsn.save();
    res.sendFormattedResponse(200, true, "Question updated successfully", qsn);
  } catch (error) {
    console.error("updateQuestion error: ", error);
    if (error instanceof Error) {
      res.sendFormattedResponse(500, false, "Internal server error", null, error.message);
    } else {
      res.sendFormattedResponse(500, false, "Internal server error", null, "Unknown error");
    }
  }
};

export const deleteQuestion = async (req: Request, res: Response) => {
  try {
    const { id: questionId } = req.params;

    const question = await questionModel.get(questionId);
    if (!question) {
      return res.sendFormattedResponse(204, false, `Question not found with id: ${questionId}`);
    }

    await question.delete();
    res.sendFormattedResponse(200, true, "Question deleted successfully");
  } catch (error) {
    console.error("deleteQuestion error: ", error);
    if (error instanceof Error) {
      res.sendFormattedResponse(500, false, "Internal server error", null, error.message);
    } else {
      res.sendFormattedResponse(500, false, "Internal server error", null, "Unknown error");
    }
  }
};
