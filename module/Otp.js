const nodemailer = require('nodemailer');
const twilio = require('twilio');

// Generate a random OTP
const generateOTP = () => {
  return Math.floor(100000 + Math.random() * 900000);
};

// Send OTP to email
const sendOTPToEmail = async (email, otp) => {
  try {
    const transporter = nodemailer.createTransport({
      host: "sandbox.smtp.mailtrap.io",
      port: 2525,
      auth: {
        user: "c8b2ca8f9daa0c",
        pass: "73062e1fce4e5a"
      }
    });

    const mailOptions = {
      from: "'no reply : '<mayankbharkhada14101@gmail.com>",
      to: email,
      subject: 'Your OTP :',
      text: `Your OTP for studydoor is ${otp}`
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent: ' + info.response);
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
};

// Send OTP to phone number
const sendOTPToPhoneNumber =  async(phoneNumber, otp) => {
 const accountSid = 'ACd4b03e00dbb9a517e0d6714e2f9982e0'; // Your Twilio account SID
  const authToken = 'aeb0455ebdbd5eb500a12d028bdacf34'; // Your Twilio auth token
  const client = twilio(accountSid, authToken);

  const result = await client.messages
    .create({
      body: `Your OTP for studydoor is ${otp}`,
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
