import {
  signup,
  login,
  getMe,
  logout,
  addtionalInfo,
} from "../controllers/auth.js";
import express from "express";
import passport from "passport";
import "../config/strategy/passportJwtStrategy.js";
import "../config/strategy/localStrategy.js";
import { refreshToken } from "../controllers/refresherToken.js";
import { sendOtp, validateOtp } from "../controllers/OtpController.js";
import { check } from "express-validator";

const router = express.Router();

router.post("/signup", signup);

router.post("/login", (req, res, next) => {
  passport.authenticate("local", { session: false }, (err, user, info) => {
    if (err) {
      return res
        .status(500)
        .json({ error: "Internal server error", details: err.message });
    }

    if (!user) {
      return res.status(401).json({ error: info.message });
    }

    req.logIn(user, { session: false }, (loginErr) => {
      if (loginErr) {
        return res
          .status(500)
          .json({ error: "Login error", details: loginErr.message });
      }

      return login(req, res);
    });
  })(req, res, next);
});

router.post("/refresh-token", refreshToken);

router.get("/getuser", passport.authenticate("jwt", { session: false }), getMe);
router.post("/logout", logout);
router.post(
  "/additional",
  passport.authenticate("jwt", { session: false }),
  addtionalInfo
);

router.post(
  "/send-otp",
  [check("mail").isEmail().withMessage("Valid email is required")],
  sendOtp
);
router.post("/verify-otp", validateOtp);
export default router;
