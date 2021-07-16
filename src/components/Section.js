export default class Section {
  constructor({ renderer }, containerSelector) {
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }

  renderItems(obj) {
    obj.forEach(item => this._renderer(item))
  }

  addItems(element) {
    this._container.append(element);
  }

  addItem(element) {
    this._container.prepend(element);
  }

  removeItem(element) {
    element.remove();
  }
} 