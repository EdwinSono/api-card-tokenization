import Fastify from 'fastify'
import { FastifyRequest, FastifyReply } from 'fastify';
import baseRouter from './routes/index';

const homeController = (request: FastifyRequest, reply: FastifyReply) => {
  const data = { hello: 'API Card Token v1.0.0' }
  return reply
    .code(200)
    .send(data)
}

const buildServer = async () => {
  const server = Fastify({
    logger: true
  })

  server.get('/', homeController)

  server.register(baseRouter, { prefix: '/api/v1' })
  
  server.listen({ port: 3000 }, (err, address) => {
    if (err) throw err

    console.log(`Server listening at ${address}`)
  })

  return server
}

export default buildServer
