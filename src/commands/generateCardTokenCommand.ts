import Card from '../domain/entities/card'
import ICard from '../domain/interfaces/iCard'

class GenerateCardTokenCommand {
  cardRepository: any;
  constructor (cardRepository: any) {
    this.cardRepository = cardRepository
  }

  async execute (card : ICard) : Promise<ICard | any> {
    try {
      const cardValidated = await this.validCardData(card);
      const cardSaved = await this.cardRepository.insert(cardValidated);
      return {
        token: cardSaved.token
      }
    } catch (error: any) {
      return {error: error.message}
    }
  }

  async validCardData (data: ICard) : Promise<any> {
    const card = new Card(data);
    if (!card.emailIsValid()) throw new Error('Bad Request: Email no is valid');
    if (!card.cvvIsValid()) throw new Error('Bad Request: CVV no is valid');
    if (!card.monthIsValid()) throw new Error('Bad Request: Expiration month no is valid');
    if (!card.yearIsValid()) throw new Error('Bad Request: Expiration year no is valid');
    if (!card.luhnFormatCheck()) throw new Error('Bad Request: Card number no is valid');
    card.createCardToken()
    return card
  }
}

export default GenerateCardTokenCommand
