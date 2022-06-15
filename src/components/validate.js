import { classList } from './index.js';

// находим все формы и отменяем действие по кнопке
export function enableValidation(classList) {
  const formList = Array.from(document.querySelectorAll(classList.formSelector));
  formList.forEach((formElement) => {
    formElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
    });
    setEventListeners(classList, formElement);
  });
}

function setEventListeners(classList, formElement) {

  const inputList = Array.from(formElement.querySelectorAll(classList.inputSelector));
  inputList.forEach((inputElement) => {
    const buttonElement = formElement.querySelector(classList.submitButtonSelector);
    toggleButtonState(classList, inputList, buttonElement);
    inputElement.addEventListener('input', function () {
      isValid(classList, formElement, inputElement);
      toggleButtonState(classList, inputList, buttonElement);
    });
  });
};
// функция, проверяющая на валидность
function isValid(classList, formElement, inputElement) {
  if (!inputElement.validity.valid) {
    // showInputError теперь получает параметром форму, в которой
    // находится проверяемое поле, и само это поле
    showInputError(classList, formElement, inputElement, inputElement.validationMessage);
  } else {
    // hideInputError теперь получает параметром форму, в которой
    // находится проверяемое поле, и само это поле
    hideInputError(classList, formElement, inputElement);
  }
};

// функция добавляющая класс с ошибкой
function showInputError(classList, formElement, inputElement, errorMessage) {

  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);

  errorElement.classList.add(classList.errorClass);
  inputElement.classList.add(classList.inputErrorClass);
  errorElement.textContent = errorMessage;
};
// функция удаляющая класс с ошибкой
function hideInputError(classList, formElement, inputElement) {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);

  inputElement.classList.remove(classList.inputErrorClass);
  errorElement.classList.remove(classList.errorClass);
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
function toggleButtonState(classList, inputList, buttonElement) {
  // Если есть хотя бы один невалидный инпут
  if (hasInvalidInput(inputList)) {
    // сделай кнопку неактивной
    buttonElement.classList.add(classList.inactiveButtonClass);
    buttonElement.setAttribute('disabled', '');
  } else {
    // иначе сделай кнопку активной
    buttonElement.classList.remove(classList.inactiveButtonClass);
    buttonElement.removeAttribute('disabled', '');
  }
};

