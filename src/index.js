import "./styles/index.css";
import { createCard, deleteCallback, handleClickLike } from "./scripts/card.js";
import { openModal, closeModal } from "./scripts/modal.js";
import { enableValidation, clearValidation } from "./scripts/validation.js";
import {
  getUser,
  getInitialCards,
  changeAvatar,
  editProfile,
  postNewCard,
} from "./scripts/api.js";

const cardsContainer = document.querySelector(".places__list"); // список карточек

const popupList = document.querySelectorAll('.popup');
const popupProfile = document.querySelector(".popup_type_edit"); // попап редактирования профиля
const profileEditButton = document.querySelector(".profile__edit-button"); // кнопка открытия попапа профиля

const popupCard = document.querySelector(".popup_type_new-card"); // попап добавления новой карточки
const profileAddButton = document.querySelector(".profile__add-button"); // кнопка открытия попапа карточек

const formEditProfile = document.forms["edit-profile"];
const formCreateCard = document.forms["new-place"];
const formChangeAvatar = document.forms["new-avatar"];

const popupImage = document.querySelector(".popup_type_image"); // попап полнораземного изображения
const popupFullImage = popupImage.querySelector(".popup__image"); // изображение в полном размере
const popupCaption = popupImage.querySelector(".popup__caption"); // подпись под изображением

const avatarButton = document.querySelector(".profile__image");
const popupAvatar = document.querySelector(".popup_type_avatar");

const cardNameInput = popupCard.querySelector(".popup__input_type_card-name"); // название добавляемой карточки
const cardUrlInput = popupCard.querySelector(".popup__input_type_url"); // ссылка на добавляемую карточку

const nameInput = document.querySelector(".popup__input_type_name"); // вводимое имя в профиле
const jobInput = document.querySelector(".popup__input_type_description"); // вводимая работа в профиле

const profileName = document.querySelector(".profile__title"); // профиль - имя
const profileJob = document.querySelector(".profile__description"); // профиль - работа

const avatarInput = document.querySelector(".popup__input_type_avatar");
const profileImage = document.querySelector(".profile__image-avatar");

const validationConfig = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
};

// изменение аватара
const handleChangeAvatar = (evt) => {
  evt.preventDefault();
  const avatarLink = avatarInput.value;
  evt.submitter.textContent = 'Сохранение...';
  changeAvatar(avatarLink)
    .then((avatar) => {
      profileImage.src = avatar.avatar;
      //closeModal(avatarInput);
      closeModal(popupAvatar);
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      evt.submitter.textContent = 'Сохранить';
    })
};

// добавление карточки
const handleAddCardFormSubmit = (evt) => {
  evt.preventDefault();

  const name = cardNameInput.value;
  const link = cardUrlInput.value;

  evt.submitter.textContent = 'Сохранение...';

  postNewCard(name, link)
    .then((cardData) => {
      cardsContainer.prepend(
        createCard(
          cardData,
          cardData.owner._id,
          deleteCallback,
          handleClickLike,
          openImagePopup
        )
      );
      closeModal(popupCard);
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      evt.submitter.textContent = 'Сохранить';
    })
};

// редактирование имени и информации о себе
const handleEditProfileFormSubmit = (evt) => {
  evt.preventDefault();

  const name = nameInput.value;
  const job = jobInput.value;

  evt.submitter.textContent = 'Сохранение...';

  editProfile(name, job)
    .then(() => {
      profileName.textContent = nameInput.value;
      profileJob.textContent = jobInput.value;
      closeModal(popupProfile);
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      evt.submitter.textContent = 'Сохранить';
    })  
};

avatarButton.addEventListener("click", () => {
  clearValidation(formChangeAvatar, validationConfig),
  openModal(popupAvatar);
});

// заполнение полей формы редактирования профиля
const fillProfileInput = (popupProfile) => {
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
  openModal(popupProfile);
};

// функция открытия модального окна с полноразмерным изображением карточки
const openImagePopup = (cardData) => {
  popupFullImage.src = cardData.link;
  popupFullImage.alt = cardData.name;
  popupCaption.textContent = cardData.name;
  openModal(popupImage);
};

// слушатель открытия попапа профиля
profileEditButton.addEventListener("click", () => {
  clearValidation(formEditProfile, validationConfig);
  fillProfileInput(popupProfile);
});

// слушатель открытия попапа карточек
profileAddButton.addEventListener("click", () => {
  formCreateCard.reset(),
    clearValidation(formCreateCard, validationConfig),
    openModal(popupCard);
});

// включение проверки
enableValidation(validationConfig);

// выведение карточки на страницу
Promise.all([getUser(), getInitialCards()])
  .then(([user, cards]) => {
    const userId = user._id;

    cards.forEach((cardData) => {
      const cards = createCard(
        cardData,
        userId,
        deleteCallback,
        handleClickLike,
        openImagePopup
      );
      cardsContainer.append(cards);
    });

    profileName.textContent = user.name;
    profileJob.textContent = user.about;

    profileImage.src = user.avatar;
    profileImage.alt = user.name;
  })
  .catch((err) => {
    console.log(err);
  });

// обработчики модальных окон
formEditProfile.addEventListener("submit", handleEditProfileFormSubmit);
formCreateCard.addEventListener("submit", handleAddCardFormSubmit);
formChangeAvatar.addEventListener("submit", handleChangeAvatar);


popupList.forEach(function (popupItem) {
  const popupCloseButton = popupItem.querySelector(".popup__close");
  popupCloseButton.addEventListener("click", () => {
    closeModal(popupItem);
  });
});

