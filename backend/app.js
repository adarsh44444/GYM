import express from "express";
import {config} from "dotenv";
import cors from "cors";
import {sendEmail} from './utils/sendEmail.js'

const app=express();
const router=express.Router();

config({path:"./config.env"});
app.use(cors({
  origin:[process.env.FRONTEND_URL],
  methods:["POST"],
  credentials:true
}))
app.use(express.json());
app.use(express.urlencoded({extended:true}));
router.post("/send/mail",async(req,res,next)=>{
  const {name,email,message}=req.body;
  if(!name||!email||!message){
    return next(res.status(400).json({
      success:false,
      message:"Please fill all the fields"
    }))
  }
  try {
    await sendEmail({
      email:"udhab.2502@gmail.com",
      subject:"New Message from Contact Form",
      message,
      userEmail:email,
    });
    res.status(200).json({
      success:true,
      message:"Message sent successfully"
    })
  } catch (error) {
    res.status(500).json({
      success:false,
      message:"Internal Server Error"
    })
  }
})
app.use(router)
app.listen(process.env.PORT,()=>{
  console.log(`${process.env.PORT}`)
})