const Class = require("../models/Class");

const randomSixCode = () => {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let code = "";
  for (let i = 0; i < 6; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    code += characters[randomIndex];
  }
  return code;
};

const createClass = async (req, res) => {
  try {
    const code = randomSixCode();
    const session = new Class({ ...req.body, meetCode: code });
    const saved = await session.save();
    const classDetails = saved.toObject();
    delete classDetails._id;
    delete classDetails.__v;
    res.status(201).json(classDetails);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const updateClass = async (req, res) => {
  try {
    const { classId } = req.params;
    const updates = req.body;

    const updatedClass = await Class.findByIdAndUpdate(classId, updates, {
      new: true,
    });

    if (!updatedClass) {
      return res.status(404).json({ error: "Class not found" });
    }

    const classDetails = updatedClass.toObject();
    delete classDetails._id;
    delete classDetails.__v;

    res.json(classDetails);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const deleteClass = async (req, res) => {
  try {
    const { classId } = req.params;

    const deletedClass = await Class.findByIdAndDelete(classId);

    if (!deletedClass) {
      return res.status(404).json({ error: "Class not found" });
    }

    res.json({ message: "Class deleted successfully" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const getClass = async (req, res) => {
  try {
    const { classId } = req.params;

    const session = await Class.findById(classId);

    if (!session) {
      return res.status(404).json({ error: "Class not found" });
    }

    const classDetails = session.toObject();
    delete classDetails._id;
    delete classDetails.__v;

    res.json(classDetails);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getClassroomClasses = async (req, res) => {
  try {
    const { classroomId } = req.params;

    const classes = await Class.find({ classroomId });

    if (!classes) {
      return res.status(404).json({ error: "Classes not found" });
    }

    const classDetails = classes.map((session) => {
      const classDetails = session.toObject();
      delete classDetails._id;
      delete classDetails.__v;
      return classDetails;
    });

    res.json(classDetails);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  createClass,
  updateClass,
  deleteClass,
  getClass,
  getClassroomClasses,
};
