import { sortPopup } from './modal.js';


function handlerEsc(evt) {
  if (evt.key === 'Escape') {
    const elem = document.querySelector('.pop-up_opened');
    sortPopup(elem);
  }
}
function handleOverlay(evt) {
  if (evt.target.classList.contains('pop-up')) {
    sortPopup(evt.target);
  }
};

export function openPopup(popup) {
  popup.classList.add('pop-up_opened');
  document.addEventListener('keydown', handlerEsc)
  document.addEventListener('click', handleOverlay);
};

export function loadingData(Loading, btn, btnDefaultText) {
  if (Loading) {
    btn.textContent = 'Сохранение...';
  } else {
    btn.textContent = btnDefaultText;
  }
};

//closes
export function closePopup(popup) {
  popup.classList.remove('pop-up_opened')
  document.removeEventListener('keydown', handlerEsc)
  document.removeEventListener('click', handleOverlay);
};

