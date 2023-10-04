const mongoose = require("mongoose");
const User = require("../model/user.model");
const bcrypt = require("bcrypt");
const { secretKey } = require("../config/server.config");
exports.registrationValidation = async (req, res, next) => {
    console.log("req.body",req.body)
  try {
    let doesUserExist = await doesEmailIdExist(req, res);
        if(!doesUserExist)
        next();
     else {
      return res.status(400).send({ message: {email:"Email already exists!"} });
    }
  } catch (err) {
    console.log(err);
    return res.status(500).send("server err");
  }
};


exports.validateLogin = async (req, res, next) => {
  try {
    const doesUserExist = await doesEmailIdExist(req, res);
    if (!doesUserExist) {
      return res.status(400).send({ message: { email: "invalid" } });
    }
     else {
      if(bcrypt.compareSync(req.body.password,doesUserExist.password)){
        req.doesUserExist =  doesUserExist
        next()
      }
      else{
        return res.status(400).send({ message: { password: "invalid" } });
      }
    }
  } catch (err) {
    console.log(err);
    return res.status(500).send({ message: "internal err" });
  }
};

const doesEmailIdExist = async (req, res) => {
  try {
    let doesUserExist = await User.findOne({
      email: req.body.userEmail || req.body.email,
    });
    
    if (!doesUserExist) {
      return false;
    } else {
      return doesUserExist;
    }
  } catch (err) {
    console.log(err);
    return res.status(500).send({ message: "Server err" });
  }
};