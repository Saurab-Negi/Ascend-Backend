import { Request, Response } from "express";
import { generateCompletion } from "../services/openaiService";

export const genStKeyQsn = async (req: Request, res: Response) => {
  try {
    const { stKeyName } = req.body;

    if (!stKeyName) {
      res.sendFormattedResponse(400, false, "Missing stKeyName in request body.");
    }

    const prompt = `Generate a reflective, wellness-oriented question **as if a therapist or coach is asking the user** based on the theme "${stKeyName}". Only return the question without any introduction, conclusion, or additional commentary.`;

    const response = await generateCompletion(prompt);

    res.sendFormattedResponse(200, true, null, response);
  } catch (error) {
    console.error("genStKeyQsn error: ", error);
    if (error instanceof Error) {
      res.sendFormattedResponse(500, false, "Internal server error", null, error.message);
    } else {
      res.sendFormattedResponse(500, false, "Internal server error", null, "Unknown error");
    }
  }
};

export const genJourPmt = async (req: Request, res: Response) => {
  try {
    const prompt = `Generate a thoughtful reflection question **as if a therapist or coach is asking the user** which is suitable for a personal journaling exercise. The question should encourage deep self-awareness, personal growth, and introspection. Only return the question without any introduction, conclusion, or additional commentary.`;

    const response = await generateCompletion(prompt);

    res.sendFormattedResponse(200, true, null, response);
  } catch (error) {
    console.error("genJourPmt error: ", error);
    if (error instanceof Error) {
      res.sendFormattedResponse(500, false, "Internal server error", null, error.message);
    } else {
      res.sendFormattedResponse(500, false, "Internal server error", null, "Unknown error");
    }
  }
};
