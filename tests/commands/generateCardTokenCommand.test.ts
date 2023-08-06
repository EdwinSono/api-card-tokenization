import GenerateCardTokenCommand from '../../src/commands/generateCardTokenCommand';
import ICard from '../../src/domain/interfaces/iCard'

// Mock del repositorio para simular las llamadas a la base de datos
const mockCardRepository = {
  insert: jest.fn(() => {return { token: 'mocked-token' }})
};

// Mock de un objeto de tarjeta de prueba válida
const validCardDataMock : ICard = {
  "email": "edwinsono@gmail.com",
  "card_number": "4624748233249780",
  "cvv": "159",
  "expiration_year": "2026",
  "expiration_month": "05"
};

// Mock de un objeto de tarjeta de prueba inválida (sin email válido)
const invalidCardDataMock: ICard = {
  "email": "edwinsono@gmail.com",
  "card_number": "4624748233234480",
  "cvv": "159",
  "expiration_year": "2026",
  "expiration_month": "05"
};

describe('GenerateCardTokenCommand', () => {
  let generateCardTokenCommand: GenerateCardTokenCommand;

  beforeEach(() => {
    // Crea una nueva instancia de GenerateCardTokenCommand antes de cada prueba
    generateCardTokenCommand = new GenerateCardTokenCommand(mockCardRepository);

    // Hacemos el mock de la función tokenIsExpired
    const mockValidCardData = jest.fn().mockReturnValue(validCardDataMock);
    jest.spyOn(generateCardTokenCommand, 'validCardData').mockImplementation(mockValidCardData);
  });

  afterEach(() => {
    // Limpia las llamadas al mock del repositorio después de cada prueba
    mockCardRepository.insert.mockClear();
  });

  it('debería generar un token para una tarjeta válida', async () => {
    // Supongamos que la función de validación no lanza ninguna excepción
    generateCardTokenCommand.validCardData = jest.fn().mockResolvedValueOnce(validCardDataMock);

    const result = await generateCardTokenCommand.execute(validCardDataMock);
    expect(result).toEqual({ token: 'mocked-token' });
    expect(mockCardRepository.insert).toHaveBeenCalledWith(validCardDataMock);
  });

  it('debería devolver un objeto con error: Email no is valid', async () => {
    // Simulamos que la función de validación lanza una excepción (por ejemplo, email no válido)
    generateCardTokenCommand.validCardData = jest.fn().mockRejectedValueOnce(new Error('Bad Request: Email no is valid'));

    const result = await generateCardTokenCommand.execute(invalidCardDataMock);
    expect(result).toEqual({ error: 'Bad Request: Email no is valid' });
    expect(mockCardRepository.insert).not.toHaveBeenCalled();
  });

  it('debería devolver un objeto con error: Email no is valid', async () => {
    // Simulamos que la función de validación lanza una excepción (por ejemplo, email no válido)
    generateCardTokenCommand.validCardData = jest.fn().mockRejectedValueOnce(new Error('Bad Request: Email no is valid'));

    const result = await generateCardTokenCommand.execute(invalidCardDataMock);
    expect(result).toEqual({ error: 'Bad Request: Email no is valid' });
    expect(mockCardRepository.insert).not.toHaveBeenCalled();
  });

  it('debería devolver un objeto con error: CVV no is valid', async () => {
    generateCardTokenCommand.validCardData = jest.fn().mockRejectedValueOnce(new Error('Bad Request: CVV no is valid'));

    const result = await generateCardTokenCommand.execute(invalidCardDataMock);
    expect(result).toEqual({ error: 'Bad Request: CVV no is valid' });
    expect(mockCardRepository.insert).not.toHaveBeenCalled();
  });

  it('debería devolver un objeto con error: Expiration month no is valid', async () => {
    generateCardTokenCommand.validCardData = jest.fn().mockRejectedValueOnce(new Error('Bad Request: Expiration month no is valid'));

    const result = await generateCardTokenCommand.execute(invalidCardDataMock);
    expect(result).toEqual({ error: 'Bad Request: Expiration month no is valid' });
    expect(mockCardRepository.insert).not.toHaveBeenCalled();
  });

});
