import express from 'express';
import * as accessCodeController from '../controllers/accessCodeController.js';
import auth from '../middleware/auth.js';
import checkAccessLevel from '../middleware/checkAccessLevel.js';
const router = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     AccessCode:
 *       type: object
 *       required:
 *         - userId
 *         - appointmentId
 *         - code
 *         - expiresAt
 *       properties:
 *         id:
 *           type: integer
 *           description: The auto-generated id of the access code
 *         userId:
 *           type: integer
 *           description: The user ID associated with the access code
 *         appointmentId:
 *           type: integer
 *           description: The appointment ID associated with the access code
 *         code:
 *           type: string
 *           description: The access code string
 *         isUsed:
 *           type: boolean
 *           description: Whether the access code has been used
 *         expiresAt:
 *           type: string
 *           format: date-time
 *           description: The expiration date and time of the access code
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: The creation date and time of the access code
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: The last update date and time of the access code
 */

/**
 * @swagger
 * /api/access-codes/verify:
 *   post:
 *     summary: Verify an access code
 *     tags: [Access Codes]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - code
 *             properties:
 *               code:
 *                 type: string
 *     responses:
 *       200:
 *         description: Access code verified successfully
 *       400:
 *         description: Invalid request or expired access code
 *       404:
 *         description: Invalid or used access code
 */
router.post('/verify', accessCodeController.verifyAccessCode);

/**
 * @swagger
 * /api/access-codes:
 *   post:
 *     summary: Create a new access code
 *     tags: [Access Codes]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/AccessCode'
 *     responses:
 *       201:
 *         description: Created access code
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/AccessCode'
 *       400:
 *         description: Invalid input
 *       401:
 *         description: Unauthorized
 */
router.post('/', auth, checkAccessLevel(2), accessCodeController.createAccessCode);

/**
 * @swagger
 * /api/access-codes:
 *   get:
 *     summary: Retrieve all access codes
 *     tags: [Access Codes]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of all access codes
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/AccessCode'
 *       401:
 *         description: Unauthorized
 */
router.get('/', auth, checkAccessLevel(2), accessCodeController.getAllAccessCodes);

/**
 * @swagger
 * /api/access-codes/{id}:
 *   get:
 *     summary: Get an access code by ID
 *     tags: [Access Codes]
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
 *         description: The access code
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/AccessCode'
 *       404:
 *         description: Access code not found
 *       401:
 *         description: Unauthorized
 */
router.get('/:id', auth, checkAccessLevel(1), accessCodeController.getAccessCodeById);

/**
 * @swagger
 * /api/access-codes/{id}:
 *   put:
 *     summary: Update an access code
 *     tags: [Access Codes]
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
 *             $ref: '#/components/schemas/AccessCode'
 *     responses:
 *       200:
 *         description: The updated access code
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/AccessCode'
 *       400:
 *         description: Invalid input
 *       404:
 *         description: Access code not found
 *       401:
 *         description: Unauthorized
 */
router.put('/:id', auth, checkAccessLevel(2), accessCodeController.updateAccessCode);

/**
 * @swagger
 * /api/access-codes/{id}:
 *   delete:
 *     summary: Delete an access code
 *     tags: [Access Codes]
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
 *         description: Access code deleted successfully
 *       404:
 *         description: Access code not found
 *       401:
 *         description: Unauthorized
 */
router.delete('/:id', auth, checkAccessLevel(3), accessCodeController.deleteAccessCode);

/**
 * @swagger
 * /api/access-codes/user/{userId}:
 *   get:
 *     summary: Get access codes by user ID
 *     tags: [Access Codes]
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
 *         description: List of access codes for the user
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/AccessCode'
 *       401:
 *         description: Unauthorized
 */
router.get('/user/:userId', auth, checkAccessLevel(1), accessCodeController.getAccessCodesByUserId);

/**
 * @swagger
 * /api/access-codes/appointment/{appointmentId}:
 *   get:
 *     summary: Get access codes by appointment ID
 *     tags: [Access Codes]
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
 *         description: List of access codes for the appointment
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/AccessCode'
 *       401:
 *         description: Unauthorized
 */
router.get('/appointment/:appointmentId', auth, checkAccessLevel(2), accessCodeController.getAccessCodesByAppointmentId);

/**
 * @swagger
 * /api/access-codes/generate:
 *   post:
 *     summary: Generate a new access code
 *     tags: [Access Codes]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - userId
 *               - appointmentId
 *             properties:
 *               userId:
 *                 type: integer
 *               appointmentId:
 *                 type: integer
 *     responses:
 *       201:
 *         description: Generated access code
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/AccessCode'
 *       400:
 *         description: Invalid input
 *       401:
 *         description: Unauthorized
 */
router.post('/generate', auth, checkAccessLevel(2), accessCodeController.generateAccessCode);

export default router;