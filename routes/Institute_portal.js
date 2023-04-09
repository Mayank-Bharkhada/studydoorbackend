const express = require('express');
const InstituteModel = require('../schema/InstituteSchema');
const CourseModel = require('../schema/CourseSchema');
const bcrypt = require('bcrypt');
const router = express.Router();
const mongoose = require('mongoose');
const path = require('path');
const multer = require('multer');
const AWS = require('aws-sdk');
const EnrollmentModel = require('../schema/EnrollmentSchema');

AWS.config.update({
  accessKeyId: "AKIAZKCVVG4RL7DOYPHL",
  secretAccessKey: "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",
  region:'ap-southeast-2',
 });

const s3 = new AWS.S3();
//call through /api/User/Institute_login
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

//call through /api/User/institute_data_by_id

router.post('/institute_data_by_id', async (req, res) => {
  try {
      const youtInstitute_id = req.body.Institute_id;
      // const yourPhone = req.body.Phone;
  
      const result = await InstituteModel.findOne({ _id: youtInstitute_id }).exec();
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

//call through /api/User/Generate_course

router.post('/Generate_course', async (req, res) => {
  try {
    console.log(req.body);
      const yourEmail = req.body.Email;
      const yourCourseName = req.body.courseName;
      const yourDepartment = req.body.department;
      // const yourPhone = req.body.Phone;
  
      
    const doc = await InstituteModel.findOne({ email: yourEmail });
    if (!doc) {
      res.json([{
        id : 0,
        text : "Sorry: Data is not inserted, plese try later . . ."
      }]);
    } else {
      const Course = new CourseModel ({
       institute_id: doc._id,
        courseName:yourCourseName,
        department: yourDepartment,
      });
       const result =  await Course.save();
        console.log(result);
        if(result){
          res.json([{
            id : 1,
            text : "Data is Success fully inserted"
          }]);
        }else{
          res.json([{
            id : 0,
            text : "Sorry: Data is not inserted, plese try later . . ."
          }]);
        }
    }
  } catch (error) {
    console.log(error);
    res.status(500).json([{
      id : 0,
      text : "There are some error"
    }]);
  }
});
   //call through /api/User/institute/Varification_request


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
    const yourEmail = req.body.Email;

    // const file = req.files;
    console.log("fileContent")
    console.log(accreditationCertificate[0].buffer)
    console.log(businessRegistrationCertificate[0].buffer)
    console.log("fileContent")

    try {

      // Upload file to S3
      await s3
        .putObject({
          Bucket: "studydoor",
          Key: accreditationCertificate[0].originalname,
          Body: accreditationCertificate[0].buffer,
          ACL: 'public-read',
        })
        .promise();
  
      const accreditationCertificateUrl = `https://studydoor.s3.amazonaws.com/${accreditationCertificate[0].originalname}`;
  
      // Upload file to S3
      await s3
        .putObject({
          Bucket: "studydoor",
          Key: businessRegistrationCertificate[0].originalname,
          Body: businessRegistrationCertificate[0].buffer,
          ACL: 'public-read',
        })
        .promise();
  
      const businessRegistrationCertificateUrl = `https://studydoor.s3.amazonaws.com/${businessRegistrationCertificate[0].originalname}`;
   

    const filter = { email: yourEmail };
    const update = { $set: { varificationRequest: 1 } };
    const options = { upsert: false };

    const result = await InstituteModel.updateOne(filter, update, options);

    console.log(`${result.matchedCount} document(s) matched the filter criteria.`);
    console.log(`${result.modifiedCount} document(s) was/were updated.`);

    // Handle the response data here
    if (result.modifiedCount === 1) {
      console.log('Document updated successfully!');
      res.json([{
        id : 1,
        text : "Data is Success fully inserted",
        Url1 : accreditationCertificateUrl,
        Url2 : businessRegistrationCertificateUrl
      }]);
    } else {
      console.log('No documents were updated.');
      res.json([{
        id : 0,
        text : "Error ! Data is not inserted",
      }]);
    }
     
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to upload image' });
    }
    
  
  });


  //call through /api/User/Upload_books

  router.post("/Upload_books",  upload.fields([
    { name: 'Book', maxCount: 1 },
  ]),async (req,res) => {
    const Book = req.files.Book;
    const CourseName = req.files.CourseName;
    const Department = req.files.Department;
    const Semester = req.files.Semester;
    const InstituteId = req.files.InstituteId;


    // const file = req.files;
    console.log("fileContent")
    console.log(Book[0].buffer)
    console.log("fileContent")

    try {

      // Upload file to S3
      await s3
        .putObject({
          Bucket: "studydoor",
          Key: Book[0].originalname,
          Body: Book[0].buffer,
          ACL: 'public-read',
        })
        .promise();
  
      const bookUrl = `https://studydoor.s3.amazonaws.com/${Book[0].originalname}`;
  
      const Institute = new CourseModel ({
        institute_id: InstituteId,
        courseName: CourseName,
        department: Department,
        semester: Semester,
        BookUri: Book[0].originalname
      });
        await Institute.save();
  
        console.log(Institute);
   
    // Handle the response data here
    res.json([{
          id : 1,
          text : "Book uploaded successfully ",
          Url1 : bookUrl
        }]);
        
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to upload image' });
    }
  });

 //call through /api/User/getAllEnrollments

router.post('/getAllEnrollments', async (req, res) => {
  try {
    console.log(req.body);
      const yourEmail = req.body.Email;
      // const yourPhone = req.body.Phone;
  
      const institute = await InstituteModel.findOne({ email: yourEmail }).exec();
      if (institute !== null) {
        const enrollments = await EnrollmentModel.find({ institute_id : institute._id }).exec();
        if(enrollments !== null){
          res.send(enrollments);
        }else{
          res.json([{
            id: 0,
            text: "No data Found",
          }]);
        }
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

//call through /api/User/course_data_by_id

router.post('/course_data_by_id', async (req, res) => {
  try {
      const yourCourse_id = req.body.Course_id;
      // const yourPhone = req.body.Phone;
  
      const result = await CourseModel.findOne({ _id: yourCourse_id }).exec();
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

//call through /api/User/course_data_by_institute_id

router.post('/course_data_by_institute_id', async (req, res) => {
  try {
    console.log(req.body);
      const youInstituterId = req.body.InstituteId;
      // const yourPhone = req.body.Phone;
  
      const result = await CourseModel.find({ institute_id: youInstituterId }).exec();
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


//call through /api/User/enroll_data_by_id

router.post('/enroll_data_by_id', async (req, res) => {
  try {
      const yourEnroll_id = req.body.Enroll_id;
      // const yourPhone = req.body.Phone;
  
      const result = await EnrollmentModel.findOne({ _id: yourEnroll_id }).exec();
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

//call through /api/User/enroll_Confirm

router.post('/enroll_Confirm', async (req, res) => {
  try {
      const yourEnroll_id = req.body.Enroll_id;
      // const yourPhone = req.body.Phone;
  console.log(yourEnroll_id)
      
    const result = await EnrollmentModel.updateOne({_id: yourEnroll_id }, { $set: { confirm: "1" } }, { upsert: false } );

    console.log(result)

    // Handle the response data here
    if (result.modifiedCount === 1) {
      console.log('Document updated successfully!');
      res.json([{
        id : 1,
        data : "Enrollment is confirmed"
      }]);
    } else {
      res.json([{
        id : 0,
        text : "Enrollment is not confirmed",
      }]);
    }
     
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
});

module.exports = router;
