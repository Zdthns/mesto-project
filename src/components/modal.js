import { spans, profilePopup, profileTitle, profileAbout, nameInput, jobInput } from './const.js';
export { handlerFormSubmit, copyText, clickHandler, closeForm, openForm };

// profile-popup
function handlerFormSubmit(evt) {
  evt.preventDefault();
  profileTitle.textContent = nameInput.value;
  profileAbout.textContent = jobInput.value;
  closeForm(profilePopup);
};

function copyText() {
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileAbout.textContent;
  openForm(profilePopup);
}

//  open popup
function openForm(popup) {
  popup.classList.add('pop-up_opened');
  if (popup.classList.contains('pop-up_opened')) {
    document.addEventListener('keydown', clickEsc)
    document.addEventListener('click', clickHandler);
  }
};

//closes
function closeForm(popup) {
  clearInput(popup)
  clearSpanError(popup)

  popup.classList.remove('pop-up_opened');
  //}
};
function clearInput(popup) {
  popup.querySelector('.form').reset();
  const input = popup.querySelectorAll('.form__item')
  input.forEach(elem => {
    elem.classList.remove('form__input-error')// удаляем красную черту
  })
}

// функция очищает span, после закрытия формы( без нее при повторном открытии, надпись с ошибкой остается)
function clearSpanError(popup) {
  const spans = popup.querySelectorAll('.form__item-error');
  for (const span of spans) {
    span.textContent = '';
  }
}

function clickEsc(evt) {
  if (evt.key === 'Escape') {
    const elem = document.querySelector('.pop-up_opened');
    closeForm(elem)
    document.removeEventListener('keydown', clickEsc);
  }
}
function clickHandler(evt) {
  if (evt.target.classList.contains('pop-up')) {
    closeForm(evt.target);
    document.removeEventListener('click', clickHandler);
  }
};
