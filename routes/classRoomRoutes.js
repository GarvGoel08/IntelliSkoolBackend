const express = require('express');
const { createClassroom, updateClassroom, deleteClassroom, getClassroom } = require('../controllers/classRoomController');
const authMiddleware = require('../middlewares/auth'); // For authentication middleware

const router = express.Router();

router.post('/', authMiddleware, createClassroom);
router.put('/:classroomId', authMiddleware, updateClassroom);
router.delete('/:classroomId', authMiddleware, deleteClassroom);
router.get('/:classroomId', getClassroom);

module.exports = router;
