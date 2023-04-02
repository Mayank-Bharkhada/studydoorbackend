// Require Mongoose and create a new schema instance
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define the enrollment schema
const enrollmentSchema = new Schema({
  student_id: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    unique: false, 
    required: true
  },
  studentName: {
    type: String,
    unique: false, 
    required: true
  },
  studentProfilePic: {
    type: String,
    unique: false, 
    default:null,
    required: true
  },
  institute_id: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    unique: false, 
    required: true
  },
  course_id: {
    type: Schema.Types.ObjectId,
    ref: 'Course',
    required: true,
    unique: true
  },
  courseName: {
    type: String,
    ref: 'Course',
    required: true,
    unique: true
  },
  courseDepartment: {
    type: String,
    required: true,
    unique: true
  },
  enrollment_date: {
    type: Date,
    default: Date.now,
    required: true
  },
  completion_date: {
    type: Date,
    default: null
  }
});

// Create a new model based on the enrollment schema and export it
const EnrollmentModel = mongoose.model('Enrollment', enrollmentSchema);
module.exports = EnrollmentModel;
