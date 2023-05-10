const mongoose = require('mongoose');

const CertificateSchema = new mongoose.Schema({
  studentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Student',
    required: true
  },
  instituteId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Institute',
    required: true
  },
  enrollmentId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true
  },
  studentName:{
    type: String,
    required: true
  },
  course:{
    type: String,
    required: true
  },
  department:{    
    type: String,
    required: true
  },
  number:{
    type: Number,
    required: true
  },
  confirm: {
    type: Boolean,
    required: true
  },
  semester: {
    type: String,
    required: true
  },
  profilePhoto: {
    type: String,
    required: false,
    default: null,
  },
});

const CertificateModel = mongoose.model('Certificate', CertificateSchema);
module.exports = CertificateModel;
