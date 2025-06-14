import jwt from 'jsonwebtoken';

const JWT_SECRET = 'chave-secreta';

function verificarToken(req, res) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    res.status(401).json({ erro: 'Token não fornecido' });
    return null;
  }

  try {
    return jwt.verify(token, JWT_SECRET);
  } catch (err) {
    res.status(403).json({ erro: 'Token inválido' });
    return null;
  }
}

export const autenticarToken = (req, res, next) => {
  const usuario = verificarToken(req, res);
  if (!usuario) return;

  if (!usuario.id || !usuario.tipo) {
    return res.status(403).json({ erro: 'Token inválido ou incompleto' });
  }

  req.usuario = {
    id: usuario.id,
    tipo: usuario.tipo,
    nome: usuario.nome,
    email: usuario.email
  };

  next();
};

export const autenticarAdmin = (req, res, next) => {
  const usuario = verificarToken(req, res);
  if (!usuario) return;

  if (usuario.tipo !== 'admin') {
    return res.status(403).json({ erro: 'Acesso restrito a administradores' });
  }

  req.admin = usuario;
  next();
};

export const apenasAdmin = (req, res, next) => {
  const usuario = req.usuario;
  if (!usuario || usuario.tipo !== 'admin') {
    return res.status(403).json({ erro: 'Acesso restrito ao administrador' });
  }
  next();
};
