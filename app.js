require("dotenv").config();
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const methodOverride = require("method-override");
const passport = require("passport");
const User = require("./models/user");
const LocalStrategy = require("passport-local");
const flash = require("connect-flash");
const path = require("path");

// Route imports
const teslaRoutes = require("./routes/tesla");
const mealAppRoutes = require("./routes/recipes");
const indexRoutes = require("./routes/index");
const techRoutes = require("./routes/techInfusion");

// MethodOverride config
app.use(methodOverride("_method"));

// Mongoose setup and config
mongoose.Promise = global.Promise;
mongoose.connect(process.env.DB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Body Parser setup
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Setup view engine
app.set("view engine", "ejs");

// Authentication
try {
  app.use(
    require("express-session")({
      secret: config.session.secret,
      resave: false,
      saveUninitialized: false,
    })
  );
} catch (e) {
  app.use(
    require("express-session")({
      secret: process.env.ES_SECRET,
      resave: false,
      saveUninitialized: false,
    })
  );
}

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// Connect-Flash setup
app.use(flash());

// Middleware to pass currentUser and Flash to each page
app.use((req, res, next) => {
  res.locals.currentUser = req.user;
  res.locals.error = req.flash("error");
  res.locals.success = req.flash("success");
  next();
});

// Serve public folder and views folder
app.use("/public", express.static(path.join(__dirname + "/public")));
app.set("views", path.join(__dirname, "views"));

// Use routes
app.use("/tesla", teslaRoutes);
app.use("/mealApp", mealAppRoutes);
app.use("/techInfusion", techRoutes);
app.use("/", indexRoutes);

// Listening
app.listen(process.env.PORT || 3000, process.env.IP, () => {
  console.log("Portfolio server is running");
});
