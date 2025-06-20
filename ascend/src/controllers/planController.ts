import { Request, Response } from "express";
import { v4 as uuidv4 } from "uuid";
import planModel from "../models/planModel";

export const createPlan = async (req: Request, res: Response) => {
  try {
    const { planType, planPrice, planDuration, planDescription } = req.body;

    if (
      !Array.isArray(planDescription) ||
      !planDescription.every(desc => typeof desc === "string" && desc.trim() !== "")
    ) {
      return res.sendFormattedResponse(400, false, "Invalid planDescription. Must be an array of non-empty strings.");
    }

    const plan = new planModel({
        id: uuidv4(),
        planType,
        planPrice,
        planDuration,
        planDescription
    })

    await plan.save();
    res.sendFormattedResponse(201, true, "Plan created successfully");
  } catch (error) {
    console.error("createPlan error: ", error);
    if (error instanceof Error) {
      res.sendFormattedResponse(500, false, "Internal server error", null, error.message);
    } else {
      res.sendFormattedResponse(500, false, "Internal server error", null, "Unknown error");
    }
  }
};

export const getPlans = async (req: Request, res: Response) => {
  try {
    const plans = await planModel.scan().exec();

    if (plans.count === 0) {
      return res.sendFormattedResponse(404, false, "No plans found.");
    }

    res.sendFormattedResponse(200, true, null, plans);
  } catch (error) {
    console.error("getPlans error: ", error);
    if (error instanceof Error) {
      res.sendFormattedResponse(500, false, "Internal server error", null, error.message);
    } else {
      res.sendFormattedResponse(500, false, "Internal server error", null, "Unknown error");
    }
  }
};
