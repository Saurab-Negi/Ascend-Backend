import { Router } from "express";
import { generatePresignedUrl } from "../controllers/preSignedController";
const preSignedRoute = Router();

preSignedRoute.post("/generatePresignedUrl", generatePresignedUrl);

export default preSignedRoute;
