const mongoose = require("mongoose");

const StudentSchema = new mongoose.Schema({
 name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phone: {
    type: Number,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  state: {
    type: String,
    required: true,
  },
  country: {
    type: String,
    required: true,
  },
  pincode: {
    type: Number,
    required: true,
  },
  profilePhoto: {
    type: String,
    required: false,
    default: "https://studydoor.s3.amazonaws.com/MyProfile.jpg",
  },
  block: {
    type: Number,
    required: false,
    default: 0,
  },
  verified: {
    type: Number,
    required: false,
    default: 0,
  },
  verificationRequest: {
    type: Number,
    required: false,
    default: 0,
  },
  UserName: {
    type: String,
    required: true,
  },
  UserUuid: {
    type: String,
    required: true,
  },
  officialTranscriptUrl: {
    type: String,
    required: false,
    default: null,
  },
  leavigCertificateUrl: {
    type: String,
    required: false,
    default: null,
  },
  governmentIssuedIdentificationUrl: {
    type: String,
    required: false,
    default: null,
  }
});

const StudentModel = mongoose.model("Student", StudentSchema);

module.exports = StudentModel;
