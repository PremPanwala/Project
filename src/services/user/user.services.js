import { logger, level } from "../../config/logger/logger";
import { encrypt, decrypt } from "../../helpers/utility";
const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;
//import { verifyRefreshToken } from "../../helpers/jwt_auth/jwt_auth";
import { TokenExpiredError } from "jsonwebtoken";
import User from "../../models/user.model";
import login_log from "../../models/login_log.model";
export const signUp = async (data) => {
  logger.log(level.info, `>> Services:signUp()`);
  let hashPassword = await encrypt(data.password);
  data.password = hashPassword;
  let userData = { _id: new mongoose.Types.ObjectId(), ...data };
  await User.createData(userData);
  return true;
};

export const userDataVerify = async (userData, body) => {
  logger.log(level.info, `>> Service: userDataVerify()`);
  let { password } = body;
  if (!userData.length > 0) throw new Error("Invalid user name or password");
  let isPasswordMatch = await decrypt(password, userData[0].password);
  if (!isPasswordMatch) throw new Error("Invalid user name or password");
  return true;
};
export const login_logs = async (data) => {
  logger.log(level.info, `>> Service: login_logs()`);
  await login_log.createData(data);
  return true;
};

export const get_login_logs_Data = async (startDate, endDate) => {
  logger.log(level.info, `>> Service: get_login_logs_Data()`);
  let data = await login_log.aggregate([
    {
      $match: {
        logged_in_date_time: {
          $gte: new Date(startDate),
          $lte: new Date(endDate),
        },
      },
    },
    {
      $lookup: {
        from: "users",
        localField: "userid",
        foreignField: "_id",
        as: "login_log",
      },
    },
  ]);
  return data;
};

export const get_Single_login_logs_Data = async (startDate, endDate, email) => {
  logger.log(level.info, `>> Service: get_Single_login_logs_Data()`);
  let data = await login_log.aggregate([
    {
      $match: {
        logged_in_date_time: {
          $gte: new Date(startDate),
          $lte: new Date(endDate),
        },
      },
    },
    {
      $lookup: {
        from: "users",
        localField: "userid",
        foreignField: "_id",
        as: "login_log",
      },
    },
    { $unwind: "$login_log" },
    { $match: { "login_log.email": email } },
  ]);
  return data;
};
