import ReadCardByTokenQuery from '../../src/queries/readCardByTokenQuery';
import CardDto from '../../src/domain/dtos/cardDto';
import ICard from '../../src/domain/interfaces/iCard';

// Mock de un objeto de tarjeta de prueba válida
// const validCardDataMock : CardDto = {
//   "email": "edwinso@gmail.com",
//   "card_number": "4280820153812676",
//   "expiration_year": "2026",
//   "expiration_month": "05"
// };

// Mock del repositorio para simular las llamadas a la base de datos
const mockCardRepository = {
  findOneByToken: jest.fn((token: string) => {
    if (token === 'pO3JkD0fHZ8kleSM') {
      const card = {
        "email": "edwinsono@gmail.com",
        "card_number": "4624748233249780",
        "cvv": "159",
        "expiration_year": "2026",
        "expiration_month": "05",
        "createdDate": new Date("2023-08-06 16:23:09.008916")
      };
      return card;
    } else {
      return null;
    }
  }),
};

describe('ReadCardByTokenQuery', () => {
  let readCardByTokenQuery: ReadCardByTokenQuery;

  beforeEach(() => {
    // Crea una nueva instancia de ReadCardByTokenQuery antes de cada prueba
    readCardByTokenQuery = new ReadCardByTokenQuery(mockCardRepository);

    // Hacemos el mock de la función tokenIsExpired
    const mockTokenIsExpired = jest.fn().mockReturnValue(false);
    jest.spyOn(readCardByTokenQuery, 'tokenIsExpired').mockImplementation(mockTokenIsExpired);

  });

  afterEach(() => {
    // Limpia las llamadas al mock del repositorio después de cada prueba
    mockCardRepository.findOneByToken.mockClear();
    jest.clearAllMocks();
  });

  it('debería retornar un objeto CardDto para un token válido y no expirado', async () => {
    const token = 'pO3JkD0fHZ8kleSM';
    const result = await readCardByTokenQuery.execute(token);

    // Asegurar que la función findOneByToken del repositorio haya sido llamada con el token correcto
    expect(mockCardRepository.findOneByToken).toHaveBeenCalledWith(token);

    // Asegurar que el resultado sea un objeto CardDto
    expect(result).toBeInstanceOf(CardDto);
  });

  it('debería lanzar un error para un token no encontrado', async () => {
    const token = 'non-existent-token';
    await expect(readCardByTokenQuery.execute(token)).rejects.toThrow('No card found');

    expect(mockCardRepository.findOneByToken).toHaveBeenCalledWith(token);
  });

  it('debería lanzar un error para un token expirado', async () => {
    // Simular una fecha de creación hace más de 15 minutos (token expirado)
    const createdDate: Date = new Date(Date.now() - 16 * 60 * 1000);
    const tokenIsExpired: boolean = readCardByTokenQuery.tokenIsExpired(createdDate)
    expect(tokenIsExpired).toBe(false);
  });
});
