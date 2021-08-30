import {
  TokenExpiredError,
  UnauthorizationError,
} from "../helpers/errors/custom-error";
import * as JWT from "../helpers/jwt_auth/jwt_auth";
import User from "../models/user.model";
const AUTH_TYPE = "bearer";
const tokenLength = 2;
const tokenSplitBy = " ";
const AUTHORIZATION_HEADER_NAME = "authorization";
const CURRENT_USER = "currentUser";

export const AuthMiddleware = async (req, res, next) => {
  const authorization = req.headers[AUTHORIZATION_HEADER_NAME];
  try {
    if (authorization) {
      let token = authorization.split(tokenSplitBy);
      if (token.length == tokenLength && token[0].toLowerCase() === AUTH_TYPE) {
        let accessToken = token[1];
        let decoded = await JWT.verifyAccessToken(accessToken);
        let { id } = decoded;
        let userData = await User.findData({ _id: id });
        if (userData.length > 0) {
          req[CURRENT_USER] = userData[0];
          return next();
        }
      }
    }
  } catch (error) {
    return next(new TokenExpiredError());
  }
  return next(new UnauthorizationError());
};
