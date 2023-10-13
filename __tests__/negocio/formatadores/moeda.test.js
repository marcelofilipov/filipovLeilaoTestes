import {
  formataBrasileiroParaDecimal,
  formataDecimalParaReal,
} from "../../../src/negocio/formatadores/moeda";

describe("negocio/formatadores/moeda", () => {
  describe("formataBrasileiroParaDecimal", () => {
    it("deve retornar 9.87 quando o valor for '9,87'", () => {
      const resultado = formataBrasileiroParaDecimal("9,87");
      expect(resultado).toBe(9.87);
    });
  });

  describe("formataDecimalParaReal", () => {
    it("deve retornar R$ 7,59 quando o valor for 7.59", () => {
      const resultado = formataDecimalParaReal(7.59);
      expect(resultado).toMatch(/R\$\s7,59/);
    });
  });
});
