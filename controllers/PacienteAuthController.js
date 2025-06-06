import db from '../config/db.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const JWT_SECRET = 'chave-secreta';

export const cadastrarPaciente = async (req, res) => {
  const { nome, email, telefone, senha, data_nascimento } = req.body;
  try {
    if (!nome || !email || !telefone || !senha || !data_nascimento) {
      return res.status(400).json({ erro: 'Todos os campos são obrigatórios' });
    }

    const hash = await bcrypt.hash(senha, 10);
    const sql = 'INSERT INTO pacientes (nome, email, telefone, senha, data_nascimento) VALUES (?, ?, ?, ?, ?)';
    const [result] = await db.promise().query(sql, [nome, email, telefone, hash, data_nascimento]);

    res.status(201).json({ mensagem: 'Paciente cadastrado com sucesso', id: result.insertId });
  } catch (error) {
    res.status(500).json({ erro: 'Erro ao cadastrar paciente', detalhe: error.message });
  }
};

export const loginPaciente = async (req, res) => {
  const { email, senha } = req.body;

  try {
    const [pacientes] = await db.promise().query('SELECT * FROM pacientes WHERE email = ?', [email]);
    if (pacientes.length === 0) {
      return res.status(401).json({ erro: 'E-mail ou senha inválidos' });
    }

    const paciente = pacientes[0];

    if (!paciente.senha) {
      return res.status(401).json({ erro: 'Senha inválida ou não cadastrada' });
    }

    const senhaCorreta = await bcrypt.compare(senha, paciente.senha);
    if (!senhaCorreta) {
      return res.status(401).json({ erro: 'E-mail ou senha inválidos' });
    }

    const token = jwt.sign(
      {
        id: paciente.id,
        tipo: 'paciente',
        nome: paciente.nome,
        email: paciente.email
      },
      JWT_SECRET,
      { expiresIn: '2h' }
    );

    res.json({ mensagem: 'Login realizado com sucesso', token });
  } catch (error) {
    
    res.status(500).json({ erro: 'Erro no login', detalhe: error.message });
  }
};
