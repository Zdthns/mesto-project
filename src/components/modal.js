import { profileAvatar, profilePopup, profileTitle, profileAbout, nameInput, jobInput, avatarPopup, avatarInput } from './const.js';
import { openForm, closeForm } from './utils.js'
import { getUsers, addAvatar, editUsersProfile } from './api.js';

export { handlerFormSubmit, editAvatar, copyText, closeForm, openForm, sortPopup, clearForm };


export let userId = '';
export let userName = '';
export let userAbout = '';
export let imgAvatar = '';


getUsers()
  .then(users => {
    userId = users._id;
    userName = users.name;
    userAbout = users.about;
    imgAvatar = users.avatar;
  })
  .catch((err) => {
    console.error(err);
  })


// profile-popup
function handlerFormSubmit(evt) {
  evt.preventDefault();

  const data = {
    name: nameInput.value,
    about: jobInput.value,
  }
  editUsersProfile(data)
    .then(() => {
      profileTitle.textContent = userName;
      profileAbout.textContent = userAbout;
      clearForm(profilePopup);
    })

};
//редактор аватарки
function editAvatar(evt) {
  evt.preventDefault();
  profileAvatar.src = avatarInput.value
  const data = {
    avatar: avatarInput.value
  }
  addAvatar(data);
  clearForm(avatarPopup);
}

function copyText() {
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileAbout.textContent;
  openForm(profilePopup);
}

function sortPopup(popupElem) {
  if (popupElem.querySelector('.form')) {
    clearForm(popupElem);
  } else {
    closeForm(popupElem);
  };
};

function clearForm(popup) {
  const form = popup.querySelector('.form');
  form.reset(); // сброс формы
  const btn = popup.querySelector('.form__save');
  btn.setAttribute('disabled', '')
  btn.classList.add('form__save_disabled');// блок кнопки

  const spans = popup.querySelectorAll('.form__item-error');// спрятать спан с ошибкой
  for (const span of spans) {
    span.textContent = '';
  };

  const input = popup.querySelectorAll('.form__item')
  input.forEach(elem => {
    elem.classList.remove('form__input-error')// удаляем красную черту
  })
  closeForm(popup);
}

