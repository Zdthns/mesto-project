//export { userName, userAbout }
const config = {
  url: 'https://nomoreparties.co/v1/plus-cohort-12',
  headers: {
    authorization: '86c85002-0798-4a86-ac2a-c25758aa079d',
    'Content-Type': 'application/json'
  }
};
function checkResponse(res) {
  if (res.ok) {
    return res.json();
  } else {
    return Promise.reject(res.status)
  }
}

// получить пользователей
export function getUsers() {
  return fetch(`${config.url}/users/me`, {
    method: 'GET',
    headers: config.headers
  })
    .then(checkResponse)
}

// отправка отредактированных данных пользователя на сервер
export function editUsersProfile(data) {

  return fetch(`${config.url}/users/me`, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({
      name: data.name,
      about: data.about,
    })
  })
    .then(checkResponse)
}
// отправка отредактированной аватарки
export function addAvatar(data) {
  return fetch(`${config.url}/users/me/avatar`, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({
      avatar: data.avatar
    })
  })
    .then(checkResponse)
}
// получить картинки
export function getCards() {
  return fetch(`${config.url}/cards`, {
    headers: config.headers
  })
    .then(checkResponse)
}

//отправить новую картинку
export function creatNewCard(data) {
  return fetch(`${config.url}/cards`, {
    method: 'POST',
    headers: config.headers,
    body: JSON.stringify({
      name: data.name,
      link: data.link
    })
  })
    .then(checkResponse)
}

// удалить картинку с сервера
export function deleteCard(data) {
  return fetch(`${config.url}/cards/${data}`, {
    method: 'DELETE',
    headers: config.headers,
  })
    .then(checkResponse)
}
// удалить лайк с сервера
export function deleteLikeCard(data) {
  return fetch(`${config.url}/cards/likes/${data}`, {
    method: 'DELETE',
    headers: config.headers,
  })
    .then(checkResponse)
}
// получить лайк с сервера
export function addLikeCard(data) {
  return fetch(`${config.url}/cards/likes/${data}`, {
    method: 'PUT',
    headers: config.headers,
  })
    .then(checkResponse)
}







