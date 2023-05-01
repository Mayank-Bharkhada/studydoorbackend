const express = require('express');
const bcrypt = require('bcrypt');
const router = express.Router();
const StudentModel = require('../schema/StudetSchema');
const InstituteModel = require('../schema/InstituteSchema');

//call through /api/User/Admin_login

router.post("/Admin_login",async (req,res) => {
    try {
      const yourId = req.body.Id;
      console.log(yourId);
      const yourPassword = req.body.Password; //'ChmkjJ@11'
      const hashedPassword = "$2b$10$gmxahITXdhvsptTPKo8vGuBj1FvgrKt2Q15DK0d6z9ktGEaGZxOoi";

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

module.exports = router;
