import CardDto from '../domain/dtos/cardDto'
import moment from 'moment-timezone'
const expiresIn = 60 * 15 * 1000
class ReadCardByTokenQuery {
  cardRepository: any;
  constructor (cardRepository: any) {
    this.cardRepository = cardRepository
  }

  async execute (token : string) : Promise<CardDto> {
    const card = await this.cardRepository.findOneByToken(token);
    if (!card) throw new Error("No card found");
    if (this.tokenIsExpired(card.createdDate)) throw new Error("Token is expired");
    return new CardDto(card);
  }

  tokenIsExpired (createdDate : Date) : boolean {
    const timestamp = new Date(createdDate).getTime();
    const dateLimit = new Date(timestamp + expiresIn);
    const todayDate = moment.tz(new Date(), "America/Lima");
    const today = new Date(todayDate.format())
    console.log(createdDate, dateLimit, today)
    let isValid = true;
    if (today <= dateLimit) isValid = false;
    return isValid
  }
}

export default ReadCardByTokenQuery
