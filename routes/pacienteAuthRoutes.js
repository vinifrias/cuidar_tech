import express from 'express';
import { cadastrarPaciente, loginPaciente } from '../controllers/PacienteAuthController.js';

const router = express.Router();

router.post('/cadastro', cadastrarPaciente);
router.post('/login', loginPaciente);

export default router;
