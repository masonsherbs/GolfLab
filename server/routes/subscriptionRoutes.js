const express = require('express');
const router = express.Router();
const subscriptionController = require('../controllers/subscriptionController');

router.post('/', subscriptionController.createSubscription);
router.get('/', subscriptionController.getAllSubscriptions);

// Add more routes as needed
module.exports = router;