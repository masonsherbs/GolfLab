const { Subscription } = require('../models');

exports.createSubscription = async (req, res) => {
  try {
    const subscription = await Subscription.create(req.body);
    res.status(201).json(subscription);
  } catch (error) {
    res.status(500).json({ error: 'Error creating subscription' });
  }
};

exports.getLatestSubscription = async (req, res) => {
  try {
    const subscription = await Subscription.findOne({
      order: [['createdAt', 'DESC']]
    });
    res.json(subscription);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching latest subscription' });
  }
};

  // Get all subscriptions
  exports.getAll = async (req, res) => {
    try {
      const subscriptions = await Subscription.findAll();
      res.status(200).json(subscriptions);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

  // Get a single subscription by id
    exports.getById = async (req, res) => {
    try {
      const subscription = await Subscription.findByPk(req.params.id);
      if (subscription) {
        res.status(200).json(subscription);
      } else {
        res.status(404).json({ message: 'Subscription not found' });
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

  // Update a subscription
    exports.update = async (req, res) => {
    try {
      const [updated] = await Subscription.update(req.body, {
        where: { id: req.params.id }
      });
      if (updated) {
        const updatedSubscription = await Subscription.findByPk(req.params.id);
        res.status(200).json(updatedSubscription);
      } else {
        res.status(404).json({ message: 'Subscription not found' });
      }
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };

  // Delete a subscription
    exports.delete = async (req, res) => {
    try {
      const deleted = await Subscription.destroy({
        where: { id: req.params.id }
      });
      if (deleted) {
        res.status(204).json({ message: 'Subscription deleted' });
      } else {
        res.status(404).json({ message: 'Subscription not found' });
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

  // Get subscriptions by user id
    exports.getByUserId = async (req, res) => {
    try {
      const subscriptions = await Subscription.findAll({
        where: { userId: req.params.userId }
      });
      res.status(200).json(subscriptions);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

  // Get subscriptions by plan type
    exports.getByPlanType = async (req, res) => {
    try {
      const subscriptions = await Subscription.findAll({
        where: { planType: req.params.planType }
      });
      res.status(200).json(subscriptions);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

  // Get active subscriptions
    exports.getActiveSubscriptions = async (req, res) => {
    try {
      const subscriptions = await Subscription.findAll({
        where: { status: 'active' }
      });
      res.status(200).json(subscriptions);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

  // Update subscription status
    exports.updateStatus = async (req, res) => {
    try {
      const [updated] = await Subscription.update(
        { status: req.body.status },
        { where: { id: req.params.id } }
      );
      if (updated) {
        const updatedSubscription = await Subscription.findByPk(req.params.id);
        res.status(200).json(updatedSubscription);
      } else {
        res.status(404).json({ message: 'Subscription not found' });
      }
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };

// module.exports = subscriptionController;