import express from 'express';
import * as SlotController from '../controllers/SlotController.js';
import { autenticarToken } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.use(autenticarToken); 

router.get('/disponiveis', SlotController.listarDisponiveis);
router.post('/', SlotController.criarSlot);
router.get('/', SlotController.listarSlots);
router.get('/medico/:medico_id', SlotController.listarSlotsPorMedico);
router.get('/:id', SlotController.buscarSlotPorId);
router.put('/:id', SlotController.atualizarSlot);
router.delete('/:id', SlotController.deletarSlot);


router.post('/',  SlotController.criarSlot);
router.put('/:id',  SlotController.atualizarSlot);
router.delete('/:id', SlotController.deletarSlot);


export default router;
