import express from 'express';
import { loginMedico } from '../controllers/MedicoAuthController.js';

const router = express.Router();

router.post('/login', loginMedico);

export default router;
