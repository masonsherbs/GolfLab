const { Subscription } = require('../models');

exports.createSubscription = async (req, res) => {
  try {
    const { planType, userId } = req.body;
    if (!planType || !userId) {
      return res.status(400).json({ error: 'Plan type and user ID are required' });
    }
    const subscription = await Subscription.create({ 
      planType,
      userId,
      startDate: new Date(),
      status: 'active'
    });
    res.status(201).json(subscription);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getAllSubscriptions = async (req, res) => {
  try {
    const subscriptions = await Subscription.findAll();
    res.json(subscriptions);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Add more controller methods as needed