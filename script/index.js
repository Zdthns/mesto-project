//const popup = document.querySelectorAll('.pop-up');
const profilePopup = document.querySelector('#profile-popup');
const edit = document.querySelector('#edit');
const closes = document.querySelector('.pop-up__close');
const nameInput = document.querySelector('#name');
const jobInput = document.querySelector('#about');
const profileTitle = document.querySelector('.profile__title');
const profileAbout = document.querySelector('.profile__subtitle');
const infoSave = document.querySelector('.form__save');

/***galery***/
const card = document.querySelector('.card');
const cardImage = document.querySelector('.card__image');
const galery = document.querySelector('.galery');
const add = document.querySelector('#add');
const galeryPopup = document.querySelector('#galery-popup');
const closesMesto = document.querySelector('.popup__close-mesto');
const saveCardButton = document.querySelector('#mesto-save');// кнопка сохранения карточки
const inputNameMesto = document.querySelector('#name-mesto');// инпут
const inputLinkMesto = document.querySelector('#link-mesto');// инпут
const bigGalery = document.querySelector('#galery-image');
const cardBig = document.querySelector('.popup__galery-image');
const cardBigTitle = document.querySelector('pop-up__form-title_galery-title');
const closeBigCard = document.querySelector('.pop-up__close_galery');
// массив
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
  let elem = creatMesto(items);
  galery.prepend(elem);
});
// слушатели:

// openForm
add.addEventListener('click', evt => {
  openForm(galeryPopup)

});
edit.addEventListener('click', evt => {
  openForm(profilePopup);
});
//closeForm
closesMesto.addEventListener('click', evt => {
  closeForm(galeryPopup)
});
closes.addEventListener('click', evt => {
  closeForm(profilePopup)
});
closeBigCard.addEventListener('click', evt => {
  closeForm(bigGalery)
});
//submit
profilePopup.addEventListener('submit', formSubmitHandler);
galeryPopup.addEventListener('submit', saveCard);


//function
function formSubmitHandler(evt) {
  evt.preventDefault();
  profileTitle.textContent = nameInput.value;
  profileAbout.textContent = jobInput.value;
  closeForm(profilePopup);
};

//  open
function openForm(popup) {
  popup.classList.add('pop-up_opened');
  copyText();
  focusText();
};

function copyText() {
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileAbout.textContent;
}

function focusText() {
  nameInput.addEventListener('focusin', function () {
    nameInput.value = "";
  });
  jobInput.addEventListener('focusin', function () {
    jobInput.value = "";
  });
}
//closes
function closeForm(popup) {
  popup.classList.remove('pop-up_opened');
};

// add
function addCard(inputLink, inputName) {
  let items = {
    name: inputName,
    link: inputLink,
  }
  let cardElement = creatMesto(items);
  galery.prepend(cardElement);
};

function creatMesto(items) {
  let cardTemplate = document.querySelector('.template-card').content;
  let cardElement = cardTemplate.querySelector('.card').cloneNode(true);
  let likeCard = cardElement.querySelector('.card__like');
  let deletCard = cardElement.querySelector('.card__delete');
  let imgCard = cardElement.querySelector('.card__image');
  let imgName = cardElement.querySelector('.card__name');

  imgCard.src = items['link'];
  imgCard.alt = items['name'];
  imgName.textContent = items['name'];

  // like
  likeCard.addEventListener('click', evt => {
    const cardLike = evt.target.closest('.card__like');
    if (!cardLike) {
      return;
    };
    cardLike.classList.toggle('card__like_activ');
  });
  // удалениe карточки
  deletCard.addEventListener('click', evt => {
    const cardDelete = evt.target.closest('.card__delete');
    if (!cardDelete) {
      return;
    }
    cardDelete.closest('.card').remove();
  });
  imgCard.addEventListener('click', evt => {
    let card = evt.target.closest('.card__image');
    if (!card) {
      return;
    }
    cardBig.src = card.src;
    bigGalery.querySelector('.pop-up__form-title').textContent = card.alt;
    openForm(bigGalery);
  });
  return cardElement;
};

function saveCard(evt) {
  evt.preventDefault();
  let inputLink = inputLinkMesto.value; // получаю содержимое инпута 
  let inputName = inputNameMesto.value;// получаю содержимое инпута
  addCard(inputLink, inputName);// передаю содержимое инпута в функцию addCard
  closeForm(galeryPopup); // закрываю форму
};