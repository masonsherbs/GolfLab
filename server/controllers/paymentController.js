const { Payment } = require('../models');

exports.createPayment = async (req, res) => {
  try {
    const payment = await Payment.create(req.body);
    res.status(201).json(payment);
  } catch (error) {
    res.status(500).json({ error: 'Error creating payment' });
  }
};

exports.getAllPayments = async (req, res) => {
  try {
    const payments = await Payment.findAll();
    res.status(200).json(payments);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getPaymentById = async (req, res) => {
  try {
    const payment = await Payment.findByPk(req.params.id);
    if (payment) {
      res.status(200).json(payment);
    } else {
      res.status(404).json({ message: 'Payment not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updatePayment = async (req, res) => {
  try {
    const [updated] = await Payment.update(req.body, {
      where: { id: req.params.id }
    });
    if (updated) {
      const updatedPayment = await Payment.findByPk(req.params.id);
      res.status(200).json(updatedPayment);
    } else {
      res.status(404).json({ message: 'Payment not found' });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.deletePayment = async (req, res) => {
  try {
    const deleted = await Payment.destroy({
      where: { id: req.params.id }
    });
    if (deleted) {
      res.status(204).json({ message: 'Payment deleted' });
    } else {
      res.status(404).json({ message: 'Payment not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getPaymentsByUserId = async (req, res) => {
  try {
    const payments = await Payment.findAll({
      where: { userId: req.params.userId }
    });
    res.status(200).json(payments);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getPaymentsBySubscriptionId = async (req, res) => {
  try {
    const payments = await Payment.findAll({
      where: { subscriptionId: req.params.subscriptionId }
    });
    res.status(200).json(payments);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getPaymentsByAppointmentId = async (req, res) => {
  try {
    const payments = await Payment.findAll({
      where: { appointmentId: req.params.appointmentId }
    });
    res.status(200).json(payments);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updatePaymentStatus = async (req, res) => {
  try {
    const [updated] = await Payment.update(
      { status: req.body.status },
      { where: { id: req.params.id } }
    );
    if (updated) {
      const updatedPayment = await Payment.findByPk(req.params.id);
      res.status(200).json(updatedPayment);
    } else {
      res.status(404).json({ message: 'Payment not found' });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};