import * as Medico from '../models/MedicoModel.js';
import bcrypt from 'bcrypt';
import db from '../config/db.js';

export const criar = async (req, res) => {
  try {
    const novoMedico = req.body;
    const id = await Medico.criarMedico(novoMedico);
    res.status(201).json({ mensagem: 'Médico criado com sucesso', id });
  } catch (err) {
    res.status(500).json({ erro: 'Erro ao criar médico', detalhe: err.message });
  }
};

export const listar = async (req, res) => {
  try {
    const medicos = await Medico.listarMedicos();
    res.status(200).json(medicos);
  } catch (err) {
    res.status(500).json({ erro: 'Erro ao listar médicos', detalhe: err.message });
  }
};

export const buscar = async (req, res) => {
  try {
    const id = req.params.id;
    const medico = await Medico.buscarMedicoPorId(id);
    if (!medico) {
      return res.status(404).json({ mensagem: 'Médico não encontrado' });
    }
    res.status(200).json(medico);
  } catch (err) {
    res.status(500).json({ erro: 'Erro ao buscar médico', detalhe: err.message });
  }
};

export const atualizar = async (req, res) => {
  try {
    const id = req.params.id;
    const dadosAtualizados = { ...req.body };

    if (dadosAtualizados.senha) {
      const hashSenha = await bcrypt.hash(dadosAtualizados.senha, 10);
      dadosAtualizados.senha = hashSenha;
    }

    await Medico.atualizarMedico(id, dadosAtualizados);
    res.status(200).json({ mensagem: 'Médico atualizado com sucesso' });
  } catch (err) {
    res.status(500).json({ erro: 'Erro ao atualizar médico', detalhe: err.message });
  }
};


export const deletar = async (req, res) => {
  try {
    const id = req.params.id;
    await Medico.deletarMedico(id);
    res.status(200).json({ mensagem: 'Médico deletado com sucesso' });
  } catch (err) {
    res.status(500).json({ erro: 'Erro ao deletar médico', detalhe: err.message });
  }
};

//-----------------------------------------------------------------------------------------------------------------

export const cadastrarMedico = async (req, res) => {
  const { nome, crm, especialidades, duracao_consulta, email, telefone, senha } = req.body;

  try {
    const hashSenha = await bcrypt.hash(senha, 10);

    const [resultado] = await db.promise().query(
      `INSERT INTO medicos (nome, crm, especialidades, duracao_consulta, email, telefone, senha)
       VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [nome, crm, especialidades, duracao_consulta, email, telefone, hashSenha]
    );

    res.status(201).json({ mensagem: 'Médico cadastrado com sucesso', id: resultado.insertId });
  } catch (error) {
    res.status(500).json({ erro: 'Erro ao cadastrar médico', detalhe: error.message });
  }
};
