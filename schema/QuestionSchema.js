const QuestionSchema = new mongoose.Schema({
    institute_id: {
      type: Schema.Types.ObjectId,
      ref: 'Institute',
      required: true,
      unique: false
    },
    course: {
      type: String,
      required: true
    },
    department: {
      type: String,
      required: true,
      unique: true
    },
    semester: {
      type: Number,
      required: true
    },
    title: {
      type: String,
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
    question: [
      {
        correctOption: {
          type: String,
          required: true
        },
        options: [
          {
            type: String,
            required: true
          }
        ],
        text: {
          type: String,
          required: true
        }
      }
    ],
    examDate: {
        type: Date,
        required: true
      },
    createdAt: {
      type: Date,
      default: Date.now,
      required: true
    }
  });
  