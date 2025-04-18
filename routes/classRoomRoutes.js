const express = require('express');
const { createClassroom, updateClassroom, deleteClassroom, getClassroom, getUserClassrooms } = require('../controllers/classRoomController');
const authMiddleware = require('../middlewares/auth'); // For authentication middleware

const router = express.Router();

router.post('/', authMiddleware, createClassroom);
router.put('/:classroomId', authMiddleware, updateClassroom);
router.delete('/:classroomId', authMiddleware, deleteClassroom);
router.get('/class/:classroomId', getClassroom);
router.get('/user', authMiddleware, getUserClassrooms);

module.exports = router;
