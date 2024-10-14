import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const accessTokenSecret =
  process.env.ACCESS_TOKEN_SECRET || "your-access-token-secret";
const refreshTokenSecret =
  process.env.REFRESH_TOKEN_SECRET || "your-refresh-token-secret";


export const refreshToken = (req, res) => {
  const { refreshToken } = req.body;

  if (!refreshToken) {
    return res.status(403).json({ message: "Refresh Token is required" });
  }

  jwt.verify(refreshToken, refreshTokenSecret, (err, user) => {
    if (err) {
      return res.status(403).json({ message: "Invalid Refresh Token" });
    }

    
    const newAccessToken = jwt.sign({ sub: user.sub }, accessTokenSecret, {
      expiresIn: "1m",
    });

    return res.status(200).json({
      message: "New access token generated",
      accessToken: newAccessToken,
    });
  });
};
