import Card from '../../src/domain/entities/card';

describe('Card', () => {
  const validCardData = {
    "email": "edwinsono@gmail.com",
    "card_number": "4624748233249780",
    "cvv": "159",
    "expiration_year": "2026",
    "expiration_month": "05"
  };

  let card: Card;

  beforeEach(() => {
    // Crea una nueva instancia de Card antes de cada prueba
    card = new Card(validCardData);
  });

  it('emailIsValid - debería retornar true para un email válido', () => {
    expect(card.emailIsValid()).toBe(true);
  });

  it('emailIsValid - debería retornar false para un email inválido', () => {
    card.email = 'invalid-email';
    expect(card.emailIsValid()).toBe(false);
  });

  it('cvvIsValid - debería retornar true para un CVV válido', () => {
    expect(card.cvvIsValid()).toBe(true);
  });

  it('cvvIsValid - debería retornar false para un CVV inválido', () => {
    card.cvv = '12'; // Longitud inválida
    expect(card.cvvIsValid()).toBe(false);
  });

  it('monthIsValid - debería retornar true para un mes válido', () => {
    expect(card.monthIsValid()).toBe(true);
  });

  it('monthIsValid - debería retornar false para un mes inválido', () => {
    card.expiration_month = '13'; // Mes inválido
    expect(card.monthIsValid()).toBe(false);
  });

  it('yearIsValid - debería retornar true para un año válido', () => {
    expect(card.yearIsValid()).toBe(true);
  });

  it('yearIsValid - debería retornar false para un año inválido', () => {
    card.expiration_year = '2019'; // Año pasado
    expect(card.yearIsValid()).toBe(false);
  });

  it('luhnFormatCheck - debería retornar true para un número de tarjeta válido', () => {
    expect(card.luhnFormatCheck()).toBe(true);
  });

  it('luhnFormatCheck - debería retornar false para un número de tarjeta inválido', () => {
    card.card_number = '4111111111111112'; // Número de tarjeta inválido
    expect(card.luhnFormatCheck()).toBe(false);
  });

  it('createCardToken - debería generar un token con la longitud predeterminada', () => {
    card.createCardToken();
    expect(card.token).toHaveLength(16);
  });

  it('createCardToken - debería generar un token con la longitud proporcionada', () => {
    card.createCardToken(10);
    expect(card.token).toHaveLength(10);
  });
});
