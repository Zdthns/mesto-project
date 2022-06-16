import { spans, profilePopup, profileTitle, profileAbout, nameInput, jobInput, galeryBigPopup } from './const.js';
import { openForm, closeForm } from './utils.js'
export { handlerFormSubmit, copyText, closeForm, openForm, sortPopup, clearForm };

// profile-popup
function handlerFormSubmit(evt) {
  evt.preventDefault();
  profileTitle.textContent = nameInput.value;
  profileAbout.textContent = jobInput.value;
  clearForm(profilePopup);
};

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

