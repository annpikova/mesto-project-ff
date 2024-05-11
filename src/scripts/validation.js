// показывает элемент ошибки
const showInputError = (
  formElement,
  inputElement,
  errorMessage,
  validationConfig
) => {
  const errorElement = formElement.querySelector(`.${inputElement.name}-error`);
  inputElement.classList.add(validationConfig.inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(validationConfig.errorClass);
};

// скрывает элемент ошибки
const hideInputError = (formElement, inputElement, validationConfig) => {
  const errorElement = formElement.querySelector(`.${inputElement.name}-error`);
  inputElement.classList.remove(validationConfig.inputErrorClass);
  errorElement.classList.remove(validationConfig.errorClass);
  errorElement.textContent = "";
};

// проверяет валидность поля, внутри showInputError или hideInputError
const isValid = (formElement, inputElement, validationConfig) => {
  if (inputElement.validity.patternMismatch) {
    inputElement.setCustomValidity(inputElement.dataset.errorMessage);
  } else {
    inputElement.setCustomValidity("");
  }
  if (!inputElement.validity.valid) {
    showInputError(
      formElement,
      inputElement,
      inputElement.validationMessage,
      validationConfig
    );
  } else {
    hideInputError(formElement, inputElement, validationConfig);
  }
};

// добавление обработчиков всем полям формы
const setEventListeners = (formElement, validationConfig) => {
  const inputList = Array.from(
    formElement.querySelectorAll(validationConfig.inputSelector)
  );
  const buttonElement = formElement.querySelector(
    validationConfig.submitButtonSelector
  );
  toggleButtonState(inputList, buttonElement, validationConfig);
  inputList.forEach((inputElement) => {
    inputElement.addEventListener("input", () => {
      isValid(formElement, inputElement, validationConfig);
      toggleButtonState(inputList, buttonElement, validationConfig);
    });
  });
};

// добавление обработчиков всем формам
export const enableValidation = (validationConfig) => {
  const formList = Array.from(
    document.querySelectorAll(validationConfig.formSelector)
  );
  formList.forEach((formElement) => {
    formElement.addEventListener("submit", (evt) => {
      evt.preventDefault();
      //const buttonElement = formElement.querySelector(validationConfig.submitButtonSelector);
      //buttonElement.textContent = "Сохранение...";
    });
    setEventListeners(formElement, validationConfig);
  });
};

// блокируем кнопку отправки формы
const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
};

// стилизация кнопки (блокировка / разблокировка кнопки)
const toggleButtonState = (inputList, buttonElement, validationConfig) => {
  if (hasInvalidInput(inputList)) {
    buttonElement.disabled = true;
    buttonElement.classList.add(validationConfig.inactiveButtonClass);
  } else {
    buttonElement.disabled = false;
    buttonElement.classList.remove(validationConfig.inactiveButtonClass);
  }
};

// очищаем ошибки валидации формы и делаем кнопку неактивной
export const clearValidation = (formElement, validationConfig) => {
  const inputList = Array.from(
    formElement.querySelectorAll(validationConfig.inputSelector)
  );
  const buttonElement = formElement.querySelector(
    validationConfig.submitButtonSelector
  );

  if (buttonElement) {
    buttonElement.disabled = true;
    buttonElement.classList.add(validationConfig.inactiveButtonClass);
  }
  buttonElement.textContent = "Сохранить";

  inputList.forEach((inputElement) => {
    hideInputError(formElement, inputElement, validationConfig);
  });
};
