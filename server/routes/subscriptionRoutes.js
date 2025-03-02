const express = require('express');
const router = express.Router();
const subscriptionController = require('../controllers/subscriptionController');
const auth = require('../middleware/auth');

// Public route - might be needed for marketing or public pricing info
router.get('/latest', subscriptionController.getLatestSubscription);

// Protected routes
router.post('/', auth, subscriptionController.createSubscription);
router.get('/', auth, subscriptionController.getAll);
router.get('/:id', auth, subscriptionController.getById);
router.put('/:id', auth, subscriptionController.update);
router.delete('/:id', auth, subscriptionController.delete);
router.get('/user/:userId', auth, subscriptionController.getByUserId);
router.get('/plan/:planType', auth, subscriptionController.getByPlanType);
router.get('/active', auth, subscriptionController.getActiveSubscriptions);
router.patch('/:id/status', auth, subscriptionController.updateStatus);
module.exports = router;