import jwt, { Secret } from 'jsonwebtoken';
import config from '../config';

export const SECRET_KEY: Secret = config.apiSecretToken;
const expiresIn = 60 * 15

export const signToken = (payload: object) : object | unknown => {
  const encoded = jwt.sign(payload, SECRET_KEY, { expiresIn: expiresIn });
  return encoded;
}

export const verifyToken = (token = "") => {
  const decoded = jwt.verify(token, SECRET_KEY);
  return decoded;
}

// const payload = {
//   "company": "culqi",
//   "project": "card-tokenization",
//   "name": "Edwin Sono",
//   "iat": 1516239022
// }
// signToken(payload)
// verifyToken()
