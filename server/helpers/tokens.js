
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

export const generateAuthToken = (id, phone, email) => {
  const token = jwt.sign({
    Id: id,
    userPhone: phone,
    userEmail: email,
  },
  process.env.SECRETEKEY, { expiresIn: '1d' });
  return token;
};
export const userIdFromToken = (token) => {
  const mytoken = jwt.verify(token, process.env.SECRETEKEY);

  return mytoken.Id;
};
