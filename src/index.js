import './styles/index.css';
import { initialCards } from './scripts/cards.js';
import { createCard, deleteCard, clickLike } from './scripts/card.js';
import { openModal, closeModal } from './scripts/modal.js';


// объявление переменных

const placesList = document.querySelector('.places__list');  // список карточек
const profileAddButton = document.querySelector('.profile__add-button'); // кнопка открытия попапа карточек 
const profileEditButton = document.querySelector('.profile__edit-button'); // кнопка открытия попапа профиля

const popupCard = document.querySelector('.popup_type_new-card'); // попап добавления новой карточки
const cardNameInput = popupCard.querySelector('.popup__input_type_card-name'); // название добавляемой карточки
const cardUrlInput = popupCard.querySelector('.popup__input_type_url'); // ссылка на добавляемую карточку

const popupImage = document.querySelector('.popup_type_image'); // попап полнораземного изображения
const popupFullImage = popupImage.querySelector('.popup__image'); // изображение в полном размере
const popupCaption = popupImage.querySelector('.popup__caption'); // подпись под изображением

const popupProfile = document.querySelector('.popup_type_edit'); // попап редактирования профиля
const nameInput = document.querySelector('.popup__input_type_name'); // вводимое имя в профиле
const jobInput = document.querySelector('.popup__input_type_description'); // вводимая работа в профиле

const popupList = document.querySelectorAll('.popup');
const popupCardForm = popupCard.querySelector('.popup__form'); 

const profileName = document.querySelector('.profile__title'); // профиль - имя
const profileJob = document.querySelector('.profile__description'); // профиль - работа

// выведение карточки на страницу 
initialCards.forEach(element => {
  const card = createCard(element.link, element.name, deleteCard, clickLike, handleClickCard);
  placesList.append(card);
}); 

// функция открытия модального окна с полноразмерным изображением карточки
function handleClickCard(titleImage, sourceImage) {
  popupFullImage.src = sourceImage;
  popupFullImage.alt = titleImage;
  popupCaption.textContent = titleImage;
  openModal(popupImage);
};

// слушатель открытия попапа карточек 
profileAddButton.addEventListener('click', () => {
  openModal(popupCard);
});

// редактирование имени и информации о себе
const handleFormSubmit = evt => {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;
  closeModal(popupProfile);
};

// слушатель сабмита редактирования профиля
popupProfile.addEventListener('submit', handleFormSubmit);

// слушатель открытия попапа профиля
profileEditButton.addEventListener('click', function() {
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
  openModal(popupProfile);
});

// добавление карточки

const addNewCard = evt => {
  evt.preventDefault();
  placesList.prepend(createCard(cardUrlInput.value, cardNameInput.value, deleteCard, clickLike, handleClickCard));
  popupCardForm.reset();
  closeModal(popupCard);
};

// слушатель сабмита добавления новой карточки
popupCard.addEventListener('submit', addNewCard);

popupList.forEach(function (popupItem) {
  const popupCloseButton = popupItem.querySelector('.popup__close');
  popupCloseButton.addEventListener('click', () => {
    closeModal(popupItem);
  });
});
