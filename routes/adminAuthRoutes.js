import express from 'express';
import { loginAdmin } from '../controllers/AdminAuthController.js';
import { autenticarToken } from '../middlewares/authMiddleware.js';
import { cadastrarMedico, cadastrarAssistente } from '../controllers/AdminAuthController.js';

const router = express.Router();

router.post('/login', loginAdmin);
router.post('/medicos', autenticarToken, cadastrarMedico);
router.post('/assistentes', autenticarToken, cadastrarAssistente);


export default router;
