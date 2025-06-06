import db from '../config/db.js';

export async function listarConsultas(filtros = {}) {
  let query = 'SELECT * FROM consultas WHERE 1=1';
  const params = [];

  if (filtros.medico_id) {
    query += ' AND medico_id = ?';
    params.push(filtros.medico_id);
  }

  if (filtros.paciente_id) {
    query += ' AND paciente_id = ?';
    params.push(filtros.paciente_id);
  }

  const [rows] = await db.promise().query(query, params);
  return rows;
}

export async function buscarConsultaPorId(id) {
  const [rows] = await db.promise().query('SELECT * FROM consultas WHERE id = ?', [id]);
  return rows[0];
}

export async function criarConsulta({
  paciente_id,
  medico_id,
  slot_id,
  data_consulta,
  observacoes = null,
  status = 'agendada'
}) {
  const [result] = await db
    .promise()
    .query(
      `INSERT INTO consultas 
        (paciente_id, medico_id, slot_id, data_consulta, observacoes, status)
       VALUES (?, ?, ?, ?, ?, ?)`,
      [paciente_id, medico_id, slot_id, data_consulta, observacoes, status]
    );

  return {
    id: result.insertId,
    paciente_id,
    medico_id,
    slot_id,
    data_consulta,
    observacoes,
    status
  };
}

export async function atualizarConsulta(
  id,
  {
    paciente_id,
    medico_id,
    slot_id,
    data_consulta,
    observacoes = null,
    status = 'agendada'
  }
) {
  await db
    .promise()
    .query(
      `UPDATE consultas 
       SET paciente_id = ?, medico_id = ?, slot_id = ?, data_consulta = ?, observacoes = ?, status = ?
       WHERE id = ?`,
      [paciente_id, medico_id, slot_id, data_consulta, observacoes, status, id]
    );

  return {
    id,
    paciente_id,
    medico_id,
    slot_id,
    data_consulta,
    observacoes,
    status
  };
}

export async function deletarConsulta(id) {
  await db.promise().query('DELETE FROM consultas WHERE id = ?', [id]);
}

export const deletarConsultasPorSlot = async (slot_id) => {
  const sql = 'DELETE FROM consultas WHERE slot_id = ?';
  await db.promise().query(sql, [slot_id]);
};
