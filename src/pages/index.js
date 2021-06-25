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
  formEditValidator.clearErrors();
  formEditValidator.toggleButtonState();
  popupEdit.open();
}

function handleAddButton() {
  formAddValidator.toggleButtonState();
  formAddValidator.clearErrors();
  popupAdd.open();
}


addButton.addEventListener('click', handleAddButton);
editButton.addEventListener('click', handleEditButton);


const viewer = new PopupWithImage('.popup_type_img-viewer');
viewer.setEventListeners();


const defaultCards = new Section({
  items: initialCards,
  renderer: (item) => {
    const card = new Card(item, templateSelector, () => {
      viewer.open(item.name, item.img);
    });
    const element = card.generateCard();
    defaultCards.addItem(element);
  }
}, cardsContainer);


const addCards = new Section({
  data: []
}, cardsContainer);


const popupAdd = new PopupWithForm(
  '.popup_type_add-place',
  (item) => {
    const card = new Card(item, templateSelector, () => {
      viewer.open(item.name, item.img);
    });
    const element = card.generateCard();
    addCards.addItem(element);
  }
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

window.onload = defaultCards.renderItems();