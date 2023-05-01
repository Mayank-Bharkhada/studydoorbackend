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
  confirm: {
    type: Boolean,
    required: true
  },
  semester: {
    type: String,
    required: true
  }
});

const CertificateModel = mongoose.model('Certificate', CertificateSchema);
module.exports = CertificateModel;