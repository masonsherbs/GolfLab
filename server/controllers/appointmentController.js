import { Appointment, Op } from '../models/index.js';

export const createAppointment = async (req, res, next) => {
  try {
    const appointment = await Appointment.create(req.body);
    res.status(201).json(appointment);
  } catch (error) {
    next(error);
  }
};

export const getLatestAppointment = async (req, res, next) => {
  try {
    const appointment = await Appointment.findOne({
      order: [['dateTime', 'DESC']]
    });
    res.json(appointment);
  } catch (error) {
    next(error);
  }
};

export const getAll = async (req, res, next) => {
  try {
    const appointments = await Appointment.findAll();
    res.status(200).json(appointments);
  } catch (error) {
    next(error);
  }
};

export const getById = async (req, res, next) => {
  try {
    const appointment = await Appointment.findByPk(req.params.id);
    if (appointment) {
      res.status(200).json(appointment);
    } else {
      res.status(404).json({ message: 'Appointment not found' });
    }
  } catch (error) {
    next(error);
  }
};

export const update = async (req, res, next) => {
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
    next(error);
  }
};

export const deleteAppointment = async (req, res, next) => {
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
    next(error);
  }
};

export const getByUserId = async (req, res, next) => {
  try {
    const appointments = await Appointment.findAll({
      where: { userId: req.params.userId }
    });
    res.status(200).json(appointments);
  } catch (error) {
    next(error);
  }
};

export const getByStatus = async (req, res, next) => {
  try {
    const appointments = await Appointment.findAll({
      where: { status: req.params.status }
    });
    res.status(200).json(appointments);
  } catch (error) {
    next(error);
  }
};

export const updateStatus = async (req, res, next) => {
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
    next(error);
  }
};

export const getByDateRange = async (req, res, next) => {
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
    next(error);
  }
};