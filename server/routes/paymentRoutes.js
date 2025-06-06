import express from 'express';
import * as paymentController from '../controllers/paymentController.js';
import auth from '../middleware/auth.js';
import checkAccessLevel from '../middleware/checkAccessLevel.js';
const router = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Payment:
 *       type: object
 *       required:
 *         - userId
 *         - amount
 *         - paymentMethod
 *         - status
 *       properties:
 *         id:
 *           type: integer
 *           description: The auto-generated id of the payment
 *         userId:
 *           type: integer
 *           description: The user ID associated with the payment
 *         amount:
 *           type: number
 *           format: float
 *           description: The payment amount
 *         paymentMethod:
 *           type: string
 *           enum: [credit_card, debit_card, paypal]
 *           description: The method of payment
 *         status:
 *           type: string
 *           enum: [pending, completed, failed]
 *           description: The status of the payment
 *         subscriptionId:
 *           type: integer
 *           description: The subscription ID associated with the payment (optional)
 *         appointmentId:
 *           type: integer
 *           description: The appointment ID associated with the payment (optional)
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: The creation date and time of the payment
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: The last update date and time of the payment
 */

/**
 * @swagger
 * /api/payments:
 *   post:
 *     summary: Create a new payment
 *     tags: [Payments]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Payment'
 *     responses:
 *       201:
 *         description: Created payment
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Payment'
 *       400:
 *         description: Invalid input
 *       401:
 *         description: Unauthorized
 */
router.post('/', auth, checkAccessLevel(2), paymentController.createPayment);

/**
 * @swagger
 * /api/payments:
 *   get:
 *     summary: Retrieve all payments
 *     tags: [Payments]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of all payments
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Payment'
 *       401:
 *         description: Unauthorized
 */
router.get('/', auth, checkAccessLevel(2), paymentController.getAllPayments);

/**
 * @swagger
 * /api/payments/{id}:
 *   get:
 *     summary: Get a payment by ID
 *     tags: [Payments]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: The payment
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Payment'
 *       404:
 *         description: Payment not found
 *       401:
 *         description: Unauthorized
 */
router.get('/:id', auth, checkAccessLevel(1), paymentController.getPaymentById);

/**
 * @swagger
 * /api/payments/{id}:
 *   put:
 *     summary: Update a payment
 *     tags: [Payments]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Payment'
 *     responses:
 *       200:
 *         description: The updated payment
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Payment'
 *       400:
 *         description: Invalid input
 *       404:
 *         description: Payment not found
 *       401:
 *         description: Unauthorized
 */
router.put('/:id', auth, checkAccessLevel(2), paymentController.updatePayment);

/**
 * @swagger
 * /api/payments/{id}:
 *   delete:
 *     summary: Delete a payment
 *     tags: [Payments]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       204:
 *         description: Payment deleted successfully
 *       404:
 *         description: Payment not found
 *       401:
 *         description: Unauthorized
 */
router.delete('/:id', auth, checkAccessLevel(3), paymentController.deletePayment);

/**
 * @swagger
 * /api/payments/user/{userId}:
 *   get:
 *     summary: Get payments by user ID
 *     tags: [Payments]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: List of payments for the user
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Payment'
 *       401:
 *         description: Unauthorized
 */
router.get('/user/:userId', auth, checkAccessLevel(1), paymentController.getPaymentsByUserId);

/**
 * @swagger
 * /api/payments/subscription/{subscriptionId}:
 *   get:
 *     summary: Get payments by subscription ID
 *     tags: [Payments]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: subscriptionId
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: List of payments for the subscription
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Payment'
 *       401:
 *         description: Unauthorized
 */
router.get('/subscription/:subscriptionId', auth, checkAccessLevel(2), paymentController.getPaymentsBySubscriptionId);

/**
 * @swagger
 * /api/payments/appointment/{appointmentId}:
 *   get:
 *     summary: Get payments by appointment ID
 *     tags: [Payments]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: appointmentId
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: List of payments for the appointment
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Payment'
 *       401:
 *         description: Unauthorized
 */
router.get('/appointment/:appointmentId', auth, checkAccessLevel(2), paymentController.getPaymentsByAppointmentId);

/**
 * @swagger
 * /api/payments/{id}/status:
 *   patch:
 *     summary: Update the status of a payment
 *     tags: [Payments]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - status
 *             properties:
 *               status:
 *                 type: string
 *                 enum: [pending, completed, failed]
 *     responses:
 *       200:
 *         description: The updated payment
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Payment'
 *       400:
 *         description: Invalid input
 *       404:
 *         description: Payment not found
 *       401:
 *         description: Unauthorized
 */
router.patch('/:id/status', auth, checkAccessLevel(2), paymentController.updatePaymentStatus);

export default router;