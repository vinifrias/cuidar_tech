import * as Admin from '../models/AdminModel.js';

export const criar = async (req, res) => {
  try {
    const novoAdmin = req.body;
    const id = await Admin.criarAdmin(novoAdmin);
    res.status(201).json({ mensagem: 'Admin criado com sucesso', id });
  } catch (err) {
    res.status(500).json({ erro: 'Erro ao criar admin', detalhe: err.message });
  }
};

export const listar = async (req, res) => {
  try {
    const admins = await Admin.listarAdmins();
    res.status(200).json(admins);
  } catch (err) {
    res.status(500).json({ erro: 'Erro ao listar admins', detalhe: err.message });
  }
};

export const buscar = async (req, res) => {
  try {
    const id = req.params.id;
    const admin = await Admin.buscarAdminPorId(id);
    if (!admin) {
      return res.status(404).json({ mensagem: 'Admin não encontrado' });
    }
    res.status(200).json(admin);
  } catch (err) {
    res.status(500).json({ erro: 'Erro ao buscar admin', detalhe: err.message });
  }
};

export const atualizar = async (req, res) => {
  try {
    const id = req.params.id;
    const dadosAtualizados = req.body;
    await Admin.atualizarAdmin(id, dadosAtualizados);
    res.status(200).json({ mensagem: 'Admin atualizado com sucesso' });
  } catch (err) {
    res.status(500).json({ erro: 'Erro ao atualizar admin', detalhe: err.message });
  }
};

export const deletar = async (req, res) => {
  try {
    const id = req.params.id;
    await Admin.deletarAdmin(id);
    res.status(200).json({ mensagem: 'Admin deletado com sucesso' });
  } catch (err) {
    res.status(500).json({ erro: 'Erro ao deletar admin', detalhe: err.message });
  }
};
