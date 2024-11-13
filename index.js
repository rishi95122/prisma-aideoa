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
import memberRoutes from "./routes/memberRoutes.js";
import contactUs from "./features/contact/contactRoutes.js";
import onlinetestRoutes from "./routes/onlineTest.js";
import studentnewsRoutes from "./routes/studentNews.js";
import employeeRoutes from "./routes/emoployeeNews.js";
import latestnewsroute from "./routes/latestnewsroute.js";
import educationroutes from "./routes/eduction.js";
import session from "express-session";
import passport from "passport";
import ImageKit from "imagekit";

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

const imagekit = new ImageKit({
  urlEndpoint: "https://ik.imagekit.io/d8e3qlogb",
  publicKey: "public_Q3vYMA6u3T7ku53MOJFrGn+cgDY=",
  privateKey: "private_RhZj471ZRDPWLb/x/AxQxGYoc2Y=",
});


app.use(function (req, res, next) {

  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.get("/image", function (req, res) {
  var result = imagekit.getAuthenticationParameters();
  console.log(result);
  res.send(result);
});

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
app.use("/api/latestnews", latestnewsroute);
app.use("/api/members", memberRoutes);
app.use("/api/onlinetest", onlinetestRoutes);
app.use("/api/studentnews", studentnewsRoutes);
app.use("/api/employeenews", employeeRoutes);
app.use("/api/education", educationroutes);
app.listen(port, () => {
  console.log(`Server is running on 4000`);
});
