const express = require('express');
const bcrypt = require('bcrypt');
const InstituteModel = require('../schema/InstituteSchema');
const StudentModel = require('../schema/StudetSchema');
const router = express.Router();

const sendMSG = require('../module/Msg');
//call through /api/User/Admin_login

router.post("/Admin_login",async (req,res) => {
    try {
      const yourId = req.body.Id;
      console.log(yourId);
      const yourPassword = req.body.Password; //'ChmkjJ@11'
      const hashedPassword = '$2b$10$gmxahITXdhvsptTPKo8vGuBj1FvgrKt2Q15DK0d6z9ktGEaGZxOoi';

       if(yourId == "myname@gmail.com"){
        bcrypt.compare(yourPassword, hashedPassword, (err, result) => {
          if (result) {
            console.log(result);
            res.json([{
              id : 1,
              text : "Yours welcome Admin."
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
        });
       }else{
        res.json([{
            id : 0,
            text : "Enter valid details"
          }]);
       }
        } catch (error) {
          console.log(error);
          res.status(500).send(error);
        }
  });
  
  router.post('/requested_institute_data', async (req, res) => {
    try {
    
        const result = await InstituteModel.find({verificationRequest: 1 }).exec();
        if (result !== null) {
          res.send({
            id: 1,
            data: result,
          });
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
  
  router.post('/requested_student_data', async (req, res) => {
    try {
    
        const result = await StudentModel.find({verificationRequest: 1 }).exec();
        if (result !== null) {
          res.send({
            id: 1,
            data: result,
          });
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
  

  //call through /api/User/Student_data

router.post('/admin/Student_data_by_id', async (req, res) => {
  try {
    console.log(req.body);
    const student_id = req.body.student_id;
    // const yourPhone = req.body.Phone;

    const result = await StudentModel.findOne({ _id: student_id }).exec();
    if (result !== null) {
      res.send({
        id: 1,
        data: result,
      });
    } else {
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

router.post('/varify_institute_by_id', async (req, res) => {
  try {
      const instituteId = req.body.instituteId;

      const instituteData = await InstituteModel.findOne({ _id: instituteId }).exec();
      const Data = await sendMSG(instituteData.email, instituteData.number,"Your verification request is confirmed successfully now you can move to word to  use the application");
      console.log(Data)

      const updatedInstitute = await InstituteModel.updateOne({ _id:instituteId }, { $set: { verified : 1, verificationRequest : 0} });

      if (updatedInstitute.modifiedCount === 1) {
      res.status(200).json({ success: true, message: "Institute varified successfully." });
      }else{
        res.status(201).json({ success: false, message: "Error no data" });
      }
  } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: "Unable to approve certificate." });
  }
});

router.post('/unvarify_institute_by_id', async (req, res) => {
  try {
      const instituteId = req.body.instituteId;

      const instituteData = await InstituteModel.findOne({ _id: instituteId }).exec();
      const Data = await sendMSG(instituteData.email, instituteData.number,"Your verification request is not confirmed try again by submitting the more reliable documents");
      console.log(Data)

      // Update the certificate document to confirm true
      // const updatedInstitute = await CertificateModel.findByIdAndUpdate(certificateId, { confirm: true });

      // Update the student document to set watch video and given quiz to null
      const updatedInstitute = await InstituteModel.updateOne({ _id: instituteId }, { $set: {verificationRequest : 0} });

      if (updatedInstitute.modifiedCount === 1) {
      res.status(200).json({ success: true, message: "Institute varified successfully." });
      }else{
        res.status(201).json({ success: false, message: "Error no data" });
      }
  } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: "Unable to approve certificate." });
  }
});

router.post('/varify_student_by_id', async (req, res) => {
  try {
      const studentId = req.body.studentId;
console.log(studentId)

const StudentData = await StudentModel.findOne({ _id: studentId }).exec();
      const Data = await sendMSG(StudentData.email, StudentData.phone,"Your verification request is confirmed successfully now you can move to word to  use the application");
      console.log(Data)

      // Update the certificate document to confirm true
      // const updatedInstitute = await CertificateModel.findByIdAndUpdate(certificateId, { confirm: true });

      // Update the student document to set watch video and given quiz to null
      const updatedStudent = await StudentModel.updateOne({ _id: studentId }, { $set: { verified : 1, verificationRequest : 0} });
console.log(updatedStudent)

      // if (updatedStudent.modifiedCount === 1) {
      // res.status(200).json({ success: true, message: "Institute varified successfully." });
      // }else{
      //   res.status(201).json({ success: false, message: "Error no data" });
      // }
  } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: "Unable to approve certificate." });
  }
});

router.post('/unvarify_student_by_id', async (req, res) => {
  try {
      const studentId = req.body.studentId;

      const StudentData = await StudentModel.findOne({ _id: studentId }).exec();
      const Data = await sendMSG(StudentData.email, StudentData.phone, "Your verification request is not  approved try  again with submitting reliable documentds");
      console.log(Data)

      // Update the certificate document to confirm true
      // const updatedStudent = await CertificateModel.findByIdAndUpdate(certificateId, { confirm: true });

      // Update the student document to set watch video and given quiz to null
      const updatedStudent = await StudentModel.updateOne({ _id: studentId }, { $set: {verificationRequest : 0} });

      if (updatedStudent.modifiedCount === 1) {
      res.status(200).json({ success: true, message: "Institute varified successfully." });
      }else{
        res.status(201).json({ success: false, message: "Error no data" });
      }
  } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: "Unable to approve certificate." });
  }
});




module.exports = router;
