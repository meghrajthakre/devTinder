const express = require("express");
const app = express();
const port = 3000;
const { userAuth, adminAuth } = require("./middleware/auth");

app.use("/admin", adminAuth, (req, res) => {
  res.send("Admin dashboard");
});

app.get("/admin/dashboardAll", (req, res) => {
  res.send("all dashboard");
});

app.get("/user/login", (req, res) => {
  console.log("User attempting to log in...");

  res.send("User login successful");
});
app.get("/user", userAuth, (req, res) => {
  res.send("User data");
});

app.listen(port, (err, res) => {
  console.log("the server listening on port " + port);
});
