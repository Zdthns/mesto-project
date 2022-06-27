//export { userName, userAbout }
const config = {
  url: 'https://nomoreparties.co/v1/plus-cohort-12',
  headers: {
    authorization: '86c85002-0798-4a86-ac2a-c25758aa079d',
    'Content-Type': 'application/json',
  }

  // проверка ответа
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
  fetch(`${config.url}/users/me`, {
    method: 'GET',
    headers: config.headers
  })
    .then(checkResponse)
}

// отправка отредактированных данных пользователя на сервер
export function editUsersProfile(data) {
  return fetch(`${config.url}/users/me`, {
    method: 'PATH',
    headers: config.headers,
    body: JSON.stringify({
      name: data.name,
      about: data.about
    })
  })
    .then(checkResponse)
}
// отправка отредактированной аватарки
function editAvatar(data) {
  return fetch(`${config.url}/users/me/avatar`, {
    method: 'PATH',
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
function creatNewCard(data) {
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
function deleteCard(data) {
  return fetch(`${config.url}/cards/${data.id}`, {
    method: 'DELETE',
    headers: config.headers,
  })
    .then(checkResponse)
}
// удалить лайк с сервера
function deleteLike(data) {
  return fetch(`${config.url}/cards/likes/${data.id}`, {
    method: 'DELETE',
    headers: config.headers,
  })
    .then(checkResponse)
}
// получить лайк с сервера
function addLike(data) {
  return fetch(`${config.url}/cards/likes${data.id}`, {
    method: 'PUT',
    headers: config.headers,
  })
    .then(checkResponse)
}







