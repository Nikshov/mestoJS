export const initialCards = [
  {
    name: 'Архыз',
    img: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    img: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    img: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    img: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    img: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    img: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

export const validationConfig = {
  inputSelector: '.popup__input',
  submitButton: '.popup__save-button',
  disableSubmitButton: 'popup__save-button_disabled',
  inputError: 'popup__input_type_error',
  errorClass: 'popup__input-error_active'
};

const popupEditProfile = document.querySelector('.popup_type_edit-profile');
export const inputName = popupEditProfile.querySelector('.popup__input_field_name'); 
export const inputAbout = popupEditProfile.querySelector('.popup__input_field_about'); 
export const editButton = document.querySelector('.profile__edit-button'); 
export const formEdit = popupEditProfile.querySelector('.popup__form'); 
const popupAddPlace = document.querySelector('.popup_type_add-place');
export const formAdd = popupAddPlace.querySelector('.popup__form'); 
export const addButton = document.querySelector('.profile__add-button'); 
export const templateSelector = '.template-element'; 
export const cardsContainer = '.elements'; 