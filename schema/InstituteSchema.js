const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const InstituteSchema = new mongoose.Schema({
  institute_id: {
    type: Schema.Types.ObjectId,
    ref: 'Institute',
    required: true,
    unique: false
  },
  fullName: {
    type: String,
    required: true
  },
  number: {
    type: String,
    required: true,
    unique: true
  },
  course: {
    type: String,
    required: true
  },
  department: {
    type: String,
    required: true
  },
  userName: {
    type: String,
    required: true,
    unique: true
  },
  userUuid: {
    type: String,
    required: true,
    unique: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now,
    required: true
  }
});

const InstituteModel = mongoose.model("Institute", InstituteSchema);

module.exports = InstituteModel;