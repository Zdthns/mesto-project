//pop-up
const profilePopup = document.querySelector('#profile-popup');
const galeryPopup = document.querySelector('#galery-popup');
const bigGaleryPopup = document.querySelector('#galery-image');
//button-save
const saveCardButton = document.querySelector('#mesto-save');// кнопка сохранения карточки
const profileSave = document.querySelector('.form__save');// profile 
//button-open
const profileEdit = document.querySelector('#edit');
const cardAdd = document.querySelector('#add');
//button-close
const profileCloses = document.querySelector('.pop-up__close');
const closesMesto = document.querySelector('.popup__close-mesto');

//input
const nameInput = document.querySelector('#name');
const jobInput = document.querySelector('#about');
const inputNameMesto = document.querySelector('#name-mesto');// инпут
const inputLinkMesto = document.querySelector('#link-mesto');// инпут

//node
const profileTitle = document.querySelector('.profile__title');
const profileAbout = document.querySelector('.profile__subtitle');
const cardBig = document.querySelector('.popup__image');
const cardBigTitle = document.querySelector('pop-up__form-title_galery-title');
const closeBigCard = document.querySelector('.pop-up__close_galery');
const card = document.querySelector('.card');
const cardImage = document.querySelector('.card__image');
const galery = document.querySelector('.galery');
const cardTemplate = document.querySelector('.template-card').content;

//form
const galeryForm = document.querySelector('#form__mesto');
const profileForm = document.querySelector('#form__autor-info');



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
  const elem = creatMesto(items);
  galery.prepend(elem);
});
// слушатели:

// openForm
cardAdd.addEventListener('click', evt => {
  openForm(galeryPopup);
});

profileEdit.addEventListener('click', evt => {
  copyText();
});
//closeForm
closesMesto.addEventListener('click', clearInput);

function clearInput(evt) {
  galeryForm.reset();
  closeForm(galeryPopup);
}
profileCloses.addEventListener('click', evt => {
  closeForm(profilePopup);
});
closeBigCard.addEventListener('click', evt => {
  closeForm(bigGaleryPopup);
});
//submit
profileForm.addEventListener('submit', formSubmitHandler);
galeryForm.addEventListener('submit', saveCard);


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
};

function copyText() {
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileAbout.textContent;
  openForm(profilePopup);

}


//closes
function closeForm(popup) {
  popup.classList.remove('pop-up_opened');
};

// add
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
  const likeCard = cardElement.querySelector('.card__like');
  const deletCard = cardElement.querySelector('.card__delete');
  const imgCard = cardElement.querySelector('.card__image');
  const imgName = cardElement.querySelector('.card__name');

  imgCard.src = items['link'];
  imgCard.alt = items['name'];
  imgName.textContent = items['name'];

  // like
  likeCard.addEventListener('click', evt => {
    const cardLike = evt.target;
    if (!cardLike) {
      return;
    };
    cardLike.classList.toggle('card__like_activ');
  });
  // удалениe карточки
  deletCard.addEventListener('click', evt => {
    const cardDelete = evt.target;
    if (!cardDelete) {
      return;
    }
    cardDelete.closest('.card').remove();
  });
  imgCard.addEventListener('click', evt => {
    const card = evt.target;
    if (!card) {
      return;
    }
    cardBig.src = card.src;
    cardBig.alt = card.alt;
    bigGaleryPopup.querySelector('.pop-up__form-title').textContent = card.alt;
    openForm(bigGaleryPopup);
  });
  return cardElement;
};

function saveCard(evt) {
  evt.preventDefault();
  const inputLink = inputLinkMesto.value; // получаю содержимое инпута 
  const inputName = inputNameMesto.value;// получаю содержимое инпута
  addCard(inputLink, inputName);// передаю содержимое инпута в функцию addCard
  clearInput();
};