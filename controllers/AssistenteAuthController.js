import db from '../config/db.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const JWT_SECRET = 'chave-secreta';

export const loginAssistente = async (req, res) => {
  const { email, senha } = req.body;

  try {
    const [assistentes] = await db.promise().query(
      'SELECT * FROM assistentes WHERE email = ?',
      [email]
    );

    if (assistentes.length === 0) {
      return res.status(401).json({ erro: 'E-mail ou senha inválidos' });
    }

    const assistente = assistentes[0];

    const senhaCorreta = await bcrypt.compare(senha, assistente.senha);
    if (!senhaCorreta) {
      return res.status(401).json({ erro: 'E-mail ou senha inválidos' });
    }

    const token = jwt.sign(
      {
        id: assistente.id,
        tipo: 'assistente',
        nome: assistente.nome,
        email: assistente.email,
        isAssistente: true,
      },
      JWT_SECRET,
      { expiresIn: '2h' }
    );

    res.json({ mensagem: 'Login realizado com sucesso', token });
  } catch (error) {
    res.status(500).json({ erro: 'Erro no login', detalhe: error.message });
  }
};
