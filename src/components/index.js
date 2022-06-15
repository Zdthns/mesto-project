import '../pages/index.css';
import { enableValidation } from './validate.js';
import { handlerFormSubmit, copyText, openForm, closeForm } from './modal.js';
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
    closeForm(popupElem);
  })
})

//submit
profileForm.addEventListener('submit', handlerFormSubmit);
galeryForm.addEventListener('submit', saveCard);


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

