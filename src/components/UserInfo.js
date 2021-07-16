export default class UserInfo {
  constructor({ nameSelector, aboutSelector, avatarSelector }) {
    this._name = document.querySelector(nameSelector);
    this._about = document.querySelector(aboutSelector);
    this._avatar = document.querySelector(avatarSelector);
  }

  setUserInfo(res) {
    this._name.textContent = res.name;
    this._about.textContent = res.about;
    this._avatar.src = res.avatar;
    this._id = res._id;
  }

  getUserInfo() {
    const data = {
      name: this._name.textContent,
      about: this._about.textContent,
      avatar: this._avatar.src,
      id: this._id
    };
    return data;
  }

}