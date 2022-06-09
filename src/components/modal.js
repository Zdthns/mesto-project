import { profilePopup, profileTitle, profileAbout, nameInput, jobInput, galeryBigPopup } from './const.js';
export { formSubmitHandler, copyText, clickHandler, closeForm, openForm };

// profile-popup
function formSubmitHandler(evt) {
  evt.preventDefault();
  profileTitle.textContent = nameInput.value;
  profileAbout.textContent = jobInput.value;
  closeForm(profilePopup);
};

function copyText() {
  nameInput.placeholder = profileTitle.textContent;
  jobInput.placeholder = profileAbout.textContent;
  openForm(profilePopup);
}

//  open popup
function openForm(popup) {
  popup.classList.add('pop-up_opened');
  if (popup.classList.contains('pop-up_opened')) {
    document.addEventListener('keydown', clickEsc)
    document.addEventListener('click', clickHandler);
  }
};

//closes
function closeForm(popup) {
  if (popup.classList.contains('popup__galery-image')) {
    popup.classList.remove('pop-up_opened');
  } else {
    const form = popup.querySelector('.form');
    form.reset()
    popup.classList.remove('pop-up_opened');
  }
};

function clickEsc(evt) {
  if (evt.key === 'Escape') {
    const elem = document.querySelector('.pop-up_opened');
    closeForm(elem)
    document.removeEventListener('keydown', clickEsc);
  }
}
function clickHandler(evt) {
  if (evt.target.classList.contains('pop-up')) {
    closeForm(evt.target);
    document.removeEventListener('click', clickHandler);
  }
};
