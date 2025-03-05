import express from 'express';
import * as appointmentController from '../controllers/appointmentController.js';
import auth from '../middleware/auth.js';
const router = express.Router();

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

export default router;