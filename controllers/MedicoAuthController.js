import db from '../config/db.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const JWT_SECRET = 'chave-secreta';

export const loginMedico = async (req, res) => {
  const { email, senha } = req.body;

  try {
    const [medicos] = await db.promise().query(
      'SELECT * FROM medicos WHERE email = ?',
      [email]
    );

    if (medicos.length === 0) {
      return res.status(401).json({ erro: 'E-mail ou senha inválidos' });
    }

    const medico = medicos[0];

    const senhaCorreta = await bcrypt.compare(senha, medico.senha);
    if (!senhaCorreta) {
      return res.status(401).json({ erro: 'E-mail ou senha inválidos' });
    }

    const token = jwt.sign(
      {
        id: medico.id,
        tipo: 'medico',
        nome: medico.nome,
        email: medico.email,
        isMedico: true,
      },
      JWT_SECRET,
      { expiresIn: '2h' }
    );

    res.json({ mensagem: 'Login realizado com sucesso', token });
  } catch (error) {
    res.status(500).json({ erro: 'Erro no login', detalhe: error.message });
  }
};




export const obterPerfilMedico = async (req, res) => {
  const id = req.usuario.id;

  try {
    const [rows] = await db.promise().query('SELECT id, nome, crm, especialidades, duracao_consulta, email, telefone FROM medicos WHERE id = ?', [id]);
    if (rows.length === 0) return res.status(404).json({ erro: 'Médico não encontrado' });

    res.json(rows[0]);
  } catch (error) {
    console.error("Erro ao buscar perfil do médico:", error);
    res.status(500).json({ erro: 'Erro ao buscar perfil do médico', detalhe: error.message });
  }
};