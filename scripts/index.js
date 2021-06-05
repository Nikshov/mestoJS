import { FormValidator } from './FormValidator.js';
import { initialCards } from './initial-сards.js';
import { Card } from './Card.js';
const popupEditProfile = document.querySelector('.popup_type_edit-profile');
const inputName = popupEditProfile.querySelector('.popup__input_field_name');
const inputAbout = popupEditProfile.querySelector('.popup__input_field_about');
const profileName = document.querySelector('.profile__info-name');
const profileAbout = document.querySelector('.profile__info-about');
const editButton = document.querySelector('.profile__edit-button');
const closeEditButton = popupEditProfile.querySelector('.popup__close-button');
const formEdit = popupEditProfile.querySelector('.popup__form');
const popupAddPlace = document.querySelector('.popup_type_add-place');
const formAdd = popupAddPlace.querySelector('.popup__form');
const inputPlaceName = popupAddPlace.querySelector('.popup__input_field_place-name');
const inputImgUrl = popupAddPlace.querySelector('.popup__input_field_image-url');
const addButton = document.querySelector('.profile__add-button');
const closeAddButton = popupAddPlace.querySelector('.popup__close-button');
const popupViewer = document.querySelector('.popup_type_img-viewer');
const closeViewerButton = popupViewer.querySelector('.popup__close-button');
const buttonSavePlace = popupAddPlace.querySelector('.popup__save-button');



const validationConfig = {
  inputSelector: '.popup__input',
  submitButton: '.popup__save-button',
  disableSubmitButton: 'popup__save-button_disabled',
  inputError: 'popup__input_type_error',
  errorClass: 'popup__input-error_active'
}

const formEditValidator = new FormValidator(validationConfig, formEdit);
formEditValidator.enableValidation();

const formAddValidator = new FormValidator(validationConfig, formAdd);
formAddValidator.enableValidation();



function hidePopup(popup) {
  popup.classList.remove('popup_opened');
}

function showPopup(popup) {
  popup.classList.add('popup_opened');
}

function addClosePopupListener() {
  document.addEventListener('keydown', handleEscClosePopup);
  document.addEventListener('click', handleClickClosePopup);
}

function deleteClosePopupListener() {
  document.removeEventListener('keydown', handleEscClosePopup);
  document.removeEventListener('click', handleClickClosePopup);
}

function fillPopupEdit() {
  inputName.value = profileName.textContent;
  inputAbout.value = profileAbout.textContent;
}

export function openPopup(popup) {
  addClosePopupListener();
  showPopup(popup);
}

function closePopup(popup) {
  deleteClosePopupListener();
  hidePopup(popup);
}

function generateNewCard(data) {
  const newCard = new Card(data, ".template-element");
  document.querySelector('.elements').prepend(newCard.generateCard());
}

function handleAddFormSubmit(evt) {
  evt.preventDefault();

  if (!formAdd.checkValidity()) return;
  const data = {
    name: inputPlaceName.value,
    img: inputImgUrl.value
  }
  generateNewCard(data);

  closePopup(popupAddPlace);
}

function handleEditFormSubmit(evt) {
  evt.preventDefault();

  if (!formEdit.checkValidity()) return;
  profileName.textContent = inputName.value;
  profileAbout.textContent = inputAbout.value;

  closePopup(popupEditProfile);
}


function handleClickClosePopup(event) {
  if (checkClickArea(event)) {
    closePopup(event.target);
  }
}

function handleEscClosePopup(event) {
  if (checkPressedKey(event)) {
    const popupIsOpened = document.querySelector('.popup_opened');
    closePopup(popupIsOpened);
  }
}

function checkPressedKey(event) {
  if (event.key === 'Escape') return true;
}

function checkClickArea(event) {
  if (event.target.classList.contains("popup")) return true;
}


function handleEditButton() {
  fillPopupEdit();
  formEditValidator.clearErrors();
  formEditValidator.toggleButtonState();
  openPopup(popupEditProfile);
}

function handleAddButton() {
  formAdd.reset();
  formAddValidator.toggleButtonState();
  formAddValidator.clearErrors();
  openPopup(popupAddPlace);
}



addButton.addEventListener('click', handleAddButton);
closeAddButton.addEventListener('click', () => closePopup(popupAddPlace));
closeViewerButton.addEventListener('click', () => closePopup(popupViewer));
closeEditButton.addEventListener('click', () => closePopup(popupEditProfile));
editButton.addEventListener('click', handleEditButton);
formEdit.addEventListener('submit', handleEditFormSubmit);
formAdd.addEventListener('submit', handleAddFormSubmit);
window.onload = initialCards.forEach((data) => generateNewCard(data));
