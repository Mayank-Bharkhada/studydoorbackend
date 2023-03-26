const express = require('express');
const InstituteModel = require('../schema/InstituteSchema');
const bcrypt = require('bcrypt');
const router = express.Router();
const mongoose = require('mongoose');
const path = require('path');
const multer = require('multer');
const AWS = require('aws-sdk');

const s3 = new AWS.S3();
//call through /api/User/Institute_login
AWS.config.update({
  accessKeyId: "ASIAYHXLJ3PA4C5L6I6B",
  secretAccessKey: "5gzzjR/5flhxVi4CwLMCBzD4miS1fEJQ9n7W7dKP",
  awsRegion: "ap-south-1",
 awsSessionToken: "IQoJb3JpZ2luX2VjEDkaCmFwLXNvdXRoLTEiSDBGAiEAjQgIGLSgQj3mfNlzfxXSRShpDGylnQVXWSJq7sZ7u+8CIQC5Y51A5q+snZ2DADPY31sgr+JMAf7TOu3FyeKu6UxxHiqsAggSEAAaDDU2NjM1NTQxODA0OSIMPfwgQODXSYUy6veqKokCmfPQS63cUZVk7nrpCjYc/YK+SlhAekDd7gKp4tTmde8QvETa4Mqop+vX10fqqlddCpQQAIVR9xfMdoDR5Q4CD24LqhKfS13vVZUYSytZTTF+v/wL71sHOHmiCwDJ+KXpwEjAyI83Knl51prwx7FEjww0dZdCo12spNcxJ2gJcfJgpYIlgGpr9vWOtUCbn+iX7BmDLisMzeqCRaaIVJ2w8o+xBhxnEFOt0tKQU5EwjGes0R/+cu69dUWVe72O3AyZ3eDgFZXlQZqq+rfk6MTh2J6sH+jt21GurjvLB3Bzr0qJ7MyT+sibU8jE+FtFturLFzjuWeE2nNh/ZL+qRHLZ3fq3elp9BLafpjDkm4ChBjqcAbjw28R46dpInyhVWVEp1soU5xooIlxYTdb4GNZVV+RtyUVoqMoqwkpoTBSiZCf99+uYFnJsbriYR5dvgMTnb3GBelNjkLlu7nmxW7IgE9O8NBqsEmzdBnV4DKIfN427uEfoGzTrOGNaOJyjDU1ORGtDRR18H/hLP5ToJNdTph5RG0zb+vT2setonLKjjVFvKDhpLz/EG/Q9PVpleg=="
});
router.post("/Institute_login",async (req,res) => {
  try {
    const yourEmail = req.body.Email;
    const yourPassword = req.body.Password; 
    const doc = await InstituteModel.findOne({ email: yourEmail });
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
             text : "We welcome your institute."
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


//call through /api/User/Institute_Otp

router.post("/Institute_Otp", async (req, res) => {
  try {
    console.log(req.body);
    const yourEmail = req.body.Email;
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



//call through /api/User/Institute_registration

router.post("/Institute_registration",async (req,res) => {
    try {
      console.log(req.body);
      const yourName = req.body.Name;
      const yourEmail= req.body.Email;
      const yourPhone = req.body.Phone;
      const yourAddress = req.body.Address;
      const yourDateOfEstablishment = req.body.DateOfEstablishment;
      const saltRounds = 10;
      const yourPassword = req.body.Password; 
      const yourCity = req.body.City; 
      const yourState = req.body.State; 
      const yourCountry = req.body.Country; 
      const yourPincode = req.body.Pincode; 
      
      const salt = await bcrypt.genSalt(saltRounds);
      const Password = await bcrypt.hash(yourPassword, salt);
        const Institute = new InstituteModel ({
          name: yourName,
          email: yourEmail,
          phone: yourPhone,
          dateOfEstablishment: yourDateOfEstablishment,
          password: Password ,
          address: yourAddress,
          city: yourCity ,
          state: yourState ,
          country: yourCountry ,
          pincode: yourPincode ,
        });
          await Institute.save();
    
          res.json([{
            id : 1,
            text : "Data is Success fully inserted"
          }]);
          
        } catch (error) {
          console.log(error);
          res.status(500).send(error);
        }
  });
  


//call through /api/User/All_institutes_data

router.get('/All_institutes_data', (req, res) => {
    InstituteModel.find((err, data) => {
        if (err) {
            return res.status(500).json({ message: 'Error fetching data' });
        }
        return res.status(200).json(data);
    });
});

//call through /api/User/Institute_data

router.post('/Institute_data', async (req, res) => {
  try {
    console.log(req.body);
      const yourEmail = req.body.Email;
      // const yourPhone = req.body.Phone;
  
      const result = await InstituteModel.findOne({ email: yourEmail }).exec();
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

   //call through /api/User/institute/Varification_request

  // const storage = multer.diskStorage({
  //   destination: function (req, file, cb) {
  //     if (file.fieldname === "accreditationCertificate") { 
  //       cb(null, './Uploads/Photos/Institute_varification_photos/accreditationCertificate');
  //     } else if (file.fieldname === "businessRegistrationCertificate") {
  //       cb(null, './Uploads/Photos/Institute_varification_photos/businessRegistrationCertificate');
  //     } else {
  //       console.log("There is no photo.")
  //     }
  //   },
  //   filename: function (req, file, cb) {
  //     if (file.fieldname === "accreditationCertificate") {
  //       const fileName = file.fieldname + '-' + Date.now() + path.extname(file.originalname);
  //       InstituteModel.updateOne({ email: req.body.Email }, { instituteCertificate : fileName })
  //         .then((result) => {
  //           console.log(result);
  //           cb(null, fileName);
  //         })
  //         .catch((error) => {
  //           console.error(error);
  //         });
  //     } else if (file.fieldname === "businessRegistrationCertificate") {
  //       const fileName = file.fieldname + '-' + Date.now() + path.extname(file.originalname);
  //       InstituteModel.updateOne({ email: req.body.Email }, { varificationPhoto : fileName })
  //         .then((result) => {
  //           console.log(result);
  //           cb(null, fileName);
  //         })
  //         .catch((error) => {
  //           console.error(error);
  //           res.json([{
  //             id : 0,
  //             text : "Data is not inserted"
  //           }]);
      
  //         });
  //     } else {
  //       console.log("There is no photo.")
  //     }
  //   }
  // });
  // Configure multer for handling file uploads
const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 5 * 1024 * 1024, // Limit file size to 5 MB
  },
});
  
  // const upload = multer({ storage: storage });

  router.post("/institute/Varification_request",  upload.fields([
    { name: 'accreditationCertificate', maxCount: 1 },
    { name: 'businessRegistrationCertificate', maxCount: 1 },
  ]),async (req,res) => {
    const accreditationCertificate = req.files.accreditationCertificate;
    const businessRegistrationCertificate = req.files.businessRegistrationCertificate;

    // const file = req.files;
    console.log("fileContent")
    console.log(accreditationCertificate[0].buffer)
    console.log(businessRegistrationCertificate[0].buffer)
    console.log("fileContent")
    // console.log(file)
    try {

      // Upload file to S3
      await s3
        .putObject({
          Bucket: "cyclic-rich-rose-colt-fez-ap-south-1",
          Key: accreditationCertificate[0].originalname,
          Body: accreditationCertificate[0].buffer,
          ACL: 'public-read',
        })
        .promise();
  
      const accreditationCertificateUrl = `https://${cyclic-smiling-ray-neckerchief-ap-southeast-2}.s3.amazonaws.com/${accreditationCertificate[0].originalname}`;
  
      // Upload file to S3
      await s3
        .putObject({
          Bucket: "cyclic-rich-rose-colt-fez-ap-south-1",
          Key: businessRegistrationCertificate[0].originalname,
          Body: businessRegistrationCertificate[0].buffer,
          ACL: 'public-read',
        })
        .promise();
  
      const businessRegistrationCertificateUrl = `https://${cyclic-smiling-ray-neckerchief-ap-southeast-2}.s3.amazonaws.com/${businessRegistrationCertificate[0].originalname}`;
  

      // const yourEmail= req.body.Email;
          res.json([{
            id : 1,
            text : "Data is Success fully inserted",
            Url1 : accreditationCertificateUrl,
            Url2 : businessRegistrationCertificateUrl
          }]);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to upload image' });
    }
    
  
  });

module.exports = router;
