import {
  validaFormatoNumericoDoLance,
  validaLance,
} from "../../../src/negocio/validadores/lance";

const {
  VALIDO,
  INVALIDO,
  MENOR_QUE_VALOR_INICIAL,
  MENOR_OU_IGUAL_AOS_LANCES,
} = require("../../../src/negocio/constantes/estadosLance");

describe("negocio/validadores/lance", () => {
  describe("validaFormatoNumericoDoLance", () => {
    it("deve retornar VALIDO para um valor numérico válido", () => {
      const resultado = validaFormatoNumericoDoLance("199,99");

      expect(resultado).toBe(VALIDO); // Formato numérico é válido
    });

    it("deve retornar INVALIDO para um valor numérico inválido", () => {
      const resultado = validaFormatoNumericoDoLance("a99,99");

      expect(resultado).toBe(INVALIDO); // Formato numérico é inválido
    });
  });

  describe("validaLance", () => {
    it("deve retornar VALIDO para um lance maior ou igual ao valor inicial", () => {
      const resultado = validaLance(150, { lances: [], valorInicial: 100 });
      expect(resultado).toBe(VALIDO);
    });
    it("deve retornar MENOR_QUE_VALOR_INICIAL para um lance menor que o valor inicial", () => {
      const resultado = validaLance(50, { lances: [], valorInicial: 100 });
      expect(resultado).toBe(MENOR_QUE_VALOR_INICIAL);
    });

    it("deve retornar MENOR_OU_IGUAL_AOS_LANCES para um lance menor ou igual aos lances existentes", () => {
      const resultado = validaLance(100, {
        lances: [{ valor: 150 }, { valor: 200 }],
        valorInicial: 100,
      });
      expect(resultado).toBe(MENOR_OU_IGUAL_AOS_LANCES);
    });

    it("deve retornar VALIDO para um lance maior que os lances existentes", () => {
      const resultado = validaLance(250, {
        lances: [{ valor: 150 }, { valor: 200 }],
        valorInicial: 100,
      });
      expect(resultado).toBe(VALIDO);
    });
  });
});
