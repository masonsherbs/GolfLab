import express from 'express';
import * as accessCodeController from '../controllers/accessCodeController.js';
import auth from '../middleware/auth.js';
import checkAccessLevel from '../middleware/checkAccessLevel.js';
const router = express.Router();

// Public routes
router.post('/verify', accessCodeController.verifyAccessCode);

// Protected routes
router.post('/', auth, checkAccessLevel(2), accessCodeController.createAccessCode);
router.get('/', auth, checkAccessLevel(2), accessCodeController.getAllAccessCodes);
router.get('/:id', auth, checkAccessLevel(1), accessCodeController.getAccessCodeById);
router.put('/:id', auth, checkAccessLevel(2), accessCodeController.updateAccessCode);
router.delete('/:id', auth, checkAccessLevel(3), accessCodeController.deleteAccessCode);
router.get('/user/:userId', auth, checkAccessLevel(1), accessCodeController.getAccessCodesByUserId);
router.get('/appointment/:appointmentId', auth, checkAccessLevel(2), accessCodeController.getAccessCodesByAppointmentId);
router.post('/generate', auth, checkAccessLevel(2), accessCodeController.generateAccessCode);

export default router;