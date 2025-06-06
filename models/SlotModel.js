import db from '../config/db.js';

export const criarSlot = async (slot) => {
  const sql = `INSERT INTO slots_agendamento (horario_inicio, horario_fim, medico_id, horario_id) VALUES (?, ?, ?, ?)`;
  const [result] = await db.promise().query(sql, [
    slot.horario_inicio,
    slot.horario_fim,
    slot.medico_id,
    slot.horario_id
  ]);
  return result.insertId;
};

export const listarSlots = async () => {
  const [rows] = await db.promise().query('SELECT * FROM slots_agendamento');
  return rows;
};

export const listarSlotsPorMedico = async (medico_id) => {
  const [rows] = await db.promise().query(
    'SELECT * FROM slots_agendamento WHERE medico_id = ?',
    [medico_id]
  );
  return rows;
};

export const buscarSlotPorId = async (id) => {
  const [rows] = await db.promise().query(
    'SELECT * FROM slots_agendamento WHERE id = ?',
    [id]
  );
  return rows[0];
};

export const atualizarSlot = async (id, slot) => {
  const sql = `UPDATE slots_agendamento SET horario_inicio = ?, horario_fim = ?, medico_id = ?, horario_id = ? WHERE id = ?`;
  await db.promise().query(sql, [
    slot.horario_inicio,
    slot.horario_fim,
    slot.medico_id,
    slot.horario_id,
    id
  ]);
};

export const deletarSlot = async (id) => {
  await db.promise().query('DELETE FROM slots_agendamento WHERE id = ?', [id]);
};

export const listarSlotsDisponiveis = async (medico_id, data) => {
  const sql = `
    SELECT sa.*
    FROM slots_agendamento sa
    LEFT JOIN consultas c ON sa.id = c.slot_id
    INNER JOIN horarios h ON sa.horario_id = h.id
    WHERE sa.medico_id = ? AND h.data_consulta = ? AND c.id IS NULL
    ORDER BY sa.horario_inicio
  `;
  const [rows] = await db.promise().query(sql, [medico_id, data]);
  return rows;
};

export const deletarSlotsPorHorario = async (horario_id) => {
  const [result] = await db.query('DELETE FROM slots_agendamento WHERE horario_id = ?', [horario_id]);
  return result;
};

