const express = require('express');
const router = express.Router();
const { createRegistration, deleteRegistration, getUserRegistrations } = require('../controllers/registrationController');
const authMiddleware = require('../middlewares/auth');

router.post('/', authMiddleware, createRegistration);
router.delete('/:id', deleteRegistration);
router.get('/my', authMiddleware, getUserRegistrations);

module.exports = router;
