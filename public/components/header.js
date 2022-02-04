import { Component } from "./component.js";

export class Header extends Component {
  template;
  constructor() {
    super();

    this.template = `
    <ul>
      <li><a href="/public/index.html">Home</a></li>
      <li><a href="/public/pages/favorites.html">Favorites</a></li>
    </ul>
  `;
  }
}
