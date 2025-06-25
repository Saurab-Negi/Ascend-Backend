import { Router } from "express";
import { genStKeyQsn, genJourPmt } from "../controllers/aiController";

const aiRoute = Router();

aiRoute.post("/genStKeyQsn", genStKeyQsn);
aiRoute.post("/genJourPmt", genJourPmt);

export default aiRoute;
