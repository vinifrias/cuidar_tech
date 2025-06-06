import * as Horario from '../models/HorarioModel.js';
import * as Slot from '../models/SlotModel.js';

// Função auxiliar para somar minutos a um horário (formato HH:MM:SS)
function adicionarMinutos(horario, minutos) {
  const [h, m, s] = horario.split(':').map(Number);
  const data = new Date(0, 0, 0, h, m + minutos, s || 0);
  return data.toTimeString().substring(0, 8);
}

// Criar horário e gerar slots automaticamente
export const criar = async (req, res) => {
  try {
    const { medico_id, dia_semana, data_consulta, hora_inicio, hora_fim, duracao_slot } = req.body;

    if (!medico_id || !dia_semana || !data_consulta || !hora_inicio || !hora_fim || !duracao_slot) {
      return res.status(400).json({ erro: 'Todos os campos são obrigatórios.' });
    }

    const horario_id = await Horario.criarHorario({
      medico_id,
      dia_semana,
      data_consulta,
      hora_inicio,
      hora_fim,
      duracao_slot
    });

    // Gera os slots com base na duração
    let inicio = hora_inicio;
    while (inicio < hora_fim) {
      const fim = adicionarMinutos(inicio, duracao_slot);
      if (fim > hora_fim) break;

      await Slot.criarSlot({
        horario_inicio: inicio,
        horario_fim: fim,
        medico_id,
        horario_id
      });

      inicio = fim;
    }

    res.status(201).json({ mensagem: 'Horário e slots criados com sucesso', horario_id });

  } catch (err) {
    console.error('Erro ao criar horário:', err);
    res.status(500).json({ erro: 'Erro interno ao criar horário', detalhe: err.message });
  }
};

// Listar todos os horários
export const listar = async (req, res) => {
  try {
    const horarios = await Horario.listarHorarios();
    res.status(200).json(horarios);
  } catch (err) {
    res.status(500).json({ erro: 'Erro ao listar horários', detalhe: err.message });
  }
};

// Buscar horário por ID
export const buscar = async (req, res) => {
  try {
    const id = req.params.id;
    const horario = await Horario.buscarHorarioPorId(id);

    if (!horario) {
      return res.status(404).json({ mensagem: 'Horário não encontrado' });
    }

    res.status(200).json(horario);
  } catch (err) {
    res.status(500).json({ erro: 'Erro ao buscar horário', detalhe: err.message });
  }
};

// Atualizar horário
export const atualizar = async (req, res) => {
  try {
    const id = req.params.id;
    const dadosAtualizados = req.body;

    await Horario.atualizarHorario(id, dadosAtualizados);
    res.status(200).json({ mensagem: 'Horário atualizado com sucesso' });
  } catch (err) {
    res.status(500).json({ erro: 'Erro ao atualizar horário', detalhe: err.message });
  }
};

// Deletar horário (com slots vinculados)
export const deletar = async (req, res) => {
  try {
    const id = req.params.id;

    // Deleta os slots vinculados ao horário
    await Slot.deletarSlotsPorHorario(id);

    // Depois de deletar os slots, deleta o horário
    await Horario.deletarHorario(id);

    res.status(200).json({ mensagem: 'Horário e seus slots deletados com sucesso' });
  } catch (err) {
    res.status(500).json({ erro: 'Erro ao deletar horário', detalhe: err.message });
  }
};

