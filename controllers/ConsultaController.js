import * as ConsultaModel from '../models/ConsultaModel.js';
import { buscarHorarioPorSlotId } from '../models/HorarioModel.js';

const ConsultaController = {
  async listarConsultas(req, res) {
    try {
      const { tipo, id } = req.usuario;
      let filtros = {};

      if (tipo === 'paciente') {
        filtros.paciente_id = id;
      } else if (tipo === 'medico') {
        filtros.medico_id = id;
      } else if (tipo === 'assistente') {
        filtros = req.query; 
      } else {
        return res.status(403).json({ erro: 'Acesso negado.' });
      }

      const consultas = await ConsultaModel.listarConsultas(filtros);
      return res.json(consultas);
    } catch (error) {
      return res.status(500).json({ erro: 'Erro ao buscar consultas.' });
    }
  },

  async buscarConsultaPorId(req, res) {
    try {
      const { tipo, id } = req.usuario;
      const consulta = await ConsultaModel.buscarConsultaPorId(req.params.id);

      if (!consulta) {
        return res.status(404).json({ erro: 'Consulta não encontrada.' });
      }

      const autorizado =
        (tipo === 'paciente' && consulta.paciente_id === id) ||
        (tipo === 'medico' && consulta.medico_id === id) ||
        tipo === 'assistente';

      if (!autorizado) {
        return res.status(403).json({ erro: 'Acesso negado à consulta.' });
      }

      return res.json(consulta);
    } catch (error) {
      return res.status(500).json({ erro: 'Erro ao buscar consulta.' });
    }
  },

  async criarConsulta(req, res) {
    try {
      const { tipo, id } = req.usuario;

      if (tipo === 'paciente') {
        req.body.paciente_id = id;
      } else if (tipo !== 'assistente') {
        return res.status(403).json({ erro: 'Apenas pacientes ou assistentes podem agendar consultas.' });
      }

      const { slot_id } = req.body;

      const horario = await buscarHorarioPorSlotId(slot_id);
      if (!horario) {
        return res.status(400).json({ erro: 'Horário associado ao slot não encontrado.' });
      }

      req.body.data_consulta = horario.data_consulta;

      const novaConsulta = await ConsultaModel.criarConsulta(req.body);
      return res.status(201).json(novaConsulta);
    } catch (error) {
      return res.status(500).json({
        erro: 'Erro ao criar consulta.',
        detalhes: error.message
      });
    }
  },

  async atualizarConsulta(req, res) {
    try {
      const { tipo, id } = req.usuario;
      const consultaExistente = await ConsultaModel.buscarConsultaPorId(req.params.id);

      if (!consultaExistente) {
        return res.status(404).json({ erro: 'Consulta não encontrada.' });
      }

      const autorizado =
        tipo === 'assistente' ||
        (tipo === 'paciente' && consultaExistente.paciente_id === id) ||
        (tipo === 'medico' && consultaExistente.medico_id === id);

      if (!autorizado) {
        return res.status(403).json({ erro: 'Você não tem permissão para editar esta consulta.' });
      }

      const consultaAtualizada = await ConsultaModel.atualizarConsulta(req.params.id, req.body);
      return res.json(consultaAtualizada);
    } catch (error) {
      return res.status(500).json({ erro: 'Erro ao atualizar consulta.' });
    }
  },

  async deletarConsulta(req, res) {
    try {
      const { tipo, id } = req.usuario;
      const consultaExistente = await ConsultaModel.buscarConsultaPorId(req.params.id);

      if (!consultaExistente) {
        return res.status(404).json({ erro: 'Consulta não encontrada.' });
      }

      const autorizado =
        tipo === 'assistente' ||
        (tipo === 'paciente' && consultaExistente.paciente_id === id) ||
        (tipo === 'medico' && consultaExistente.medico_id === id);

      if (!autorizado) {
        return res.status(403).json({ erro: 'Você não tem permissão para excluir esta consulta.' });
      }

      await ConsultaModel.deletarConsulta(req.params.id);
      return res.json({ mensagem: 'Consulta excluída com sucesso.' });
    } catch (error) {
      return res.status(500).json({ erro: 'Erro ao excluir consulta.' });
    }
  }
};

export default ConsultaController;
