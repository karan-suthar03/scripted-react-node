import express from 'express';
import { userLogin, userRegister, userLogout } from '../controllers/userController.js';
import { validateLogin, validateRegister } from "../middlewares/validator.js";

const router = express.Router();

router.post('/login', ...validateLogin, userLogin);
router.post('/register', ...validateRegister, userRegister);
router.post('/logout', userLogout);

export default router;
