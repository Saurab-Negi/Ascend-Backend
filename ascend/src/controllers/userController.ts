import { Request, Response } from "express";
import { v4 as uuidv4 } from "uuid";
import userModel from "../models/userModel";

export const createUser = async (req: Request, res: Response) => {
  try {
    const { firstName, lastName, userName, email } = req.body;

    const user = new userModel({
      id: uuidv4(),
      firstName,
      lastName,
      userName,
      email,
    });

    await user.save();
    res.sendFormattedResponse(201, true, "User created successfully");
  } catch (error) {
    console.error("createUser error: ", error);
    if (error instanceof Error) {
      res.sendFormattedResponse(500, false, "Internal server error", null, error.message);
    } else {
      res.sendFormattedResponse(500, false, "Internal server error", null, "Unknown error");
    }
  }
};
