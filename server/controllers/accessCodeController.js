import { AccessCode } from '../models/index.js';

export const createAccessCode = async (req, res, next) => {
  try {
    const accessCode = await AccessCode.create(req.body);
    res.status(201).json(accessCode);
  } catch (error) {
    next(error);
  }
};

export const getAllAccessCodes = async (req, res, next) => {
  try {
    const accessCodes = await AccessCode.findAll();
    res.status(200).json(accessCodes);
  } catch (error) {
    next(error);
  }
};

export const getAccessCodeById = async (req, res, next) => {
  try {
    const accessCode = await AccessCode.findByPk(req.params.id);
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
    const [updated] = await AccessCode.update(req.body, {
      where: { id: req.params.id }
    });
    if (updated) {
      const updatedAccessCode = await AccessCode.findByPk(req.params.id);
      res.status(200).json(updatedAccessCode);
    } else {
      res.status(404).json({ message: 'Access code not found' });
    }
  } catch (error) {
    next(error);
  }
};

export const deleteAccessCode = async (req, res, next) => {
  try {
    const deleted = await AccessCode.destroy({
      where: { id: req.params.id }
    });
    if (deleted) {
      res.status(204).json({ message: 'Access code deleted' });
    } else {
      res.status(404).json({ message: 'Access code not found' });
    }
  } catch (error) {
    next(error);
  }
};

export const getAccessCodesByUserId = async (req, res, next) => {
  try {
    const accessCodes = await AccessCode.findAll({
      where: { userId: req.params.userId }
    });
    res.status(200).json(accessCodes);
  } catch (error) {
    next(error);
  }
};

export const getAccessCodesByAppointmentId = async (req, res, next) => {
  try {
    const accessCodes = await AccessCode.findAll({
      where: { appointmentId: req.params.appointmentId }
    });
    res.status(200).json(accessCodes);
  } catch (error) {
    next(error);
  }
};

export const verifyAccessCode = async (req, res, next) => {
  try {
    const { code } = req.body;
    const accessCode = await AccessCode.findOne({
      where: { code, isUsed: false }
    });
    if (accessCode) {
      if (new Date() > accessCode.expiresAt) {
        res.status(400).json({ message: 'Access code has expired' });
      } else {
        await accessCode.update({ isUsed: true });
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

    const accessCode = await AccessCode.create({
      userId,
      appointmentId,
      code,
      expiresAt
    });

    res.status(201).json(accessCode);
  } catch (error) {
    next(error);
  }
};