export const BASE_URL = "https://api.alex-gorasenko.mesto.nomoredomains.xyz";


const checkResponse = (res) => {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject("Error");
};

export const register = (password, email) => {
  return fetch(`${BASE_URL}/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ password, email }),
  }).then(checkResponse)
  ;
};

export const authorize = (password, email) => {
  return fetch(`${BASE_URL}/signin`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ password, email }),
  }).then(checkResponse)
};

export const getContent = (token) => {

  return fetch(`${BASE_URL}/users/me`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      'Authorization': `Bearer ${token}`
    },
  }).then(checkResponse)
};
