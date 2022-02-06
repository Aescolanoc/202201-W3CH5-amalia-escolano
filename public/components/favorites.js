import { Component } from "./component.js";
import { getPokemons } from "../services/api.js";

export class myPokemons extends Component {
  constructor() {
    super();
    this.favoritesDb = "http://localhost:3000/Pokemon/";
    this.init(this.favoritesDb);
  }
  init(url) {
    getPokemons(url).then((response) => {
      this.data = response;

      let promiseArray = [];
      this.data.forEach((item) => {
        promiseArray.push(getPokemons(url + item.id));
        //Creo array de promesas
      });
      Promise.all(promiseArray)
        .then((responses) => {
          this.data.forEach((item, index) => {
            item.image = responses[index].image;
            item.id = responses[index].id;
          });
          this.template = this.generateTemplate();
          this.render("#my-pokemon");
          this.initButtonEvents();
        })
        .catch((reason) => {
          console.log("Error: " + reason);
        });
    });
  }
  generateTemplate() {
    let template = `<section id="my-pokemon">`;

    this.data.forEach((element) => {
      template += `<div>
      <a href="/public/pages/details.html?name=${element.name}">
      <img src="${element.image}">
      ${element.name}</a>
      </div>`;
    });

    template += `</section>`;
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
