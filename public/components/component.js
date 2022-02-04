export class Component {
  template;
  render(selector) {
    const element = document.querySelector(selector);
    element.outerHTML = this.template;
  }
  renderInner(selector) {
    const element = document.querySelector(selector);
    element.innerHTML = this.template;
  }
}
