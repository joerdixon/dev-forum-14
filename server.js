// Express
const express = require("express");
// Express Handlebars
const exphbs = require("express-handlebars");
// Sequelize instance from connection.js
const sequelize = require("./config/connection");
// Express Sessions
const session = require("express-session");
// Require connect-session-sequelize package and ??? create a variable containing our session storage object ???
const SequelizeStore = require("connect-session-sequelize")(session.Store);
// Import our routes
const routes = require("./controllers")
// Create an express application
const app = express();
// Declare our port where our server will be hosted.
const PORT = process.env.PORT || 3000;
// Requiring our models for syncing
const { User, Post, Comment } = require("./models");

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Express-session middleware 
app.use(
  session({
    // Points to the session secret in our .env, more options and settings below.
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
        // The cookie will expire in this many milliseconds (2 hours total)
      maxAge: 2 * 60 * 60 * 1000,
    },
    // Declare session store instance pointing to our sequelize config for our database.
    store: new SequelizeStore({
    db: sequelize,
    }), 
  })
);

app.use(routes);

// Static directory for frontend
app.use(express.static("public"));

// Create our express handlebars instance
const hbs = exphbs.create({});
// Some config and settings for our handlebars engine.
app.engine("handlebars", hbs.engine);
// Tell express to use handlebars and our created engine as our template engine.
app.set("view engine", "handlebars");

// Set sequelize to sync with express. 
sequelize.sync({ force: false }).then(function () {
  app.listen(PORT, function () {
    console.log("App listening on PORT " + PORT);
  });
});
