import express from "express";
import cors from "cors";
import responseFormatter from "./middlewares/responseFormatter";
import stKeyRoute from "./routes/stKeyRoute";
import questionRoute from "./routes/questionRoute";

const app = express();

app.use(express.json());
app.use(cors());

app.use(responseFormatter);

app.use("/", stKeyRoute);
app.use("/", questionRoute);

export default app;
