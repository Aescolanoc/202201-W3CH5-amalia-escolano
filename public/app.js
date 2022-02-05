import { PokemonList } from "./components/pokemonlist.js";
import { getPokemons } from "./services/api.js";
import { Header } from "./components/header.js";
import { Details } from "./components/details.js";

export function main() {
  new Header().renderInner("#header");
  switch (location.pathname) {
    case "/public/index.html":
      new PokemonList();
      break;
    case "/public/pages/favorites.html":
      console.log("Estas en la pag favoritos");
      break;
    default:
      new Details();
      break;
  }
}

document.addEventListener("DOMContentLoaded", main);