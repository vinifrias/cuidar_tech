import db from '../config/db.js';

export const criarAssistente = async (assistente) => {
  const sql = 'INSERT INTO assistentes (nome, email, senha) VALUES (?, ?, ?)';
  const [result] = await db.promise().query(sql, [
    assistente.nome,
    assistente.email,
    assistente.senha
  ]);
  return result.insertId;
};

export const listarAssistentes = async () => {
  const [rows] = await db.promise().query('SELECT * FROM assistentes');
  return rows;
};

export const buscarAssistentePorId = async (id) => {
  const [rows] = await db.promise().query('SELECT * FROM assistentes WHERE id = ?', [id]);
  return rows[0];
};

export const atualizarAssistente = async (id, assistente) => {
  const sql = 'UPDATE assistentes SET nome = ?, email = ?, senha = ? WHERE id = ?';
  await db.promise().query(sql, [
    assistente.nome,
    assistente.email,
    assistente.senha,
    id
  ]);
};

export const deletarAssistente = async (id) => {
  await db.promise().query('DELETE FROM assistentes WHERE id = ?', [id]);
};
