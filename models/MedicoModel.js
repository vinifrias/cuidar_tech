import db from '../config/db.js';

export const criarMedico = async (medico) => {
  const sql = 'INSERT INTO medicos (nome, email, senha, crm, especialidade) VALUES (?, ?, ?, ?, ?)';
  const [result] = await db.promise().query(sql, [
    medico.nome,
    medico.email,
    medico.senha,
    medico.crm,
    medico.especialidade
  ]);
  return result.insertId;
};

export const listarMedicos = async () => {
  const [rows] = await db.promise().query('SELECT * FROM medicos');
  return rows;
};

export const buscarMedicoPorId = async (id) => {
  const [rows] = await db.promise().query('SELECT * FROM medicos WHERE id = ?', [id]);
  return rows[0];
};

export const atualizarMedico = async (id, medico) => {
  const sql = 'UPDATE medicos SET nome = ?, email = ?, senha = ?, crm = ?, especialidade = ? WHERE id = ?';
  await db.promise().query(sql, [
    medico.nome,
    medico.email,
    medico.senha,
    medico.crm,
    medico.especialidade,
    id
  ]);
};

export const deletarMedico = async (id) => {
  await db.promise().query('DELETE FROM medicos WHERE id = ?', [id]);
};
