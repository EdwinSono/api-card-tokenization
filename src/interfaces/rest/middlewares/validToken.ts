import jwt, { Secret, JwtPayload } from 'jsonwebtoken';
import { FastifyRequest, FastifyReply } from 'fastify';
import config from '../../../config';

export const SECRET_KEY: Secret = config.apiSecretToken;

export interface CustomRequest extends FastifyRequest {
  token: string | JwtPayload;
}

export const auth = async (request: FastifyRequest, reply: FastifyReply, done: any) => {
 try {
    const token = request.headers['authorization']?.toString().replace('Bearer ', '');

    if (!token) throw new Error('Token is invalid');

    const decoded = jwt.verify(token, SECRET_KEY);
   
    (request as CustomRequest).token = decoded;
    done()
 } catch (err: any) {
  console.log(err.message)
  reply.code(401).send('Please authenticate');
 }
};
