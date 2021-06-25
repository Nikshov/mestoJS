export default class Card {
  constructor(data, templateSelector, handleCardClick) {
    this._name = data.name;
    this._img = data.img;
    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;
  }

  _getTemplate() {
    return document.querySelector(this._templateSelector).content.querySelector('.element').cloneNode(true);
  }

  generateCard() {
    this._element = this._getTemplate();
    this._fillElement();
    this._addEventListeners();
    return this._element;
  }

  _fillElement() {
    this._elementImg = this._element.querySelector('.element__image');
    this._elementImg.src = this._img;
    this._elementImg.alt = this._name;
    this._element.querySelector('.element__title').textContent = this._name;
  }

  _addEventListeners() {
    this._heartButton = this._element.querySelector('.element__heart-button');
    this._heartButton.addEventListener('click', () => this._handleHeartButton());
    this._deleteButton = this._element.querySelector('.element__delete-button');
    this._deleteButton.addEventListener('click', () => this._handleDeleteButton());
    this._element.querySelector('.element__image').addEventListener('click', this._handleCardClick);
  }

  _handleDeleteButton() {
    this._element.remove();
    this._element = null;
  }

  _handleHeartButton() {
    this._heartButton.classList.toggle('element__heart-button_active');
  }
}
