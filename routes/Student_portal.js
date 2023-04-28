const express = require('express');
const StudentModel = require('../schema/StudetSchema');
const bcrypt = require('bcrypt');
const router = express.Router();
// const mongoose = require('mongoose');
const multer = require('multer');
const path = require('path');
const crypto = require('crypto');
const sendOTP =  require('../module/Otp');
const AWS = require('aws-sdk');
const CourseModel = require('../schema/CourseSchema');
const InstituteModel = require('../schema/InstituteSchema');
const EnrollmentModel = require('../schema/EnrollmentSchema');
const BookModel = require('../schema/BookSchema');
const VideoModel = require('../schema/VideoSchema');
const QuestionModel = require('../schema/QuestionSchema');
const LectureModel = require('../schema/LectureSchema');

AWS.config.update({
  accessKeyId: "AKIAZKCVVG4RL7DOYPHL",
  secretAccessKey: "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",
  region:'ap-southeast-2',
 });

const s3 = new AWS.S3();

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
  
//call through /api/User/Allcourses

router.get('/getAllcourses', async (req, res) => {
  try {
    const courses = await CourseModel.find();
    if(courses){
       res.json([{
          id: 1,
          data: courses,
        }]);
    }else{
      res.json([{
          id: 0,
          data: 'No data',
        }]);
    }
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal server error');
  }
});


//call through /api/User/fetch_all_books_by_users_id

router.post('/fetch_all_books_by_users_id', async (req, res) => {
  try {
    
    const Student_id = req.body.Student_id;

    const Enrollment = await EnrollmentModel.findOne({student_id: Student_id,confirm: 1});
    if(Enrollment){
      console.log(Enrollment.institute_id);
      console.log(Enrollment.courseDepartment);
      console.log(Enrollment.courseName);
      const Books = await BookModel.find({institute_id: Enrollment.institute_id,courseName:Enrollment.courseName,department:Enrollment.courseDepartment});
      console.log(Books);
       res.json([{
          id: 1,
          data: Books,
        }]);
    }else{
      res.json([{
          id: 0,
          data: 'No data',
        }]);
    }
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal server error');
  }
});



//call through /api/User/fetch_all_quiz_by_users_id

router.post('/fetch_all_quiz_by_users_id', async (req, res) => {
  try {
    
    const Student_id = req.body.Student_id;

    const Enrollment = await EnrollmentModel.findOne({student_id: Student_id,confirm: 1});
    if(Enrollment){
      console.log(Enrollment.institute_id);
      console.log(Enrollment.courseDepartment);
      console.log(Enrollment.courseName);
      const question = await QuestionModel.find({institute_id: Enrollment.institute_id,course:Enrollment.courseName,department:Enrollment.courseDepartment});
      console.log(question);
       res.json([{
          id: 1,
          data: question,
        }]);
    }else{
      res.json([{
          id: 0,
          data: 'No data',
        }]);
    }
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal server error');
  }
});

//call through /api/User/fetch_all_videos_by_users_id

router.post('/fetch_all_videos_by_users_id', async (req, res) => {
  try {
    
    const Student_id = req.body.Student_id;

    const Enrollment = await EnrollmentModel.findOne({student_id: Student_id,confirm: 1});
    if(Enrollment){
      console.log(Enrollment.institute_id);
      console.log(Enrollment.courseDepartment);
      console.log(Enrollment.courseName);
      const Lecture = await VideoModel.find({instituteId: Enrollment.institute_id,course:Enrollment.courseName,department:Enrollment.courseDepartment});
      console.log(Videos);
       res.json([{
          id: 1,
          data: Lecture,
        }]);
    }else{
      res.json([{
          id: 0,
          data: 'No data',
        }]);
    }
  } catch (error) { 
    console.error(error);
    res.status(500).send('Internal server error');
  }
});



//call through /api/User/fetch_all_lectures_by_users_id

router.post('/fetch_all_lectures_by_users_id', async (req, res) => {
  try {
    
    const Student_id = req.body.Student_id;

    const Enrollment = await EnrollmentModel.findOne({student_id: Student_id,confirm: 1});
    if(Enrollment){
      console.log(Enrollment.institute_id);
      console.log(Enrollment.courseDepartment);
      console.log(Enrollment.courseName);
      const Videos = await LectureModel.find({institute_id: Enrollment.institute_id,course:Enrollment.courseName,department:Enrollment.courseDepartment});
      console.log(Videos);
       res.json([{
          id: 1,
          data: Videos,
        }]);
    }else{
      res.json([{
          id: 0,
          data: 'No data',
        }]);
    }
  } catch (error) { 
    console.error(error);
    res.status(500).send('Internal server error');
  }
});


  //call through /api/User/student/Varification_request

  const upload = multer({
    storage: multer.memoryStorage(),
    limits: {
      fileSize: 5 * 1024 * 1024, // Limit file size to 5 MB
    },
  });
    
    // const upload = multer({ storage: storage });
  
    router.post("/student/Varification_request",  upload.fields([
      { name: 'officialTranscript', maxCount: 1 },
      { name: 'leavigCertificate', maxCount: 1 },
      { name: 'governmentIssuedIdentification', maxCount: 1 },
    ]),async (req,res) => {
      const officialTranscript = req.files.officialTranscript;
      const leavigCertificate = req.files.leavigCertificate;
      const governmentIssuedIdentification = req.files.governmentIssuedIdentification;
      const yourEmail= req.body.Email;
  
      // const file = req.files;
      console.log("fileContent")
      console.log(officialTranscript[0].buffer)
      console.log(leavigCertificate[0].buffer)
      console.log(governmentIssuedIdentification[0].buffer)
      console.log("fileContent")
  
      try {
  
        // Upload file to S3
        await s3
          .putObject({
            Bucket: "studydoor",
            Key: officialTranscript[0].originalname,
            Body: officialTranscript[0].buffer,
            ACL: 'public-read',
          })
          .promise();
    
        const officialTranscriptUrl = `https://studydoor.s3.amazonaws.com/${officialTranscript[0].originalname}`;
    
        // Upload file to S3
        await s3
          .putObject({
            Bucket: "studydoor",
            Key: leavigCertificate[0].originalname,
            Body: leavigCertificate[0].buffer,
            ACL: 'public-read',
          })
          .promise();
    
        const leavigCertificateUrl = `https://studydoor.s3.amazonaws.com/${leavigCertificate[0].originalname}`;
    
        // Upload file to S3
        await s3
          .putObject({
            Bucket: "studydoor",
            Key: governmentIssuedIdentification[0].originalname,
            Body: governmentIssuedIdentification[0].buffer,
            ACL: 'public-read',
          })
          .promise();
    
        const governmentIssuedIdentificationUrl = `https://studydoor.s3.amazonaws.com/${governmentIssuedIdentification[0].originalname}`;
    
  

        const filter = { email: yourEmail };
        const update = { $set: { varificationRequest: 1 } };
        const options = { upsert: false };
    
        const result = await StudentModel.updateOne(filter, update, options);
    
        console.log(`${result.matchedCount} document(s) matched the filter criteria.`);
        console.log(`${result.modifiedCount} document(s) was/were updated.`);
    
        // Handle the response data here
        if (result.modifiedCount === 1) {
          console.log('Document updated successfully!');
          res.json([{
            id : 1,
            text : "Data is Success fully inserted",
            Url1 : officialTranscriptUrl,
            Url2 : leavigCertificateUrl,
            Url3 : governmentIssuedIdentificationUrl
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
  

//call through /api/User/Course_Enrollment

router.post('/Course_Enrollment', async (req, res) => {
  try {
    console.log(req.body);
      const yourEmail = req.body.Email;
      const yourInstitute_id = req.body.Institute_id;
      const yourCourse_id = req.body.Course_id;
      const yourCourseName= req.body.CourseName;
      const yourCourseDepartment = req.body.CourseDepartment;

      const student = await StudentModel.findOne({ email: yourEmail }).exec();
      console.log(student._id)
      if (student !== null) {
        const Enrollment = new EnrollmentModel ({
          student_id: student._id,
          studentName: student.name,
          studentProfilePic: student.profilePhoto,
          institute_id: yourInstitute_id,
          course_id: yourCourse_id,
          courseName: yourCourseName,
          courseDepartment: yourCourseDepartment
        });
         const result =  await Enrollment.save();
          console.log(result);
          if(result){
            res.json([{
              id : 1,
              text : "Enmrollment is successfull"
            }]);
        } else {
          res.status(500).json([{
            id: 0,
            text: "Sorry! can not enroll please try again later"
          }]);
        }
      } else {
        res.status(500).json([{
          id: 0,
          text: "Sorry! can not enroll please try again later"
        }]);
      }

    
  } catch (error) {
    console.log(error);
    res.status(500).json([{
      id : 0,
      text : "There are some error"
    }]);
  }
});


  
module.exports = router;
