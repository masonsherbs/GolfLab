import express from 'express';
import * as subscriptionController from '../controllers/subscriptionController.js';
import auth from '../middleware/auth.js';
import checkAccessLevel from '../middleware/checkAccessLevel.js';
const router = express.Router();

// Public route - might be needed for marketing or public pricing info
router.get('/latest', subscriptionController.getLatestSubscription);

// Protected routes
router.post('/', auth, checkAccessLevel(2), subscriptionController.createSubscription);
router.get('/', auth, checkAccessLevel(1), subscriptionController.getAll);
router.get('/:id', auth, checkAccessLevel(1), subscriptionController.getById);
router.put('/:id', auth, checkAccessLevel(2), subscriptionController.update);
router.delete('/:id', auth, checkAccessLevel(3), subscriptionController.deleteSubscription);
router.get('/user/:userId', auth, checkAccessLevel(1), subscriptionController.getByUserId);
router.get('/plan/:planType', auth, checkAccessLevel(1), subscriptionController.getByPlanType);
router.get('/active', auth, checkAccessLevel(1), subscriptionController.getActiveSubscriptions);
router.patch('/:id/status', auth, checkAccessLevel(2), subscriptionController.updateStatus);

export default router;