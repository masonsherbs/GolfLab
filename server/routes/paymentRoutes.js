import express from 'express';
import * as paymentController from '../controllers/paymentController.js';
import auth from '../middleware/auth.js';
import checkAccessLevel from '../middleware/checkAccessLevel.js';
const router = express.Router();

// All payment routes should be protected
router.post('/', auth, checkAccessLevel(2), paymentController.createPayment);
router.get('/', auth, checkAccessLevel(2), paymentController.getAllPayments);
router.get('/:id', auth, checkAccessLevel(1), paymentController.getPaymentById);
router.put('/:id', auth, checkAccessLevel(2), paymentController.updatePayment);
router.delete('/:id', auth, checkAccessLevel(3), paymentController.deletePayment);
router.get('/user/:userId', auth, checkAccessLevel(1), paymentController.getPaymentsByUserId);
router.get('/subscription/:subscriptionId', auth, checkAccessLevel(2), paymentController.getPaymentsBySubscriptionId);
router.get('/appointment/:appointmentId', auth, checkAccessLevel(2), paymentController.getPaymentsByAppointmentId);
router.patch('/:id/status', auth, checkAccessLevel(2), paymentController.updatePaymentStatus);

export default router;