const jwt = require("jsonwebtoken");
const User = require("../models/loginModel");
const Employee = require("../models/employeeModel");
require('dotenv').config();


const protect = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      // Get token from header
      token = req.headers.authorization.split(" ")[1];
      // Verfiy token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Get user from the token
      if (decoded?.role == "user") {
        req.user = await User.findById(decoded.id);
      } else {
        req.user = await Employee.findById(decoded.id);
      }

      if (req.user) req.user.role = decoded?.role

      next();
    } catch (error) {
      console.log(error);
      res.status(401);
      throw new Error("Not authorized");
    }
  } else {
    res.status(401);
    throw new Error("Not authorized, no token");
  }
};

module.exports = { protect };
