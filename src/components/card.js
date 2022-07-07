import { clearForm, userId } from './modal.js';
import { openPopup, closePopup, loadingData } from './utils.js';
import { popupCardDelete, inputNameMesto, inputLinkMesto, galery, btnFormCardDelete, cardBig, galeryBigPopup, cardTemplate, cardBigTitle, mestoFormSubmit } from './const.js';
import { deleteCard, addLikeCard, deleteLikeCard, creatNewCard } from './api.js'
export { saveCard, renderInitialCards };
let cardId = '';
let removeCard = '';

function renderInitialCards(cards) {
  cards.forEach(items => {
    const elem = creatMesto(items);
    galery.prepend(elem);// загрузка с сервера происходит в обратном порядке! 
    // с prepend карточки будут в конце, c apend были в начале.
  })
}

function saveCard(evt) {
  loadingData(true, mestoFormSubmit, "Сохранение...");
  evt.preventDefault();
  const popup = evt.target.closest('.pop-up_opened');
  const inputLink = inputLinkMesto.value; // получаю содержимое инпута 
  const inputName = inputNameMesto.value;// получаю содержимое инпута
  const data = {
    name: inputName,
    link: inputLink,
  }
  creatNewCard(data)
    .then((card) => {
      galery.append(creatMesto(card));
      clearForm(popup);
    })
    .catch((err) => {
      console.error(err)
    })
    .finally(() => {
      setTimeout(() => { loadingData(false, mestoFormSubmit, 'Добавить') }, 1000);

    })
};

function creatMesto(items) {
  // создаем контейнер
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
  const cardLike = cardElement.querySelector('.card__like');
  const cardDelete = cardElement.querySelector('.card__delete');
  const imgCard = cardElement.querySelector('.card__image');
  const imgName = cardElement.querySelector('.card__name');
  const likeCount = cardElement.querySelector('.card__like-count');

  // получаем данные карточки
  const idCard = items['_id'];
  const owner = items['owner'];
  const likes = items['likes'];
  imgCard.src = items['link'];
  imgCard.alt = items['name'];
  imgName.textContent = items['name'];
  likeCount.textContent = likes.length;


  if (owner._id === userId) {
    cardElement.setAttribute('id', idCard);
  }

  // рисуем лайки

  if (likes) {
    addLike(cardElement, likeCount, idCard);
    likes.forEach((like) => {
      if (like._id === userId) {
        cardLike.classList.add('card__like_activ');
      }
      if (like.length > 0 && idCard === userId) {
        cardLike.classList.toggle('card__like_activ');

      }
    })
  } else {
    likeCount.textContent = 0;
  }


  function addLike(cardElement, likeCount, idCard) {
    const cardLike = cardElement.querySelector('.card__like');

    cardLike.addEventListener('click', evt => {
      if (!evt.target.classList.contains('card__like_activ')) {
        addLikeCard(idCard)
          .then(item => {
            evt.target.classList.add('card__like_activ');
            likeCount.textContent = item.likes.length;
          })
          .catch((err) => {
            console.log(err);
          })
      } else {
        deleteLikeCard(idCard)
          .then(item => {
            evt.target.classList.remove('card__like_activ');
            likeCount.textContent = item.likes.length;
          })
          .catch((err) => {
            console.log(err);
          })
      }
    })
  }

  // удалениe карточки
  if (owner._id === userId) {
    const cardDelete = cardElement.querySelector('.card__delete');
    cardDelete.style.display = 'block';


    cardDelete.addEventListener('click', evt => {
      removeCard = evt.target.closest('.card')
      cardId = idCard;
      openPopup(popupCardDelete);
    })


  }
  imgCard.addEventListener('click', evt => {
    const card = evt.target;
    cardBig.src = card.src;
    cardBig.alt = card.alt;
    cardBigTitle.textContent = card.alt;
    openPopup(galeryBigPopup);
  })
  return cardElement;
}

popupCardDelete.addEventListener('submit', (evt) => {
  evt.preventDefault();
  deleteCard(cardId)
    .then(() => {
      galery.removeChild(removeCard);
      closePopup(popupCardDelete);
    })
    .catch((err) => {
      console.log(err);
    })
})