import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import 'dotenv/config.js';

export const hashPassword = (password) => {
  const saltRounds = 10;
  const hashedPassword = bcrypt.hashSync(password, saltRounds);
  return hashedPassword;
};

export const getToken = (user) => {
  return jwt.sign(
    {
      _id: user._id,
      name: user.name,
      email: user.email,
    },
    process.env.JWT_SECRET || 'secret',
    {
      expiresIn: '24h',
    }
  );
};
