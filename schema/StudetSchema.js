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
    default: null,
  },
  block: {
    type: Number,
    required: false,
    default: 0,
  },
  varified: {
    type: Number,
    required: false,
    default: 0,
  },
  varificationRequest: {
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
