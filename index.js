import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.js";
import queryRoutes from "./routes/query.js";
import transferRequestRoutes from "./routes/transferRequest.js";
import eventRoutes from "./routes/events.js";
// import payuRoutes from "./routes/payu.js";
import missionRoutes from "./routes/mission.js";
import studentidCardRoutes from "./routes/studentIdCard.js";
import employeeidCardRoutes from "./routes/employeeIdCard.js";
import transferPairRoutes from "./routes/transferPair.js";
import linkRoutes from "./routes/links.js";
import ourTeamRoutes from "./routes/ourteam.js";
import donationRoutes from "./routes/donation.js";
import notificationRoutes from "./routes/notification.js";
import googleRoutes from "./routes/googleroutes.js";
import contactUs from "./features/contact/contactRoutes.js";

import session from "express-session";
import passport from "passport";

import payuRoutes from './routes/payu.js';
import bodyParser from 'body-parser';

dotenv.config();
const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.set('view engine', 'ejs');

const URL = process.env.URL;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// PayU Routes
app.use('/payu', payuRoutes);

// Home Route
app.get('/mani', (req, res) => {
    res.send(`
        <h1>PayU Payment Integration</h1>
        <form method="POST" action="/payu/pay">
            <input type="text" name="firstname" placeholder="First Name"/>
            <input type="email" name="email" placeholder="Email"/>
            <input type="text" name="phone" placeholder="Phone"/>
            <input type="text" name="amount" placeholder="Amount"/>
            <input type="text" name="productinfo" placeholder="Product Info"/>
            <button type="submit">Pay</button>
        </form>
    `);
})

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
app.use("/api/social", googleRoutes);
app.use("/api/contact_us", contactUs);
app.use("/api/ourteam", ourTeamRoutes);
app.use("/api/query", queryRoutes);
app.use("/api/transferrequest", transferRequestRoutes);
app.use("/api/transferpair", transferPairRoutes);
app.use("/api/events", eventRoutes);
// app.use("/api/payu", payuRoutes);
app.use("/api/links", linkRoutes);
app.use("/api/studentidcard", studentidCardRoutes);
app.use("/api/employeeidcard", employeeidCardRoutes);
app.use("/api/notification", notificationRoutes);
// app.use("/api/mutualTransfer", employeeidCardRoutes);
app.use("/api/mission", missionRoutes);
app.use("/api/donations", donationRoutes);

app.listen(port, () => {
  console.log(`Server is running on 4000`);
});
