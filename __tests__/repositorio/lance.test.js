import { obtemLancesDoLeilao } from "../../src/repositorio/lance";
import apiLeiloes from "../../src/servicos/apiLeiloes";

const mockLances = [
  {
    valor: 1000,
    leilaoId: 1,
    id: 1,
  },
  {
    valor: 1000.01,
    leilaoId: 1,
    id: 2,
  },
];

const mockLeilaoId = 1;

describe("respositorio/lance", () => {
  describe("obtemLancesDoLeilao", () => {
    it("deve retornar lances do leilão", async () => {
      jest.spyOn(apiLeiloes, "get").mockResolvedValue({ data: mockLances });

      const lances = await obtemLancesDoLeilao(mockLeilaoId);
      expect(lances).toEqual(mockLances);

      expect(apiLeiloes.get).toHaveBeenCalledWith(
        "/lances?leilaoId=1&_sort=valor&_order=desc"
      );
      expect(apiLeiloes.get).toHaveBeenCalledTimes(1);

      jest.restoreAllMocks();
    });

    it("deve retornar uma lista de lances vazia quando a requisição falhar", async () => {
      jest
        .spyOn(apiLeiloes, "get")
        .mockRejectedValue(new Error("Erro ao tentar obter lista de leilões"));

      const lances = await obtemLancesDoLeilao(9);
      expect(lances).toEqual([]);

      expect(apiLeiloes.get).toHaveBeenCalledWith(
        "/lances?leilaoId=9&_sort=valor&_order=desc"
      );
      expect(apiLeiloes.get).toHaveBeenCalledTimes(1);

      jest.restoreAllMocks();
    });
  });
});
