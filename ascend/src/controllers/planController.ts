import { Request, Response } from "express";
import { v4 as uuidv4 } from "uuid";
import planModel from "../models/planModel";
import { removeObjFromS3 } from "../utils/s3Bucket";

export const createPlan = async (req: Request, res: Response) => {
  try {
    const { planType, planPrice, planDuration, planDescription, planColor, planIcon } = req.body;

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
        planDescription,
        planColor,
        planIcon,
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

export const editPlan = async (req: Request, res: Response) => {
  try {
    const { id : planId } = req.params;
    const { planType, planPrice, planDuration, planDescription, planColor, planIcon } = req.body;

    const plan = await planModel.get(planId);

    if (!plan) {
      return res.sendFormattedResponse(404, false, `Plan not found with id: ${planId}`);
    }

    if (
      !Array.isArray(planDescription) ||
      !planDescription.every(desc => typeof desc === "string" && desc.trim() !== "")
    ) {
      return res.sendFormattedResponse(400, false, "Invalid planDescription. Must be an array of non-empty strings.");
    }

    if (plan.planIcon && planIcon && plan.planIcon != planIcon) {
      await removeObjFromS3(plan.planIcon);
    }

    plan.planType = planType || plan.planType;
    plan.planPrice = planPrice || plan.planPrice;
    plan.planDuration = planDuration || plan.planDuration;
    plan.planPplanDescriptionrice = planDescription || plan.planDescription;
    plan.planColor = planColor || plan.planColor;
    plan.planIcon = planIcon || plan.planIcon;

    await plan.save();
    res.sendFormattedResponse(201, true, "Plan updated successfully");
  } catch (error) {
    console.error("editPlan error: ", error);
    if (error instanceof Error) {
      res.sendFormattedResponse(500, false, "Internal server error", null, error.message);
    } else {
      res.sendFormattedResponse(500, false, "Internal server error", null, "Unknown error");
    }
  }
};

export const deletePlan = async (req: Request, res: Response) => {
  try {
    const { id: planId } = req.params;

    const plan = await planModel.get(planId);

    if (!plan) {
      return res.sendFormattedResponse(404, false, `Plan not found with id: ${planId}`);
    }

    if (plan.planIcon) {
      await removeObjFromS3(plan.planIcon);
    }

    await plan.delete();
    res.sendFormattedResponse(200, true, "Plan deleted successfully");
  } catch (error) {
    console.error("deletePlan error: ", error);
    if (error instanceof Error) {
      res.sendFormattedResponse(500, false, "Internal server error", null, error.message);
    } else {
      res.sendFormattedResponse(500, false, "Internal server error", null, "Unknown error");
    }
  }
};
