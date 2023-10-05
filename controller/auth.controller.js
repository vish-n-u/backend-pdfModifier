const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { secretKey } = require("../config/server.config");

const User = require("../model/user.model");

exports.registration = async (req, res) => {
  console.log("registration", req.user, secretKey);
  try {
    
    const obj = {
      userName: req.body.userName,
      password: bcrypt.hashSync(req.body.password, 10),
      email: req.body.email,
    };
    const newUser = await User.create(obj);
    let token = jwt.sign({ email: newUser.email }, secretKey);
    newUser.token = token;
    res.cookie('token', token, { httpOnly: true,
      domain: 'spontaneous-tapioca-4420f2.netlify.app', //spontaneous-tapioca-4420f2
      path: '/',
      sameSite: 'none', // Set for cross-origin requests
      secure: true, // Required for HTTPS
     });
     console.log("nreUser",newUser)
    return res.status(201).send({
      message:[newUser,token],
    });
  } catch (err) {
    console.log(err);
    return res.status(500).send({ message: "server err" });
  }
};


exports.login = async (req, res) => {
  console.log("enterd login", req.body);

  try {
    let token = jwt.sign({ email: req.doesUserExist.email }, secretKey);
    res.cookie('token', token, { httpOnly: true,
        domain: 'spontaneous-tapioca-4420f2.netlify.app', //spontaneous-tapioca-4420f2
        path: '/',
        sameSite: 'none', // Set for cross-origin requests
        secure: true, // Required for HTTPS
       });
       req.doesUserExist.token = token;
       console.log("req.doesUserExist",req.doesUserExist,token);
    return res.status(200).send({
      message: [req.doesUserExist,token]
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "server err" });
  }
};