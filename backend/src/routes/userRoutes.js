import express from 'express';
import { userLogin, userRegister } from '../controllers/userController.js';
import { validateLogin, validateRegister } from "../middlewares/validator.js";

const router = express.Router();

// validation middleware can be added here if needed
router.post('/login', ...validateLogin, userLogin);
router.post('/register', ...validateRegister, userRegister);

export default router;
