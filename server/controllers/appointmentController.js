import prisma from '../prisma.js';

export const createAppointment = async (req, res, next) => {
  try {
    const appointment = await prisma.appointment.create({
      data: req.body,
    });
    res.status(201).json(appointment);
  } catch (error) {
    next(error);
  }
};

export const getLatestAppointment = async (req, res, next) => {
  try {
    const appointment = await prisma.appointment.findFirst({
      orderBy: { dateTime: 'desc' },
    });
    res.json(appointment);
  } catch (error) {
    next(error);
  }
};

export const getAll = async (req, res, next) => {
  try {
    const appointments = await prisma.appointment.findMany();
    res.status(200).json(appointments);
  } catch (error) {
    next(error);
  }
};

export const getById = async (req, res, next) => {
  try {
    const appointment = await prisma.appointment.findUnique({
      where: { id: parseInt(req.params.id) },
    });
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
    const updatedAppointment = await prisma.appointment.update({
      where: { id: parseInt(req.params.id) },
      data: req.body,
    });
    res.status(200).json(updatedAppointment);
  } catch (error) {
    if (error.code === 'P2025') {
      res.status(404).json({ message: 'Appointment not found' });
    } else {
      next(error);
    }
  }
};

export const deleteAppointment = async (req, res, next) => {
  try {
    await prisma.appointment.delete({
      where: { id: parseInt(req.params.id) },
    });
    res.status(204).json({ message: 'Appointment deleted' });
  } catch (error) {
    if (error.code === 'P2025') {
      res.status(404).json({ message: 'Appointment not found' });
    } else {
      next(error);
    }
  }
};

export const getByUserId = async (req, res, next) => {
  try {
    const appointments = await prisma.appointment.findMany({
      where: { userId: parseInt(req.params.userId) },
    });
    res.status(200).json(appointments);
  } catch (error) {
    next(error);
  }
};

export const getByStatus = async (req, res, next) => {
  try {
    const appointments = await prisma.appointment.findMany({
      where: { status: req.params.status },
    });
    res.status(200).json(appointments);
  } catch (error) {
    next(error);
  }
};

export const updateStatus = async (req, res, next) => {
  try {
    const updatedAppointment = await prisma.appointment.update({
      where: { id: parseInt(req.params.id) },
      data: { status: req.body.status },
    });
    res.status(200).json(updatedAppointment);
  } catch (error) {
    if (error.code === 'P2025') {
      res.status(404).json({ message: 'Appointment not found' });
    } else {
      next(error);
    }
  }
};

export const getByDateRange = async (req, res, next) => {
  try {
    const { startDate, endDate } = req.query;
    const appointments = await prisma.appointment.findMany({
      where: {
        dateTime: {
          gte: new Date(startDate),
          lte: new Date(endDate),
        },
      },
    });
    res.status(200).json(appointments);
  } catch (error) {
    next(error);
  }
};