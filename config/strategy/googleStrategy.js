import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { PrismaClient } from "@prisma/client";
import dotenv from "dotenv";

dotenv.config();
const prisma = new PrismaClient();

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_SECRET_ID,
      callbackURL: process.env.CALLBACK_URL,
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        const existingUser = await prisma.user.findUnique({
          where: { email: profile.emails[0].value },
        });
        if (existingUser.email && existingUser.googleId)
          return done(null, existingUser, { message: "User already exists" });
        if (existingUser.email && !existingUser.googleId)
          return done(null, null, { message: "Login with email and password" });

        const newUser = await prisma.user.create({
          data: {
            fullName: profile.displayName,
            email: profile.emails[0].value,
            googleId: profile.id,
            isEmailVerified: true,
            isMobileVerified: false,
          },
        });

        return done(null, { newUser, accessToken });
      } catch (err) {
        return done(err, null);
      }
    }
  )
);

// Serialize user for session management
passport.serializeUser((user, done) => {
  done(null, user);
});

// Deserialize user
passport.deserializeUser(async (user, done) => {
  done(null, user);
});

export default passport;
