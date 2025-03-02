const express = require('express');
const router = express.Router();
const appointmentController = require('../controllers/appointmentController');

router.post('/', appointmentController.createAppointment);
router.get('/latest', appointmentController.getLatestAppointment);
router.get('/', appointmentController.getAll);
router.get('/:id', appointmentController.getById);
router.put('/:id', appointmentController.update);
router.delete('/:id', appointmentController.delete);
router.get('/user/:userId', appointmentController.getByUserId);
router.get('/status/:status', appointmentController.getByStatus);
router.patch('/:id/status', appointmentController.updateStatus);
router.get('/date-range', appointmentController.getByDateRange);

module.exports = router;