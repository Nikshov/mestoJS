import './index.css';
import { FormValidator } from '../components/FormValidator.js';
import { validationConfig, inputName, inputAbout, editButton, formEdit, formAdd, addButton, templateSelector, cardsContainer, formAvatar, avatarButton } from '../utils/constants.js';
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
  popupAvatar.renderLoading();
  api.editAvatar(item)
    .then((result) => {
      user.setUserInfo(result);
      popupAvatar.close();
      return
    })
    .catch(err => console.log(`Error ${err}`))
    .finally(() => popupAvatar.renderDefault());
},
);

popupAvatar.setEventListeners();


function handleAvatarButton() {
  formAvatarValidator.resetValidation();
  popupAvatar.open();
}

function handleEditButton() {
  const data =  user.getUserInfo();
  inputName.value = data.name;
  inputAbout.value = data.about;
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


const cardsSection = new Section({
  renderer: (item) => cardsSection.addItems(createCard(item))
}, cardsContainer);


const popupAdd = new PopupWithForm(
  '.popup_type_add-place',
  (item) => {
    popupAdd.renderLoading();
    api.addNewCard(item)
      .then((results) => {
        cardsSection.addItem(createCard(results));
        popupAdd.close();
      }
      )
      .catch(err => console.log(`Error ${err}`))
      .finally(() => popupAdd.renderDefault());
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
    popupEdit.renderLoading();
    api.editUserInfo(item)
      .then((result) => {
        user.setUserInfo(result);
        popupEdit.close();
      })
      .catch(err => console.log(`Error ${err}`))
      .finally(() => popupEdit.renderDefault());
  },
);

popupEdit.setEventListeners();


function createCard(data) {
  const card = new Card({
    data: data,
    myUserId: user.getUserInfo(),
    templateSelector: templateSelector,
    handleCardClick: () => {
      viewer.open(data.name, data.link);
    },
    handleDeleteButton:
      () => {
        popupConfirm.open(card);
      },
    handleHeartButton: () => {
      if (!(card.iLikedIt)) {
        api.addLike(card.getCardId())
          .then((res) => {
            card.toggleHeartButton(res.likes);
          })
          .catch(err => console.log(`Error ${err}`))
      } else {
        api.deleteLike(card.getCardId())
          .then((res) => {
            card.toggleHeartButton(res.likes);
          })
          .catch(err => console.log(`Error ${err}`));
      }
    }
  })
  const element = card.generateCard();
  return element;
}



const popupConfirm = new PopupWithConfirm({
  popupSelector: '.popup_type_confirm',
  handleFormSubmit: (card) => {
    popupConfirm.renderLoading();
    api.deleteCard(card.getCardId())
      .then(() => {
        cardsSection.removeItem(card.getElement());
        popupConfirm.close();
      })
      .catch(err => console.log(`Error ${err}`))
      .finally(() => popupConfirm.renderDefault());
  },
});
popupConfirm.setEventListeners();


window.onload = () => {
  Promise.all([api.getUserInfo(), api.getInitialCards()])
    .then(res => {
      user.setUserInfo(res[0]);
      cardsSection.renderItems(res[1]);
    })
    .catch(err => console.log(`Error ${err}`))
}