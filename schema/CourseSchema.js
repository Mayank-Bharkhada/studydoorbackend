const mongoose = require('mongoose');

// Define the course schema
const CourseSchema = new mongoose.Schema({
  email:{
    type:String,
    required: true,
    unique:false
  },
  courseName: {
    type: String,
    required: true,
    unique:false
  },
  department: {
    type: String,
    required: true,
    unique:false
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});


// Create a Course model using the schema
const CourseModel = mongoose.model('Course', CourseSchema);
module.exports = CourseModel;
