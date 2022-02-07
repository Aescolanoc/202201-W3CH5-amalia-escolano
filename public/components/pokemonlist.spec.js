import { screen } from "@testing-library/dom";
import { PokemonList } from "./pokemonlist.js";
import { getPokemons } from "../services/api.js";

jest.mock("../services/api.js");

getPokemons.mockResolvedValue([
  {
    id: 39,
    name: "jigglypuff",
    weight: 55,
    image: "link to test",
    experience: 95,
    type: "normal",
    url: "link to test",
  },
  {
    id: 6,
    name: "charizard",
    weight: 905,
    image: "link to test",
    experience: 240,
    type: "fire",
    url: "link to test",
  },
]);

describe("testing PokemonList", () => {
  test("Then it should be rendered", async () => {
    document.body.innerHTML = "<section id='pokemon-list'></section>";
    const PokemonListComponent = new PokemonList("#pokemon-list");
    new PokemonList("#pokemon-list");
    expect(PokemonListComponent).toBeDefined();
  });

  test("Testing if button preview is rendered, should be rendered", () => {
    document.body.innerHTML = "<section id='pokemon-list'></section>";
    new PokemonList("#pokemon-list");
    expect(screen.findByRole("button", { name: "Preview" })).toBeTruthy();
  });

  test("Testing if button next is rendered, should be rendered", () => {
    document.body.innerHTML = "<section id='pokemon-list'></section>";
    new PokemonList("#pokemon-list");
    expect(screen.findByRole("button", { name: "Next" })).toBeTruthy();
  });
});
