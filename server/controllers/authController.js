import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import prisma from '../prisma.js'

// ... existing imports and code ...
export const register = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({
      data: {
        username,
        email,
        password: hashedPassword
      }
    });
    res.status(201).json({ message: 'User registered successfully', userId: user.id });
  } catch (error) {
    next(error);
  }
};

export const logout = async (req, res, next) => {
  try {
    // In a real-world scenario, you might want to invalidate the token on the server side
    // For now, we'll just send a success response
    res.status(200).json({ message: 'Logout successful' });
  } catch (error) {
    next(error);
  }
};

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    console.log('Login attempt for email:', email);

    const user = await prisma.user.findUnique({ where: { email } });
    console.log('User found:', user ? 'Yes' : 'No');

    if (!user) {
      return res.status(401).json({ message: 'Authentication failed: User not found' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    console.log('Password valid:', isPasswordValid);

    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Authentication failed: Invalid password' });
    }

    const token = jwt.sign(
      { 
        userId: user.id, 
        email: user.email, 
        accessLevel: user.accessLevel 
      },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    // Log the generated token for debugging
    console.log('Generated token:', token);

    res.status(200).json({ 
      message: 'Login successful',
      token, 
      userId: user.id,
      accessLevel: user.accessLevel
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'An error occurred during login', error: error.message });
  }
};