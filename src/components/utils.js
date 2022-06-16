import { sortPopup } from './modal.js';


function clickEsc(evt) {
  if (evt.key === 'Escape') {
    const elem = document.querySelector('.pop-up_opened');
    sortPopup(elem);
    document.removeEventListener('keydown', clickEsc);
  }
}
function clickHandler(evt) {
  if (evt.target.classList.contains('pop-up')) {
    sortPopup(evt.target);
    document.removeEventListener('click', clickHandler);
  }
};

export function openForm(popup) {
  popup.classList.add('pop-up_opened');
  if (popup.classList.contains('pop-up_opened')) {
    document.addEventListener('keydown', clickEsc)
    document.addEventListener('click', clickHandler);
  }
};


//closes
export function closeForm(popup) {
  popup.classList.remove('pop-up_opened');
};

