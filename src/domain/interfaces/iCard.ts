
interface ICard {
  email: string;
  card_number: string;
  cvv: string;
  expiration_year: string;
  expiration_month: string;
  status?: string;
  createdDate?: Date;
  updatedDate?: Date;
}
 
export default ICard;
