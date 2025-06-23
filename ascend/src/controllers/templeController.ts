import { Request, Response } from "express";
import { v4 as uuidv4 } from "uuid";
import templeModel from "../models/templeModel";

export const createTemple = async (req: Request, res: Response) => {
  try {
    const { stKeyId, stKeyName, name, desc, freq, color, sound } = req.body;

    const temple = new templeModel({
        id: uuidv4(),
        stKeyId,
        stKeyName,
        name,
        desc,
        freq,
        color,
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

export const getTemples = async (req: Request, res: Response) => {
  try {
    const temples = await templeModel.scan().exec();

    if (temples.count === 0) {
      return res.sendFormattedResponse(404, false, "No temple found.");
    }

    res.sendFormattedResponse(200, true, null, temples);
  } catch (error) {
    console.error("getTemples error: ", error);
    if (error instanceof Error) {
      res.sendFormattedResponse(500, false, "Internal server error", null, error.message);
    } else {
      res.sendFormattedResponse(500, false, "Internal server error", null, "Unknown error");
    }
  }
};

export const editTemple = async (req: Request, res: Response) => {
  try {
    const { id: templeId } = req.params;
    const { stKeyId, stKeyName, name, desc, freq, color, sound } = req.body;

    const temple = await templeModel.get(templeId);
    if (!temple) {
      return res.sendFormattedResponse(404, false, `Temple not found with id: ${templeId}`);
    }

    temple.stKeyId = stKeyId || temple.stKeyId;
    temple.stKeyName = stKeyName || temple.stKeyName;
    temple.name = name || temple.name;
    temple.desc = desc || temple.desc;
    temple.freq = freq || temple.freq;
    temple.color = color || temple.color;
    temple.sound = sound || temple.sound;

    await temple.save();
    res.sendFormattedResponse(200, true, "Temple updated successfully", temple);
  } catch (error) {
    console.error("editTemple error: ", error);
    if (error instanceof Error) {
      res.sendFormattedResponse(500, false, "Internal server error", null, error.message);
    } else {
      res.sendFormattedResponse(500, false, "Internal server error", null, "Unknown error");
    }
  }
};

export const deleteTemple = async (req: Request, res: Response) => {
  try {
    const { id: templeId } = req.params;

    const temple = await templeModel.get(templeId);
    if (!temple) {
      return res.sendFormattedResponse(404, false, `Temple not found with id: ${templeId}`);
    }

    await temple.delete();
    res.sendFormattedResponse(200, true, "Temple deleted successfully");
  } catch (error) {
    console.error("deleteTemple error: ", error);
    if (error instanceof Error) {
      res.sendFormattedResponse(500, false, "Internal server error", null, error.message);
    } else {
      res.sendFormattedResponse(500, false, "Internal server error", null, "Unknown error");
    }
  }
};
