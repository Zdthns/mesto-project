const popup = document.querySelector('.pop-up');
const edit = document.querySelector('.profile__edit');
const closes = document.querySelector('.pop-up__close');

const formElement = document.querySelector('#form__autor-info');
const nameInput = document.querySelector('#name');
const jobInput = document.querySelector('#about');

let profileTitle = document.querySelector('.profile__title').textContent;
let profileAbout = document.querySelector('.profile__subtitle').textContent;
const infoSave = document.querySelector('.form__save');
/*card*/
const card = document.querySelector('.card');
const cardName = document.querySelector('.card__name');
const cardImage = document.querySelector('.card__image');
const cardLike = document.querySelector('.card__like');


/*-----------------*/
/*form*/
edit.addEventListener('click', oppenForm);

closes.addEventListener('click', closeForm);

function oppenForm() {
  popup.classList.add('pop-up_opened');
  copyText();
}

function closeForm() {
  popup.classList.remove('pop-up_opened');
}

function copyText() {
  nameInput.placeholder = profileTitle;
  jobInput.placeholder = profileAbout;
}
function formSubmitHandler(evt) {
  evt.preventDefault();
  profileTitle.textContent = nameInput.value;
  profileAbout.textContent = jobInput.value;
}
formElement.addEventListener('submit', formSubmitHandler);