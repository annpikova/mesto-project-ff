// функция создания карточки
export function createCard(sourceImage, titleImage, deleteCallback, clickLike, handleClickCard) {
  const cardTemplate = document.querySelector('#card-template').content;
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
  const cardImage = cardElement.querySelector('.card__image');
  const cardTitle = cardElement.querySelector('.card__title');
  const deleteButton = cardElement.querySelector('.card__delete-button');
  const likeButton = cardElement.querySelector('.card__like-button');

  cardImage.src = sourceImage;
  cardImage.alt = titleImage;
  cardTitle.textContent = titleImage;

  deleteButton.addEventListener('click', deleteCallback);
  likeButton.addEventListener('click', clickLike);
  cardImage.addEventListener('click', () => handleClickCard(titleImage, sourceImage));
  
  return cardElement;
}

// функция удаления карточки
export const deleteCard = (evt) => { 
  evt.target.closest('.card').remove();
}

// функция добавления/удаления лайка 
export const clickLike = (evt) => {
  evt.target.classList.toggle('card__like-button_is-active');
}
