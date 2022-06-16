import '../pages/index.css';

import { enableValidation } from './validate.js';
import { handlerFormSubmit, copyText, sortPopup } from './modal.js';
import { openForm } from './utils.js';
import { saveCard } from './card.js';
import { galeryPopup, cardAdd, profileEdit, galeryForm, profileForm, btmClosed } from './const.js';

// слушатели:

// openForm
cardAdd.addEventListener('click', evt => {
  openForm(galeryPopup);
});
profileEdit.addEventListener('click', copyText);

//closeForm

btmClosed.forEach((btm) => {
  btm.addEventListener('click', (evt) => {
    const popupElem = evt.target.closest('.pop-up_opened');
    sortPopup(popupElem);
  }
  );
})



//submit
profileForm.addEventListener('submit', handlerFormSubmit)


galeryForm.addEventListener('submit', evt => {
  saveCard(evt);
})

/*Формы */
export const classList = {
  formSelector: '.form',
  inputSelector: '.form__item',
  submitButtonSelector: '.form__save',
  inactiveButtonClass: 'form__save_disabled',
  inputErrorClass: 'form__input-error',
  errorClass: 'form__item-error'
};

enableValidation(classList)

