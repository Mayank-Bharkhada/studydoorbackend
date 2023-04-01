const mongoose = require('mongoose');

// Define the course schema
const CourseSchema = new mongoose.Schema({
  courseName: {
    type: String,
    required: true
  },
  department: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});


// Create a Course model using the schema
const CourseModel = mongoose.model('Course', CourseSchema);
module.exports = CourseModel;