import db from '../config/db.js';

export const criarPaciente = async (paciente) => {
  const sql = 'INSERT INTO pacientes (nome, email, telefone, senha, data_nascimento) VALUES (?, ?, ?, ?, ?)';
  const [result] = await db.promise().query(sql, [
    paciente.nome,
    paciente.email,
    paciente.senha,
    paciente.telefone,
    paciente.data_nascimento
  ]);
  return result.insertId;
};

export const listarPacientes = async () => {
  const [rows] = await db.promise().query('SELECT * FROM pacientes');
  return rows;
};

export const buscarPacientePorId = async (id) => {
  const [rows] = await db.promise().query('SELECT * FROM pacientes WHERE id = ?', [id]);
  return rows[0];
};

export const atualizarPaciente = async (id, paciente) => {
  const sql = 'UPDATE pacientes SET nome = ?, email = ?, senha = ?, telefone = ? WHERE id = ?';
  await db.promise().query(sql, [
    paciente.nome,
    paciente.email,
    paciente.senha,
    paciente.telefone,
    paciente.data_nascimento,
    id
  ]);
};

export const deletarPaciente = async (id) => {
  await db.promise().query('DELETE FROM pacientes WHERE id = ?', [id]);
};
