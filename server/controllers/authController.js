import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import db from '../models/index.js';
const { User } = db;

export const register = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      username,
      email,
      password: hashedPassword
    });
    res.status(201).json({ message: 'User registered successfully', userId: user.id });
  } catch (error) {
    next(error);
  }
};
export const login = async (req, res, next) => {
  try {
      const { email, password } = req.body;
      console.log('Login attempt for email:', email);

      const user = await User.findOne({ where: { email } });
      console.log('User found:', user ? 'Yes' : 'No');

      if (!user) {
          return res.status(401).json({ message: 'Authentication failed' });
      }

      const isPasswordValid = await bcrypt.compare(password, user.password);
      console.log('Password:', password);
      console.log('user.pwd:', user.password);
      console.log('Password valid:', isPasswordValid);

      if (!isPasswordValid) {
          return res.status(401).json({ message: 'Authentication failed' });
      }
    const token = jwt.sign(
      { userId: user.id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );
    res.status(200).json({ token, userId: user.id });
  } catch (error) {
      console.error('Login error:', error);
      res.status(500).json({ message: 'An error occurred during login', error: error.message });
  }
};