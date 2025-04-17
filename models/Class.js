const mongoose = require('mongoose');

const classSchema = new mongoose.Schema({
  classroomID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Classroom',
    required: true
  },
  meetCode: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  duration: {
    type: Number,
    required: true
  },
  startTime: {
    type: Date,
    required: true
  },
  topic: {
    type: String,
    trim: true
  },
}, {
  timestamps: true
});

const Class = mongoose.model('Class', classSchema);
module.exports = Class;
