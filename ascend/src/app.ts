import express from "express";
import cors from "cors";
import responseFormatter from "./middlewares/responseFormatter";
import apiRoutes from "./routes"

const app = express();

app.use(express.json());
app.use(cors());

app.use(responseFormatter);

app.use("/", apiRoutes);

export default app;
