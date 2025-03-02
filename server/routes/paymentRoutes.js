const express = require('express');
const router = express.Router();
const paymentController = require('../controllers/paymentController');
const auth = require('../middleware/auth');

// All payment routes should be protected
router.post('/', auth, paymentController.createPayment);
router.get('/', auth, paymentController.getAllPayments);
router.get('/:id', auth, paymentController.getPaymentById);
router.put('/:id', auth, paymentController.updatePayment);
router.delete('/:id', auth, paymentController.deletePayment);
router.get('/user/:userId', auth, paymentController.getPaymentsByUserId);
router.get('/subscription/:subscriptionId', auth, paymentController.getPaymentsBySubscriptionId);
router.get('/appointment/:appointmentId', auth, paymentController.getPaymentsByAppointmentId);
router.patch('/:id/status', auth, paymentController.updatePaymentStatus);

module.exports = router;