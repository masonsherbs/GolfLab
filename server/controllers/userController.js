import prisma from '../prisma.js';

export const createUser = async (req, res, next) => {
  try {
    const user = await prisma.user.create({
      data: req.body,
    });
    res.status(201).json(user);
  } catch (error) {
    next(error);
  }
};

export const getAllUsers = async (req, res, next) => {
  try {
    const users = await prisma.user.findMany();
    res.status(200).json(users);
  } catch (error) {
    next(error);
  }
};

export const getUserById = async (req, res, next) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: parseInt(req.params.id) },
    });
    if (user) {
      res.status(200).json(user);
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    next(error);
  }
};

export const updateUser = async (req, res, next) => {
  try {
    const updatedUser = await prisma.user.update({
      where: { id: parseInt(req.params.id) },
      data: req.body,
    });
    res.status(200).json(updatedUser);
  } catch (error) {
    if (error.code === 'P2025') {
      res.status(404).json({ message: 'User not found' });
    } else {
      next(error);
    }
  }
};

export const deleteUser = async (req, res, next) => {
  try {
    await prisma.user.delete({
      where: { id: parseInt(req.params.id) },
    });
    res.status(204).json({ message: 'User deleted' });
  } catch (error) {
    if (error.code === 'P2025') {
      res.status(404).json({ message: 'User not found' });
    } else {
      next(error);
    }
  }
};

export const getUserByUsername = async (req, res, next) => {
  try {
    const user = await prisma.user.findUnique({
      where: { username: req.params.username },
    });
    if (user) {
      res.status(200).json(user);
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    next(error);
  }
};

export const getUserByEmail = async (req, res, next) => {
  try {
    const user = await prisma.user.findUnique({
      where: { email: req.params.email },
    });
    if (user) {
      res.status(200).json(user);
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    next(error);
  }
};

export const updateAccessLevel = async (req, res, next) => {
  try {
    const updatedUser = await prisma.user.update({
      where: { id: parseInt(req.params.id) },
      data: { accessLevel: req.body.accessLevel },
    });
    res.status(200).json(updatedUser);
  } catch (error) {
    if (error.code === 'P2025') {
      res.status(404).json({ message: 'User not found' });
    } else {
      next(error);
    }
  }
};