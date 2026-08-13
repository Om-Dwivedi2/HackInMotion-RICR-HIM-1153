import { Router } from 'express';
import { registerUser, loginUser, logoutUser } from '../controller/auth.controller.js';
import { validateRegister, validateLogin } from '../utils/auth.validators.js';

const router = Router();

router.post('/register', validateRegister, registerUser);
router.post('/login', validateLogin, loginUser);
router.post('/logout', logoutUser); 

export default router;
