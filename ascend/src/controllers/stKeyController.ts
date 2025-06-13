import { Request, Response } from "express";
import { v4 as uuidv4 } from "uuid";
import stKeyModel from "../models/stKeyModel";

export const createStKey = async (req: Request, res: Response) => {
  try {
    const { name, description, icon } = req.body;

    const stKey = new stKeyModel({
      id: uuidv4(),
      name,
      description,
      icon
    });

    await stKey.save();
    res.sendFormattedResponse(201, true, "StKey created successfully");
  } catch (error) {
    console.error("createStKey error: ", error);
    if (error instanceof Error) {
      res.sendFormattedResponse(500, false, "Internal server error", null, error.message);
    } else {
      res.sendFormattedResponse(500, false, "Internal server error", null, "Unknown error");
    }
  }
};
