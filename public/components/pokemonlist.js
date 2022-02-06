import { Component } from "./component.js";
import { getPokemons } from "../services/api.js";

export class PokemonList extends Component {
  constructor() {
    super();
    this.init("https://pokeapi.co/api/v2/pokemon?limit=10&offset=0");
  }
  init(url) {
    getPokemons(url).then((response) => {
      this.data = response;
      this.pokemon = this.data.results;
      this.prev = this.data.previous;
      this.next = this.data.next;
      this.count = this.data.count;

      let promiseArray = [];
      console.log(this.pokemon);
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
          console.log(this.pokemon);
          this.template = this.generateTemplate();
          this.renderInner("#pokemon-list");
          this.initButtonEvents();
          console.log(this.pokemon);
        })

        .catch((reason) => {
          console.log("Error: " + reason);
        });
    });
  }

  generateTemplate() {
    this.lastPokemon = this.pokemon[this.pokemon.length - 1].id;

    let template = `
    <h1>POKEMON API</h1>
    <section class="pokemon-list__info">
    <div>${this.lastPokemon}/</div>`;

    this.pokemon.forEach((element) => {
      template += `<div>
      <a href="/public/pages/details.html?name=${element.name}">
      <img src="${element.image}">
      ${element.name}</a>
      </div>`;
    });

    template += `</section>
    <div class="pokemon-list__buttons"> 
    <button data-action="prev" class="btn-nav">Preview</button>
    <button data-action="next" class="btn-nav">Next</button>
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
