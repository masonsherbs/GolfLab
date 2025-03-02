const express = require('express');
const router = express.Router();
const accessCodeController = require('../controllers/accessCodeController');

router.post('/', accessCodeController.createAccessCode);
router.get('/', accessCodeController.getAllAccessCodes);
router.get('/:id', accessCodeController.getAccessCodeById);
router.put('/:id', accessCodeController.updateAccessCode);
router.delete('/:id', accessCodeController.deleteAccessCode);
router.get('/user/:userId', accessCodeController.getAccessCodesByUserId);
router.get('/appointment/:appointmentId', accessCodeController.getAccessCodesByAppointmentId);
router.post('/verify', accessCodeController.verifyAccessCode);
router.post('/generate', accessCodeController.generateAccessCode);

module.exports = router;