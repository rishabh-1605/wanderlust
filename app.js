if (process.env.NODE_ENV != "production") {
  require("dotenv").config();
}

const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const methodOverride = require("method-override");
const ejsmate = require("ejs-mate");
const ExpressError = require("./utils/ExpressError.js");
const session = require("express-session");
const { MongoStore } = require("connect-mongo");
const flash = require("connect-flash");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const User = require("./models/user.js");

const listingsRouter = require("./routes/listing.js");
const reviewsRouter = require("./routes/review.js");
const userRouter = require("./routes/user.js");

const dbUrl = process.env.ATLASDB_URL;

main()
  .then(() => {
    console.log("connected to DB");
  })
  .catch((err) => {
    console.log(err);
  });

async function main() {
  await mongoose.connect(dbUrl);
}

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.engine("ejs", ejsmate);
app.use(express.static(path.join(__dirname, "/public")));

const store = MongoStore.create({
  mongoUrl: dbUrl,
  crypto: {
    secret: process.env.SECRET,
  },
  touchafter: 24 * 3600,
});

store.on("error", () => {
  console.log("Error in mongo session store", err);
});

const sessionOptions = {
  store,
  secret: process.env.SECRET,
  resave: false,
  saveUninitialized: true,
  cookie: {
    expires: Date.now() + 7 * 24 * 60 * 60 * 1000, // info expires after one week from current date 7 days 24 hours 60 min 60 sec 1000 milisec
    maxAge: +7 * 24 * 60 * 60 * 1000,
    httpOnly: true,
  },
};

app.use(session(sessionOptions));
app.use(flash());

// app.get("/", (req, res) => {
//   res.send(" hii i am root");
// });

// app.get("/demouser", async (req, res) => {
//   let fakeUser = new User({
//     email: "student@gmail.com",
//     username: "delta-student",
//   });

//   let registeredUser = await User.register(fakeUser, "helloworld");
//   res.send(registeredUser);
// });

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate())); //authenticate() Generates a function that is used in Passport's LocalStrategy

passport.serializeUser(User.serializeUser()); //serializeUser() Generates a function that is used by Passport to serialize users into the session // it means if user login then we have to serialise its session  . in one website  storing its information is called serialisation.
passport.deserializeUser(User.deserializeUser()); //deserializeUser() Generates a function that is used by Passport to deserialize users into the sessions  // it means if user logout then we have to deserialise its session

// created middleware for sucees popup meassage it will show message only one time
app.use((req, res, next) => {
  res.locals.success = req.flash("success");
  res.locals.error = req.flash("error");
  res.locals.currUser = req.user; // to show signup and login option only if not logged in . will be used in navbar.ejs
  next();
});

app.get("/", (req, res) => {
  res.redirect("/listings");
});

app.use("/listings", listingsRouter);
app.use("/listings/:id/reviews", reviewsRouter);
app.use("/", userRouter);

// if the user sends the request and does not match with all the routes we created then it will show this request.
app.all("/{*splat}", (req, res, next) => {
  next(new ExpressError(404, "page not found!"));
});

// creating custom error message ( for error that already occured when we are filling empty field in form and validation error was coming from mongoose . the problem is not solved just descibing what message should show for error)
app.use((err, req, res, next) => {
  let { statuscode = 500, message = "something went wrong!" } = err;
  res.status(statuscode).render("error.ejs", { message });
  //res.status(statuscode).send(message);
});

app.listen(8080, () => {
  console.log("server is listening to port 8080");
});
