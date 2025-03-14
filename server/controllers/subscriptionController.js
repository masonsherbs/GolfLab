import prisma from '../prisma.js'

export const createSubscription = async (req, res, next) => {
  try {
    const subscription = await prisma.subscription.create({
      data: req.body,
    });
    res.status(201).json(subscription);
  } catch (error) {
    next(error);
  }
};

export const getLatestSubscription = async (req, res, next) => {
  try {
    const subscription = await prisma.subscription.findFirst({
      orderBy: {
        createdAt: 'desc',
      },
    });
    res.json(subscription);
  } catch (error) {
    next(error);
  }
};

export const getAll = async (req, res, next) => {
  try {
    const subscriptions = await prisma.subscription.findMany();
    res.status(200).json(subscriptions);
  } catch (error) {
    next(error);
  }
};

export const getById = async (req, res, next) => {
  try {
    const subscription = await prisma.subscription.findUnique({
      where: { id: parseInt(req.params.id) },
    });
    if (subscription) {
      res.status(200).json(subscription);
    } else {
      res.status(404).json({ message: 'Subscription not found' });
    }
  } catch (error) {
    next(error);
  }
};

export const update = async (req, res, next) => {
  try {
    const updatedSubscription = await prisma.subscription.update({
      where: { id: parseInt(req.params.id) },
      data: req.body,
    });
    res.status(200).json(updatedSubscription);
  } catch (error) {
    if (error.code === 'P2025') {
      res.status(404).json({ message: 'Subscription not found' });
    } else {
      next(error);
    }
  }
};

export const deleteSubscription = async (req, res, next) => {
  try {
    await prisma.subscription.delete({
      where: { id: parseInt(req.params.id) },
    });
    res.status(204).json({ message: 'Subscription deleted' });
  } catch (error) {
    if (error.code === 'P2025') {
      res.status(404).json({ message: 'Subscription not found' });
    } else {
      next(error);
    }
  }
};

export const getByUserId = async (req, res, next) => {
  try {
    const subscriptions = await prisma.subscription.findMany({
      where: { userId: parseInt(req.params.userId) },
    });
    res.status(200).json(subscriptions);
  } catch (error) {
    next(error);
  }
};

export const getByPlanType = async (req, res, next) => {
  try {
    const subscriptions = await prisma.subscription.findMany({
      where: { planType: req.params.planType },
    });
    res.status(200).json(subscriptions);
  } catch (error) {
    next(error);
  }
};

export const getActiveSubscriptions = async (req, res, next) => {
  try {
    const subscriptions = await prisma.subscription.findMany({
      where: { status: 'active' },
    });
    res.status(200).json(subscriptions);
  } catch (error) {
    next(error);
  }
};

export const updateStatus = async (req, res, next) => {
  try {
    const updatedSubscription = await prisma.subscription.update({
      where: { id: parseInt(req.params.id) },
      data: { status: req.body.status },
    });
    res.status(200).json(updatedSubscription);
  } catch (error) {
    if (error.code === 'P2025') {
      res.status(404).json({ message: 'Subscription not found' });
    } else {
      next(error);
    }
  }
};