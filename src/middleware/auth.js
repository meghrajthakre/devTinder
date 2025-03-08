const jwt = require("jsonwebtoken");
const User = require('../models/user')

const userAuth = async (req, res, next) => {
 try {
  const cookie = req.cookies;
  const {token} = cookie
  
  if(!token){
    throw new Error("Invalid Token")
  }

  const decodeData = await jwt.verify(token, "shhhhh");
  const {_id} = decodeData;
  const user = await User.findById({_id:_id})
  if(!user){
    throw new Error("User doen Not Exists")
  }
  req.user = user
  next()
  
 } catch (error) {
  res.status(400).send("Error : " + error.message)
 }

  
};


module.exports = { userAuth };
