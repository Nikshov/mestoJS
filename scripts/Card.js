import { openPopup } from './index.js';
export class Card {
  constructor(data, templateSelector) {
    this._name = data.name;
    this._img = data.img;
    this._templateSelector = templateSelector;
  }

  _getTemplate() {
    return document.querySelector(this._templateSelector).content.querySelector('.element').cloneNode(true);
  }

  generateCard() {
    this._element = this._getTemplate();
    this._fillElement();
    this._addEventListeners()
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
    this._elementImg.addEventListener('click', () => this._handleClickImg());
  }

  _handleClickImg() {
    this._openViewer()
  }

  _handleDeleteButton() {
    this._element.remove();
    this._element = null;
  }

  _handleHeartButton() {
    this._heartButton.classList.toggle('element__heart-button_active');
  }

  _openViewer() {
    this._fillViewer();
    openPopup(document.querySelector('.popup_type_img-viewer'));
  }

  _fillViewer() {
    const img = document.querySelector('.popup__img');
    const imgName = document.querySelector('.popup__place-name');
    img.src = this._img;
    img.alt = this._name;
    imgName.textContent = this._name;
  }

}
