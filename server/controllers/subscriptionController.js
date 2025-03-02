const { Subscription } = require('../models');

exports.createSubscription = async (req, res, next) => {
  try {
    const subscription = await Subscription.create(req.body);
    res.status(201).json(subscription);
  } catch (error) {
    next(error);
  }
};

exports.getLatestSubscription = async (req, res, next) => {
  try {
    const subscription = await Subscription.findOne({
      order: [['createdAt', 'DESC']]
    });
    res.json(subscription);
  } catch (error) {
    next(error);
  }
};

exports.getAll = async (req, res, next) => {
  try {
    const subscriptions = await Subscription.findAll();
    res.status(200).json(subscriptions);
  } catch (error) {
    next(error);
  }
};

exports.getById = async (req, res, next) => {
  try {
    const subscription = await Subscription.findByPk(req.params.id);
    if (subscription) {
      res.status(200).json(subscription);
    } else {
      res.status(404).json({ message: 'Subscription not found' });
    }
  } catch (error) {
    next(error);
  }
};

exports.update = async (req, res, next) => {
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
    next(error);
  }
};

exports.delete = async (req, res, next) => {
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
    next(error);
  }
};

exports.getByUserId = async (req, res, next) => {
  try {
    const subscriptions = await Subscription.findAll({
      where: { userId: req.params.userId }
    });
    res.status(200).json(subscriptions);
  } catch (error) {
    next(error);
  }
};

exports.getByPlanType = async (req, res, next) => {
  try {
    const subscriptions = await Subscription.findAll({
      where: { planType: req.params.planType }
    });
    res.status(200).json(subscriptions);
  } catch (error) {
    next(error);
  }
};

exports.getActiveSubscriptions = async (req, res, next) => {
  try {
    const subscriptions = await Subscription.findAll({
      where: { status: 'active' }
    });
    res.status(200).json(subscriptions);
  } catch (error) {
    next(error);
  }
};

exports.updateStatus = async (req, res, next) => {
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
    next(error);
  }
};