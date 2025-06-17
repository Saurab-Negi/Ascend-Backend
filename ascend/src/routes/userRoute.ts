import { Router } from "express";
import { createUser } from "..//controllers/userController";
const userRoute = Router();

userRoute.post("/createUser", createUser);

export default userRoute;
