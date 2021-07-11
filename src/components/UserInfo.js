export default class UserInfo {
  constructor({ nameSelector, aboutSelector, avatarSelector }) {
    this._name = document.querySelector(nameSelector);
    this._about = document.querySelector(aboutSelector);
    this._avatar = document.querySelector(avatarSelector);
  }

  getUserInfo() {
    const userData = {
      name: this._name.textContent,
      about: this._about.textContent,
      avatar: this._avatar
    };
    return userData;
  }

  setUserInfo({name, about}) {
    this._name.textContent = name;
    this._about.textContent = about;
  }


setUserAvatar(obj) {
  this._avatar.src = obj.avatar;
}
}