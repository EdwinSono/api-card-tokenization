import { FastifyRequest, FastifyReply } from 'fastify';
import {CardRepository} from '../../../infra/repositories/cardRepository'
import GenerateCardTokenCommand from '../../../commands/generateCardTokenCommand'
import ReadCardByTokenQuery from '../../../queries/readCardByTokenQuery'
import ResponseHttp from '../middlewares/responseHttp'

class CardController {
  async generateCardToken (request: FastifyRequest, reply: FastifyReply) {
    const responseHttp = new ResponseHttp(200)
    const parameters = request.body || request.query
    const cardRepository = new CardRepository()
    const generateCardTokenCommand: any = new GenerateCardTokenCommand(cardRepository)
    const data = await generateCardTokenCommand.execute(parameters)
    console.log("generateCardToken", data)
    if (data.error) {
      const statusCode = (data.error.indexOf("Bad Request") >= 0) ? 400 : 500; 
      responseHttp.setCode(statusCode)
    }
    responseHttp.data = data
    return reply
      .code(responseHttp.code)
      .send(responseHttp.data)
  }

  async readCardByToken (request: FastifyRequest, reply: FastifyReply) {
    const responseHttp = new ResponseHttp(200)
    try {
      const parameters = request.headers
      const token = parameters['authorization']?.toString().replace('Bearer ', '');
      if (!token) throw new Error('Token is invalid');

      const cardRepository = new CardRepository()
      const readCardByTokenQuery: any = new ReadCardByTokenQuery(cardRepository)
      const data = await readCardByTokenQuery.execute(token)
      if (data.error) responseHttp.setCode(500)
      responseHttp.data = data
      return reply
        .code(responseHttp.code)
        .send(responseHttp.data)
    } catch (error: any) {
      responseHttp.setCode(500)
      const message = error.message
      responseHttp.data = message
      if (message.indexOf('No card found') >= 0) responseHttp.setCode(404)
      if (message.indexOf('Token is expired') >= 0) responseHttp.setCode(401)
      reply
        .code(responseHttp.code)
        .send(responseHttp.data)
    }
  }
}

export default CardController
