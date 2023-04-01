// Require Mongoose and create a new schema instance
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define the enrollment schema
const enrollmentSchema = new Schema({
  user_id: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  course_id: {
    type: Schema.Types.ObjectId,
    ref: 'Course',
    required: true
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
