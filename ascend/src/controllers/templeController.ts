import { Request, Response } from "express";
import { v4 as uuidv4 } from "uuid";
import templeModel from "../models/templeModel";

export const createTemple = async (req: Request, res: Response) => {
  try {
    const { name, desc, freq, color, logo, sound } = req.body;

    const temple = new templeModel({
        id: uuidv4(),
        name,
        desc,
        freq,
        color,
        logo,
        sound
    })

    await temple.save();
    res.sendFormattedResponse(201, true, "Temple created successfully");
  } catch (error) {
    console.error("createTemple error: ", error);
    if (error instanceof Error) {
      res.sendFormattedResponse(500, false, "Internal server error", null, error.message);
    } else {
      res.sendFormattedResponse(500, false, "Internal server error", null, "Unknown error");
    }
  }
};
