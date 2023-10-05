const jwt = require("jsonwebtoken");
const User = require("../model/user.model");
const { secretKey } = require("../config/server.config");
exports.verifyJwt = async (req, res, next) => {
  try {
    let tokenFull = req.header('Authorization');
    let token= tokenFull.split(" ")[1]
   
    console.log(token)
    if (!token) {
      return res.status(401).send({ message: "token" });
    }

    try {
      const isValidJwt = await jwt.verify(token, secretKey);
      let { email } = jwt.decode(token);
      let user = await User.findOne({ email });
      req.user = user;
      console.log("user",req.user)
      next();
    } catch (jwtError) {
      
      if (jwtError.name === "TokenExpiredError") {
        return res.status(403).send({message:"Token expired"})
      } else {
        console.error(jwtError)
        return res.status(401).send({ message: { token: "Invalid token" } });
      }
    }
  } catch (err) {
    console.log(err);
    return res.status(500).send({ message: "internal Server err" });
  }
};