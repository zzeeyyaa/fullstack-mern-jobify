import { nanoid } from "nanoid";
import Job from "../models/JobModel.js";
import { StatusCodes } from "http-status-codes";

let jobs = [
  { id: nanoid(), company: "apple", posistion: "front-end" },
  { id: nanoid(), company: "google", posistion: "back-end" },
];

export const getAllJobs = async (req, res) => {
  const jobs = await Job.find({});
  res.status(StatusCodes.OK).json({ message: "success", data: jobs });
};
export const getJob = async (req, res) => {
  const job = await Job.findById(req.params.id);
  res.status(StatusCodes.OK).json({ message: "success", data: job });
};
export const editJob = async (req, res) => {
  const job = await Job.findOneAndUpdate(req.params.id, req.body, {
    new: true,
  });
  res.status(StatusCodes.OK).json({ message: "success", data: job });
};
export const deleteJob = async (req, res) => {
  const job = await Job.findByIdAndDelete(req.params.id);
  res.status(StatusCodes.OK).json({ message: "success", data: job });
};
export const createJob = async (req, res) => {
  const { company, position } = req.body;
  const job = await Job.create({ company, position });
  return res
    .status(StatusCodes.CREATED)
    .json({ message: "Success create data", job });
};
