import bcrypt from 'bcrypt';
import db from '../config/db.js';
import jwt from 'jsonwebtoken';


const JWT_SECRET = 'chave-secreta';

export const loginAdmin = async (req, res) => {
  const { email, senha } = req.body;

  try {
    const [admins] = await db.promise().query(
      'SELECT * FROM admin WHERE email = ?',
      [email]
    );

    if (admins.length === 0) {
      return res.status(401).json({ erro: 'E-mail ou senha inválidos' });
    }

    const admin = admins[0];

    const senhaCorreta = await bcrypt.compare(senha, admin.senha);
    if (!senhaCorreta) {
      return res.status(401).json({ erro: 'E-mail ou senha inválidos' });
    }

    const token = jwt.sign(
      { id: admin.id, tipo: 'admin', nome: admin.nome, email: admin.email, isAdmin: true },
      JWT_SECRET,
      { expiresIn: '2h' }
    );


    res.json({ mensagem: 'Login realizado com sucesso', token });
  } catch (error) {
    res.status(500).json({ erro: 'Erro no login', detalhe: error.message });
  }
};

export const cadastrarMedico = async (req, res) => {
  try {
    
    if (!req.usuario || !req.usuario.isAdmin) {
      return res.status(403).json({ erro: 'Acesso negado' });
    }

    const { nome, crm, especialidades, duracao_consulta, email, telefone, senha } = req.body;

    
    if (!nome || !crm || !especialidades || !duracao_consulta || !email || !senha) {
      return res.status(400).json({ erro: 'Preencha todos os campos obrigatórios' });
    }

    
    const senhaCriptografada = await bcrypt.hash(senha, 10);

    const [result] = await db.promise().query(
      'INSERT INTO medicos (nome, crm, especialidades, duracao_consulta, email, telefone, senha) VALUES (?, ?, ?, ?, ?, ?, ?)',
      [nome, crm, especialidades, duracao_consulta, email, telefone || null, senhaCriptografada]
    );

    res.status(201).json({ mensagem: 'Médico cadastrado com sucesso', id: result.insertId });
  } catch (erro) {
    console.error(erro);
    res.status(500).json({ erro: 'Erro ao cadastrar médico' });
  }
};

export const cadastrarAssistente = async (req, res) => {
  try {
    if (!req.usuario || !req.usuario.isAdmin) {
      return res.status(403).json({ erro: 'Acesso negado' });
    }

    const { nome, email, senha } = req.body;

    if (!nome || !email || !senha) {
      return res.status(400).json({ erro: 'Preencha todos os campos obrigatórios' });
    }

    const senhaCriptografada = await bcrypt.hash(senha, 10);

    const [result] = await db.promise().query(
      'INSERT INTO assistentes (nome, email, senha) VALUES (?, ?, ?)',
      [nome, email, senhaCriptografada]
    );

    res.status(201).json({ mensagem: 'Assistente cadastrado com sucesso', id: result.insertId });
  } catch (erro) {
    console.error(erro);
    res.status(500).json({ erro: 'Erro ao cadastrar assistente' });
  }
};




export const obterPerfilAdmin = async (req, res) => {
  const id = req.usuario.id;

  try {
    const [rows] = await db.promise().query('SELECT id, nome, email FROM admin WHERE id = ?', [id]);
    if (rows.length === 0) return res.status(404).json({ erro: 'Admin não encontrado' });

    res.json(rows[0]);
  } catch (error) {
    console.error("Erro ao buscar perfil do admin:", error);
    res.status(500).json({ erro: 'Erro ao buscar perfil do admin', detalhe: error.message });
  }
};