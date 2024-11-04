import jwt from "jsonwebtoken";
const accessTokenSecret = "your-access-token-secret";
const refreshTokenSecret = "your-refresh-token-secret";
const accessTokenExpiry = "10m";

const refreshTokenExpiry = "60m";
export const generateToken = async (user) => {
  console.log("userrrrr",user)
  const accessToken = jwt.sign(
    {  fullName: user.fullName,userType:user.userType,sub: user.id  },
    accessTokenSecret,
    {
      expiresIn: accessTokenExpiry,
    }
  );
  const refreshToken = jwt.sign(
    {   fullName: user.fullName,userType:user.userType,sub: user.id },
    refreshTokenSecret,
    {
      expiresIn: refreshTokenExpiry,
    }
  );
  return { accessToken, refreshToken };
};
