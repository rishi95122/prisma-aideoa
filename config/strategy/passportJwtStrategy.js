import passport from "passport";
import { Strategy as JwtStrategy, ExtractJwt } from "passport-jwt";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: "your-access-token-secret",
};

passport.use(
  new JwtStrategy(opts, async (jwt_payload, done) => {
    console.log(jwt_payload);
    try {
      const user = await prisma.user.findUnique({
        where: { id: jwt_payload.sub },
      });
      if (user) {
        const newUser = {
          email: user.email,
          id: user.id,
          isAdmin: user.isAdmin,
          isEmailVerified: user.isEmailVerified,
          isMobileVerified: user.isMobileVerified,
          mobile: user.mobile || "",
          userType: user.userType || "",
          fullName: user.fullName,
        };
        return done(null, newUser);
      } else {
        return done(null, false);
      }
    } catch (err) {
      return done(err, false);
    }
  })
);

export default passport;
