import express from 'express';
import * as medicoController from '../controllers/MedicoController.js';
import { cadastrarMedico } from '../controllers/MedicoController.js';
import { autenticarToken, apenasAdmin } from '../middlewares/authMiddleware.js';


const router = express.Router();

router.post('/', autenticarToken, cadastrarMedico, apenasAdmin);

router.post('/', medicoController.criar);
router.get('/', medicoController.listar);
router.get('/:id', medicoController.buscar);
router.put('/:id', medicoController.atualizar);
router.delete('/:id', medicoController.deletar);

export default router;
