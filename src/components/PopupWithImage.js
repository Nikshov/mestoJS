import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
  }

  open(name, img) {
    const popupImg = this._popup.querySelector('.popup__img');
    popupImg.alt = name;
    popupImg.src = img;
    this._popup.querySelector('.popup__place-name').textContent = name;

    super.open();
  }
}