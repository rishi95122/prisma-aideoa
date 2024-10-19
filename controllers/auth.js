import { PrismaClient } from "@prisma/client";
import { generateToken } from "../middleware/genrateJwtToken.js";
import hashPassword from "../middleware/hashpassword.js";

const prisma = new PrismaClient();

export const signup = async (req, res) => {
  const { email, password, fullName, mobile, userType, otp } = req.body;

  try {
    const exist = await prisma.user.findUnique({
      where: { email },
    });
    if (exist) {
      return res.status(400).json({ error: "User already exists" });
    }

    const otpRecord = await prisma.otp.findFirst({
      where: {
        mail: email,
        otp,
      },
    });
    if (!otpRecord) {
      return res.status(400).json({ error: "Invalid or expired OTP" });
    }

    const hashedPassword = await hashPassword(password);
    const newUser = await prisma.user.create({
      data: {
        email,
        fullName,
        mobile,
        userType,
        isEmailVerified: Boolean(otpRecord),
        password: hashedPassword,
      },
    });

    return res.status(200).json({ message: "Successfully registered" });
  } catch (error) {
    return res
      .status(500)
      .json({ error: "Something went wrong", error: error.message });
  }
};

export const addtionalInfo = async (req, res) => {
  console.log("dasda", req.body);
  const { userType, mobile, idNo, org } = req.body;
  const { email } = req.user;
  try {
    const user = await prisma.user.update({
      where: { email },
      data: {
        userType,
        mobile,
      },
    });
    return res.status(200).json({ message: "User updated successfully" });
  } catch (error) {
    return res
      .status(500)
      .json({ error: "Something went wrong", error: error.message });
  }
};

export const login = async (req, res) => {
  try {
    const user = req.user;
    console.log(user);
    const authToken = await generateToken(user);
    return res.status(200).json(authToken);
  } catch (error) {
    return res
      .status(500)
      .json({ error: "Something went wrong", error: error.message });
  }
};

export const getMe = (req, res) => {
  console.log(req.user);
  return req.user ? res.status(200).json(req.user) : res.json("Not logged in");
};

export const logout = (req, res) => {
  if (!req.user) return res.sendStatus(400).send(req.user);

  req.logout((err) => {
    if (err) return res.sendStatus(400);
  });

  return req.user ? res.send(req.user) : res.send("Logged out");
};
