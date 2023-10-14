import { formataMaiorLanceDoLeilao } from "../../../src/negocio/formatadores/lance";

describe("negocio/formatadores/lance", () => {
  describe("formataMaiorLanceDoLeilao", () => {
    it("Deve retornar o maior lance de um leilão", () => {
      const lances = [{ valor: 100 }, { valor: 200 }, { valor: 150 }];
      const valorInicial = 10;

      const maiorLance = formataMaiorLanceDoLeilao(lances, valorInicial);

      expect(maiorLance).toBe(200); // O maior lance é 200
    });
  });

  it("Deve retornar o valor inicial se não houver lances", () => {
    const lances = [];
    const valorInicial = 1000;

    const maiorLance = formataMaiorLanceDoLeilao(lances, valorInicial);

    expect(maiorLance).toBe(1000); // Não há lances, deve retornar o valor inicial
  });
});
