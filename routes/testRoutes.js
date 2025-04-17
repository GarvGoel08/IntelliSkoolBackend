const express = require('express');
const router = express.Router();
const {
  createTest,
  updateTest,
  deleteTest,
  getClassRoomTests
} = require('../controllers/testController');
const auth = require('../middlewares/auth');

router.post('/', auth, createTest);
router.put('/:id', auth, updateTest);
router.delete('/:id', auth, deleteTest);
router.get('/classroom/:classroomId', auth, getClassRoomTests);

module.exports = router;
