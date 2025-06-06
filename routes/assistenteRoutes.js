import express from 'express';
import * as assistenteController from '../controllers/AssistenteController.js';
import { cadastrarAssistente } from '../controllers/AssistenteController.js';
import { autenticarToken, apenasAdmin } from '../middlewares/authMiddleware.js';


const router = express.Router();

router.post('/', autenticarToken, cadastrarAssistente, apenasAdmin);

router.post('/', assistenteController.criar);
router.get('/', assistenteController.listar);
router.get('/:id', assistenteController.buscar);
router.put('/:id', assistenteController.atualizar);
router.delete('/:id', assistenteController.deletar);

export default router;
