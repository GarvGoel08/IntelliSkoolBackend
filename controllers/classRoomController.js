const Classroom = require('../models/Classroom');

const createClassroom = async (req, res) => {
  try {
    const classroom = new Classroom(req.body);
    const savedClassroom = await classroom.save();
    
    const classroomDetails = savedClassroom.toObject();
    delete classroomDetails._id;
    delete classroomDetails.__v;

    res.status(201).json(classroomDetails);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const updateClassroom = async (req, res) => {
  try {
    const { classroomId } = req.params;
    const updates = req.body;

    const updatedClassroom = await Classroom.findByIdAndUpdate(classroomId, updates, { new: true });
    
    if (!updatedClassroom) {
      return res.status(404).json({ error: 'Classroom not found' });
    }

    const classroomDetails = updatedClassroom.toObject();
    delete classroomDetails._id;
    delete classroomDetails.__v;

    res.json(classroomDetails);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const deleteClassroom = async (req, res) => {
  try {
    const { classroomId } = req.params;

    const deletedClassroom = await Classroom.findByIdAndDelete(classroomId);
    
    if (!deletedClassroom) {
      return res.status(404).json({ error: 'Classroom not found' });
    }

    res.json({ message: 'Classroom deleted successfully' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const getClassroom = async (req, res) => {
  try {
    const { classroomId } = req.params;

    const classroom = await Classroom.findById(classroomId);
    
    if (!classroom) {
      return res.status(404).json({ error: 'Classroom not found' });
    }

    const classroomDetails = classroom.toObject();
    delete classroomDetails._id;
    delete classroomDetails.__v;

    res.json(classroomDetails);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  createClassroom,
  updateClassroom,
  deleteClassroom,
  getClassroom
};
