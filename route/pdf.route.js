const pdfController = require("../controller/pdf.controller")
const jwtValidation = require("../validation/jwt.validation");
const multer = require('multer'); // Middleware for handling FormData
const storage = multer.memoryStorage(); // Store the file in memory
const upload = multer({ storage });



const authRoute = (app) => {
  console.log("called here")
  app.post("/pdfModifier/api/v1/pdf",upload.single('pdfFile'),
[jwtValidation.verifyJwt],
pdfController.createPdf
  );
  app.get(
    "/pdfModifier/api/v1/pdf/:id",
    [jwtValidation.verifyJwt],
    pdfController.getPdfById
  );
  
};

module.exports = authRoute;