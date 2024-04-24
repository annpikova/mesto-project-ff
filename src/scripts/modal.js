// функция открытия модального окна
export const openModal = popup => {
  popup.classList.add('popup_is-opened');
  popup.classList.add('popup_is-animated');
  popup.addEventListener('click', closeModalByClick);
  document.addEventListener('keydown', closeModalByEscape);
}

// функция закрытия модального окна
export const closeModal = popup => {
  popup.classList.remove('popup_is-opened');
  popup.removeEventListener('click', closeModalByClick);
  document.removeEventListener('keydown', closeModalByEscape);
}

// функция закрытия модального окна кликом 
const closeModalByClick = evt => {
  if (evt.target === evt.currentTarget) {
    closeModal(evt.target);
  }
}

// функция закрытия модального окна по клавише Esc
const closeModalByEscape = evt => {
  if (evt.key === 'Escape') {
    closeModal(document.querySelector('.popup_is-opened'));
  }
}
