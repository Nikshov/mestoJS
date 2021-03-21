let popup = document.querySelector('.popup');
let inputName = document.querySelector('.popup__input_field_name');
let inputAbout = document.querySelector('.popup__input_field_about');
let openButton = document.querySelector('.profile__edit-button');
let closeButton = document.querySelector('.popup__close-button');
let profileName = document.querySelector('.profile__info-name');
let profileAbout = document.querySelector('.profile__info-about');
let popupForm = document.querySelector('.popup__form');


function popupOpen() {
  popup.classList.add("popup_opened");

  inputName.value = profileName.textContent
  inputAbout.value = profileAbout.textContent
  // console.log(popup.classList)
}


function popupClosed() {
  popup.classList.remove("popup_opened");
}


function editSubmit(evt) {
  evt.preventDefault();

  profileName.textContent = inputName.value;
  profileAbout.textContent = inputAbout.value;

  popupClosed()
}


closeButton.addEventListener('click', popupClosed);
openButton.addEventListener('click', popupOpen);
popupForm.addEventListener('submit', editSubmit);
