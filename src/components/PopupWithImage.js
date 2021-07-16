import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._popupImg = this._popup.querySelector('.popup__img');
    this._popupTitle = this._popup.querySelector('.popup__place-name');
  }

  open(name, img) {
    this._popupImg.alt = name;
    this._popupImg.src = img;
    this._popupTitle.textContent = name;
    super.open();
  }
}