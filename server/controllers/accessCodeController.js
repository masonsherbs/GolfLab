import prisma from '../prisma.js';

export const createAccessCode = async (req, res, next) => {
  try {
    const accessCode = await prisma.accessCode.create({
      data: req.body,
    });
    res.status(201).json(accessCode);
  } catch (error) {
    next(error);
  }
};

export const getAllAccessCodes = async (req, res, next) => {
  try {
    const accessCodes = await prisma.accessCode.findMany();
    res.status(200).json(accessCodes);
  } catch (error) {
    next(error);
  }
};

export const getAccessCodeById = async (req, res, next) => {
  try {
    const accessCode = await prisma.accessCode.findUnique({
      where: { id: parseInt(req.params.id) },
    });
    if (accessCode) {
      res.status(200).json(accessCode);
    } else {
      res.status(404).json({ message: 'Access code not found' });
    }
  } catch (error) {
    next(error);
  }
};

export const updateAccessCode = async (req, res, next) => {
  try {
    const updatedAccessCode = await prisma.accessCode.update({
      where: { id: parseInt(req.params.id) },
      data: req.body,
    });
    res.status(200).json(updatedAccessCode);
  } catch (error) {
    if (error.code === 'P2025') {
      res.status(404).json({ message: 'Access code not found' });
    } else {
      next(error);
    }
  }
};

export const deleteAccessCode = async (req, res, next) => {
  try {
    await prisma.accessCode.delete({
      where: { id: parseInt(req.params.id) },
    });
    res.status(204).json({ message: 'Access code deleted' });
  } catch (error) {
    if (error.code === 'P2025') {
      res.status(404).json({ message: 'Access code not found' });
    } else {
      next(error);
    }
  }
};

export const getAccessCodesByUserId = async (req, res, next) => {
  try {
    const accessCodes = await prisma.accessCode.findMany({
      where: { userId: parseInt(req.params.userId) },
    });
    res.status(200).json(accessCodes);
  } catch (error) {
    next(error);
  }
};

export const getAccessCodesByAppointmentId = async (req, res, next) => {
  try {
    const accessCodes = await prisma.accessCode.findMany({
      where: { appointmentId: parseInt(req.params.appointmentId) },
    });
    res.status(200).json(accessCodes);
  } catch (error) {
    next(error);
  }
};

export const verifyAccessCode = async (req, res, next) => {
  try {
    const { code } = req.body;
    const accessCode = await prisma.accessCode.findFirst({
      where: { code, isUsed: false },
    });
    if (accessCode) {
      if (new Date() > accessCode.expiresAt) {
        res.status(400).json({ message: 'Access code has expired' });
      } else {
        await prisma.accessCode.update({
          where: { id: accessCode.id },
          data: { isUsed: true },
        });
        res.status(200).json({ message: 'Access code verified successfully' });
      }
    } else {
      res.status(404).json({ message: 'Invalid or used access code' });
    }
  } catch (error) {
    next(error);
  }
};

export const generateAccessCode = async (req, res, next) => {
  try {
    const { userId, appointmentId } = req.body;
    const code = Math.random().toString(36).substring(2, 12).toUpperCase();
    const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000); // Expires in 24 hours

    const accessCode = await prisma.accessCode.create({
      data: {
        userId: parseInt(userId),
        appointmentId: parseInt(appointmentId),
        code,
        expiresAt,
      },
    });

    res.status(201).json(accessCode);
  } catch (error) {
    next(error);
  }
};