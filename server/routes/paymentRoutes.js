const express = require('express');
const router = express.Router();
const paymentController = require('../controllers/paymentController');

router.post('/', paymentController.createPayment);
router.get('/', paymentController.getAllPayments);
router.get('/:id', paymentController.getPaymentById);
router.put('/:id', paymentController.updatePayment);
router.delete('/:id', paymentController.deletePayment);
router.get('/user/:userId', paymentController.getPaymentsByUserId);
router.get('/subscription/:subscriptionId', paymentController.getPaymentsBySubscriptionId);
router.get('/appointment/:appointmentId', paymentController.getPaymentsByAppointmentId);
router.patch('/:id/status', paymentController.updatePaymentStatus);

module.exports = router;