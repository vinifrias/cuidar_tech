import express from 'express';
import ConsultaController from '../controllers/ConsultaController.js';
import { autenticarToken } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.use(autenticarToken);

router.post('/', ConsultaController.criarConsulta);
router.get('/', ConsultaController.listarConsultas);
router.get('/:id', ConsultaController.buscarConsultaPorId);
router.put('/:id', ConsultaController.atualizarConsulta);
router.delete('/:id', ConsultaController.deletarConsulta);

export default router;
