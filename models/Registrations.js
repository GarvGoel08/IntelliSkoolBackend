const mongoose = require('mongoose');

const registrationsSchema = new mongoose.Schema({
  studentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  classroomId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Classroom',
    required: true
  }
}, {
  timestamps: true
});

const Registrations = mongoose.model('Registrations', registrationsSchema);
module.exports = Registrations;
