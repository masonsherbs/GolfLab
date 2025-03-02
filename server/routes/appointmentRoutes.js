const express = require('express');
const router = express.Router();
const appointmentController = require('../controllers/appointmentController');
const auth = require('../middleware/auth');

// Public route - might be needed for displaying available appointment slots
router.get('/latest', appointmentController.getLatestAppointment);

// Protected routes
router.post('/', auth, appointmentController.createAppointment);
router.get('/', auth, appointmentController.getAll);
router.get('/:id', auth, appointmentController.getById);
router.put('/:id', auth, appointmentController.update);
router.delete('/:id', auth, appointmentController.delete);
router.get('/user/:userId', auth, appointmentController.getByUserId);
router.get('/status/:status', auth, appointmentController.getByStatus);
router.patch('/:id/status', auth, appointmentController.updateStatus);
router.get('/date-range', auth, appointmentController.getByDateRange);
module.exports = router;