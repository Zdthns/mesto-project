import { clearForm } from './modal.js';
import { openForm } from './utils.js';
import { inputNameMesto, inputLinkMesto, galery, cardBig, galeryBigPopup, cardTemplate, cardBigTitle } from './const.js';
export { saveCard, addCard };


const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];
initialCards.forEach(items => {
  const elem = creatMesto(items);
  galery.prepend(elem);
});

function saveCard(evt) {
  evt.preventDefault();
  const popup = evt.target.closest('.pop-up_opened');
  const inputLink = inputLinkMesto.value; // получаю содержимое инпута 
  const inputName = inputNameMesto.value;// получаю содержимое инпута
  addCard(inputLink, inputName);// передаю содержимое инпута в функцию addCard
  clearForm(popup);
};

function addCard(inputLink, inputName) {
  const items = {
    name: inputName,
    link: inputLink,
  }
  const cardElement = creatMesto(items);
  galery.prepend(cardElement);

};

function creatMesto(items) {
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
  const cardLike = cardElement.querySelector('.card__like');
  const cardDelete = cardElement.querySelector('.card__delete');
  const imgCard = cardElement.querySelector('.card__image');
  const imgName = cardElement.querySelector('.card__name');

  imgCard.src = items['link'];
  imgCard.alt = items['name'];
  imgName.textContent = items['name'];

  // like
  cardLike.addEventListener('click', evt => {
    const cardLike = evt.target;
    cardLike.classList.toggle('card__like_activ');
  });
  // удалениe карточки
  cardDelete.addEventListener('click', evt => {
    const cardDelete = evt.target;
    cardDelete.closest('.card').remove();
  });
  imgCard.addEventListener('click', evt => {
    const card = evt.target;
    cardBig.src = card.src;
    cardBig.alt = card.alt;
    cardBigTitle.textContent = card.alt;
    openForm(galeryBigPopup);
  });
  return cardElement;
};

