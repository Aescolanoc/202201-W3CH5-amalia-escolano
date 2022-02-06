import { Component } from "./component.js";

export class Header extends Component {
  template;
  constructor() {
    super();

    this.template = `
    <h1>POKEMON API</h1>
    <ul class="header-nav">
      <li><a href="index.html">Home</a></li>
      <li><a href="favorites.html">Favorites</a></li>
    </ul>
  `;
  }
}
