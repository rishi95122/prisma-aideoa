import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.js";
import queryRoutes from "./routes/query.js";
import eventRoutes from "./routes/events.js";
// import payuRoutes from "./routes/payu.js";
import missionRoutes from "./routes/mission.js";
import studentidCardRoutes from "./routes/studentIdCard.js";
import employeeidCardRoutes from "./routes/employeeIdCard.js";
import linkRoutes from "./routes/links.js";
// import googleRoutes from "./routes/googleroutes.js";
// import contactUs from "./features/contact/contactRoutes.js";

import session from "express-session";
import passport from "passport";

dotenv.config();
const app = express();
const URL = process.env.URL;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use(
  session({
    secret: "asas",
    saveUninitialized: false,
    resave: false,
    cookie: {
      maxAge: 15 * 24 * 60 * 60 * 1000,
      httpOnly: true,
      secure: false,
    },
  })
);

app.use(passport.initialize());
app.use(passport.session());

const port = 4000;

app.use("/api/auth", authRoutes);
// app.use("/api/social", googleRoutes);
// app.use("/api/contact_us", contactUs);
app.use("/api/query", queryRoutes);
app.use("/api/events", eventRoutes);
// app.use("/api/payu", payuRoutes);
app.use("/api/links", linkRoutes);
app.use("/api/studentidcard", studentidCardRoutes);
app.use("/api/employeeidcard", employeeidCardRoutes);
app.use("/api/mutualTransfer", employeeidCardRoutes);
app.use("/api/mission", missionRoutes);

app.listen(port, () => {
  console.log(`Server is running on 4000`);
});
