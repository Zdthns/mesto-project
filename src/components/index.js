import '../pages/index.css';
import { enableValidation } from './validate.js';
import { formSubmitHandler, copyText, openForm, closeForm } from './modal.js';
import { saveCard } from './card.js';
import { galeryPopup, profilePopup, galeryBigPopup, cardAdd, profileEdit, mestoClose, galeryForm, profileForm, cardBigClose, profileCloses } from './const.js';

// слушатели:

// openForm
cardAdd.addEventListener('click', evt => {
  openForm(galeryPopup);
  enableValidation(classList)
});

profileEdit.addEventListener('click', copyText);

//closeForm
mestoClose.addEventListener('click', evt => {
  closeForm(galeryPopup);
});
profileCloses.addEventListener('click', evt => {
  closeForm(profilePopup);
});
cardBigClose.addEventListener('click', evt => {
  closeForm(galeryBigPopup);
});

//submit
profileForm.addEventListener('submit', formSubmitHandler);
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



