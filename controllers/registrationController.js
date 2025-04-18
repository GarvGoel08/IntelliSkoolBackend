const Registrations = require('../models/Registrations');
const Classroom = require('../models/Classroom');

const createRegistration = async (req, res) => {
  try {
    const { classCode } = req.body;
    const classroom = await Classroom.findOne({ classCode });
    if (!classroom) return res.status(404).json({ message: "Classroom not found" });

    const classroomId = classroom._id
    const studentId = req.userId;

    const existing = await Registrations.findOne({ studentId, classroomId });
    if (existing) return res.status(400).json({ message: "Already registered" });

    const registration = await Registrations.create({ studentId, classroomId });

    const { _id, ...data } = registration.toObject();
    res.status(201).json(data);
  } catch (err) {
    res.status(500).json({ message: "Error creating registration", error: err.message });
  }
};

const deleteRegistration = async (req, res) => {
  try {
    const { id } = req.params;
    await Registrations.findByIdAndDelete(id);
    res.status(200).json({ message: "Registration deleted" });
  } catch (err) {
    res.status(500).json({ message: "Error deleting registration", error: err.message });
  }
};

const getUserRegistrations = async (req, res) => {
  try {
    const studentId = req.user;
    const registrations = await Registrations.find({ studentId }).populate('classroomId');

    const response = registrations.map(reg => {
      const { _id, classroomId, studentId, createdAt, updatedAt } = reg;
      const classroom = classroomId ? {
        _id: classroomId._id,
        className: classroomId.className,
        classDescription: classroomId.classDescription,
        classCode: classroomId.classCode
      } : null;

      return {
        classroom,
        createdAt,
        updatedAt
      };
    });

    res.status(200).json(response);
  } catch (err) {
    res.status(500).json({ message: "Error getting registrations", error: err.message });
  }
};

module.exports = {
  createRegistration,
  deleteRegistration,
  getUserRegistrations
};
