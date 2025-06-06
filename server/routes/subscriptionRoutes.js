import express from 'express';
import * as subscriptionController from '../controllers/subscriptionController.js';
import auth from '../middleware/auth.js';
import checkAccessLevel from '../middleware/checkAccessLevel.js';
const router = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Subscription:
 *       type: object
 *       required:
 *         - userId
 *         - planType
 *         - status
 *         - startDate
 *         - endDate
 *       properties:
 *         id:
 *           type: integer
 *           description: The auto-generated id of the subscription
 *         userId:
 *           type: integer
 *           description: The id of the user this subscription belongs to
 *         planType:
 *           type: string
 *           enum: [monthly, payPerUse, trial, punchCard]
 *           description: The type of subscription plan
 *         status:
 *           type: string
 *           enum: [active, inactive, cancelled]
 *           description: The current status of the subscription
 *         startDate:
 *           type: string
 *           format: date
 *           description: The start date of the subscription
 *         endDate:
 *           type: string
 *           format: date
 *           description: The end date of the subscription
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 */

/**
 * @swagger
 * /api/subscriptions/latest:
 *   get:
 *     summary: Get the latest subscription
 *     tags: [Subscriptions]
 *     responses:
 *       200:
 *         description: The latest subscription
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Subscription'
 *       404:
 *         description: No subscriptions found
 */
router.get('/latest', subscriptionController.getLatestSubscription);

// Protected routes

/**
 * @swagger
 * /api/subscriptions:
 *   post:
 *     summary: Create a new subscription
 *     tags: [Subscriptions]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Subscription'
 *     responses:
 *       201:
 *         description: The created subscription
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Subscription'
 *       400:
 *         description: Invalid input
 *       401:
 *         description: Unauthorized
 */
router.post('/', auth, checkAccessLevel(2), subscriptionController.createSubscription);

/**
 * @swagger
 * /api/subscriptions:
 *   get:
 *     summary: Retrieve all subscriptions
 *     tags: [Subscriptions]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of all subscriptions
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Subscription'
 *       401:
 *         description: Unauthorized
 */
router.get('/', auth, checkAccessLevel(1), subscriptionController.getAll);

/**
 * @swagger
 * /api/subscriptions/{id}:
 *   get:
 *     summary: Get a subscription by ID
 *     tags: [Subscriptions]
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
 *         description: The subscription
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Subscription'
 *       404:
 *         description: Subscription not found
 *       401:
 *         description: Unauthorized
 */
router.get('/:id', auth, checkAccessLevel(1), subscriptionController.getById);

/**
 * @swagger
 * /api/subscriptions/{id}:
 *   put:
 *     summary: Update a subscription
 *     tags: [Subscriptions]
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
 *             $ref: '#/components/schemas/Subscription'
 *     responses:
 *       200:
 *         description: The updated subscription
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Subscription'
 *       400:
 *         description: Invalid input
 *       404:
 *         description: Subscription not found
 *       401:
 *         description: Unauthorized
 */
router.put('/:id', auth, checkAccessLevel(2), subscriptionController.update);

/**
 * @swagger
 * /api/subscriptions/{id}:
 *   delete:
 *     summary: Delete a subscription
 *     tags: [Subscriptions]
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
 *         description: Subscription deleted successfully
 *       404:
 *         description: Subscription not found
 *       401:
 *         description: Unauthorized
 */
router.delete('/:id', auth, checkAccessLevel(3), subscriptionController.deleteSubscription);

/**
 * @swagger
 * /api/subscriptions/user/{userId}:
 *   get:
 *     summary: Get subscriptions by user ID
 *     tags: [Subscriptions]
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
 *         description: List of subscriptions for the user
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Subscription'
 *       401:
 *         description: Unauthorized
 */
router.get('/user/:userId', auth, checkAccessLevel(1), subscriptionController.getByUserId);

/**
 * @swagger
 * /api/subscriptions/plan/{planType}:
 *   get:
 *     summary: Get subscriptions by plan type
 *     tags: [Subscriptions]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: planType
 *         required: true
 *         schema:
 *           type: string
 *           enum: [monthly, payPerUse, trial, punchCard]
 *     responses:
 *       200:
 *         description: List of subscriptions for the plan type
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Subscription'
 *       401:
 *         description: Unauthorized
 */
router.get('/plan/:planType', auth, checkAccessLevel(1), subscriptionController.getByPlanType);

/**
 * @swagger
 * /api/subscriptions/active:
 *   get:
 *     summary: Get all active subscriptions
 *     tags: [Subscriptions]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of active subscriptions
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Subscription'
 *       401:
 *         description: Unauthorized
 */
router.get('/active', auth, checkAccessLevel(1), subscriptionController.getActiveSubscriptions);

/**
 * @swagger
 * /api/subscriptions/{id}/status:
 *   patch:
 *     summary: Update the status of a subscription
 *     tags: [Subscriptions]
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
 *                 enum: [active, inactive, cancelled]
 *     responses:
 *       200:
 *         description: The updated subscription
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Subscription'
 *       400:
 *         description: Invalid input
 *       404:
 *         description: Subscription not found
 *       401:
 *         description: Unauthorized
 */
router.patch('/:id/status', auth, checkAccessLevel(2), subscriptionController.updateStatus);

export default router;