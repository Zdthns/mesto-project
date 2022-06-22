console.log('ВВВВВВВВВВВВВВВВВВВВВВВ');

const req = {
  url: 'https://nomoreparties.co/v1/plus-cohort-11',
  headers: {
    authorization: '0853c74e-ee89-4956-a2c2-d3a81d52f77c',
    'Content-Type': 'application/json'
  }
}



// получаем данные профиля
export function updateProfile() {
  return fetch(`${req.url}/users/me`, {
    method: 'GET',
    headers: req.headers,
  })
    .then((res) => { return res.json().JSON.stringify })

    .then((res) => { console.log(res) })
}
      //.then(checkResponse);

/*
// отправка данных профиля на сервера
export function postProfiles(req, res) {

  }

  // проверка ответа от сервера
  function checkResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(` Error: ${res.status}`);
  }
/*
return fetch(`${req.url}/users/me`, {
  method: 'GET',
  headers: req.headers,
})
  .then(res => res.json())
  .then((result) => {
    console.log(result);
  });
/*












