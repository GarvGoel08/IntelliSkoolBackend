const express = require('express');
const { signup, login, getUserDetail } = require('../controllers/userController');
const authMiddleware = require('../middlewares/auth'); // For authentication middleware

const router = express.Router();

router.post('/signup', signup);
router.post('/login', login);
router.get('/me', authMiddleware, getUserDetail); 

module.exports = router;
