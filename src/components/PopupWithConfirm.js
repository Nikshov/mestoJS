import Popup from './Popup.js';

export default class PopupWithConfirm extends Popup {
  constructor({popupSelector, handleFormSubmit}) {
    super(popupSelector);
    this._handleFormSubmit = handleFormSubmit;
    this._popupForm = this._popup.querySelector('.popup__form');
    this._saveButton = this._popup.querySelector('.popup__save-button');
  }

  open(card) {
    super.open();
    this._card = card;
  }

  renderLoading() {
    this._saveButton.textContent = 'Удаление...';
  }

  renderDefault() {
    this._saveButton.textContent = 'Да';
  }

  setEventListeners() {
    this._popupForm.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._handleFormSubmit(this._card);
    });
    super.setEventListeners();
  }
}