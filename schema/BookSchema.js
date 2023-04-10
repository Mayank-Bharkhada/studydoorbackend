const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define the course schema
const BookSchema = new mongoose.Schema({
  institute_id:{
    type: Schema.Types.ObjectId,
    ref: 'Institute',
    required: true,
  },
  bookName: {
    type: String,
    required: true
  },
  courseName: {
    type: String,
    required: true
  },
  department: {
    type: String,
    required: true, 
  },
  semester: {
    type: Number,
    required: true, 
  },
  BookUri: {
    type: String,
    required: true, 
  },
  createdAt: {
    type: Date,
    default: Date.now,
    required:true
  }
});


// Create a Course model using the schema
const BookModel = mongoose.model('Book', BookSchema);
module.exports = BookModel;