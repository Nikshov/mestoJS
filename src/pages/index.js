import './index.css';
import { FormValidator } from '../components/FormValidator.js';
import { initialCards, validationConfig, inputName, inputAbout, editButton, formEdit, formAdd, addButton, templateSelector, cardsContainer, formAvatar, avatarButton } from '../utils/constants.js';
import Card from '../components/Card.js';
import Section from '../components/Section.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithImage from '../components/PopupWithImage.js';
import UserInfo from '../components/UserInfo.js';
import Api from '../components/Api';
import PopupWithConfirm from '../components/PopupWithConfirm';

const formEditValidator = new FormValidator(validationConfig, formEdit);
formEditValidator.enableValidation();

const formAddValidator = new FormValidator(validationConfig, formAdd);
formAddValidator.enableValidation();

const formAvatarValidator = new FormValidator(validationConfig, formAvatar);
formAvatarValidator.enableValidation();


const api = new Api({
  url: 'https://mesto.nomoreparties.co/v1/cohort-25',
  headers: {
    authorization: '102ba505-245e-4e79-bcbe-97cbfaa7a3eb',
    'Content-Type': 'application/json'
  }
});


const popupAvatar = new PopupWithForm('.popup_type_editAvatar', (item) => {
  const save = formAvatar.querySelector('.popup__save-button');
    save.textContent = 'Сохранение...';
    api.editAvatar(item)
      .then((result) => {
        user.setUserAvatar(result);
        save.textContent = 'Сохранить';
        popupAvatar.close();
      })
      .catch(err => console.log(`Error ${err}`));
  },
);

popupAvatar.setEventListeners();


function handleAvatarButton() {
  formAvatarValidator.resetValidation();
  popupAvatar.open();
}

function handleEditButton() {
  api.getUserInfo()
    .then(item => {
      inputName.value = item.name;
      inputAbout.value = item.about;
    });
  formEditValidator.resetValidation();
  popupEdit.open();
}

function handleAddButton() {
  formAddValidator.resetValidation();
  popupAdd.open();
}

avatarButton.addEventListener('click', handleAvatarButton);
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
  (item) => {
    const save = formAdd.querySelector('.popup__save-button');
    save.textContent = 'Сохранение...';
    api.addNewCard(item)
      .then((results) => {
        defaultCards.addItem(createCard(results));
        save.textContent = 'Сохранить';
        popupAdd.close();
      }
      )
      .catch(err => console.log(`Error ${err}`));
  }
);

popupAdd.setEventListeners();


const user = new UserInfo({
  nameSelector: '.profile__info-name',
  aboutSelector: '.profile__info-about',
  avatarSelector: '.profile__avatar'
});


const popupEdit = new PopupWithForm(
  '.popup_type_edit-profile',
  (item) => {
    const save = formEdit.querySelector('.popup__save-button');
    save.textContent = 'Сохранение...';
    api.editUserInfo(item)
      .then((result) => {
        user.setUserInfo(result);
        save.textContent = 'Сохранить';
        popupEdit.close;
      })
      .catch(err => console.log(`Error ${err}`));
  },
);

popupEdit.setEventListeners();


let currentUserId;

function createCard(data) {
  const card = new Card({
    data: data,
    myUserId: currentUserId,
    templateSelector: templateSelector,
    handleCardClick: () => {
      viewer.open(data.name, data.link);
    },
    handleDeleteButton:
      () => {
        popupConfirm.open(card);

      },
    handleHeartButton: () => {
      if (card._iLikedIt) {
        api.addLike(card._id)
          .then((res) => {
            card._likes = res.likes;
            card.toggleHeartButton();
          })
          .catch(err => console.log(`Error ${err}`))
      } else {
        api.deleteLike(card._id)
          .then((res) => {
            card._likes = res.likes;
            card.toggleHeartButton();
          })
          .catch(err => console.log(`Error ${err}`));
      }
    }
  })
  const element = card.generateCard();
  return element;
}


const popupConfirmElement = document.querySelector('.popup_type_confirm');

const popupConfirm = new PopupWithConfirm({
  popupSelector: '.popup_type_confirm',
  handleFormSubmit: (card) => {
    const confirmButton = popupConfirmElement.querySelector('.popup__save-button');
    confirmButton.textContent = 'Удаление...';
    api.deleteCard(card._id)
      .then(() => {
        card._element.remove();
        card._element = null;
        confirmButton.textContent = 'Да';
        popupConfirm.close();
      })
      .catch(err => console.log(`Error ${err}`));
  },
});
popupConfirm.setEventListeners();






window.onload =
  api.getUserInfo()
    .then(item => {
      currentUserId = item._id;
      user.setUserAvatar(item);
      user.setUserInfo(item)
    });
api.getInitialCards()
  .then(items => {
    defaultCards.renderItems(items)
  });