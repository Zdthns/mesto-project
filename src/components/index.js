export { classList };
import { enableValidation } from './validate.js';
import { formSubmitHandler, copyText, openForm, closeForm, clickHandler } from './modal.js'
import { saveCard } from './card.js';


//pop-up
export const profilePopup = document.querySelector('#profile-popup');
export const galeryPopup = document.querySelector('#galery-popup');
export const galeryBigPopup = document.querySelector('#galery-image');

//button-open
export const profileEdit = document.querySelector('#edit');
export const cardAdd = document.querySelector('#add');
//button-close
export const profileCloses = document.querySelector('.pop-up__close');
export const mestoClose = document.querySelector('.popup__close-mesto');

//input
export const nameInput = document.querySelector('#name');
export const jobInput = document.querySelector('#about');
export const inputNameMesto = document.querySelector('#name-mesto');// инпут
export const inputLinkMesto = document.querySelector('#link-mesto');// инпут

//node
export const profileTitle = document.querySelector('.profile__title');
export const profileAbout = document.querySelector('.profile__subtitle');
export const cardBig = document.querySelector('.popup__image');
export const cardBigTitle = document.querySelector('pop-up__form-title_galery-title');
export const cardBigClose = document.querySelector('.pop-up__close_galery');
export const card = document.querySelector('.card');
export const cardImage = document.querySelector('.card__image');
export const galery = document.querySelector('.galery');


//form
export const galeryForm = document.querySelector('#form__mesto');
export const profileForm = document.querySelector('#form__autor-info');


// слушатели:

// openForm
cardAdd.addEventListener('click', evt => {
  openForm(galeryPopup);
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







// add

//слушатели


/*Формы */

const classList = {
  formSelector: '.form',
  inputSelector: '.form__item',
  submitButtonSelector: '.form__save',
  inactiveButtonClass: 'form__save_disabled',
  inputErrorClass: 'form__input-error',
  errorClass: 'form__item-error'
};

enableValidation(classList)

