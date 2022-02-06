import { screen } from "@testing-library/dom";
import { Header } from "./header.js";

describe("testing Header", () => {
  test("Testing is rendered, should be Ok", () => {
    document.body.innerHTML = "<header id='header'></header>";

    new Header().render("#header");

    expect(screen.getByRole("link", { name: "Home" })).toBeTruthy();
  });
  test("Testing is rendered, should be Ok", () => {
    document.body.innerHTML = "<header id='header'></header>";

    new Header().render("#header");

    expect(screen.getByRole("link", { name: "Favorites" })).toBeTruthy();
  });
});
