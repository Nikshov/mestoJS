import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
  constructor(popupSelector, handleFormSubmit) {
    super(popupSelector);
    this._handleFormSubmit = handleFormSubmit;
    this._inputList = this._popup.querySelectorAll('.popup__input');
    this._popupForm = this._popup.querySelector('.popup__form');
    this._formSubmit = this._formSubmit.bind(this);
    this._saveButton = this._popup.querySelector('.popup__save-button');
    
  }

  _getInputValues() {
    this._formValues = {};
    this._inputList.forEach(input => this._formValues[input.name] = input.value);
    return this._formValues;
  }

  _formSubmit(evt) {
    evt.preventDefault();
    this._handleFormSubmit(this._getInputValues());
  }

  setEventListeners() {
    this._popupForm.addEventListener('submit', this._formSubmit);
    super.setEventListeners();
  }

  renderLoading() {
    this._saveButton.textContent = 'Сохранение...';
  }

  renderDefault() {
    this._saveButton.textContent = 'Сохранить';
  }

  close() {
    this._popupForm.reset();
    super.close();
  }
}