import { openPopup } from './index.js';
export class Card {
  constructor(name, img, templateSelector) {
    this._name = name;
    this._img = img;
    this._templateSelector = templateSelector;
  }

  _getTemplate() {
    return document.querySelector(this._templateSelector).content.querySelector('.element').cloneNode(true);
  }

  generateCard() {
    this._element = this._getTemplate();
    this._fillElement();
    this._addEventListeners()
    this._renderCard();
  }

  _fillElement() {
    this._elementImg = this._element.querySelector('.element__image');
    this._elementImg.src = this._img;
    this._elementImg.alt = this._name;
    this._element.querySelector('.element__title').textContent = this._name;
  }

  _addEventListeners() {
    const heartButton = this._element.querySelector('.element__heart-button');
    heartButton.addEventListener('click', () => heartButton.classList.toggle('element__heart-button_active'));
    this._element.querySelector('.element__delete-button').addEventListener('click', () => this._element.remove());
    this._elementImg.addEventListener('click', () => this._openViewer());
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

  _renderCard() { document.querySelector('.elements').prepend(this._element) };
}
