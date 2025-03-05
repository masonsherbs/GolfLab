import express from 'express';
import * as userController from '../controllers/userController.js';
import auth from '../middleware/auth.js';
const router = express.Router();

// Public routes
router.post('/', userController.createUser); // For user registration

// Protected routes
router.get('/', auth, userController.getAllUsers);
router.get('/:id', auth, userController.getUserById);
router.put('/:id', auth, userController.updateUser);
router.delete('/:id', auth, userController.deleteUser);
router.get('/username/:username', auth, userController.getUserByUsername);
router.get('/email/:email', auth, userController.getUserByEmail);
router.patch('/:id/access-level', auth, userController.updateAccessLevel);

export default router;