import { StatusCodes } from "http-status-codes";
import User from "../models/UserModel.js";
import Job from "../models/JobModel.js";
import cloudinary from "cloudinary";
import { promises as fs } from "fs";
import { formatImage } from "../middleware/multerMiddleware.js";

export const getCurrentUser = async (req, res) => {
  const user = await User.findOne({ _id: req.user.userId });
  const userWithoutPassword = user.toJSON();
  res
    .status(StatusCodes.OK)
    .json({ message: "get current user", user: userWithoutPassword });
};
export const getApplicationStats = async (req, res) => {
  const users = await User.countDocuments();
  const jobs = await Job.countDocuments();
  res.status(StatusCodes.OK).json({ users, jobs });
};
export const updateUser = async (req, res) => {
  // console.log(req.file);
  // const obj = { ...req.body };
  // delete obj.password;
  // console.log(obj);
  const newUser = { ...req.body };
  delete newUser.password;
  delete newUser.role;
  if (req.file) {
    const file = formatImage(req.file);
    const response = await cloudinary.v2.uploader.upload(file);
    // await fs.unlink(req.file.path);
    // obj.avatar = response.secure_url;
    // obj.avatarPublicId = response.public_id;
    newUser.avatar = response.secure_url;
    newUser.avatarPublicId = response.public_id;
  }
  const user = await User.findOneAndUpdate(req.user.userId, newUser);

  if (req.file && user.avatarPublicId) {
    await cloudinary.v2.uploader.destroy(user.avatarPublicId);
  }
  res.status(StatusCodes.OK).json({ message: "update user" });
};
