import express from "express";
import { config } from "dotenv";
export const app = express();
import userRouter from "./routes/user.js";
import taskRouter from "./routes/tast.js";
import cookieParser from "cookie-parser";
import { errorMiddleweare } from "./middleware/error.js";
import cors from "cors";
config({
  path: "./data/config.env",
});

// Use middleware
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: [process.env.FORNTEND_URL],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);
app.get("/", (req, res) => {
  res.send("Nice working");
});
app.use(userRouter);
app.use(taskRouter);
app.use(errorMiddleweare);
