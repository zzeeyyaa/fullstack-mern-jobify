import "express-async-errors";
import express from "express";
import morgan from "morgan";
import * as dotenv from "dotenv";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";

const app = express();
app.use(cookieParser());
app.use(express.json());
dotenv.config();

//router
import jobRouter from "./routes/jobRouter.js";
import authRouter from "./routes/authRouter.js";

//middleware
import errorHandlerMiddleware from "./middleware/errorHandlerMiddleware.js";
import { authenticateUser } from "./middleware/authMiddleware.js";
// import { validateTest } from "./middleware/validationMiddleware.js";

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.get("/", (req, res) => {
  res.send("hello");
});

app.use("/api/v1/jobs", authenticateUser, jobRouter);
app.use("/api/v1/auth", authRouter);

//*MIDDLEWARE
app.use("*", (req, res) => {
  res.status(404).json({ message: "Not found" });
}); //any method, dont match anything in our server
//for handling error
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 3000;

try {
  await mongoose.connect(process.env.MONGO_URL);
  app.listen(port, () => {
    console.log(`Server started on port : ${port}`);
  });
} catch (error) {
  console.log(error);
  process.exit(1);
}
