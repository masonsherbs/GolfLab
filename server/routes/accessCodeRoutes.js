import express from 'express';
import * as accessCodeController from '../controllers/accessCodeController.js';
import auth from '../middleware/auth.js';
const router = express.Router();

// Public routes
router.post('/verify', accessCodeController.verifyAccessCode);

// Protected routes
router.post('/', auth, accessCodeController.createAccessCode);
router.get('/', auth, accessCodeController.getAllAccessCodes);
router.get('/:id', auth, accessCodeController.getAccessCodeById);
router.put('/:id', auth, accessCodeController.updateAccessCode);
router.delete('/:id', auth, accessCodeController.deleteAccessCode);
router.get('/user/:userId', auth, accessCodeController.getAccessCodesByUserId);
router.get('/appointment/:appointmentId', auth, accessCodeController.getAccessCodesByAppointmentId);
router.post('/generate', auth, accessCodeController.generateAccessCode);

export default router;