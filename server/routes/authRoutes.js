import express from 'express';
import * as authController from '../controllers/authController.js';
import checkAccessLevel from '../middleware/checkAccessLevel.js';
const router = express.Router();

router.post('/register', authController.register);
router.post('/login', authController.login);
router.post('/logout', checkAccessLevel(1), authController.logout);

export default router;