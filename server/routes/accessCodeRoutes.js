const express = require('express');
const router = express.Router();
const accessCodeController = require('../controllers/accessCodeController');
const auth = require('../middleware/auth');

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
module.exports = router;