const express = require("express");
const app = express();
const { dbConnection } = require("./config/database");
const coockiesParser = require("cookie-parser");
app.use(express.json());
app.use(coockiesParser());
const {authRouter} = require('./routers/auth')
const {profileRouter} = require('./routers/profile');
const {requireRouter} = require('./routers/request');

app.use('/', authRouter)
app.use('/', profileRouter)

// dbConnections
dbConnection()
  .then(() => {
    console.log("connection established");

    app.listen(3000, () => {
      console.log("Server is running on port 3000");
    });
  })
  .catch((err) => {
    console.log("Error connecting to database" + err);
  });
