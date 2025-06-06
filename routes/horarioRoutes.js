import express from 'express';
import * as HorarioController from '../controllers/HorarioController.js';

const router = express.Router();

router.post('/', HorarioController.criar);
router.get('/', HorarioController.listar);
router.get('/:id', HorarioController.buscar);
router.put('/:id', HorarioController.atualizar);
router.delete('/:id', HorarioController.deletar);

export default router;
