const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const auth = require('../middleware/auth');

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
module.exports = router;