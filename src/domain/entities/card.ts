import ICard from '../interfaces/iCard'
import {isLuhnValid} from '../../infra/luhn'

class Card implements ICard {
  email: string;
  card_number: string;
  cvv: string;
  expiration_year: string;
  expiration_month: string;
  token: string;

  constructor (data: ICard) {
    this.email = data.email;
    this.card_number = data.card_number;
    this.cvv = data.cvv;
    this.expiration_year = data.expiration_year;
    this.expiration_month = data.expiration_month;
  }

  emailIsValid() : boolean {
    let isValid = false;
    const email = this.email;
    const string = email.split("@");
    const domain = string[string.length - 1]
    const domains = ["gmail.com", "hotmail.com", "yahoo.es"];
    // eslint-disable-next-line no-useless-escape
    const regex = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
    if (regex.test(email) && domains.includes(domain)) isValid = true;
    return isValid
  }

  cvvIsValid () : boolean {
    let isValid = false;
    const cvv = this.cvv;
    const length = cvv.length
    if (length === 3 || length === 4) isValid = true;
    return isValid
  }

  monthIsValid () : boolean {
    let isValid = false;
    const month = Number(this.expiration_month);
    if (month > 0 && month <= 12) isValid = true;
    return isValid
  }

  yearIsValid () : boolean {
    let isValid = false;
    const year = Number(this.expiration_year);
    const length = year.toString().length
    const yearCurrent = new Date().getFullYear()
    const yearLimit = yearCurrent + 5
    if (length === 4 && (year >= yearCurrent && year <= yearLimit)) {
      isValid = true;
    }
    return isValid
  }

  luhnFormatCheck () : boolean {
    return isLuhnValid(this.card_number);
  }

  createCardToken(length = 16): void {
    const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    const charLength = chars.length;
    let result = '';
    for (let i = 0; i < length; i++ ) {
       result += chars.charAt(Math.floor(Math.random() * charLength));
    }
    this.token = result
  }
}
 
export default Card;
