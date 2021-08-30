import jwt from "jsonwebtoken";
const ACCESS_TOKEN_EXPIRATION = {
  expiresIn: "50h",
};
export const createTokens = async (payload) => {
  const accessToken = jwt.sign(payload, "assignment", ACCESS_TOKEN_EXPIRATION);
  let tokens = { accessToken };
  return tokens;
};

export const verifyAccessToken = async (accessToken) => {
  const decoded = jwt.verify(accessToken, "assignment");
  return decoded;
};
