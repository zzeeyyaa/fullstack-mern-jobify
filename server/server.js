import express from "express";
import morgan from "morgan";
import * as dotenv from "dotenv";
import { nanoid } from "nanoid";

const app = express();
app.use(express.json());
dotenv.config();

let jobs = [
  { id: nanoid(), company: "apple", posistion: "front-end" },
  { id: nanoid(), company: "google", posistion: "back-end" },
];

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.get("/", (req, res) => {
  res.send("hello");
});
app.post("/", (req, res) => {
  console.log(req);
  res.json({ message: "data received", data: req.body });
});
//GET ALL JOB
app.get("/api/v1/jobs", (req, res) => {
  res.status(200).json({ message: "success", data: jobs });
});
//GET JOB BY ID
app.get("/api/v1/jobs/:id", (req, res) => {
  const { id } = req.params;
  const job = jobs.find((job) => job.id === id);
  if (!job) {
    return res.status(404).json({ message: "No data found" });
  }
  res.status(200).json({ message: "success", data: job });
});
//CREATE JOB
app.post("/api/v1/jobs", (req, res) => {
  const { company, position } = req.body;
  if (!company || !position) {
    return res
      .status(400)
      .json({ message: "Please provide company and position" });
  }
  const id = nanoid(10);
  const job = { id, company, position };
  jobs.push(job);
  return res.status(201).json({ message: "Success create data", job });
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server started on port : ${port}`);
});
