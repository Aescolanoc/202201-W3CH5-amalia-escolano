import { screen } from "@testing-library/dom";
import { getPokemons } from "../services/api.js";
import { Details } from "./details.js";

// jest.mock("../services/api.js");

// getPokemons.mockResolvedValue([
//   {
//     id: 39,
//     name: "jigglypuff",
//     weight: 55,
//     image: "link to test",
//     experience: 95,
//     type: "normal",
//     url: "link to test",
//   },
//   {
//     id: 6,
//     name: "charizard",
//     weight: 905,
//     image: "link to test",
//     experience: 240,
//     type: "fire",
//     url: "link to test",
//   },
// ]);

global.fetch = jest.fn().mockResolvedValue({
  json: () =>
    Promise.resolved([
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
    ]),
});

describe("testing Details", () => {
  test("Then it should be rendered", async () => {
    document.body.innerHTML =
      "<section id='pokemon-details' class='details'></section>";
    const DetailsComponent = new Details("#pokemon-details");
    new Details("#pokemon-list");
    expect(DetailsComponent).toBeDefined();
  });

  test("Testing if button Add to favorites button is rendered, should be rendered", () => {
    document.body.innerHTML =
      "<section id='pokemon-details' class='details'></section>";
    new Details("#pokemon-details");
    expect(
      screen.findByRole("button", { name: "Add To Favorites" })
    ).toBeTruthy();
  });

  test("Testing if button remove from favorites button is rendered, should be rendered", () => {
    document.body.innerHTML =
      "<section id='pokemon-details' class='details'></section>";
    new Details("#pokemon-details");
    expect(
      screen.findByRole("button", { name: "Remove from favorites" })
    ).toBeTruthy();
  });
});
