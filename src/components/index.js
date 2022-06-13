import '../pages/index.css';
import { enableValidation } from './validate.js';
import { handlerFormSubmit, copyText, openForm, closeForm, popupElem } from './modal.js';
import { saveCard } from './card.js';
import { galeryPopup, cardAdd, profileEdit, galeryForm, profileForm, popups } from './const.js';

// слушатели:

// openForm
cardAdd.addEventListener('click', evt => {
  openForm(galeryPopup);
});

profileEdit.addEventListener('click', copyText);

//closeForm

popups.forEach((popup) => {
  popup.addEventListener('click', (evt) => {
    const popupElem = evt.target.parentNode.parentNode;
    if (popupElem.classList.contains('pop-up_opened')) {
      closeForm(popupElem);
    }
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

