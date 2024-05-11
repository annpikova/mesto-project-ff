import { deleteCard, clickCardLike, deleteCardLike } from "./api.js";

const cardTemplate = document.querySelector("#card-template").content;

// функция создания карточки
export function createCard(cardData, userId, deleteCallback, handleClickLike, handleClickCard) {
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);
  const cardImage = cardElement.querySelector(".card__image");
  const cardTitle = cardElement.querySelector(".card__title");
  const deleteButton = cardElement.querySelector(".card__delete-button");
  const likeButtonContainer = cardElement.querySelector(".card__like-container");
  const likeButton = cardElement.querySelector(".card__like-button");
  const likeButtonActive = "card__like-button_is-active";
  const likeCounter = likeButtonContainer.querySelector(".card__like-counter");

  cardImage.src = cardData.link;
  cardImage.alt = cardData.name;
  cardTitle.textContent = cardData.name;

  cardImage.addEventListener("click", () => handleClickCard(cardData));

  likeButton.addEventListener("click", () => {
    handleClickLike(likeButton, cardData, likeButtonActive, likeCounter);
  });

  if (userId === cardData.owner._id) {
    deleteButton.addEventListener("click", () => {
      deleteCallback(cardData._id, cardElement);
    });
  } else {
    deleteButton.remove();
  }

  if (cardData.likes.some((likeElement) => likeElement._id === userId)) {
    likeButton.classList.add(likeButtonActive);
  }

  countLike(likeCounter, cardData.likes);

  return cardElement;
}

// функция удаления карточки
const removeCard = (cardElement) => {
  cardElement.remove();
};

export const deleteCallback = (cardId, cardElement) => {
  deleteCard(cardId)
    .then(() => {
      removeCard(cardElement);
    })
    .catch((error) => {
      console.log(error);
    });
};


// функция добавления/удаления лайка
export const handleClickLike = (
  like,
  cardData,
  buttonIsActive,
  likeCounter
) => {
  const likeMethod = like.classList.contains(buttonIsActive)
    ? deleteCardLike
    : clickCardLike;
  likeMethod(cardData._id)
    .then((res) => {
      likeCounter.textContent = res.likes.length;
      like.classList.toggle(buttonIsActive);
    })
    .catch((error) => {
      console.log(error);
    });
};

const countLike = (counter, cardData) => {
  if (cardData.length >= 1) {
    counter.classList.add(".card__like-counter_is-active");
    counter.textContent = cardData.length;
  } else {
    counter.classList.remove(".card__like-counter_is-active");
  }
};

