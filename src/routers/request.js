const express = require('express');
const requestRouter  = express.Router();
const {userAuth }= require('../middleware/auth')


requestRouter.post("/connectionRequest", userAuth, async (req, res,next) => {
    res.send( " connection request sent succesfull");
  });

module.exports = {requestRouter};