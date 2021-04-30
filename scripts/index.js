const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

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
const places = document.querySelector('.elements');
const inputPlaceName = popupAddPlace.querySelector('.popup__input_field_place-name');
const inputImgUrl = popupAddPlace.querySelector('.popup__input_field_image-url');
const addButton = document.querySelector('.profile__add-button');
const closeAddButton = popupAddPlace.querySelector('.popup__close-button');
const popupViewer = document.querySelector('.popup_type_img-viewer');
const closeViewerButton = popupViewer.querySelector('.popup__close-button');
const img = popupViewer.querySelector('.popup__img');
const imgName = popupViewer.querySelector('.popup__place-name');
const buttonSavePlace = popupAddPlace.querySelector('.popup__save-button');

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

function openPopup(popup) {
  addClosePopupListener();
  showPopup(popup);
  switch (popup) {
    case popupEditProfile:
      fillPopupEdit();
      clearErrors(popup);
      break;
    case popupAddPlace:
      formAdd.reset();
      buttonSavePlace.classList.add('popup__save-button_disabled');
      clearErrors(popup);
      break;
  }
}

function closePopup(popup) {
  deleteClosePopupListener();
  hidePopup(popup);
}

function handleAddFormSubmit(evt) {
  evt.preventDefault();

  renderCard(createCard(inputPlaceName.value, inputImgUrl.value));

  closePopup(popupAddPlace);
}

function handleEditFormSubmit(evt) {
  evt.preventDefault();

  profileName.textContent = inputName.value;
  profileAbout.textContent = inputAbout.value;

  closePopup(popupEditProfile);
}

function createCard(placeName, imgUrl) {
  const template = document.querySelector('.template-element').content;
  const newElement = template.querySelector('.element').cloneNode(true);
  const elementTitle = newElement.querySelector('.element__title');
  const elementImage = newElement.querySelector('.element__image');
  const heartButton = newElement.querySelector('.element__heart-button');
  const deleteButton = newElement.querySelector('.element__delete-button');

  elementTitle.textContent = placeName;
  elementImage.src = imgUrl;
  elementImage.alt = placeName;

  heartButton.addEventListener('click', () => heartButton.classList.toggle('element__heart-button_active'));
  deleteButton.addEventListener('click', () => newElement.remove());
  elementImage.addEventListener('click', () => {
    buildPopupViewer(elementImage.alt, elementImage.src);
    openPopup(popupViewer);
  });
  return newElement;
}

function renderCard(obj) { places.prepend(obj) }

function buildPopupViewer(placeName, imgUrl) {
  img.src = imgUrl;
  img.alt = placeName;
  imgName.textContent = placeName;
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

function clearErrors(popup) {
  const errorTexts = popup.querySelectorAll('.popup__input-error');
  const error = popup.querySelectorAll('.popup__input_type_error');
  error.forEach((item) => item.classList.remove('popup__input_type_error'));
  errorTexts.forEach((item) => item.classList.remove('popup__input-error_active'));
}

addButton.addEventListener('click', () => openPopup(popupAddPlace));
closeAddButton.addEventListener('click', () => closePopup(popupAddPlace));
closeViewerButton.addEventListener('click', () => closePopup(popupViewer));
closeEditButton.addEventListener('click', () => closePopup(popupEditProfile));
editButton.addEventListener('click', () => openPopup(popupEditProfile));
formEdit.addEventListener('submit', handleEditFormSubmit);
formAdd.addEventListener('submit', handleAddFormSubmit);
window.onload = initialCards.forEach((obj) => renderCard(createCard(obj.name, obj.link)));
