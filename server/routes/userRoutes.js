import express from 'express';
import * as userController from '../controllers/userController.js';
import auth from '../middleware/auth.js';
import checkAccessLevel from '../middleware/checkAccessLevel.js';
const router = express.Router();

// Public routes
router.post('/', userController.createUser); // For user registration

// Protected routes
router.get('/', auth, checkAccessLevel(2), userController.getAllUsers);
router.get('/:id', auth, checkAccessLevel(1), userController.getUserById);
router.put('/:id', auth, checkAccessLevel(2), userController.updateUser);
router.delete('/:id', auth, checkAccessLevel(3), userController.deleteUser);
router.get('/username/:username', auth, checkAccessLevel(2), userController.getUserByUsername);
router.get('/email/:email', auth, checkAccessLevel(2), userController.getUserByEmail);
router.patch('/:id/access-level', auth, checkAccessLevel(3), userController.updateAccessLevel);

export default router;