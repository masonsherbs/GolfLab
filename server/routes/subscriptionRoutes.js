const express = require('express');
const router = express.Router();
const subscriptionController = require('../controllers/subscriptionController');

router.post('/', subscriptionController.createSubscription);
router.get('/latest', subscriptionController.getLatestSubscription);
router.get('/', subscriptionController.getAll);
router.get('/:id', subscriptionController.getById);
router.put('/:id', subscriptionController.update);
router.delete('/:id', subscriptionController.delete);
router.get('/user/:userId', subscriptionController.getByUserId);
router.get('/plan/:planType', subscriptionController.getByPlanType);
router.get('/active', subscriptionController.getActiveSubscriptions);
router.patch('/:id/status', subscriptionController.updateStatus);

module.exports = router;