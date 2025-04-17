const Test = require('../models/Test');

const createTest = async (req, res) => {
  try {
    const newTest = await Test.create(req.body);
    const { _id, ...rest } = newTest._doc;
    res.status(201).json(rest);
  } catch (err) {
    res.status(500).json({ error: 'Failed to create test', details: err.message });
  }
};

const updateTest = async (req, res) => {
  try {
    const { id } = req.params;
    const updated = await Test.findByIdAndUpdate(id, req.body, { new: true });

    if (!updated) return res.status(404).json({ error: 'Test not found' });

    const { _id, ...rest } = updated._doc;
    res.status(200).json(rest);
  } catch (err) {
    res.status(500).json({ error: 'Failed to update test', details: err.message });
  }
};

const deleteTest = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Test.findByIdAndDelete(id);

    if (!deleted) return res.status(404).json({ error: 'Test not found' });

    res.status(200).json({ message: 'Test deleted' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete test', details: err.message });
  }
};

const getClassRoomTests = async (req, res) => {
  try {
    const { classroomId } = req.params;
    const tests = await Test.find({ classroomId });

    const result = tests.map(({ _doc }) => {
      const { _id, ...rest } = _doc;
      return rest;
    });

    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch tests', details: err.message });
  }
};

module.exports = {
  createTest,
  updateTest,
  deleteTest,
  getClassRoomTests,
};
