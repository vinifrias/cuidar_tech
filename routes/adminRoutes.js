import express from 'express';
import * as AdminController from '../controllers/AdminController.js';
import { loginAdmin } from '../controllers/AdminAuthController.js';

const router = express.Router();

router.post('/', AdminController.criar);
router.get('/', AdminController.listar);
router.get('/:id', AdminController.buscar);
router.put('/:id', AdminController.atualizar);
router.delete('/:id', AdminController.deletar);

router.post('/login', loginAdmin);

export default router;
