const popup = document.querySelector('.pop-up');
const edit = document.querySelector('.profile__edit');
const closes = document.querySelector('.pop-up__close');

const formElement = document.querySelector('#form__autor-info');
const nameInput = document.querySelector('#name');
const jobInput = document.querySelector('#about');

const profileTitle = document.querySelector('.profile__title');
const profileAbout = document.querySelector('.profile__subtitle');
const infoSave = document.querySelector('.form__save');

/*form*/
edit.addEventListener('click', oppenFormEdit);

closes.addEventListener('click', closeFormEdit);

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

function oppenFormEdit() {
  popup.classList.add('pop-up_opened');
  copyText();
  focusText();
}

function closeFormEdit() {
  popup.classList.remove('pop-up_opened');
}

function formSubmitHandler(evt) {
  evt.preventDefault();
  profileTitle.textContent = nameInput.value;
  profileAbout.textContent = jobInput.value;
  closeFormEdit()
}

formElement.addEventListener('submit', formSubmitHandler);

/************/
/*card*/

const popapGalery = document.querySelector('#galery-popup');
const saveCardButton = document.querySelector('#mesto-save');// кнопка сохранения карточки
const inputNameMesto = document.querySelector('#name-mesto');// инпут
const inputLinkMesto = document.querySelector('#link-mesto');// инпут

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
// добавление карточек из массива
function addCard() {
  initialCards.forEach(items => {
    let cardTemplate = document.querySelector('.template-card').content;
    let cardElement = cardTemplate.querySelector('.card').cloneNode(true);
    let galery = document.querySelector('.galery');
    cardElement.querySelector('.card__name').textContent = items.name;
    cardElement.querySelector('.card__image').src = items.link;
    cardElement.querySelector('.card__image').alt = items.name;
    galery.prepend(cardElement);
  });
};
//функция создания карточки
function creatMesto(evt) {
  evt.preventDefault();
  let cardTemplate = document.querySelector('.template-card').content;
  let cardElement = cardTemplate.querySelector('.card').cloneNode(true);
  let galery = document.querySelector('.galery');
  cardElement.querySelector('.card__image').src = inputLinkMesto.value;
  cardElement.querySelector('.card__image').alt = inputNameMesto.value;
  cardElement.querySelector('.card__name').textContent = inputNameMesto.value;
  galery.prepend(cardElement);
  closeFormCard();
};

// слушатель
document.querySelector('#add').addEventListener('click', openFormCard);
document.querySelector('.popup__close-mesto').addEventListener('click', closeFormCard);
document.querySelector('#galery-popup').addEventListener('submit', creatMesto);


//открытие формы обавления карточки
function openFormCard() {
  popapGalery.classList.add('pop-up_opened');
};

// закрыть форму
function closeFormCard() {
  popapGalery.classList.remove('pop-up_opened');

};

// like
document.addEventListener('click', evt => {
  const cardLike = evt.target.closest('.card__like');
  if (!cardLike) {
    return;
  };
  cardLike.classList.toggle('card__like_activ');
});


// удалениe карточки
document.addEventListener('click', evt => {
  const cardDelete = evt.target.closest('.card__delete');
  if (!cardDelete) {
    return;
  }
  cardDelete.closest('.card').remove();
})

// big card
document.addEventListener('click', evt => {
  const bigCard = evt.target.closest('.card__image');
  if (!bigCard) {
    return;
  }
  let galeryImage = document.querySelector('.popup__galery-image');
  galeryImage.src = bigCard.src;
  galeryImage.alt = bigCard.alt;

  document.querySelector('#galery-image').classList.add('pop-up_opened');
  document.querySelector('.pop-up__form-title_galery-title').textContent = bigCard.alt;
  document.querySelector('.pop-up__close_galery').addEventListener('click', closeBigCard);
})


function closeBigCard() {
  document.querySelector('#galery-image').classList.remove('pop-up_opened');
};

addCard();