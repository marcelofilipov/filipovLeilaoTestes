import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
//import { NavigationContainer } from "@react-navigation/native";
//import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Leilao from "../../../../src/telas/ListaLeiloes/componentes/Leilao";

// Mock do objeto de navegação
jest.mock("@react-navigation/native", () => ({
  useNavigation: () => ({ navigate: jest.fn() }),
}));

describe("telas/ListaLeiloes/componentes/Leilao", () => {
  describe("renderiza corretamento o componente Leilao", () => {
    it("mostra o nome do produto leiloado", () => {
      const { getByText } = render(
        <Leilao
          id="1"
          nome="Notebook Penovo"
          valorInicial={1000.0}
          icone="laptop"
          cor="#ffda05"
        />
      );

      expect(getByText("Notebook Penovo")).toBeTruthy();
    });

    it("mostra o valor inicial do produto leiloado", () => {
      const { getByText } = render(
        <Leilao
          id="1"
          nome="Notebook Penovo"
          valorInicial={1000.0}
          icone="laptop"
          cor="#ffda05"
        />
      );

      expect(getByText("R$ 1.000,00")).toBeTruthy();
    });
  });
});
