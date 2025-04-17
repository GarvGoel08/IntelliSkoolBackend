const mongoose = require('mongoose');

const classroomSchema = new mongoose.Schema({
  userID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  className: {
    type: String,
    required: true,
    trim: true
  },
  classDescription: {
    type: String,
    required: true,
    trim: true
  },
  classCode: {
    type: String,
    required: true,
    trim: true
  }
}, {
  timestamps: true 
});

const Classroom = mongoose.model('Classroom', classroomSchema);
module.exports = Classroom;
