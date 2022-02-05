import { Component } from "./component.js";
import { getPokemons } from "../services/api.js";

export class Details extends Component {
  template;
  constructor() {
    super();
    this.searchPokemonByName();
  }
  searchPokemonByName() {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const pokemonName = urlParams.get("name");
    getPokemons("https://pokeapi.co/api/v2/pokemon/" + pokemonName).then(
      (response) => {
        this.data = response;
        this.template = this.generateTemplate();
        this.renderInner("#pokemon-details");
      }
    );
  }
  generateTemplate() {
    let template = `
    <h2>${this.data.name} Details</h2>
    <div>
      <img src="${this.data.sprites.front_default}" alt="${this.data.name} parte delantera">
      <img src="${this.data.sprites.back_default}" alt="${this.data.name} parte trasera">
    </div>
    <div>
      <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. </p>
      <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. </p>
      <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. </p>
      <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. </p>
    </div>
    <div>
      <button>Add To Favorites</button>
      <button>Remove from favorites</button>
    </div>
    `;
    return template;
  }
}
