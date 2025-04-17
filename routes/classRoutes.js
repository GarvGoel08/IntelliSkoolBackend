const express = require('express');
const { createClass, updateClass, deleteClass, getClass } = require('../controllers/classController');
const authMiddleware = require('../middlewares/auth'); // For authentication middleware

const router = express.Router();

router.post('/', authMiddleware, createClass);
router.put('/:classId', authMiddleware, updateClass);
router.delete('/:classId', authMiddleware, deleteClass);
router.get('/:classId', getClass);

module.exports = router;
