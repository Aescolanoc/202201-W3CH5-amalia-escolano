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
    this.urlPokemon = "https://pokeapi.co/api/v2/pokemon/" + pokemonName;
    getPokemons(this.urlPokemon).then((response) => {
      this.data = response;
      this.template = this.generateTemplate();
      this.renderInner("#pokemon-details");
      this.initButtonEvents();
    });
  }
  generateTemplate() {
    let template = `
    <h2>${this.data.name} Details <span class="heart hidden">❤️</span></h2>
    <div>
      <img src="${this.data.sprites.front_default}" alt="${this.data.name} parte delantera">
      <img src="${this.data.sprites.back_default}" alt="${this.data.name} parte trasera">
    </div>
    <div>
      <p>Weight: ${this.data.weight}</p>
      <p>Experience: ${this.data.base_experience}</p>
      <p>Type: ${this.data.types[0].type.name}</p>
    </div>
    <div class="pokemon-list__buttons">
      <button data-action="add" class="button-fav button-fav--add">Add To Favorites</button>
      <button data-action="remove" class="button-fav button-fav--remove">Remove from favorites</button>
    </div>
    `;
    return template;
  }
  initButtonEvents() {
    this.favPokemon = {};
    this.favPokemon.id = this.data.id;
    this.favPokemon.name = this.data.name;
    this.favPokemon.weight = this.data.weight;
    this.favPokemon.image = this.data.sprites.front_default;
    this.favPokemon.experience = this.data.base_experience;
    this.favPokemon.type = this.data.types[0].type.name;
    this.favPokemon.url = this.urlPokemon;

    document.querySelectorAll(".button-fav").forEach((element) => {
      element.addEventListener("click", (ev) => {
        let action = ev.target.dataset.action;
        if (action === "add") {
          this.addPokemonLocalDb();
        } else {
          this.removePokemonLocalDb("DELETE");
        }
      });
    });
  }
  addPokemonLocalDb() {
    fetch("http://localhost:3000/Pokemon/", {
      method: "POST",
      body: JSON.stringify(this.favPokemon),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .catch((error) => console.error("Error:", error))
      .then((response) => console.log("Success:", response));
  }
  removePokemonLocalDb() {
    fetch("http://localhost:3000/Pokemon/" + this.data.id, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .catch((error) => console.error("Error:", error))
      .then((response) => console.log("Success:", response));
  }
}
