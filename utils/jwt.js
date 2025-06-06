import jwt from 'jsonwebtoken';

const JWT_SECRET = '45127';

export const gerarToken = (payload) => {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: '1h' });
};

export const verificarToken = (token) => {
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch (err) {
    return null;
  }
};
