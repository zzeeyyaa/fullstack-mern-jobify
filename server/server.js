import "express-async-errors";
import express from "express";
import morgan from "morgan";
import * as dotenv from "dotenv";
import mongoose from "mongoose";
import { body, validationResult } from "express-validator";

const app = express();
app.use(express.json());
dotenv.config();

//router
import jobRouter from "./routes/jobRouter.js";

//middleware
import errorHandlerMiddleware from "./middleware/errorHandlerMiddleware.js";
// import { validateTest } from "./middleware/validationMiddleware.js";

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.get("/", (req, res) => {
  res.send("hello");
});
// app.post("/api/v1/test", validateTest, (req, res) => {
//   const { name } = req.body;
//   res.json({ message: `hello ${name}` });
// });

app.use("/api/v1/jobs", jobRouter);

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
