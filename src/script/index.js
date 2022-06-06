//pop-up
const profilePopup = document.querySelector('#profile-popup');
const galeryPopup = document.querySelector('#galery-popup');
const galeryBigPopup = document.querySelector('#galery-image');

//button-open
const profileEdit = document.querySelector('#edit');
const cardAdd = document.querySelector('#add');
//button-close
const profileCloses = document.querySelector('.pop-up__close');
const mestoClose = document.querySelector('.popup__close-mesto');

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
const cardBigClose = document.querySelector('.pop-up__close_galery');
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

profileEdit.addEventListener('click', copyText);
//closeForm
mestoClose.addEventListener('click', clearInput);

profileCloses.addEventListener('click', evt => {
  closeForm(profilePopup);
});
cardBigClose.addEventListener('click', evt => {
  closeForm(galeryBigPopup);
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
  nameInput.placeholder = profileTitle.textContent;
  jobInput.placeholder = profileAbout.textContent;
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
    galeryBigPopup.querySelector('.pop-up__form-title').textContent = card.alt;
    openForm(galeryBigPopup);
  });
  return cardElement;
};

function saveCard(evt) {
  evt.preventDefault();
  const inputLink = inputLinkMesto.value; // получаю содержимое инпута 
  const inputName = inputNameMesto.value;// получаю содержимое инпута
  addCard(inputLink, inputName);// передаю содержимое инпута в функцию addCard
  galeryForm.reset();
  clearInput();
};

function clearInput(evt) {
  galeryForm.reset();
  closeForm(galeryPopup);
}

//слушатели

document.addEventListener('click', clickHandler);
document.addEventListener('keydown', keyHandler);

// маршрутизатор для всех клавиш
function keyHandler(evt) {
  if (evt.key === 'Escape') {
    keyEsc();
  }
};

//обработчик для каждой клавиши
function keyEsc() {
  const popups = document.querySelectorAll('.pop-up')
  popups.forEach(elem => {
    if (elem.classList.contains('pop-up_opened')) {
      elem.classList.remove('pop-up_opened');
    }
  })
}

function clickHandler(evt) {
  if (evt.target.classList.contains('pop-up')) {
    closeForm(evt.target);
  }
};


/*Формы */


const enableValidation = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
};

// находим все формы и отменяем действие по кнопке
function enumerationForm() {
  const formList = Array.from(document.querySelectorAll('.form'));
  formList.forEach((formElement) => {
    formElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
    });

    setEventListeners(formElement);
  });

}
enumerationForm()
//функция навешивающая слушатели на все инпуты
function setEventListeners(formElement) {
  const inputList = Array.from(formElement.querySelectorAll('.form__item'));
  inputList.forEach((inputElement) => {
    const buttonElement = formElement.querySelector('.form__save');
    toggleButtonState(inputList, buttonElement);
    inputElement.addEventListener('input', function () {
      isValid(formElement, inputElement);
      toggleButtonState(inputList, buttonElement);
    });
  });
};
// функция, проверяющая на валидность
function isValid(formElement, inputElement) {
  if (!inputElement.validity.valid) {
    // showInputError теперь получает параметром форму, в которой
    // находится проверяемое поле, и само это поле
    showInputError(formElement, inputElement, inputElement.validationMessage);
  } else {
    // hideInputError теперь получает параметром форму, в которой
    // находится проверяемое поле, и само это поле
    hideInputError(formElement, inputElement);
  }
};

// функция добавляющая класс с ошибкой
function showInputError(formElement, inputElement, errorMessage) {

  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);

  errorElement.classList.add('form__item-error');
  inputElement.classList.add('form__input-error');
  errorElement.textContent = errorMessage;
  errorElement.classList.add('form__item-error_active');
};
// функция удаляющая класс с ошибкой
function hideInputError(formElement, inputElement) {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);

  inputElement.classList.remove('form__input-error');
  errorElement.classList.remove('form__item-error');
  errorElement.classList.remove('form__item-error_active');
  errorElement.textContent = '';
};

//функция проверяющая все инпуты в форме
function hasInvalidInput(inputList) {
  // проходим по этому массиву методом some
  return inputList.some((inputElement) => {
    // Если поле не валидно, колбэк вернёт true
    // Обход массива прекратится и вся функция
    // hasInvalidInput вернёт true

    return !inputElement.validity.valid;
  })
};

//переключение кнопки
function toggleButtonState(inputList, buttonElement) {
  // Если есть хотя бы один невалидный инпут
  if (hasInvalidInput(inputList)) {
    // сделай кнопку неактивной
    buttonElement.classList.add('form__save_disabled');
  } else {
    // иначе сделай кнопку активной
    buttonElement.classList.remove('form__save_disabled');
  }
}; 