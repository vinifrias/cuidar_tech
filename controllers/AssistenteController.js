import * as Assistente from '../models/AssistenteModel.js';
import db from '../config/db.js';
import bcrypt from 'bcrypt';

export const criar = async (req, res) => {
  try {
    const novoAssistente = req.body;
    const id = await Assistente.criarAssistente(novoAssistente);
    res.status(201).json({ mensagem: 'Assistente criado com sucesso', id });
  } catch (err) {
    res.status(500).json({ erro: 'Erro ao criar assistente', detalhe: err.message });
  }
};

export const listar = async (req, res) => {
  try {
    const assistentes = await Assistente.listarAssistentes();
    res.status(200).json(assistentes);
  } catch (err) {
    res.status(500).json({ erro: 'Erro ao listar assistentes', detalhe: err.message });
  }
};

export const buscar = async (req, res) => {
  try {
    const id = req.params.id;
    const assistente = await Assistente.buscarAssistentePorId(id);
    if (!assistente) {
      return res.status(404).json({ mensagem: 'Assistente não encontrado' });
    }
    res.status(200).json(assistente);
  } catch (err) {
    res.status(500).json({ erro: 'Erro ao buscar assistente', detalhe: err.message });
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

    await Assistente.atualizarAssistente(id, dadosAtualizados);
    res.status(200).json({ mensagem: 'Assistente atualizado com sucesso' });
  } catch (err) {
    res.status(500).json({ erro: 'Erro ao atualizar assistente', detalhe: err.message });
  }
};


export const deletar = async (req, res) => {
  try {
    const id = req.params.id;
    await Assistente.deletarAssistente(id);
    res.status(200).json({ mensagem: 'Assistente deletado com sucesso' });
  } catch (err) {
    res.status(500).json({ erro: 'Erro ao deletar assistente', detalhe: err.message });
  }
};

//-----------------------------------------------------------------------------------------------------------------

export const cadastrarAssistente = async (req, res) => {
  const { nome, email, senha } = req.body;

  try {
    const hashSenha = await bcrypt.hash(senha, 10);

    const [resultado] = await db.promise().query(
      'INSERT INTO assistentes (nome, email, senha) VALUES (?, ?, ?)',
      [nome, email, hashSenha]
    );

    res.status(201).json({ mensagem: 'Assistente cadastrado com sucesso', id: resultado.insertId });
  } catch (error) {
    res.status(500).json({ erro: 'Erro ao cadastrar assistente', detalhe: error.message });
  }
};
