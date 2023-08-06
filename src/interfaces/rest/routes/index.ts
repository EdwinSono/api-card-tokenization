
import CardController from '../controllers/cardController'
// import {auth} from '../middlewares/validToken'

const baseRouter = async (server: any, opts: any, done: any) => {
  const cardController = new CardController()

  // server.post('/card', { preValidation: auth}, cardController.generateCardToken)
  server.post('/card', cardController.generateCardToken)
  server.get('/card', cardController.readCardByToken)

  done()
}

export default baseRouter;
