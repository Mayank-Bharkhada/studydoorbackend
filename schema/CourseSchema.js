const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define the course schema
const CourseSchema = new mongoose.Schema({
  institute_id:{
    type: Schema.Types.ObjectId,
    ref: 'Institute',
    required: true,
    unique: false
  },
  courseName: {
    type: String,
    required: true
  },
  department: {
    type: String,
    required: true,
    unique: true  
  },
  createdAt: {
    type: Date,
    default: Date.now,
    required:true
  },
    profilePhoto: {
    type: String,
    required: false,
    default: null,
  },
});


// Create a Course model using the schema
const CourseModel = mongoose.model('Course', CourseSchema);
module.exports = CourseModel;
