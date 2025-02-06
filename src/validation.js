export function enableValidation(selectorNames) {
  const formList = Array.from(document.querySelectorAll(selectorNames.formSelector));
  formList.forEach((formElement) => {
    setEventListeners(formElement, selectorNames);
  });
};

function setEventListeners(formElement, selectorNames) {
  const inputList = Array.from(formElement.querySelectorAll(selectorNames.inputSelector));
  const buttonElement = formElement.querySelector(selectorNames.submitButtonSelector);
  
  toggleButtonState(inputList, buttonElement, selectorNames.inactiveButtonClass);

  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', function () {
      checkInputValidity(formElement, inputElement, selectorNames);
      toggleButtonState(inputList, buttonElement, selectorNames.inactiveButtonClass);
    });
  });
};

function toggleButtonState(inputList, buttonElement, inactiveButtonClass) {
  if(hasInvalidInput(inputList)) {
    buttonElement.classList.add(inactiveButtonClass);
  } else {
    buttonElement.classList.remove(inactiveButtonClass);
  }
}

function checkInputValidity(formElement, inputElement, selectorNames) {
  if (inputElement.validity.patternMismatch) {
    showInputError(formElement, inputElement, selectorNames.patternErrorMessage, selectorNames.inputErrorClass);
  } else if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage, selectorNames.inputErrorClass);
  } else {
    hideInputError(formElement, inputElement, selectorNames.inputErrorClass);
  }
};

function hasInvalidInput(inputList) {
  return inputList.some((inputElement)=> {
    return !inputElement.validity.valid;
  });
}

function showInputError(formElement, inputElement, errorMessage, inputErrorClass) {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add(inputErrorClass);
  errorElement.textContent = errorMessage;
};

function hideInputError(formElement, inputElement, inputErrorClass) {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(inputErrorClass);
  errorElement.textContent = '';
};

export function clearValidation(formElement, selectorNames) {
  const inputList = Array.from(formElement.querySelectorAll(selectorNames.inputSelector));
  const buttonElement = formElement.querySelector(selectorNames.submitButtonSelector);

  inputList.forEach((inputElement) => {
    if (inputElement.classList.contains(selectorNames.inputErrorClass)) {
      hideInputError(formElement, inputElement, selectorNames.inputErrorClass);
    }
  });
  toggleButtonState(inputList, buttonElement, selectorNames.inactiveButtonClass);
}
