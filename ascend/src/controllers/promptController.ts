import { Request, Response } from "express";
import { v4 as uuidv4 } from "uuid";
import promptModel from "../models/promptModel";

export const createPrompt = async (req: Request, res: Response) => {
  try {
    const { prompt } = req.body;

    const plan = new promptModel({
        id: uuidv4(),
        prompt
    })

    await plan.save();
    res.sendFormattedResponse(201, true, "Prompt created successfully");
  } catch (error) {
    console.error("createPrompt error: ", error);
    if (error instanceof Error) {
      res.sendFormattedResponse(500, false, "Internal server error", null, error.message);
    } else {
      res.sendFormattedResponse(500, false, "Internal server error", null, "Unknown error");
    }
  }
};

export const getPrompts = async (req: Request, res: Response) => {
  try {
    const prompts = await promptModel.scan().exec();

    if (prompts.count === 0) {
      return res.sendFormattedResponse(404, false, "No prompts found.");
    }

    res.sendFormattedResponse(200, true, null, prompts);
  } catch (error) {
    console.error("getPrompts error: ", error);
    if (error instanceof Error) {
      res.sendFormattedResponse(500, false, "Internal server error", null, error.message);
    } else {
      res.sendFormattedResponse(500, false, "Internal server error", null, "Unknown error");
    }
  }
};

export const editPrompt = async (req: Request, res: Response) => {
  try {
    const { id: promptId } = req.params;
    const { prompt } = req.body;

    const pmt = await promptModel.get(promptId);
    if (!pmt) {
      return res.sendFormattedResponse(404, false, `Prompt not found with id: ${promptId}`);
    }

    pmt.prompt = prompt || pmt.prompt;

    await pmt.save();
    res.sendFormattedResponse(200, true, "Prompt updated successfully", pmt);
  } catch (error) {
    console.error("editPrompt error: ", error);
    if (error instanceof Error) {
      res.sendFormattedResponse(500, false, "Internal server error", null, error.message);
    } else {
      res.sendFormattedResponse(500, false, "Internal server error", null, "Unknown error");
    }
  }
};

export const deletePrompt = async (req: Request, res: Response) => {
  try {
    const { id: promptId } = req.params;

    const prompt = await promptModel.get(promptId);
    if (!prompt) {
      return res.sendFormattedResponse(404, false, `Prompt not found with id: ${promptId}`);
    }

    await prompt.delete();
    res.sendFormattedResponse(200, true, "Prompt deleted successfully");
  } catch (error) {
    console.error("deletePrompt error: ", error);
    if (error instanceof Error) {
      res.sendFormattedResponse(500, false, "Internal server error", null, error.message);
    } else {
      res.sendFormattedResponse(500, false, "Internal server error", null, "Unknown error");
    }
  }
};
