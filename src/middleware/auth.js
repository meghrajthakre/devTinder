const userAuth = (req, res, next) => {
  const token = "1212";
  const isUserIsAuthenticated = token === "1212";

  if (!isUserIsAuthenticated) {
    console.log("user is not authenticated"); // If token is invalid or not present, it will not reach here.
    return res.status(401).send("Unauthorized access");
  } else {
    console.log("user is authenticated");
    next();
  }
};

const adminAuth = (req, res, next) => {
    const token = "1313"
    const isAdminisAuthenticated = token === "1313"
    if(!isAdminisAuthenticated){
        res.status(403).send("Unauthorized access");
    }
    else{
        next();
    }
}

module.exports = { userAuth , adminAuth};
