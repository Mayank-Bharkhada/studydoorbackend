const mongoose = require("mongoose");

const InstituteSchema = new mongoose.Schema({
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
  dateOfEstablishment: {
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
  instituteCertificate: {
    type: String,
    required: false,
    default: null,
  },
  institutePhoto: {
    type: String,
    required: false,
    default: null,
  },
  varificationPhoto: {
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
});

const InstituteModel = mongoose.model("Institute", InstituteSchema);

module.exports = InstituteModel;