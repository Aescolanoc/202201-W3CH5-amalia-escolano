import { Component } from "./component.js";
import { getPokemons } from "../services/api.js";

export class PokemonList extends Component {
  constructor() {
    super();
    this.init("https://pokeapi.co/api/v2/pokemon?limit=20&offset=0");
  }
  init(url) {
    getPokemons(url).then((response) => {
      this.data = response;
      this.pokemon = this.data.results;
      this.prev = this.data.previous;
      this.next = this.data.next;
      this.count = this.data.count;

      let promiseArray = [];
      this.pokemon.forEach((item) => {
        promiseArray.push(getPokemons(item.url));
        //Creo array de promesas
      });
      Promise.all(promiseArray)
        .then((responses) => {
          this.pokemon.forEach((item, index) => {
            item.image = responses[index].sprites.front_default;
            item.id = responses[index].id;
          });
          this.template = this.generateTemplate();
          this.renderInner("#pokemon-list");
          this.initButtonEvents();
        })

        .catch((reason) => {
          console.log("Error: " + reason);
        });
    });
  }

  generateTemplate() {
    this.lastPokemon = this.pokemon[this.pokemon.length - 1].id;

    let template = `
    <div class="logo"><img src="pokemon-logo.svg"/></div>
    <section class="pokemon-list__info">`;

    this.pokemon.forEach((element) => {
      template += `<div class="pokemon-wrapper">
      <a href="details.html?name=${element.name}">
        <img src="${element.image}">
        <div class="pokemon-name">${element.name}</div>
      </a>
      </div>`;
    });

    template += `</section>
    <div class="pokemon-list__buttons"> 
    <button data-action="prev" class="btn-nav">Preview</button>
    <button data-action="next" class="btn-nav">Next</button>
    <div class="count">${this.lastPokemon}/${this.count}</div>
    </div>
   `;
    return template;
  }
  initButtonEvents() {
    document.querySelectorAll(".btn-nav").forEach((element) => {
      element.addEventListener("click", (ev) => {
        let action = ev.target.dataset.action;
        let url = action === "prev" ? this.prev : this.next;
        this.init(url);
      });
    });
  }
}
