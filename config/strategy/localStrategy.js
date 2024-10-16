import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import bcryptjs from "bcryptjs";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

passport.serializeUser((user, done) => {
  done(null, user.id); // Serialize the user ID in the session
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id },
    });
    if (!user) throw new Error("User not found");
    done(null, user); // Deserialize the user by ID and populate req.user
  } catch (err) {
    done(err, null);
  }
});

passport.use(
  new LocalStrategy(
    { usernameField: "email" }, // Use email as the username
    async (email, password, done) => {
      try {
        const user = await prisma.user.findUnique({
          where: { email },
        });

        if (!user) {
          return done(null, false, { message: "No user found" });
        }

        // Compare the hashed password
        const isMatch = await bcryptjs.compare(password, user.password);
        if (!isMatch) {
          return done(null, false, { message: "Invalid credentials" });
        }

        return done(null, user); // User found and authenticated
      } catch (err) {
        return done(err);
      }
    }
  )
);

export default passport;
