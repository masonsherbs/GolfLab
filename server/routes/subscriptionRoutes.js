const express = require('express');
const router = express.Router();
const subscriptionController = require('../controllers/subscriptionController');

router.post('/', subscriptionController.createSubscription);
router.get('/latest', subscriptionController.getLatestSubscription);

module.exports = router;