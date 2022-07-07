import { profileAvatar, profilePopup, profileTitle, profileAbout, nameInput, jobInput, avatarPopup, avatarInput, profileFormSubmit, avatarFormSubmit } from './const.js';
import { openPopup, closePopup, loadingData } from './utils.js'
import { getUsers, getCards, addAvatar, editUsersProfile } from './api.js';
import { renderInitialCards } from './card.js'

export { handlerFormSubmit, editAvatar, copyText, closePopup, openPopup, sortPopup, clearForm };


export let userId = '';
export let userName = '';
export let userAbout = '';
export let imgAvatar = '';

Promise.all([getUsers(), getCards()])
  .then(([user, cards]) => {
    userId = user._id;
    userName = user.name;
    userAbout = user.about;
    imgAvatar = user.avatar;
    renderInitialCards(cards);
    setUserProfile(userName, userAbout, imgAvatar);
  })
  .catch((err) => {
    console.log(err);
  })

function setUserProfile(name, about, imgAvatar) {
  profileTitle.textContent = name;
  profileAbout.textContent = about;
  profileAvatar.src = imgAvatar;
}

function handlerFormSubmit(evt) {
  loadingData(true, profileFormSubmit, "Сохранение...");
  evt.preventDefault();
  const data = {
    name: nameInput.value,
    about: jobInput.value,
  }

  editUsersProfile(data)
    .then(() => {
      profileTitle.textContent = data.name;
      profileAbout.textContent = data.about;
      clearForm(profilePopup)
    })
    .catch((err) => {
      console.error(err);
    })
    .finally(() => {
      setTimeout(() => { loadingData(false, profileFormSubmit, 'Сохранить') }, 1000);

    })
};

//редактор аватарки
function editAvatar(evt) {
  loadingData(true, avatarFormSubmit, "Сохранение...");
  evt.preventDefault();
  const data = {
    avatar: avatarInput.value
  }
  addAvatar(data)
    .then((res) => {
      profileAvatar.src = res.avatar;
      clearForm(avatarPopup);
    })
    .finally(() => {
      setTimeout(() => { loadingData(false, avatarFormSubmit, 'Сохранить') }, 1000);
    })

}

function copyText() {
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileAbout.textContent;
  openPopup(profilePopup);
}

function sortPopup(popupElem) {
  if (popupElem.querySelector('.form')) {
    clearForm(popupElem);
  } else {
    closePopup(popupElem);
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

  const inputs = popup.querySelectorAll('.form__item')
  inputs.forEach(elem => {
    elem.classList.remove('form__input-error')// удаляем красную черту
  })

  closePopup(popup);

}

