const nodemailer = require('nodemailer');
const twilio = require('twilio');



// Send OTP to email
const sendOTPToEmail = async (email,  message) => {

  const transporter = nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    auth: {
        user: 'abbigail.feil5@ethereal.email',
        pass: 'eETdu9tBdnqv3sny4R'
    }
});

  const mailOptions = {
    from: '"Studydoor : " <abbigail.feil5@ethereal.email>', // Your email address
    to: email,
    subject: 'One-Time Password (OTP For Studydoor)',
    text: `${message}`,
  };

  const result = await new Promise((resolve, reject) => {
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      reject(error);
    } else {
      resolve(info);
    }
  });
});

  console.log("result");  
  console.log(result.accepted[0]  );  
  console.log("result");  
  if(result.accepted[0] != null ){
    return true;
  }else{
    return false;
  }

};

// Send OTP to phone number
const sendOTPToPhoneNumber =  async(phoneNumber, message) => {
  const accountSid = 'ACd4b03e00dbb9a517e0d6714e2f9982e0'; // Your Twilio account SID
  const authToken = 'aeb0455ebdbd5eb500a12d028bdacf34'; // Your Twilio auth token
  const client = twilio(accountSid, authToken);

  const result = await client.messages
    .create({
      body: `${message}`,
      from: '+12262413079', // Your Twilio phone number
      to: `+91${phoneNumber}`,
    })
    .then((message) => {
      console.log(message.sid);
        return true;
    })
    .catch((error) => {
      console.log(error)
        return false;
    });
 
    return result;
};

// Generate and send OTP to email and phone number
const sendMSG = async (email, phoneNumber, message) => {

const Email = await sendOTPToEmail(email, message);
  const phone = await sendOTPToPhoneNumber(phoneNumber, message);

  
  if ( Email && phone ){
    return true ;
  }else{
    return false;
  }

};

module.exports = sendMSG;
