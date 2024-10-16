import jwt from "jsonwebtoken";
const accessTokenSecret = "your-access-token-secret";
const refreshTokenSecret = "your-refresh-token-secret";
const accessTokenExpiry = "10m";

const refreshTokenExpiry = "60m";
export const generateToken = async (user) => {
  const accessToken = jwt.sign(
    { sub: user.id, fullName: user.fullName },
    accessTokenSecret,
    {
      expiresIn: accessTokenExpiry,
    }
  );
  const refreshToken = jwt.sign(
    { sub: user.id, fullName: user.fullName },
    refreshTokenSecret,
    {
      expiresIn: refreshTokenExpiry,
    }
  );
  return { accessToken, refreshToken };
};
