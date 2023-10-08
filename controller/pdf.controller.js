const Pdf = require("../model/pdf.model")
const mongoose = require("mongoose");

exports.createPdf = async(req,res)=>{

    console.log(req.body,"req.body",req.file)
    try{
        const pdfObject={
            pdf:req.file.buffer,
            user:req.user._id,
            fileName:req.file.originalname
            

        }
        const newPdf = await Pdf.create(pdfObject);
        req.user.pdfs.push({_id:newPdf._id,createdAt:newPdf.createdAt,fileName:newPdf.fileName})
        await req.user.save()
        console.log("req.user",req.user)
        return res.status(201).send({message:req.user})
    }
    catch(err){
        console.log(err)

        return res.status(500).send({message:"Internal Server err"})
    }
}

exports.getPdfById = async(req,res)=>{
    try{
        const pdfData = await Pdf.findById(req.params.id)
        const buffer = Buffer.from(pdfData.pdf, 'utf-8');
        return res.status(200).send(buffer)
    }
    catch(err){
        console.log(err)
        return res.status(500).send({message:"Internal Server err"})
    }
    
}