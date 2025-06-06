import express from 'express';
import * as appointmentController from '../controllers/appointmentController.js';
import auth from '../middleware/auth.js';
import checkAccessLevel from '../middleware/checkAccessLevel.js';
const router = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Appointment:
 *       type: object
 *       required:
 *         - userId
 *         - dateTime
 *         - status
 *       properties:
 *         id:
 *           type: integer
 *           description: The auto-generated id of the appointment
 *         userId:
 *           type: integer
 *           description: The user ID associated with the appointment
 *         dateTime:
 *           type: string
 *           format: date-time
 *           description: The date and time of the appointment
 *         status:
 *           type: string
 *           enum: [scheduled, completed, cancelled]
 *           description: The status of the appointment
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: The creation date and time of the appointment
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: The last update date and time of the appointment
 */

/**
 * @swagger
 * /api/appointments/latest:
 *   get:
 *     summary: Get the latest appointment
 *     tags: [Appointments]
 *     responses:
 *       200:
 *         description: The latest appointment
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Appointment'
 *       404:
 *         description: No appointments found
 */
router.get('/latest', appointmentController.getLatestAppointment);

/**
 * @swagger
 * /api/appointments:
 *   post:
 *     summary: Create a new appointment
 *     tags: [Appointments]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Appointment'
 *     responses:
 *       201:
 *         description: Created appointment
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Appointment'
 *       400:
 *         description: Invalid input
 *       401:
 *         description: Unauthorized
 */
router.post('/', auth, checkAccessLevel(2), appointmentController.createAppointment);

/**
 * @swagger
 * /api/appointments:
 *   get:
 *     summary: Retrieve all appointments
 *     tags: [Appointments]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of all appointments
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Appointment'
 *       401:
 *         description: Unauthorized
 */
router.get('/', auth, checkAccessLevel(2), appointmentController.getAll);

/**
 * @swagger
 * /api/appointments/{id}:
 *   get:
 *     summary: Get an appointment by ID
 *     tags: [Appointments]
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
 *         description: The appointment
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Appointment'
 *       404:
 *         description: Appointment not found
 *       401:
 *         description: Unauthorized
 */
router.get('/:id', auth, checkAccessLevel(1), appointmentController.getById);

/**
 * @swagger
 * /api/appointments/{id}:
 *   put:
 *     summary: Update an appointment
 *     tags: [Appointments]
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
 *             $ref: '#/components/schemas/Appointment'
 *     responses:
 *       200:
 *         description: The updated appointment
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Appointment'
 *       400:
 *         description: Invalid input
 *       404:
 *         description: Appointment not found
 *       401:
 *         description: Unauthorized
 */
router.put('/:id', auth, checkAccessLevel(2), appointmentController.update);

/**
 * @swagger
 * /api/appointments/{id}:
 *   delete:
 *     summary: Delete an appointment
 *     tags: [Appointments]
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
 *         description: Appointment deleted successfully
 *       404:
 *         description: Appointment not found
 *       401:
 *         description: Unauthorized
 */
router.delete('/:id', auth, checkAccessLevel(3), appointmentController.deleteAppointment);

/**
 * @swagger
 * /api/appointments/user/{userId}:
 *   get:
 *     summary: Get appointments by user ID
 *     tags: [Appointments]
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
 *         description: List of appointments for the user
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Appointment'
 *       401:
 *         description: Unauthorized
 */
router.get('/user/:userId', auth, checkAccessLevel(1), appointmentController.getByUserId);

/**
 * @swagger
 * /api/appointments/status/{status}:
 *   get:
 *     summary: Get appointments by status
 *     tags: [Appointments]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: status
 *         required: true
 *         schema:
 *           type: string
 *           enum: [scheduled, completed, cancelled]
 *     responses:
 *       200:
 *         description: List of appointments with the specified status
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Appointment'
 *       400:
 *         description: Invalid status
 *       401:
 *         description: Unauthorized
 */
router.get('/status/:status', auth, checkAccessLevel(2), appointmentController.getByStatus);

/**
 * @swagger
 * /api/appointments/{id}/status:
 *   patch:
 *     summary: Update the status of an appointment
 *     tags: [Appointments]
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
 *                 enum: [scheduled, completed, cancelled]
 *     responses:
 *       200:
 *         description: The updated appointment
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Appointment'
 *       400:
 *         description: Invalid input
 *       404:
 *         description: Appointment not found
 *       401:
 *         description: Unauthorized
 */
router.patch('/:id/status', auth, checkAccessLevel(2), appointmentController.updateStatus);

/**
 * @swagger
 * /api/appointments/date-range:
 *   get:
 *     summary: Get appointments within a date range
 *     tags: [Appointments]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: startDate
 *         required: true
 *         schema:
 *           type: string
 *           format: date
 *       - in: query
 *         name: endDate
 *         required: true
 *         schema:
 *           type: string
 *           format: date
 *     responses:
 *       200:
 *         description: List of appointments within the specified date range
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Appointment'
 *       400:
 *         description: Invalid date range
 *       401:
 *         description: Unauthorized
 */
router.get('/date-range', auth, checkAccessLevel(2), appointmentController.getByDateRange);

export default router;