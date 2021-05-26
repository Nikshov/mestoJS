export class FormValidator {
  constructor(validationConfig, formSelector) {
    this._inputSelector = validationConfig.inputSelector;
    this._submitButton = validationConfig.submitButton;
    this._disableSubmitButton = validationConfig.disableSubmitButton;
    this._inputError = validationConfig.inputError;
    this._errorClass = validationConfig.errorClass;
    this._formSelector = formSelector;
  }

  _showInputError(inputElement, errorMessage) {
    const errorElement = this._formSelector.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(this._inputError);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(this._errorClass);
  }

  _hideInputError(inputElement) {
    const errorElement = this._formSelector.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(this._inputError);
    errorElement.classList.remove(this._errorClass);
    errorElement.textContent = '';
  }

  _checkInputValidity(inputElement) {
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement, inputElement.validationMessage);
    } else {
      this._hideInputError(inputElement);
    }
  }

  _setEventListeners() {
    this._inputList = Array.from(this._formSelector.querySelectorAll(this._inputSelector));
    this._buttonElement = this._formSelector.querySelector(this._submitButton);
    this._toggleButtonState();
    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this._checkInputValidity(inputElement);
        this._toggleButtonState();
      });
    });
  }

  clearErrors() {
    this._inputList.forEach((inputElement) => {
      if (inputElement.classList.contains(this._inputError)) {
        this._hideInputError(inputElement);
      }
    })
  }

  enableValidation() {
    this._setEventListeners();
    this._formSelector.addEventListener('submit', function (evt) {
      evt.preventDefault();
    });
  }

  _hasInvalidInput() {
    return this._inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  }

  _toggleButtonState() {
    if (this._hasInvalidInput()) {
      this._buttonElement.classList.add(this._disableSubmitButton);
    } else {
      this._buttonElement.classList.remove(this._disableSubmitButton);
    }
  }

}