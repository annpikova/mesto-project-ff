// 
const config = {
  baseUrl: 'https://mesto.nomoreparties.co/v1/wff-cohort-12',
  headers: {
    authorization: '1a862539-17a5-4f19-8de5-537e04456ecd',
    'Content-Type': 'application/json'
  }
};

// обработчик ответа 
const handleResponce = (res) => {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Ошибка: ${res.status}`);
};

// загрузка информации о пользователе с сервера
export const getUser = () => {
  return fetch(`${config.baseUrl}/users/me`, {
    headers: config.headers
  })
    .then(handleResponce);
};

// загрузка карточек с сервера
export const getInitialCards = () => {
  return fetch(`${config.baseUrl}/cards`, {
    headers: config.headers
  })
    .then(handleResponce);
};

// редактирование профиля
export const editProfile = (name, about) => {
  return fetch(`${config.baseUrl}/users/me`, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({
      name,
      about
    })
  })
  .then(handleResponce);
};

// добавление новой карточки
export const postNewCard = (name, link) => {
  return fetch(`${config.baseUrl}/cards`, {
    method: 'POST',
    headers: config.headers,
    body: JSON.stringify({
      name,
      link
    })
  })
  .then(handleResponce);
};

// удаление карточки
export const deleteCard = (id) => {
  return fetch(`${config.baseUrl}/cards/${id}`, {
    method: 'DELETE',
    headers: config.headers,
  })
  .then(handleResponce);
};


// постановка лайка 
export const clickCardLike = (id) => {
  return fetch(`${config.baseUrl}/cards/likes/${id}`, {
    method: 'PUT',
    headers: config.headers,
  })
  .then(handleResponce);
};

// удаление лайка
export const deleteCardLike = (id) => {
  return fetch(`${config.baseUrl}/cards/likes/${id}`, {
    method: 'DELETE',
    headers: config.headers,
  })
  .then(handleResponce);
};

// обновление аватара пользователя 

export const changeAvatar = (avatar) => {
  return fetch(`${config.baseUrl}/users/me/avatar`, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({
      avatar: `${avatar}`
    })
  })
  .then(handleResponce);
};
