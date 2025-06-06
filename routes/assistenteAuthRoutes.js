import express from 'express';
import { loginAssistente } from '../controllers/AssistenteAuthController.js';

const router = express.Router();

router.post('/login', loginAssistente);

export default router;
