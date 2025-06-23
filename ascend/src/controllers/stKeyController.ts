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

export const getStKey = async (req: Request, res: Response) => {
  try {
    const stKey = await stKeyModel.scan().exec();

    if (stKey.count === 0) {
      return res.sendFormattedResponse(404, false, "No stKey found.");
    }

    res.sendFormattedResponse(200, true, null, stKey);
  } catch (error) {
    console.error("getStKey error: ", error);
    if (error instanceof Error) {
      res.sendFormattedResponse(500, false, "Internal server error", null, error.message);
    } else {
      res.sendFormattedResponse(500, false, "Internal server error", null, "Unknown error");
    }
  }
};

export const updateStKey = async (req: Request, res: Response) => {
  try {
    const { id: stKeyId } = req.params;
    const { name, description, icon } = req.body;

    const stKey = await stKeyModel.get(stKeyId);
    if (!stKey) {
      return res.sendFormattedResponse(404, false, `StKey not found with id: ${stKeyId}`);
    }

    stKey.name = name || stKey.name;
    stKey.description = description || stKey.description;
    stKey.icon = icon || stKey.icon;

    await stKey.save();
    res.sendFormattedResponse(200, true, "StKey updated successfully", stKey);
  } catch (error) {
    console.error("updateStKey error: ", error);
    if (error instanceof Error) {
      res.sendFormattedResponse(500, false, "Internal server error", null, error.message);
    } else {
      res.sendFormattedResponse(500, false, "Internal server error", null, "Unknown error");
    }
  }
};

export const deleteStKey = async (req: Request, res: Response) => {
  try {
    const { id: stKeyId } = req.params;

    const stKey = await stKeyModel.get(stKeyId);
    if (!stKey) {
      return res.sendFormattedResponse(404, false, `StKey not found with id: ${stKeyId}`);
    }

    await stKey.delete();
    res.sendFormattedResponse(200, true, "StKey deleted successfully");
  } catch (error) {
    console.error("deleteStKey error: ", error);
    if (error instanceof Error) {
      res.sendFormattedResponse(500, false, "Internal server error", null, error.message);
    } else {
      res.sendFormattedResponse(500, false, "Internal server error", null, "Unknown error");
    }
  }
};
