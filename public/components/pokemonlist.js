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
      this.template = this.generateTemplate();
      this.renderInner("#pokemon-list");
      this.initButtonEvents();
    });
  }
  generateTemplate() {
    let template = `
    <h1>POKEMON API</h1>
    <div>10/${this.count}</div>
    <ul class="pokemon-list__info">`;

    this.pokemon.forEach((element) => {
      template += `<li>${element.name}</li>`;
    });

    template += `</ul>
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
