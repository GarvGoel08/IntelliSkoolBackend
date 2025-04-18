const Assignment = require("../models/Assignment");

const createAssignment = async (req, res) => {
  try {
    const { name, deadline, description, classroomID } = req.body;

    const newAssignment = await Assignment.create({
      name,
      deadline,
      description,
      classroomID,
    });

    const { _id, ...rest } = newAssignment._doc;
    res.status(200).json(rest);
  } catch (err) {
    res
      .status(500)
      .json({ error: "Failed to create assignment", details: err.message });
  }
};

const updateAssignment = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedAssignment = await Assignment.findByIdAndUpdate(id, req.body, {
      new: true,
    });

    if (!updatedAssignment)
      return res.status(404).json({ error: "Assignment not found" });

    const { _id, ...rest } = updatedAssignment._doc;
    res.status(200).json(rest);
  } catch (err) {
    res
      .status(500)
      .json({ error: "Failed to update assignment", details: err.message });
  }
};

const getClassAssignments = async (req, res) => {
  try {
    const { classId } = req.params;

    const assignments = await Assignment.find({ classroomID: classId });

    const result = assignments.map(({ _doc }) => {
      const { _id, ...rest } = _doc;
      return rest;
    });

    res.status(200).json(result);
  } catch (err) {
    res
      .status(500)
      .json({ error: "Failed to fetch assignments", details: err.message });
  }
};

const deleteAssignment = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Assignment.findByIdAndDelete(id);

    if (!deleted)
      return res.status(404).json({ error: "Assignment not found" });

    res.status(200).json({ message: "Assignment deleted" });
  } catch (err) {
    res
      .status(500)
      .json({ error: "Failed to delete assignment", details: err.message });
  }
};

module.exports = {
  createAssignment,
  updateAssignment,
  getClassAssignments,
  deleteAssignment,
};
