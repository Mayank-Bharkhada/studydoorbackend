const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const InstituteSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  profilePhoto: {
    type: String,
    required: false,
    default: "https://studydoor.s3.amazonaws.com/MyProfile.jpg",
  },
  password: {
    type: String,
    required: true,
  },
  dateOfEstablishment: {
    type: Date,
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
  accreditationCertificateUrl: {
    type: String,
    required: false,
  },
  businessRegistrationCertificateUrl: {
    type: String,
    required: false,
  },
  institutePhoto: {
    type: String,
    required: false,
    default: null,
  },
  verificationPhoto: {
    type: String,
    required: false,
    default: null,
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
    unique: true,
  },
  UserUuid: {
    type: String,
    required: true,
    unique: true,
  },
  number: {
    type: String,
    required: true,
  },
});

const InstituteModel = mongoose.model("Institute", InstituteSchema);

module.exports = InstituteModel;
