const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.post('/', userController.createUser);
router.get('/', userController.getAllUsers);
router.get('/:id', userController.getUserById);
router.put('/:id', userController.updateUser);
router.delete('/:id', userController.deleteUser);
router.get('/username/:username', userController.getUserByUsername);
router.get('/email/:email', userController.getUserByEmail);
router.patch('/:id/access-level', userController.updateAccessLevel);

module.exports = router;