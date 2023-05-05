const nodemailer = require('nodemailer');
const twilio = require('twilio');

// Generate a random OTP
const generateOTP = () => {
  return Math.floor(100000 + Math.random() * 900000);
};

// Send OTP to email
const sendOTPToEmail = async (email, otp) => {

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
    text: `Your OTP is ${otp}`,
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
    return true;
  }

};

// Send OTP to phone number
const sendOTPToPhoneNumber =  async(phoneNumber, otp) => {
 const accountSid = 'ACd4b03e00dbb9a517e0d6714e2f9982e0'; // Your Twilio account SID
  const authToken = 'aeb0455ebdbd5eb500a12d028bdacf34'; // Your Twilio auth token
  const client = twilio(accountSid, authToken);

  const result = await client.messages
    .create({
      body: `Your OTP is ${otp}`,
      from: '+12262413079', // Your Twilio phone number
      to: `+917043374230`,
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
const sendOTP = async (email, phoneNumber) => {
  const otp = generateOTP();
const Email = await sendOTPToEmail(email, otp);
  const phone = await sendOTPToPhoneNumber(phoneNumber, otp);

  
  if ( Email && phone ){
    return [true, otp];
  }else{
    return false;
  }

};

module.exports = sendOTP;
