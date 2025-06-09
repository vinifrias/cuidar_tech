import express from 'express';
import * as pacienteController from '../controllers/PacienteController.js';
import { cadastrarPaciente, loginPaciente } from '../controllers/PacienteAuthController.js';
import { autenticarToken } from '../middlewares/authMiddleware.js';

const router = express.Router();
 

router.get('/perfil', autenticarToken, pacienteController.obterPerfil);
router.put('/perfil', autenticarToken, pacienteController.atualizarPerfil);

router.post('/', autenticarToken, pacienteController.criar);
router.get('/', autenticarToken, pacienteController.listar);
router.get('/:id', autenticarToken, pacienteController.buscar);
router.put('/:id', autenticarToken, pacienteController.atualizar);
router.delete('/:id', autenticarToken, pacienteController.deletar);



export default router;
