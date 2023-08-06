import ICard from '../interfaces/iCard'

class CardDto {
  email: string;
  card_number: string;
  expiration_year: string;
  expiration_month: string;

  constructor (data: ICard) {
    this.email = data.email;
    this.card_number = data.card_number;
    this.expiration_year = data.expiration_year;
    this.expiration_month = data.expiration_month;
  }

}
 
export default CardDto;
