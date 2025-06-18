import { Request, Response } from "express";
import { generateUploadUrl } from "../utils/s3upload";

export const generatePresignedUrl = async (req: Request, res: Response) => {
  try {
    const { fileName } = req.body;

    if (!fileName) {
      return res.sendFormattedResponse(400, false, "fileName is required");
    }

    const { url, fileKey } = await generateUploadUrl(fileName);

    res.sendFormattedResponse(200, true, "presigned URL generated successfully", { presignedUrl: url, fileKey });
  } catch (error) {
    console.error("Error generating presigned URL:", error);
    if (error instanceof Error) {
      res.sendFormattedResponse(500, false, "Internal server error", null, error.message);
    } else {
      res.sendFormattedResponse(500, false, "Internal server error", null, "Unknown error");
    }
  }
};
