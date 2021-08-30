import { Router } from "express";
import { CONSTANTS as USER_CONSTANTS } from "../../constants/validator/user/user";
import { validate as UserValidate } from "../../validator/user/user.validator";
import * as UserCtrl from "../../controllers/user/user.controller";
import * as ErrorMiddleware from "../../middleware/validatorError";
import { AuthMiddleware } from "../../middleware/authMiddleware";
const routes = new Router();
const PATH = {
  ROOT: "/",
  SIGN_UP: "/signup",
  LOGIN: "/login",
  LOGGED_IN_LOGS: "/loggedInLogs",
  SINGLE_LOGGS: "/singleLogs",
};

routes
  .route(PATH.SIGN_UP)
  .post(
    [
      UserValidate(USER_CONSTANTS.SIGN_UP),
      ErrorMiddleware.ExpressValidatorError,
    ],
    UserCtrl.signUp
  );
routes
  .route(PATH.LOGIN)
  .post(
    [UserValidate(USER_CONSTANTS.LOGIN), ErrorMiddleware.ExpressValidatorError],
    UserCtrl.userLogin
  );
routes
  .route(PATH.LOGGED_IN_LOGS)
  .get(
    [
      AuthMiddleware,
      UserValidate(USER_CONSTANTS.logged_data),
      ErrorMiddleware.ExpressValidatorError,
    ],
    UserCtrl.loggedUser
  );
routes
  .route(PATH.SINGLE_LOGGS)
  .get(
    [
      AuthMiddleware,
      UserValidate(USER_CONSTANTS.logged_data),
      ErrorMiddleware.ExpressValidatorError,
    ],
    UserCtrl.getSingleloggedUser
  );

export default routes;
