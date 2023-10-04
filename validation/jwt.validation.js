const jwt = require("jsonwebtoken");
const User = require("../model/user.model");
const { secretKey } = require("../config/server.config");
exports.verifyJwt = async (req, res, next) => {
  try {
    if (!req.cookies.token) {
      return res.status(401).send({ message: "token" });
    }

    try {
      const isValidJwt = await jwt.verify(req.cookies.token, secretKey);
      let { email } = jwt.decode(req.cookies.token);
      let user = await User.findOne({ email });
      req.user = user;
  
      next();
    } catch (jwtError) {
      
      if (jwtError.name === "TokenExpiredError") {
        return res.status(403).send({message:"Token expired"})
      } else {
        return res.status(401).send({ message: { token: "Invalid token" } });
      }
    }
  } catch (err) {
    console.log(err);
    return res.status(500).send({ message: "internal Server err" });
  }
};