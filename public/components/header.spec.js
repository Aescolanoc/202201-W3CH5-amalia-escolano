import { screen } from "@testing-library/dom";
import { Header } from "./header.js";

describe("testing Header", () => {
  test("Testing if h1 is rendered, should be POKEMON API", () => {
    document.body.innerHTML = "<header id='header'></header>";
    new Header().render("#header");
    expect(screen.getByText(/POKEMON API/i)).toBeTruthy();
  });

  test("Testing if menu is rendered, should be anchor Home", () => {
    document.body.innerHTML = "<header id='header'></header>";

    new Header().render("#header");

    expect(screen.getByRole("link", { name: "Home" })).toBeTruthy();
  });

  test("Testing if menu is rendered, should be anchor Favorites", () => {
    document.body.innerHTML = "<header id='header'></header>";

    new Header().render("#header");

    expect(screen.getByRole("link", { name: "Favorites" })).toBeTruthy();
  });
});
