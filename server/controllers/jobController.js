import { nanoid } from "nanoid";
import Job from "../models/JobModel.js";
import { StatusCodes } from "http-status-codes";

let jobs = [
  { id: nanoid(), company: "apple", posistion: "front-end" },
  { id: nanoid(), company: "google", posistion: "back-end" },
];

export const getAllJobs = async (req, res) => {
  console.log(req.user);
  const jobs = await Job.find({});
  // res.status(StatusCodes.OK).json({ message: "success", data: jobs });
  res.status(StatusCodes.OK).json({ jobs });
  // const { search, jobStatus, jobType, sort } = req.query;

  // const queryObject = {
  //   createdBy: req.user.userId,
  // };

  // if (search) {
  //   queryObject.$or = [
  //     { position: { $regex: search, $options: "i" } },
  //     { company: { $regex: search, $options: "i" } },
  //   ];
  // }

  // if (jobStatus && jobStatus !== "all") {
  //   queryObject.jobStatus = jobStatus;
  // }
  // if (jobType && jobType !== "all") {
  //   queryObject.jobType = jobType;
  // }

  // const sortOptions = {
  //   newest: "-createdAt",
  //   oldest: "createdAt",
  //   "a-z": "position",
  //   "z-a": "-position",
  // };

  // const sortKey = sortOptions[sort] || sortOptions.newest;

  // const page = NUmber(req.query.page) || 1;
  // const limit = NUmber(req.query.limit) || 10;
  // const skip = (page - 1) * limit;

  // const jobs = await Job.find(queryObject)
  //   .sort(sortKey)
  //   .skip(skip)
  //   .limit(limit);

  // const totalJobs = await Job.countDocuments(queryObject);
  // const numOfPages = Math.ceil(totalJobs / limit);

  // req
  //   .status(StatusCodes.OK)
  //   .json({ totalJobs, numOfPages, currentPage: page, jobs });
};
export const getJob = async (req, res) => {
  const job = await Job.findById(req.params.id);
  res.status(StatusCodes.OK).json({ job });
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
  req.body.createdBy = req.user.userId;
  // const { company, position } = req.body;
  const job = await Job.create(req.body);
  return res
    .status(StatusCodes.CREATED)
    .json({ message: "Success create data", job });
};
