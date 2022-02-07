import { Component } from "./component.js";
import { getPokemons } from "../services/api.js";
import { myPokemons } from "./favorites.js";

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

describe("testing Favorites", () => {
  test("Then it should be rendered", async () => {
    document.body.innerHTML = "<section id='my-pokemon'></section>";
    const FavoritesComponent = new myPokemons("#my-pokemon");
    new myPokemons("#my-pokemon");
    expect(FavoritesComponent).toBeDefined();
  });
});
