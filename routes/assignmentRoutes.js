const express = require('express');
const router = express.Router();
const {
  createAssignment,
  updateAssignment,
  getClassAssignments,
  deleteAssignment,
} = require('../controllers/assignmentController');
const auth = require('../middlewares/auth');

router.post('/', auth, createAssignment);
router.put('/:id', auth, updateAssignment);
router.get('/class/:classId', auth, getClassAssignments);
router.delete('/:id', auth, deleteAssignment);

module.exports = router;
