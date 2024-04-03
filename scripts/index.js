// @todo: Темплейт карточки
const cardTemplate = document.querySelector('#card-template').content;

// @todo: DOM узлы
const placesList = document.querySelector('.places__list');

// @todo: Функция создания карточки
function createCard(sourceImage, titleImage, deleteCallback) {
  const cardElement = cardTemplate.querySelector('.places__item').cloneNode(true);

  const cardImage = cardElement.querySelector('.card__image');
  cardImage.src = sourceImage;
  cardImage.alt = titleImage;

  const cardTitle = cardElement.querySelector('.card__title');
  cardTitle.textContent = titleImage;

  const deleteButton = cardElement.querySelector('.card__delete-button');
  deleteButton.addEventListener('click', deleteCallback);

  return cardElement;
}

// @todo: Функция удаления карточки
const deleteCard = (evt) => { 
  const cardElement = evt.target.closest('.card');
  cardElement.remove();
}

// @todo: Вывести карточки на страницу
initialCards.forEach(function (element) {
  const card = createCard(element.link, element.name, deleteCard);
  placesList.append(card);
}); 
