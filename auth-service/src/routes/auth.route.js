import {Router} from 'express';
import { handleGetMe, handleLogin, handleLogout, handleRegister } from '../controllers/auth.controller.js';

const AuthRoutes = Router();

AuthRoutes.post('/register', handleRegister);
AuthRoutes.post('/login', handleLogin);
AuthRoutes.post('/logout', handleLogout);
AuthRoutes.post('/me', handleGetMe);

export default AuthRoutes;