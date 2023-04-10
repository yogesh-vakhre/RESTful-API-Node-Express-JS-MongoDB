const jwt = require("jsonwebtoken");
const User = require("../models/user.model");
const config = process.env;

const verifyToken = (req, res, next) => {
  let token;
  const authHeader = req.headers.authorization;
  
  //  check if a bearer token 
  if (authHeader && authHeader.split(" ")[0] === "Bearer") {
    token = authHeader.split(" ")[1];
  }

  // Check token
  if (!token) {
    return res.status(403).send("You are not logged in!");
  }
  try {
    const decoded = jwt.verify(token, config.TOKEN_KEY);
    const currentUser = User.findById(decoded.id);
    
    // Check User
    if (!currentUser) {
      return res.status(401).send("Token user does not exist!");
    }
    
    req.user = currentUser;
  } catch (err) {
    return res.status(401).send("Invalid Token");
  }
  return next();
};

module.exports = verifyToken;
