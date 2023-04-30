const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define the course schema
const FacultySchema = new mongoose.Schema({
  institute_id:{
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
  UserName: {
    type: String,
    required: true,
    unique: true
  },
    email:{
    type: String,
    required: true,
    unique: true
  },
  password:{
    type: String,
    required: true,
  },
  UserUuid: {
    type: String,
    required: true,
    unique: true
  },
  createdAt: {
    type: Date,
    default: Date.now,
    required: true
  }
});


// Create a Course model using the schema
const FacultyModel = mongoose.model('Faculty', FacultySchema);
module.exports = FacultyModel;
