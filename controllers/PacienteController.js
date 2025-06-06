import * as Paciente from '../models/PacienteModel.js';
import db from '../config/db.js';


export const criar = async (req, res) => {
  try {
    const novoPaciente = req.body;
    const id = await Paciente.criarPaciente(novoPaciente);
    res.status(201).json({ mensagem: 'Paciente criado com sucesso', id });
  } catch (err) {
    res.status(500).json({ erro: 'Erro ao criar paciente', detalhe: err.message });
  }
};

export const listar = async (req, res) => {
  try {
    const pacientes = await Paciente.listarPacientes();
    res.status(200).json(pacientes);
  } catch (err) {
    res.status(500).json({ erro: 'Erro ao listar pacientes', detalhe: err.message });
  }
};

export const buscar = async (req, res) => {
  try {
    const id = req.params.id;
    const paciente = await Paciente.buscarPacientePorId(id);
    if (!paciente) {
      return res.status(404).json({ mensagem: 'Paciente não encontrado' });
    }
    res.status(200).json(paciente);
  } catch (err) {
    res.status(500).json({ erro: 'Erro ao buscar paciente', detalhe: err.message });
  }
};

export const atualizar = async (req, res) => {
  try {
    const id = req.params.id;
    const dadosAtualizados = req.body;
    await Paciente.atualizarPaciente(id, dadosAtualizados);
    res.status(200).json({ mensagem: 'Paciente atualizado com sucesso' });
  } catch (err) {
    res.status(500).json({ erro: 'Erro ao atualizar paciente', detalhe: err.message });
  }
};

export const deletar = async (req, res) => {
  try {
    const id = req.params.id;
    await Paciente.deletarPaciente(id);
    res.status(200).json({ mensagem: 'Paciente deletado com sucesso' });
  } catch (err) {
    res.status(500).json({ erro: 'Erro ao deletar paciente', detalhe: err.message });
  }
};

//-----------------------------------------------------------------------------------------------------------------

export const obterPerfil = async (req, res) => {
  const id = req.usuario.id;

  // console.log('ID do paciente extraído do token:', id);

  try {
    const [rows] = await db.promise().query('SELECT id, nome, email, telefone, data_nascimento FROM pacientes WHERE id = ?', [id]);
    if (rows.length === 0) return res.status(404).json({ erro: 'Paciente não encontrado' });

    res.json(rows[0]);
  } catch (error) {
    res.status(500).json({ erro: 'Erro ao buscar perfil', detalhe: error.message });
  }
};

export const atualizarPerfil = async (req, res) => {
  const id = req.usuario.id; 
  const { nome, telefone, data_nascimento } = req.body;

  try {
    const sql = 'UPDATE pacientes SET nome = ?, telefone = ?, data_nascimento = ? WHERE id = ?';
    await db.promise().query(sql, [nome, telefone, data_nascimento, id]);

    res.status(200).json({ mensagem: 'Dados atualizados com sucesso' });
  } catch (error) {
    res.status(500).json({ erro: 'Erro ao atualizar perfil', detalhe: error.message });
  }
};
