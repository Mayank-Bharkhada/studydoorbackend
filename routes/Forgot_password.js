const express = require('express');
const StudentModel = require('../schema/StudetSchema');
const InstituteModel = require('../schema/StudetSchema');
const bcrypt = require('bcrypt');
const router = express.Router();
// const mongoose = require('mongoose');
const multer = require('multer');
const path = require('path');
const crypto = require('crypto');
const sendOTP =  require('../module/Otp');


  //call through /api/User/Forgot_Password_otp

router.post("/Forgot_Password_Otp",async (req,res) => {
  try {
    console.log(req.body);
    const yourEmail= req.body.Email;
    // const yourPhone = req.body.Phone;

   const result = await StudentModel.findOne({ email : yourEmail }).exec();
    
   if(result === null){
        const result2 = await StudentModel.findOne({ email : yourEmail }).exec();
     if(result2 === null){
    res.status(500).json([{
      id : 0,
      text : "Email not found"
    }]);
     }else{
        const Data = await sendOTP(yourEmail,result.phone);
        console.log(result2);
    console.log(Data);
            res.json([{
              id : 1,
              text : "Otp sent successfully",
              Otp: Data
            }]);
     }
   }else{
    const Data = await sendOTP(yourEmail,result.phone);
     console.log(result);
    console.log(Data);
            res.json([{
              id : 1,
              text : "Otp sent successfully",
              Otp: Data
            }]);
   }
      } catch (error) {
        console.log(error);
        res.status(500).send(error);
      }
});

  //call through /api/User/Forgot_Password_Set

router.post("/Forgot_Password_Set",async (req,res) => {
  try {
    console.log(req.body);
    const yourEmail= req.body.Email;
    const yourPassword= req.body.Password;
    const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds);
      const Password = await bcrypt.hash(yourPassword, salt);

      const result = await StudentModel.findOneAndUpdate({email : yourEmail}, { password: Password });
      console.log(result);
 
   if(null){
    res.status(500).json([{
      id : 0,
      text : "Error to Update Password"
    }]);
   }else{
            res.json([{
              id : 1,
              text : "Password Update successfully",
            }]);
     console.log(result);
   }
      } catch (error) {
        console.log(error);
        res.status(500).send(error);
      }
});


module.exports = router;
