const authController = require("../controller/auth.controller")
const authValidation = require("../validation/auth.validation");

const authRoute = (app) => {
  console.log("called here",req.cookies.token)
  app.post("/pdfModifier/api/v1/register",
[authValidation.registrationValidation],
    authController.registration
  );
  app.post(
    "/pdfModifier/api/v1/login",
    [authValidation.validateLogin],
    authController.login
  );
  
};

module.exports = authRoute;