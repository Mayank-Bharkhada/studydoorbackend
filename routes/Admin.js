const express = require('express');
const bcrypt = require('bcrypt');
const router = express.Router();
//call through /api/User/Admin_login

router.post("/Admin_login",async (req,res) => {
    try {
      const yourId = req.body.Id;
      console.log(yourId);
      const yourPassword = req.body.Password; //'ChmkjJ@11'
      const hashedPassword = '$2b$10$5HS9rV8c0P/rYSClHl/EKO2eA3nBlwR5JMhstvYFYHRtBNb9O2SiW';

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
  

module.exports = router;
