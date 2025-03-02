const { Appointment } = require('../models');

exports.createAppointment = async (req, res) => {
  try {
    const appointment = await Appointment.create(req.body);
    res.status(201).json(appointment);
  } catch (error) {
    res.status(500).json({ error: 'Error creating appointment' });
  }
};

exports.getLatestAppointment = async (req, res) => {
  try {
    const appointment = await Appointment.findOne({
      order: [['dateTime', 'DESC']]
    });
    res.json(appointment);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching latest appointment' });
  }
};

// Get all appointments
exports.getAll = async (req, res) => {
  try {
    const appointments = await Appointment.findAll();
    res.status(200).json(appointments);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get a single appointment by id
exports.getById = async (req, res) => {
  try {
    const appointment = await Appointment.findByPk(req.params.id);
    if (appointment) {
      res.status(200).json(appointment);
    } else {
      res.status(404).json({ message: 'Appointment not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update an appointment
exports.update = async (req, res) => {
  try {
    const [updated] = await Appointment.update(req.body, {
      where: { id: req.params.id }
    });
    if (updated) {
      const updatedAppointment = await Appointment.findByPk(req.params.id);
      res.status(200).json(updatedAppointment);
    } else {
      res.status(404).json({ message: 'Appointment not found' });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete an appointment
exports.delete = async (req, res) => {
  try {
    const deleted = await Appointment.destroy({
      where: { id: req.params.id }
    });
    if (deleted) {
      res.status(204).json({ message: 'Appointment deleted' });
    } else {
      res.status(404).json({ message: 'Appointment not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get appointments by user id
exports.getByUserId = async (req, res) => {
  try {
    const appointments = await Appointment.findAll({
      where: { userId: req.params.userId }
    });
    res.status(200).json(appointments);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get appointments by status
exports.getByStatus = async (req, res) => {
  try {
    const appointments = await Appointment.findAll({
      where: { status: req.params.status }
    });
    res.status(200).json(appointments);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update appointment status
exports.updateStatus = async (req, res) => {
  try {
    const [updated] = await Appointment.update(
      { status: req.body.status },
      { where: { id: req.params.id } }
    );
    if (updated) {
      const updatedAppointment = await Appointment.findByPk(req.params.id);
      res.status(200).json(updatedAppointment);
    } else {
      res.status(404).json({ message: 'Appointment not found' });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get appointments for a specific date range
exports.getByDateRange = async (req, res) => {
  try {
    const { startDate, endDate } = req.query;
    const appointments = await Appointment.findAll({
      where: {
        dateTime: {
          [Op.between]: [new Date(startDate), new Date(endDate)]
        }
      }
    });
    res.status(200).json(appointments);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};