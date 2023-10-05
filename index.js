const express = require("express")
const fs = require('fs');
const path = require('path');
const app = express()
const mongoose = require('mongoose')
const DB_URL = require("./config/db.config");
const cors = require("cors")
let dataExisting
const corsOptions = {
  origin: '*',
  credentials: true, // Allow cookies to be sent with credentials
};

const cookieParser = require('cookie-parser')
const multer = require('multer'); // Middleware for handling FormData

const storage = multer.memoryStorage(); // Store the file in memory
const upload = multer({ storage });

app.use(express.json()); // Parse JSON request bodies
app.use(cookieParser());
app.use(cors(corsOptions))
app.post('/uploadPDF', upload.single('pdfFile'), (req, res) => {
  const pdfBuffer = req.file.buffer; // Access the uploaded PDF as a Buffer
dataExisting = pdfBuffer
  
  res.status(200).send('PDF file received and processed on the server');
});
app.get('/getfile', (req, res) => {
    const filePath = path.join(__dirname, "public", 'sample.pdf'); // Replace 'yourfile.ext' with your actual file name and extension
  
    fs.readFile(filePath, (err, data) => {
      if (err) {
        console.error(err);
        res.status(500).send('Error reading the file');
      } else {
        const buffer = Buffer.from(dataExisting||data, 'utf-8');
         
        res.status(200).send(buffer);
      }
    });
  });
  app.get("/",(req,res)=>{
      res.status(200).send("reached")
  })
  
  async function connectDb() {
    const conn = await mongoose.connect(DB_URL);
    const db = mongoose.connection;
    db.on("error", () => {
      console.log("#### Error while connecting to mongoDB ####");
    });
    db.once("open", () => {
      console.log("#### Connected to mongoDB ####");
    });
       require("./route/auth.route")(app)
       require("./route/pdf.route")(app)
      
   
  
    app.listen("5000", () => {
      console.log("listening...");
    });
  }

  connectDb()


  