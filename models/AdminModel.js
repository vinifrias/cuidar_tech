
import db from '../config/db.js';

export const criarAdmin = async (admin) => {
  const sql = 'INSERT INTO admin (nome, email, senha) VALUES (?, ?, ?)';
  const [result] = await db.promise().query(sql, [admin.nome, admin.email, admin.senha]);
  return result.insertId;
};

export const listarAdmins = async () => {
  const [rows] = await db.promise().query('SELECT * FROM admin');
  return rows;
};

export const buscarAdminPorId = async (id) => {
  const [rows] = await db.promise().query('SELECT * FROM admin WHERE id = ?', [id]);
  return rows[0];
};

export const atualizarAdmin = async (id, admin) => {
  const sql = 'UPDATE admin SET nome = ?, email = ?, senha = ? WHERE id = ?';
  await db.promise().query(sql, [admin.nome, admin.email, admin.senha, id]);
};

export const deletarAdmin = async (id) => {
  await db.promise().query('DELETE FROM admin WHERE id = ?', [id]);
};
