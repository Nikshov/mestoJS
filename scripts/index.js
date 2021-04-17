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

function buildPopupEdit() {
  openPopup(popupEditProfile);
  fillPopupEdit();
}

function fillPopupEdit() {
  inputName.value = profileName.textContent;
  inputAbout.value = profileAbout.textContent;
};

function editSubmit(evt) {
  evt.preventDefault();

  profileName.textContent = inputName.value;
  profileAbout.textContent = inputAbout.value;

  closePopup(popupEditProfile);
}

function closePopup(popup) {
  popup.classList.remove('popup_opened');
}

function openPopup(popup) {
  popup.classList.add('popup_opened');
}

function addSubmit(evt) {
  evt.preventDefault();

  addElement(inputPlaceName.value, inputImgUrl.value);

  inputPlaceName.value = '';
  inputImgUrl.value = '';

  closePopup(popupAddPlace);
}

function addElement(placeName, imgUrl) {
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
  elementImage.addEventListener('click', { handleEvent(event) { buildPopupViewer(event.srcElement.alt, event.srcElement.currentSrc) } });

  places.prepend(newElement);
}

function buildPopupViewer(placeName, imgUrl) {
  const img = popupViewer.querySelector('.popup__img');
  const name = popupViewer.querySelector('.popup__place-name');
  img.src = imgUrl;
  img.alt = placeName;
  name.textContent = placeName;
  openPopup(popupViewer);
}

addButton.addEventListener('click', { handleEvent(event) { openPopup(popupAddPlace) } });
closeAddButton.addEventListener('click', { handleEvent(event) { closePopup(popupAddPlace) } });
closeViewerButton.addEventListener('click', { handleEvent(event) { closePopup(popupViewer) } });
closeEditButton.addEventListener('click', { handleEvent(event) { closePopup(popupEditProfile) } });
editButton.addEventListener('click', buildPopupEdit);
formEdit.addEventListener('submit', editSubmit);
formAdd.addEventListener('submit', addSubmit);
window.onload = initialCards.forEach((obj) => addElement(obj.name, obj.link));
