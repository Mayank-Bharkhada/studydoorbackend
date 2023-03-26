const express = require('express');
const StudentModel = require('../schema/StudetSchema');
const bcrypt = require('bcrypt');
const router = express.Router();
// const mongoose = require('mongoose');
const multer = require('multer');
const path = require('path');
const crypto = require('crypto');
const sendOTP =  require('../module/Otp');

//call through /api/User/Student_login

router.post("/Student_login",async (req,res) => {
  try {
    const yourEmail = req.body.Email;
    const yourPassword = req.body.Password; 
    const doc = await StudentModel.findOne({ email: yourEmail });
    if (!doc) {
      return res.status(404).send('No user found');
    } else {
      // console.log(doc);
      const hashedPassword = doc.password;
    
      if(yourEmail == doc.email){
       bcrypt.compare(yourPassword, hashedPassword, (err, result) => {
         if (result) {
           console.log(result);
           res.json([{
             id : 1,
             text : "We welcome dear student."
           }]);
         } else if (err) {
           console.log(err);
           res.json([{
               id : 0,
               text : "Enter valid details"
             }]);
         } else {
           res.json([{
             id : 0,
             text : "Enter valid details"
           }]);
         }
        } );
          
         }else{
          res.json([{
              id : 0,
              text : "Enter valid details"
            }]);
        }
      
    }
      } catch (error) {
        console.log(error);
        res.status(500).send(error);
      }
});



//call through /api/User/Student_registration

router.post("/Student_registration",async (req,res) => {
    try {
      console.log(req.body);
      const yourName = req.body.Name;
      const yourEmail= req.body.Email;
      const yourPhone = req.body.Phone;
      const yourDateOfBirth = req.body.DateOfBirth;
      const saltRounds = 10;
      const yourPassword = req.body.Password; 
      const yourAddress = req.body.Address; 
      const yourCity = req.body.City; 
      const yourState = req.body.State; 
      const yourCountry = req.body.Country; 
      const yourPincode = req.body.Pincode; 
      
      const salt = await bcrypt.genSalt(saltRounds);
      const Password = await bcrypt.hash(yourPassword, salt);
        const Student = new StudentModel ({
          name: yourName,
          email: yourEmail,
          phone: yourPhone,
          date: yourDateOfBirth,
          password: yourPassword,
          address: yourAddress,
          city: yourCity,
          state: yourState,
          country: yourCountry,
          pincode: yourPincode,
        });
          await Student.save();
          res.json([{
            id : 1,
            text : "Data is Success fully inserted",
          }]);
        } catch (error) {
          console.log(error);
          res.status(500).json([{
            id : 0,
            text : "There is some error please try again later",
          }]);
        }
  });
  
  //call through /api/User/Student_Otp

router.post("/Student_Otp",async (req,res) => {
  try {
    console.log(req.body);
    const yourEmail= req.body.Email;
    const yourPhone = req.body.Phone;

   
    const result1 = await StudentModel.findOne({ email: yourEmail }).exec();
    if (result1 === null) {
      const result2 = await StudentModel.findOne({ phone: yourPhone }).exec();
      if (result2 === null) {
        const result3 = await InstituteModel.findOne({ email: yourEmail }).exec();
        if (result3 === null) {
          const result4 = await InstituteModel.findOne({ phone: yourPhone }).exec();
          if (result4 === null) {
            const Data = await sendOTP(yourEmail, yourPhone);
            console.log(Data);
            res.json([{
              id: 1,
              text: "Otp sent successfully",
              Otp: Data
            }]);
          } else {
            res.status(500).json([{
              id: 0,
              text: "Phone nummber is already being registerd use another number"
            }]);
          }
        } else {
          res.status(500).json([{
            id: 0,
            text: "Email is already being registerd use another email"
          }]);
        }
      } else {
        res.status(500).json([{
          id: 0,
          text: "Phone nummber is already being registerd use another number"
        }]);
      }
    } else {
      res.status(500).json([{
        id: 0,
        text: "Email is already being registerd use another email"
      }]);
    }
      } catch (error) {
        console.log(error);
        res.status(500).send(error);
      }
});


  //call through /api/User/Forgot_Password_otp

router.post("/Forgot_Password_Otp",async (req,res) => {
  try {
    console.log(req.body);
    const yourEmail= req.body.Email;
    // const yourPhone = req.body.Phone;

   const result = await StudentModel.findOne({ email : yourEmail }).exec();
   if(result === null){
    res.status(500).json([{
      id : 0,
      text : "Email not found"
    }]);
   }else{
    const Data = await sendOTP(yourEmail,result.phone);
    console.log(Data);
            res.json([{
              id : 1,
              text : "Otp sent successfully",
              Otp: Data
            }]);
     console.log(result);
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


  //call through /api/User/All_students_data
  
  router.get('/All_students_data', async (req, res) => {
    try {
      const docs = await StudentModel.find();
      console.log(docs);
       res.status(200).json(docs);
    } catch (err) {
      console.log(err);
       res.status(500).json({ message: 'Error fetching data' });
    }
  });

//call through /api/User/Student_data

router.post('/Student_data', async (req, res) => {
  try {
    console.log(req.body);
      const yourEmail = req.body.Email;
      // const yourPhone = req.body.Phone;
  
      const result = await StudentModel.findOne({ email: yourEmail }).exec();
      if (result !== null) {
        res.send(result);
      }else{
        res.json([{
          id: 0,
          text: "No data Found",
        }]);
      }
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
});
  
  //call through /api/User/student/Varification_request

  const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './Uploads/Photos/Student_varification_photos');
    },
    filename: async function  (req, file, cb) {

      console.log("------------------------------");
      console.log(req.body);
      console.log("------------------------------");
      const File_name = file.fieldname + '-' + Date.now() + path.extname(file.originalname);
      cb(null, File_name);
      StudentModel.updateOne({ email: req.body.Email }, { varificationPhoto : File_name }, (error, result) => {
        if (error) {
          console.error(error);
        } else {
          console.log(result);
         
        }
      });
    }
  });
  
  const upload = multer({ storage: storage });
  router.post("/student/Varification_request", upload.single('Varificationphoto'),async (req,res) => {
    const yourEmail= req.body.Email;
    const yourAdharNumber = req.body.AdharNumber;
    StudentModel.updateOne({ email: yourEmail }, { adharNumber : yourAdharNumber , varificationRequest : 1 }, (error, result) => {
      if (error) {
        console.error(error);
      } else {
        console.log(result);
        res.json([{
          id : 1,
          text : "Data is Success fully inserted"
        }]);
      }
    });
  });

module.exports = router;
