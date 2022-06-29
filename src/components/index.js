import '../pages/index.css';
import { enableValidation } from './validate.js';
import { handlerFormSubmit, copyText, sortPopup } from './modal.js';
import { openForm } from './utils.js';
import { saveCard } from './card.js';
import { avatarForm, galeryPopup, cardAdd, profileEdit, galeryForm, profileForm, btmClosed, avatarOverlay, profileAvatar, avatarPopup } from './const.js';



// openForm
cardAdd.addEventListener('click', evt => {
  openForm(galeryPopup);
});
profileEdit.addEventListener('click', copyText);

avatarOverlay.addEventListener('click', evt => {
  openForm(avatarPopup);
});
avatarForm.addEventListener('submit', evt => {
  editavatar(evt);
})
profileAvatar.addEventListener('mouseover', () => {
  avatarOverlay.style.display = 'block';
})

profileAvatar.addEventListener('mouseout', () => {
  avatarOverlay.style.display = 'none';
})


//closeForm

btmClosed.forEach((btm) => {
  btm.addEventListener('click', (evt) => {
    const popupElem = evt.target.closest('.pop-up_opened');
    sortPopup(popupElem);
  }
  );
})



//submit
avatarForm.addEventListener('submit', evt => {
  editavatar(evt);
})

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

enableValidation(classList);