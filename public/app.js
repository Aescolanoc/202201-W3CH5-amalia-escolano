import { PokemonList } from "./components/pokemonlist.js";
import { getPokemons } from "./services/api.js";
import { Header } from "./components/header.js";
import { Details } from "./components/details.js";
import { myPokemons } from "./components/favorites.js";

export function main() {
  new Header().renderInner("#header");
  const path = location.pathname.replace("/public", "");
  switch (path) {
    case "/index.html":
      new PokemonList();
      break;
    case "/favorites.html":
      new myPokemons();
      break;
    default:
      new Details();
      break;
  }
}

document.addEventListener("DOMContentLoaded", main);
