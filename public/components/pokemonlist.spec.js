import { screen } from "@testing-library/dom";
import { PokemonList } from "./pokemonlist.js";

global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () =>
      Promise.resolve(
        {
          name: "bulbasaur",
          url: "https://pokeapi.co/api/v2/pokemon/1/",
          image:
            "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png",
        },
        {
          name: "bulbasaur",
          url: "https://pokeapi.co/api/v2/pokemon/1/",
          image:
            "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png",
        }
      ),
  })
);

describe("testing PokemonList", () => {
  test("Testing is rendered, should be Ok", () => {
    new PokemonList().render("#pokemon-list");

    expect(screen.getByText(/POKEMON API/i)).toBeTruthy();
  });
});
