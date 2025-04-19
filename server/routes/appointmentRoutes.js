import express from 'express';
import * as appointmentController from '../controllers/appointmentController.js';
import auth from '../middleware/auth.js';
import checkAccessLevel from '../middleware/checkAccessLevel.js';
const router = express.Router();

// Public route - might be needed for displaying available appointment slots
router.get('/latest', appointmentController.getLatestAppointment);

// Protected routes
router.post('/', auth, checkAccessLevel(2), appointmentController.createAppointment);
router.get('/', auth, checkAccessLevel(2), appointmentController.getAll);
router.get('/:id', auth, checkAccessLevel(1), appointmentController.getById);
router.put('/:id', auth, checkAccessLevel(2), appointmentController.update);
router.delete('/:id', auth, checkAccessLevel(3), appointmentController.deleteAppointment);
router.get('/user/:userId', auth, checkAccessLevel(1), appointmentController.getByUserId);
router.get('/status/:status', auth, checkAccessLevel(2), appointmentController.getByStatus);
router.patch('/:id/status', auth, checkAccessLevel(2), appointmentController.updateStatus);
router.get('/date-range', auth, checkAccessLevel(2), appointmentController.getByDateRange);

export default router;