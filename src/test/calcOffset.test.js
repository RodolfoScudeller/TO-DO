const calcOffset = require('../utils/calcOffset');

describe('Testing calcOffset', () => {
  test('Deve retornar 0 quando page e pageSize são ambos 0', () => {
    const result = calcOffset(0, 0);
    expect(result).toBe(0);
  });

  test('Deve retornar 0 quando page é menor ou igual a 0', () => {
    const result = calcOffset(0, 10);
    expect(result).toBe(0);
  });

  test('Deve calcular o offset corretamente quando page é maior que 0', () => {
    const result = calcOffset(2, 10);
    expect(result).toBe(10);
  });
});
