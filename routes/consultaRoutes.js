import express from 'express';
import ConsultaController from '../controllers/ConsultaController.js';
import { autenticarToken } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.use(autenticarToken);

// Os nomes abaixo devem bater com os nomes definidos no controller
router.post('/', ConsultaController.criarConsulta);
router.get('/', ConsultaController.listarConsultas);
router.get('/:id', ConsultaController.buscarConsultaPorId);
router.put('/:id', ConsultaController.atualizarConsulta);
router.delete('/:id', ConsultaController.deletarConsulta);

export default router;
