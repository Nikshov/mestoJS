import './index.css';
import { FormValidator } from '../components/FormValidator.js';
import { initialCards, validationConfig, inputName, inputAbout, editButton, formEdit, formAdd, addButton, templateSelector, cardsContainer } from '../utils/constants.js';
import Card from '../components/Card.js';
import Section from '../components/Section.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithImage from '../components/PopupWithImage.js';
import UserInfo from '../components/UserInfo.js';


const formEditValidator = new FormValidator(validationConfig, formEdit);
formEditValidator.enableValidation();

const formAddValidator = new FormValidator(validationConfig, formAdd);
formAddValidator.enableValidation();


function handleEditButton() {
  const userInfo = user.getUserInfo();
  inputName.value = userInfo.name;
  inputAbout.value = userInfo.about;
  formEditValidator.resetValidation();
  popupEdit.open();
}

function handleAddButton() {
  formAddValidator.resetValidation();
  popupAdd.open();
}


addButton.addEventListener('click', handleAddButton);
editButton.addEventListener('click', handleEditButton);


const viewer = new PopupWithImage('.popup_type_img-viewer');
viewer.setEventListeners();


const defaultCards = new Section({
  items: initialCards,
  renderer: (item) => defaultCards.addItem(createCard(item))
}, cardsContainer);


const popupAdd = new PopupWithForm(
  '.popup_type_add-place',
  (item) => defaultCards.addItem(createCard(item))
);

popupAdd.setEventListeners();


const user = new UserInfo({
  nameSelector: '.profile__info-name',
  aboutSelector: '.profile__info-about'
});


const popupEdit = new PopupWithForm(
  '.popup_type_edit-profile',
  (item) => user.setUserInfo(item.name, item.about)
);

popupEdit.setEventListeners();


function createCard(obj) {
  const card = new Card(obj, templateSelector, () => {
    viewer.open(obj.name, obj.img);
  });
  const element = card.generateCard();
  return element;
}

window.onload = defaultCards.renderItems();