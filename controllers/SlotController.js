import * as SlotModel from '../models/SlotModel.js';
import * as ConsultaModel from '../models/ConsultaModel.js';

export const criarSlot = async (req, res) => {
  try {
    const novoSlot = req.body;
    const id = await SlotModel.criarSlot(novoSlot);
    res.status(201).json({ mensagem: 'Slot criado com sucesso', id });
  } catch (error) {
    res.status(500).json({ erro: 'Erro ao criar slot', detalhe: error.message });
  }
};

export const listarSlots = async (req, res) => {
  try {
    const slots = await SlotModel.listarSlots();
    res.json(slots);
  } catch (error) {
    res.status(500).json({ erro: 'Erro ao listar slots', detalhe: error.message });
  }
};

export const listarSlotsPorMedico = async (req, res) => {
  try {
    const medico_id = req.params.medico_id;
    const slots = await SlotModel.listarSlotsPorMedico(medico_id);
    res.json(slots);
  } catch (error) {
    res.status(500).json({ erro: 'Erro ao listar slots do médico', detalhe: error.message });
  }
};

export const buscarSlotPorId = async (req, res) => {
  try {
    const id = req.params.id;
    const slot = await SlotModel.buscarSlotPorId(id);
    if (!slot) return res.status(404).json({ erro: 'Slot não encontrado' });
    res.json(slot);
  } catch (error) {
    res.status(500).json({ erro: 'Erro ao buscar slot', detalhe: error.message });
  }
};

export const atualizarSlot = async (req, res) => {
  try {
    const id = req.params.id;
    const dados = req.body;
    await SlotModel.atualizarSlot(id, dados);
    res.json({ mensagem: 'Slot atualizado com sucesso' });
  } catch (error) {
    res.status(500).json({ erro: 'Erro ao atualizar slot', detalhe: error.message });
  }
};


export const listarDisponiveis = async (req, res) => {
  try {
    const { medico_id, data } = req.query;

    if (!medico_id || !data) {
      return res.status(400).json({ erro: 'medico_id e data são obrigatórios' });
    }

    const slots = await SlotModel.listarSlotsDisponiveis(medico_id, data);
    res.status(200).json(slots);
  } catch (err) {
    console.error(err);
    res.status(500).json({ erro: 'Erro ao buscar slots disponíveis', detalhe: err.message });
  }
};


export const deletarSlot = async (req, res) => {
  try {
    const id = req.params.id;

    // Deleta as consultas vinculadas ao slot
    await ConsultaModel.deletarConsultasPorSlot(id);

    // Deleta o slot
    await SlotModel.deletarSlot(id);

    res.json({ mensagem: 'Slot e consultas deletados com sucesso' });
  } catch (error) {
    res.status(500).json({ erro: 'Erro ao deletar slot', detalhe: error.message });
  }
};
