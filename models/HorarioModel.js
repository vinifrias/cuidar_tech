import db from '../config/db.js';

export const criarHorario = async (horario) => {
  const sql = `
    INSERT INTO horarios (medico_id, dia_semana, data_consulta, hora_inicio, hora_fim, duracao_slot)
    VALUES (?, ?, ?, ?, ?, ?)
  `;
  const [result] = await db.promise().query(sql, [
    horario.medico_id,
    horario.dia_semana,
    horario.data_consulta,
    horario.hora_inicio,
    horario.hora_fim,
    horario.duracao_slot
  ]);
  return result.insertId;
};

export const listarHorarios = async () => {
  const [rows] = await db.promise().query('SELECT * FROM horarios');
  return rows;
};

export const buscarHorarioPorId = async (id) => {
  const [rows] = await db.promise().query('SELECT * FROM horarios WHERE id = ?', [id]);
  return rows[0];
};

// ✅ Função corrigida
export const buscarHorarioPorSlotId = async (slot_id) => {
  const [rows] = await db.promise().query(
    `SELECT h.data_consulta
     FROM slots_agendamento s
     JOIN horarios h ON s.horario_id = h.id
     WHERE s.id = ?`,
    [slot_id]
  );
  return rows[0];
};

export const deletarHorario = async (id) => {
  await db.promise().query('DELETE FROM horarios WHERE id = ?', [id]);
};
