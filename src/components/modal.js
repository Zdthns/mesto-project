import { profileAvatar, profilePopup, profileTitle, profileAbout, nameInput, jobInput, avatarPopup, avatarInput, profileFormSubmit, avatarFormSubmit } from './const.js';
import { openForm, closeForm, loadingData } from './utils.js'
import { getUsers, getCards, addAvatar, editUsersProfile } from './api.js';
import { initialCards } from './card.js'

export { handlerFormSubmit, editAvatar, copyText, closeForm, openForm, sortPopup, clearForm };


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
    initialCards(cards);
  })
  .catch((err) => {
    console.log(err);
  })

function handlerFormSubmit(evt) {
  evt.preventDefault();
  loadingData(true, profileFormSubmit, "Сохранение...");
  const data = {
    name: nameInput.value,
    about: jobInput.value,
  }

  editUsersProfile(data)
    .then(() => {
      profileTitle.textContent = data.name;
      profileAbout.textContent = data.about;
    })
    .catch((err) => {
      console.error(err);
    })
    .finally(() => loadingData(false, profileFormSubmit, 'Сохранить'))
  clearForm(profilePopup)
};
//редактор аватарки
function editAvatar(evt) {
  evt.preventDefault();
  loadingData(true, avatarFormSubmit, 'Сохранение...');
  const data = {
    avatar: avatarInput.value
  }
  addAvatar(data)
    .then((res) => {
      profileAvatar.src = res.avatar;
    })
    .finally(() => {
      loadingData(false, avatarFormSubmit, 'Cохранить');
    })
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

