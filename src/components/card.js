import { clearForm, userId } from './modal.js';
import { openForm } from './utils.js';
import { inputNameMesto, inputLinkMesto, galery, cardBig, galeryBigPopup, cardTemplate, cardBigTitle } from './const.js';
import { addLikeCard, deleteLikeCard, getCards } from './api.js'
export { saveCard, addCard };

//console.log(userId);

getCards().then((cards) => {
  initialCards(cards)
})
  .catch((err) => {
    console.error(err);
  })


function initialCards(cards) {
  cards.forEach(items => {
    const elem = creatMesto(items);
    galery.prepend(elem);
  })
}
function saveCard(evt) {
  evt.preventDefault();
  const popup = evt.target.closest('.pop-up_opened');
  const inputLink = inputLinkMesto.value; // получаю содержимое инпута 
  const inputName = inputNameMesto.value;// получаю содержимое инпута
  addCard(inputLink, inputName);// передаю содержимое инпута в функцию addCard
  clearForm(popup);
};

function addCard(inputLink, inputName) {
  const data = {
    name: inputName,
    link: inputLink,
  }
  creatNewCard(data)

};

function creatMesto(items) {
  // создаем контейнер
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
  const cardLike = cardElement.querySelector('.card__like');
  const cardDelete = cardElement.querySelector('.card__delete');
  const imgCard = cardElement.querySelector('.card__image');
  const imgName = cardElement.querySelector('.card__name');
  const likeCount = cardElement.querySelector('.card__like-count');

  // получаем шаблон карточки
  const idCard = items['_id'];
  const owner = items['owner'];
  const likes = items['likes'];
  imgCard.src = items['link'];
  imgCard.alt = items['name'];
  imgName.textContent = items['name'];
  likeCount.textContent = likes.length;

  //console.log(likeCount);
  //console.log(userId);
  //console.log(owner._id);
  //console.log(imgName.textContent);

  // рисуем лайки

  if (likes) {
    addLike(cardElement, likeCount, idCard);

    likes.forEach((elem) => {
      if (likes.length > 0 && idCard === userId) {
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
  }
  cardDelete.addEventListener('click', evt => {
    deleteCard(idCard)
      .then(() => {
        evt.target.closest('.card').remove(cardElement);
      })
      .catch((err) => {
        console.log(err);

      })
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

