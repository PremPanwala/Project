import { body, param } from "express-validator";
import { CONSTANTS as USER_CONSTANTS } from "../../constants/validator/user/user";
import User from "../../models/user.model";

export const validate = (method) => {
  let error = [];
  switch (method) {
    case USER_CONSTANTS.SIGN_UP: {
      error = [
        body("email", "Please Provide Appropriate email")
          .isEmail()
          .custom(checkEmail),
        body("name", "Please Provide Name").not().isEmpty(),
        body("password")
          .isLength({ min: 8 })
          .withMessage("Password must be at least 8 characters in length."),
        body("dob", "Please Provide Date Of Birth").not().isEmpty(),
        body("org_id", "Please Provide org_id").not().isEmpty(),
      ];
      break;
    }
    case USER_CONSTANTS.LOGIN: {
      error = [
        body("email", "Please Provide Appropriate email")
          .isEmail()
          .not()
          .isEmpty(),
        body("password", "Please Provide password").not().isEmpty(),
      ];
      break;
    }
    case USER_CONSTANTS.logged_data: {
      error = [
        body("startDate", "Please Provide StartDate").not().isEmpty(),
        body("endDate", "Please Provide endDate").not().isEmpty(),
      ];
      break;
    }
  }
  return error;
};
export const checkEmail = async (email) => {
  let userExist = await User.isExist({ email });
  if (userExist) throw new Error("This Email address already exist");
};
