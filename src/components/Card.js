export default class Card {
  constructor({ data, myUserId, templateSelector, handleCardClick, handleDeleteButton, handleHeartButton}) {
    this._name = data.name;
    this._link = data.link;
    this._likes = data.likes;
    this._myUserId = myUserId;
    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;
    this._handleDeleteButton = handleDeleteButton;
    this._handleHeartButton = handleHeartButton;
    
    this._iAmOwner = data.owner._id === this._myUserId ? true : false;
    this._iLikedIt = !(this._likes.includes(this._myUserId));
    this._id = data._id;
  }

  _getTemplate() {
    return document.querySelector(this._templateSelector).content.querySelector('.element').cloneNode(true);
  }


  generateCard() {
    this._element = this._getTemplate();
    

    this._deleteButton = this._element.querySelector('.element__delete-button');
    this._heartButton = this._element.querySelector('.element__heart-button');
    this._amountLikes = this._element.querySelector('.element__amount-likes');
    this._fillElement();


    if (!(this._iAmOwner)) {
      this._deleteButton.remove();
    };


    if (!(this._iLikedIt)) {
        this._heartButton.classList.add('element__heart-button_active');
      }

    this._addEventListeners();
    return this._element;
  }

  _fillElement() {
    this._elementImg = this._element.querySelector('.element__image');
    this._elementImg.src = this._link;
    this._elementImg.alt = this._name;
    this._element.querySelector('.element__title').textContent = this._name;
    this._amountLikes.textContent = this._likes.length;
  }

  _addEventListeners() {
    this._heartButton.addEventListener('click', this._handleHeartButton);
    if (this._iAmOwner) { this._deleteButton.addEventListener('click', this._handleDeleteButton)}
    this._element.querySelector('.element__image').addEventListener('click', this._handleCardClick);
  }


  toggleHeartButton() {
    this._iLikedIt = !this._iLikedIt;
    this._heartButton.classList.toggle('element__heart-button_active');
    this._amountLikes.textContent = this._likes.length;
  }
}
