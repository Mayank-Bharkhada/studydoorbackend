const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const VideoSchema = new mongoose.Schema({
    institute_id:{
        type: Schema.Types.ObjectId,
        ref: 'Institute',
        required: true,
      },
      course: {
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
  title: {
    type: String,
    required: true
  },
  description: {
    type: String
  },
  videoUrl: {
    type: String,
    required: true
  },
  thumbnailUrl: {
    type: String
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
});

const VideoModel = mongoose.model('Video', VideoSchema);

module.exports = VideoModel;
