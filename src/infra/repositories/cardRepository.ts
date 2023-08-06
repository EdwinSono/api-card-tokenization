import { Card } from "../db/entities/cardEntity";
import { dataSource } from '../db/dbConnect'

export class CardRepository {
  cardRepository: any;

  constructor(){
    this.cardRepository = dataSource.getRepository(Card)
  }

  async insert (item: any) {
    const card = new Card()
    card.email = item.email
    card.cvv = item.cvv
    card.card_number = item.card_number
    card.expiration_year = item.expiration_year
    card.expiration_month = item.expiration_month
    card.token = item.token
    card.status = "active"

    return await this.cardRepository.save(card);
  }

  async findOneByToken (token: string) {
    return await this.cardRepository.findOneBy({
      token: token,
    })
  }

}
