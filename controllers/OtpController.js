import { PrismaClient } from "@prisma/client";
import sendEmail from "../utils/sendEmail.js";

const prisma = new PrismaClient();

// Send OTP
export const sendOtp = async (req, res) => {
  try {
    const { mail } = req.body;

    // Check if OTP already exists
    const otpExists = await prisma.otp.findFirst({
      where: { mail },
      orderBy: { createdAt: "desc" }, // Check for the most recent OTP for the email
    });

    if (otpExists) {
      const timeSinceLastOtp = new Date() - new Date(otpExists.createdAt);
      const waitTime = 2 * 60 * 1000; // 2 minutes

      if (timeSinceLastOtp < waitTime) {
        return res.status(400).json({
          message:
            "OTP already sent. Please wait for 2 minutes before requesting again.",
        });
      }
    }

    // Generate a numeric OTP
    const otpLength = 6;
    let otp = "";
    for (let i = 0; i < otpLength; i++) {
      otp += Math.floor(Math.random() * 10);
    }

    console.log("OTP Generated", otp);

    // Save OTP to database
    await prisma.otp.create({
      data: { mail, otp, expiresAt: new Date(Date.now() + 2 * 60 * 1000) },
    });

    // Send the OTP via email
    await sendEmail(mail, otp);

    console.log("OTP sent successfully");
    res.status(200).json({ message: "OTP sent successfully" });
  } catch (err) {
    console.error("Error sending OTP:", err);
    res.status(500).json({ message: err.message });
  }
};

// Validate OTP
export const validateOtp = async (req, res) => {
  try {
    const { mail, otp } = req.body;

    // Validate OTP
    const otpRecord = await prisma.otp.findFirst({
      where: { mail, otp },
      orderBy: { createdAt: "desc" }, // Check for the most recent OTP for validation
    });

    if (!otpRecord) {
      return res.status(400).json({ message: "Invalid or expired OTP" });
    }

    res.status(200).json({ message: "OTP validated successfully" });
  } catch (err) {
    console.error("Error validating OTP:", err);
    res.status(500).json({ message: err.message });
  }
};
