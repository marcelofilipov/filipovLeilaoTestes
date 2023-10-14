import { obtemLeiloes, obtemLeilao } from "../../src/repositorio/leilao";
import apiLeiloes from "../../src/servicos/apiLeiloes";

jest.mock("../../src/servicos/apiLeiloes");

const mockLeiloes = [
  {
    id: 1,
    nome: "Leilão 1",
    descricao: "Descrição do leilão 1",
  },
  {
    id: 2,
    nome: "Leilão 2",
    descricao: "Descrição do leilão 2",
  },
];

const mockLeilao = {
  id: 1,
  nome: "Leilão 1",
  descricao: "Descrição do leilão 1",
};

const mockLeilaoId = 1;

describe("respositorio/leilao", () => {
  beforeEach(() => {
    apiLeiloes.get.mockClear();
  });

  describe("obtemLeiloes", () => {
    it("deve retornar uma lista de leilões", async () => {
      jest.spyOn(apiLeiloes, "get").mockResolvedValue({ data: mockLeiloes });

      const leiloes = await obtemLeiloes();
      expect(leiloes).toEqual(mockLeiloes);

      expect(apiLeiloes.get).toHaveBeenCalledWith("/leiloes");
      expect(apiLeiloes.get).toHaveBeenCalledTimes(1);
    });

    it("deve retornar uma lista vazia quando a requisição falhar", async () => {
      jest
        .spyOn(apiLeiloes, "get")
        .mockRejectedValue(new Error("Erro ao tentar obter lista de leilões"));

      const leiloes = await obtemLeiloes();
      expect(leiloes).toEqual([]);

      expect(apiLeiloes.get).toHaveBeenCalledWith("/leiloes");
      expect(apiLeiloes.get).toHaveBeenCalledTimes(1);
    });
  });

  describe("obtemLeilao", () => {
    it("deve retornar um único leilão", async () => {
      jest.spyOn(apiLeiloes, "get").mockResolvedValue({ data: mockLeilao });

      const leilao = await obtemLeilao(mockLeilaoId);
      expect(leilao).toEqual(mockLeilao);

      expect(apiLeiloes.get).toHaveBeenCalledWith("/leiloes/1");
      expect(apiLeiloes.get).toHaveBeenCalledTimes(1);

      jest.restoreAllMocks();
    });

    it("deve lidar com erro ao tentar obter um único leilão", async () => {
      jest
        .spyOn(apiLeiloes, "get")
        .mockRejectedValue(new Error("Erro ao tentar obter leilão"));

      const leilao = await obtemLeilao(mockLeilaoId);
      expect(leilao).toEqual({});

      expect(apiLeiloes.get).toHaveBeenCalledWith("/leiloes/1");
      expect(apiLeiloes.get).toHaveBeenCalledTimes(1);

      jest.restoreAllMocks();
    });
  });
});
