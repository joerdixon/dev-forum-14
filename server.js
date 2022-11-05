// Express
const express = require("express");
// Express Handlebars
const exphbs = require("express-handlebars");
// Sequelize instance from connection.js
const sequelize = require("./config/connection");
// Express Sessions
const session = require("express-session");
// TODO: UNDERSTAND BETTER WHAT THIS DOES AND COMMENT
const SequelizeStore = require("connect-session-sequelize")(session.Store);

// Create an express application
const app = express();
// Declare our port where our server will be hosted.
const PORT = process.env.PORT || 3000;
// Requiring our models for syncing TODO: UPDATE FOR THIS APP
const { User } = require("./models");

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// TODO:UNDERSTAND BETTER WHAT THIS DOES AND COMMENT.
app.use(
  session({
    // Points to the session secret in our .env
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
        // The cookie will expire in this many milliseconds (2 hours total)
      maxAge: 2 * 60 * 60 * 1000,
    },
    store: new SequelizeStore({
      db: sequelize,
    }),
  })
);

// Static directory for frontend
app.use(express.static("public"));

// Create our express handlebars instance
const hbs = exphbs.create({});
// Tell express to use handlebars and our created engine as our template engine.
app.engine("handlebars", hbs.engine);
// TODO: UNDERSTAND BETTER WHAT THIS DOES AND COMMENT.
app.set("view engine", "handlebars");

// Set sequelize to sync with express. 
sequelize.sync({ force: false }).then(function () {
  app.listen(PORT, function () {
    console.log("App listening on PORT " + PORT);
  });
});
