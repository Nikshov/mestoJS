import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
  constructor(popupSelector, handleFormSubmit) {
    super(popupSelector);
    this._handleFormSubmit = handleFormSubmit;
  }

  _getInputValues() {
    this._inputList = this._popup.querySelectorAll('.popup__input');
    this._formValues = {};
    this._inputList.forEach(input => this._formValues[input.name] = input.value);
    return this._formValues;
  }

  _formSubmit(evt) {
    evt.preventDefault();
    this._handleFormSubmit(this._getInputValues());
    this.close();
  }

  setEventListeners() {
    this._popupForm = this._popup.querySelector('.popup__form');
    this._popupForm.addEventListener('submit', this._formSubmit.bind(this));
    super.setEventListeners();
  }

  close() {
    this._popupForm.reset();
    super.close();
  }
}