export default class Api {
  constructor(obj) {
    this._url = obj.url;
    this._authorization = obj.headers.authorization;
    this._contentType = obj.headers['Content-Type'];
  }

  _checkResponse(res) {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`)
  }

  getInitialCards() {
    return fetch(`${this._url}/cards`, {
      headers: {
        authorization: this._authorization
      }
    })
      .then(this._checkResponse)
  }


  addNewCard(obj) {
    return fetch(`${this._url}/cards`, {
      method: 'POST',
      headers: {
        authorization: this._authorization,
        'Content-Type': this._contentType
      },
      body: JSON.stringify({
        name: obj.name,
        link: obj.link
      })
    })
      .then(this._checkResponse)
  }

  deleteCard(cardId) {
    return fetch(`${this._url}/cards/${cardId}`, {
      method: 'DELETE',
      headers: {
        authorization: this._authorization,
        'Content-Type': this._contentType
      }
    })
      .then(this._checkResponse)
  }

  addLike(cardId) {
    return fetch(`${this._url}/cards/likes/${cardId}`, {
      method: 'PUT',
      headers: {
        authorization: this._authorization,
        'Content-Type': this._contentType
      }
    })
      .then(this._checkResponse)
  }

  deleteLike(cardId) {
    return fetch(`${this._url}/cards/likes/${cardId}`, {
      method: 'DELETE',
      headers: {
        authorization: this._authorization,
        'Content-Type': this._contentType
      }
    })
      .then(this._checkResponse)
  }

  getUserInfo() {
    return fetch(`${this._url}/users/me`, {
      headers: {
        authorization: this._authorization
      }
    })
      .then(this._checkResponse)
  }

  editUserInfo(obj) {
    return fetch(`${this._url}/users/me`, {
      method: 'PATCH',
      headers: {
        authorization: this._authorization,
        'Content-Type': this._contentType
      },
      body: JSON.stringify({
        name: obj.name,
        about: obj.about
      })
    })
      .then(this._checkResponse)
  }

  editAvatar({
    link
  }) {
    return fetch(`${this._url}/users/me/avatar`, {
      method: 'PATCH',
      headers: {
        authorization: this._authorization,
        'Content-Type': this._contentType
      },
      body: JSON.stringify({
        avatar: `${link}`
      })
    })
      .then(this._checkResponse)
  }
}