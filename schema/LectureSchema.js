const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define the course schema
const LectureSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
      },
      description: {
        type: String,
        required: true
      },
      course: {
        type: String,
        required: true
      },
      department: {
        type: String,
        required: true
      },
      semester: {
        type: String,
        required: true
      },
      instituteId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Institute',
        required: true
      },
      startTime: {
        type: Date,
        required: true
      },
      endTime: {
        type: Date,
        required: true
      },
      examDate: {
        type: Date,
        required: true
      },
      ChannalName: {
        type: String,
        required: true
      },
      ChannalToken: {
        type: String,
        required: true
      },
      AppId: {
        type: String,   
        required: false,
        default: "3b0b38080efd46a28c8b75387c66e8ff",
      }

});


// Create a Course model using the schema
const LectureModel = mongoose.model('Lacture', LectureSchema);
module.exports = LectureModel;
