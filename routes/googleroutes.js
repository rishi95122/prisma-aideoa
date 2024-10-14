import "../config/strategy/googleStrategy.js";
import express from "express";
import passport from "passport";
import { generateToken } from "../middleware/genrateJwtToken.js";

const router = express();
router.get("/", (req, res) => {
  res.send('<a href="/api/social/google">aurh dadwith goooo</a>');
});
router.get(
  "/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
  })
);
//  router.get(
//    "/google/callback",
//    passport.authenticate("google", {
//      failureRedirect: "/login",
//    }),
//    (req, res) => {
//     console.log("dasdasd",req.info,req.message)
//     return res.sendStatus(200)
//    }
//  );
router.get(
  "/google/callback",
  passport.authenticate("google", { failureRedirect: "/login" }),
  async (req, res) => {
    const user = req.user;
    if (user) {
      const authToken = await generateToken(user);

      res.cookie("accessToken", authToken.accessToken);
      res.cookie("refreshToken", authToken.refreshToken);
      console.log(authToken);
    }

    if (!user.mobile || !user.userType) {
      return res.redirect("http://localhost:5173/additional");
    }

    return res.redirect("http://localhost:5173?way=google");
  }
);

export default router;
