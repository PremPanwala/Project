import {
  BadRequestError,
  InternalServerError,
  UnauthorizationError,
} from "../../helpers/errors/custom-error";

import { encrypt, handleResponse } from "../../helpers/utility";
import { logger, level } from "../../config/logger/logger";
import * as Usersrv from "../../services/user/user.services";
import { createTokens } from "../../helpers/jwt_auth/jwt_auth";
import User from "../../models/user.model";
import login_log from "../../models/login_log.model";
export const signUp = async (req, res, next) => {
  logger.log(level.info, `✔ Controller signUp()`);
  try {
    await Usersrv.signUp(req.body);
    let dataObject = {
      message: "User Signed-Up succesfully",
    };
    return handleResponse(res, dataObject);
  } catch (e) {
    if (e && e.message) return next(new BadRequestError(e.message));
    logger.log(level.error, `Error: ${JSON.stringify(e)}`);
    next(new InternalServerError());
  }
};
export const userLogin = async (req, res, next) => {
  logger.log(level.info, `>> Controller: userLogin()`);
  let body = req.body;
  try {
    let userData = await User.findData({ email: req.body.email });
    await Usersrv.userDataVerify(userData, body);
    let payload = {
      id: userData[0]._id,
      email: userData[0].email,
    };
    let login_logData = {
      userid: userData[0]._id,
      logged_in_date_time: new Date().toISOString(),
    };
    await Usersrv.login_logs(login_logData);
    let tokens = await createTokens(payload);
    let dataObject = {
      message: "You have logged in successfully.",
      data: {
        accessToken: tokens.accessToken,
      },
    };
    return handleResponse(res, dataObject);
  } catch (e) {
    if (e && e.message) return next(new BadRequestError(e.message));
    logger.log(level.error, `Error: ${JSON.stringify(e)}`);
    return next(new InternalServerError());
  }
};
export const loggedUser = async (req, res, next) => {
  logger.log(level.info, `✔ Controller loggedUser()`);
  try {
    let startDate = req.body.startDate + "T00:00:00.000Z";
    let endDate = req.body.endDate + "T00:00:00.000Z";
    let data = await Usersrv.get_login_logs_Data(startDate, endDate);
    let dataObject = {
      message: "Data Fetched successfully.",
      data: {
        count: data.length,
        data,
      },
    };
    return handleResponse(res, dataObject);
  } catch (e) {
    if (e && e.message) return next(new BadRequestError(e.message));
    logger.log(level.error, `Error: ${JSON.stringify(e)}`);
    next(new InternalServerError());
  }
};
export const getSingleloggedUser = async (req, res, next) => {
  logger.log(level.info, `✔ Controller getSingleloggedUser()`);
  try {
    let email;
    if (!req.body.email) {
      email = req["currentUser"].email;
    } else {
      email = req.body.email;
    }
    let startDate = req.body.startDate + "T00:00:00.000Z";
    let endDate = req.body.endDate + "T00:00:00.000Z";
    let data = await Usersrv.get_Single_login_logs_Data(
      startDate,
      endDate,
      email
    );
    let dataObject = {
      message: "Data Fetched successfully.",
      data: {
        count: data.length,
        data,
      },
    };
    return handleResponse(res, dataObject);
  } catch (e) {
    if (e && e.message) return next(new BadRequestError(e.message));
    logger.log(level.error, `Error: ${JSON.stringify(e)}`);
    next(new InternalServerError());
  }
};
