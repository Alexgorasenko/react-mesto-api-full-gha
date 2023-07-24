import { authorize } from "./apiAuth";

export class Api {
  constructor(options) {
    this.url = options.url;
    this.headers = options.headers;
  }

  __checkResponse = (res) => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject("Error");
  };

  getUserInfo() {
    return fetch(`${this.url}/users/me`, {
      method: "GET",
      headers: this.headers,
    }).then(this.__checkResponse);
  }

  patchUserInfo({ name, about }) {
    return fetch(`${this.url}/users/me`, {
      method: "PATCH",
      headers: this.headers,
      body: JSON.stringify({
        name: name,
        about: about,
      }),
    }).then(this.__checkResponse);
  }

  patchAvatar(data) {
    return fetch(`${this.url}/users/me/avatar`, {
      method: "PATCH",
      headers: this.headers,
      body: JSON.stringify({
        avatar: data.avatar,
      }),
    }).then(this.__checkResponse);
  }

  getPlaceCards() {
    return fetch(`${this.url}/cards`, {
      method: "GET",
      headers: this.headers,
    }).then(this.__checkResponse);
  }

  postNewCard({ name, link }) {
    return fetch(`${this.url}/cards`, {
      method: "POST",
      headers: this.headers,
      body: JSON.stringify({
        name: name,
        link: link,
      }),
    }).then(this.__checkResponse);
  }

  deleteCard(cardId) {
    return fetch(`${this.url}/cards/${cardId}`, {
      method: "DELETE",
      headers: this.headers,
    }).then(this.__checkResponse);
  }

  putLike(cardId) {
    return fetch(`${this.url}/cards/${cardId}/likes`, {
      method: "PUT",
      headers: this.headers,
    }).then(this.__checkResponse);
  }

  deleteLike(cardId) {
    return fetch(`${this.url}/cards/${cardId}/likes`, {
      method: "DELETE",
      headers: this.headers,
    }).then(this.__checkResponse);
  }
}
const token = localStorage.getItem("jwt");

const api = new Api({
  url: "https://api.alex-gorasenko.mesto.nomoredomains.xyz",
  headers: {
    "Content-Type": "application/json",
    'Authorization': `Bearer${token}`
  }
});
export default api;
